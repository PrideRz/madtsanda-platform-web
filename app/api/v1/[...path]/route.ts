import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LocalUser = {
  id: string;
  username: string;
  email: string;
  initials: string;
  role: "admin";
  createdAt: string;
  updatedAt: string;
};

type LocalPopup = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  imageKey: string | null;
  buttonLabel: string | null;
  buttonUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

// Keep local sessions across Next.js development hot reloads.
const localGlobal = globalThis as typeof globalThis & {
  __madtsandaLocalSessions?: Map<string, string>;
};
const sessions =
  localGlobal.__madtsandaLocalSessions ?? new Map<string, string>();
localGlobal.__madtsandaLocalSessions = sessions;
const popupStorePath = join(process.cwd(), ".local-data", "popups.json");
const popupAssetsPath = join(process.cwd(), ".local-data", "popup-assets");
const popupImageTypes = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;
const popupImageMaxBytes = 10 * 1024 * 1024;

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isLocalRequest(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") return false;
  if (process.env.LOCAL_API_ENABLED !== "true") return false;

  const host = request.headers.get("host") ?? "";
  return /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(host);
}

function getUser(): LocalUser {
  const now = new Date().toISOString();
  const username = process.env.LOCAL_API_USERNAME || "Master Lokal";
  const email = process.env.LOCAL_API_EMAIL || "master@mtsn2kk.sch.id";

  return {
    id: "local-admin",
    username,
    email,
    initials: username
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    role: "admin",
    createdAt: now,
    updatedAt: now,
  };
}

function getToken(request: NextRequest) {
  const value = request.headers.get("authorization") ?? "";
  return value.startsWith("Bearer ") ? value.slice(7) : null;
}

function getAuthenticatedUser(request: NextRequest) {
  const token = getToken(request);
  if (!token || !sessions.has(token)) return null;
  return getUser();
}

async function readPopups(): Promise<LocalPopup[]> {
  try {
    const value = await readFile(popupStorePath, "utf8");
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as LocalPopup[]) : [];
  } catch {
    return [];
  }
}

async function writePopups(popups: LocalPopup[]) {
  await mkdir(join(process.cwd(), ".local-data"), { recursive: true });
  await writeFile(popupStorePath, `${JSON.stringify(popups, null, 2)}\n`, "utf8");
}

function sortedPopups(popups: LocalPopup[]) {
  return [...popups].sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));
}

function formText(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function popupFromForm(form: FormData, existing?: LocalPopup): LocalPopup {
  const now = new Date().toISOString();
  return {
    id: existing?.id ?? randomUUID(),
    title: formText(form, "title") || existing?.title || "Popup lokal",
    description: formText(form, "description") || existing?.description || null,
    imageUrl: existing?.imageUrl ?? null,
    imageKey: existing?.imageKey ?? null,
    buttonLabel: formText(form, "buttonLabel") || existing?.buttonLabel || null,
    buttonUrl: formText(form, "buttonUrl") || existing?.buttonUrl || null,
    isActive: formText(form, "isActive") === "true" || existing?.isActive === true,
    sortOrder: Number(formText(form, "sortOrder") || existing?.sortOrder || 0),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

async function savePopupImage(id: string, value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) {
    return { imageUrl: null, imageKey: null };
  }

  const extension = popupImageTypes[value.type as keyof typeof popupImageTypes];
  if (!extension || value.size > popupImageMaxBytes) {
    throw new Error("Format gambar tidak didukung atau ukurannya terlalu besar.");
  }

  const filename = `${id}.${extension}`;
  await mkdir(popupAssetsPath, { recursive: true });
  await writeFile(join(popupAssetsPath, filename), new Uint8Array(await value.arrayBuffer()));

  return {
    imageUrl: `/api/v1/popup-assets/${filename}`,
    imageKey: filename,
  };
}

async function removePopupImage(imageKey: string | null) {
  if (!imageKey || !/^[a-f0-9-]+\.(jpg|png|webp)$/i.test(imageKey)) return;
  await rm(join(popupAssetsPath, imageKey), { force: true });
}

function pathOf(request: NextRequest) {
  return request.nextUrl.pathname
    .replace(/^\/api\/v1\/?/, "")
    .replace(/\/+$/, "");
}

function emptyCollection(path: string) {
  if (
    path === "news/category" ||
    path === "research/tag" ||
    path === "library" ||
    path === "popup" ||
    path === "popup/active"
  ) {
    return { data: [] };
  }

  if (path.startsWith("news/limit") || path.startsWith("news/paginate")) {
    return {
      data: [],
      metadata: {
        total: 0,
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        firstPage: 1,
        firstPageUrl: "/news?page=1",
        lastPageUrl: "/news?page=1",
        nextPageUrl: null,
        previousPageUrl: null,
      },
    };
  }

  if (path.startsWith("research/paginate") || path === "library/paginate") {
    return {
      data: [],
      metadata: {
        total: 0,
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        firstPage: 1,
        firstPageUrl: "/?page=1",
        lastPageUrl: "/?page=1",
        nextPageUrl: null,
        previousPageUrl: null,
      },
    };
  }

  return null;
}

async function handle(request: NextRequest) {
  if (!isLocalRequest(request)) {
    return json({ message: "Local API hanya tersedia di development lokal." }, 404);
  }

  const path = pathOf(request);
  const method = request.method;

  if (path === "health" && method === "GET") {
    return json({ data: { status: "ok", environment: "local" } });
  }

  const popupAssetMatch = path.match(/^popup-assets\/([a-f0-9-]+\.(?:jpg|png|webp))$/i);
  if (popupAssetMatch && method === "GET") {
    try {
      const content = await readFile(join(popupAssetsPath, popupAssetMatch[1]));
      const extension = popupAssetMatch[1].split(".").pop()?.toLowerCase();
      const contentType = extension === "png"
        ? "image/png"
        : extension === "webp"
          ? "image/webp"
          : "image/jpeg";
      return new Response(content, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-store",
        },
      });
    } catch {
      return json({ message: "Gambar popup lokal tidak ditemukan." }, 404);
    }
  }

  if (path === "auth/login" && method === "POST") {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };
    const email = process.env.LOCAL_API_EMAIL;
    const password = process.env.LOCAL_API_PASSWORD;

    if (!email || !password) {
      return json({ message: "Kredensial Local API belum dikonfigurasi." }, 500);
    }

    if (body.email !== email || body.password !== password) {
      return json({ message: "Email atau kata sandi lokal salah." }, 401);
    }

    const token = randomUUID();
    sessions.set(token, email);
    return json({ data: { token, user: getUser() }, message: "Login lokal berhasil." });
  }

  if (path === "auth/me" && method === "GET") {
    const user = getAuthenticatedUser(request);
    return user
      ? json({ data: user })
      : json({ message: "Sesi lokal tidak ditemukan." }, 401);
  }

  if (path === "auth/logout" && (method === "DELETE" || method === "POST")) {
    const token = getToken(request);
    if (token) sessions.delete(token);
    return json({ data: null, message: "Logout lokal berhasil." });
  }

  if (path === "student/token" || path === "teacher/token") {
    return getAuthenticatedUser(request)
      ? json({ data: null })
      : json({ message: "Sesi lokal tidak ditemukan." }, 401);
  }

  if (path === "popup/active" && method === "GET") {
    const popups = await readPopups();
    return json({ data: sortedPopups(popups.filter((popup) => popup.isActive)) });
  }

  if (path === "popup" && method === "GET") {
    if (!getAuthenticatedUser(request)) {
      return json({ message: "Sesi lokal tidak ditemukan." }, 401);
    }
    return json({ data: sortedPopups(await readPopups()) });
  }

  if (path === "popup" && method === "POST") {
    if (!getAuthenticatedUser(request)) {
      return json({ message: "Sesi lokal tidak ditemukan." }, 401);
    }

    const form = await request.formData();
    const popup = popupFromForm(form);
    let image: { imageUrl: string | null; imageKey: string | null };
    try {
      image = await savePopupImage(popup.id, form.get("image"));
    } catch (error) {
      return json({ message: (error as Error).message }, 400);
    }
    const popupWithImage = { ...popup, ...image };
    const popups = await readPopups();
    popups.push(popupWithImage);
    await writePopups(popups);
    return json({ data: popupWithImage, message: "Popup lokal berhasil disimpan." }, 201);
  }

  const popupStatusMatch = path.match(/^popup\/([^/]+)\/status$/);
  if (popupStatusMatch && method === "PATCH") {
    if (!getAuthenticatedUser(request)) {
      return json({ message: "Sesi lokal tidak ditemukan." }, 401);
    }

    const body = (await request.json().catch(() => ({}))) as { isActive?: boolean };
    const popups = await readPopups();
    const index = popups.findIndex((popup) => popup.id === popupStatusMatch[1]);
    if (index < 0) return json({ message: "Popup lokal tidak ditemukan." }, 404);

    popups[index] = {
      ...popups[index],
      isActive: body.isActive === true,
      updatedAt: new Date().toISOString(),
    };
    await writePopups(popups);
    return json({ data: popups[index], message: "Status popup lokal diperbarui." });
  }

  const popupIdMatch = path.match(/^popup\/([^/]+)$/);
  if (popupIdMatch && method === "DELETE") {
    if (!getAuthenticatedUser(request)) {
      return json({ message: "Sesi lokal tidak ditemukan." }, 401);
    }

    const popups = await readPopups();
    const filtered = popups.filter((popup) => popup.id !== popupIdMatch[1]);
    if (filtered.length === popups.length) {
      return json({ message: "Popup lokal tidak ditemukan." }, 404);
    }

    const removed = popups.find((popup) => popup.id === popupIdMatch[1]);
    await removePopupImage(removed?.imageKey ?? null);
    await writePopups(filtered);
    return json({ data: null, message: "Popup lokal dihapus." });
  }

  const collection = emptyCollection(path);
  if (collection && method === "GET") {
    return json(collection);
  }

  return json({ message: "Endpoint Local API belum diimplementasikan." }, 404);
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}

export async function PUT(request: NextRequest) {
  return handle(request);
}

export async function PATCH(request: NextRequest) {
  return handle(request);
}

export async function DELETE(request: NextRequest) {
  return handle(request);
}
