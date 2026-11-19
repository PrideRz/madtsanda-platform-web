import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LocalRole = "admin" | "administrator" | "super_user" | "student" | "teacher";

type LocalUser = {
  id: string;
  username: string;
  email: string;
  initials: string;
  role: LocalRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type LocalStoredUser = LocalUser & { password: string };

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
  __madtsandaLocalUsers?: Map<string, LocalStoredUser>;
};
const sessions =
  localGlobal.__madtsandaLocalSessions ?? new Map<string, string>();
localGlobal.__madtsandaLocalSessions = sessions;
const localUsers =
  localGlobal.__madtsandaLocalUsers ?? new Map<string, LocalStoredUser>();
localGlobal.__madtsandaLocalUsers = localUsers;
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

function publicUser(user: LocalStoredUser): LocalUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

function ensureLocalUsers(): Map<string, LocalStoredUser> {
  const now = new Date().toISOString();
  const username = process.env.LOCAL_API_USERNAME || "master";
  const email = process.env.LOCAL_API_EMAIL || "master@mtsn2kk.sch.id";
  const existing = localUsers.get(username);

  if (!existing) {
    localUsers.set(username, {
      id: "local-admin",
      username,
      email,
      initials: username
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      role: "super_user",
      active: true,
      password: process.env.LOCAL_API_PASSWORD || "master",
      createdAt: now,
      updatedAt: now,
    });
  }

  return localUsers;
}

function getUser(username = process.env.LOCAL_API_USERNAME || "master") {
  const user = ensureLocalUsers().get(username);
  return user ? publicUser(user) : null;
}

function isAccountManager(
  user: LocalUser | null,
): user is LocalUser & { role: "administrator" | "super_user" } {
  return user?.role === "administrator" || user?.role === "super_user";
}

function isLocalRole(value: unknown): value is LocalRole {
  return ["admin", "administrator", "super_user", "student", "teacher"].includes(value as LocalRole);
}

function getToken(request: NextRequest) {
  const value = request.headers.get("authorization") ?? "";
  return value.startsWith("Bearer ") ? value.slice(7) : null;
}

function getAuthenticatedUser(request: NextRequest) {
  const token = getToken(request);
  if (!token) return null;
  const username = sessions.get(token);
  if (!username) return null;
  const user = getUser(username);
  return user?.active === false ? null : user;
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
      username?: string;
      password?: string;
    };
    const username = body.username?.trim() || "";
    const user = ensureLocalUsers().get(username);

    if (!user || user.active === false || body.password !== user.password) {
      return json({ message: "Username atau kata sandi lokal salah." }, 401);
    }

    const token = randomUUID();
    sessions.set(token, user.username);
    return json({ data: { token, user: publicUser(user) }, message: "Login lokal berhasil." });
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

  if (path === "user" && method === "GET") {
    const currentUser = getAuthenticatedUser(request);
    if (!isAccountManager(currentUser)) {
      return json({ message: "Akses kelola akun ditolak." }, 403);
    }

    return json({ data: Array.from(ensureLocalUsers().values()).map(publicUser) });
  }

  if (path === "user" && method === "POST") {
    const currentUser = getAuthenticatedUser(request);
    if (!isAccountManager(currentUser)) {
      return json({ message: "Akses kelola akun ditolak." }, 403);
    }

    const body = (await request.json().catch(() => ({}))) as {
      username?: string;
      email?: string;
      role?: unknown;
    };
    const username = body.username?.trim() || "";
    if (!username || !isLocalRole(body.role)) {
      return json({ message: "Username dan role wajib diisi." }, 400);
    }
    if (currentUser.role === "administrator" && body.role === "super_user") {
      return json({ message: "Administrator tidak dapat membuat akun Master." }, 403);
    }

    const users = ensureLocalUsers();
    if (Array.from(users.values()).some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      return json({ message: "Username sudah digunakan." }, 409);
    }
    if (body.role === "super_user" && Array.from(users.values()).some((user) => user.role === "super_user")) {
      return json({ message: "Akun Master hanya boleh satu." }, 409);
    }

    const now = new Date().toISOString();
    const created: LocalStoredUser = {
      id: randomUUID(),
      username,
      email: body.email?.trim() || `${username}@mtsn2kk.sch.id`,
      initials: username
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      role: body.role,
      active: true,
      password: username,
      createdAt: now,
      updatedAt: now,
    };
    users.set(created.username, created);
    return json({ data: { token: null, user: publicUser(created) } }, 201);
  }

  const managedUserMatch = path.match(/^user\/([^/]+)$/);
  if (managedUserMatch && method === "PATCH") {
    const currentUser = getAuthenticatedUser(request);
    if (!isAccountManager(currentUser)) {
      return json({ message: "Akses kelola akun ditolak." }, 403);
    }

    const users = ensureLocalUsers();
    const target = Array.from(users.values()).find((user) => user.id === managedUserMatch[1]);
    if (!target) return json({ message: "Akun tidak ditemukan." }, 404);
    if (currentUser.role === "administrator" && target.role === "super_user") {
      return json({ message: "Administrator tidak dapat mengubah akun Master." }, 403);
    }

    const body = (await request.json().catch(() => ({}))) as {
      username?: string;
      email?: string;
      role?: unknown;
      active?: unknown;
    };
    if (body.role !== undefined && (!isLocalRole(body.role) || (target.role === "super_user" && body.role !== "super_user"))) {
      return json({ message: "Role akun tidak valid." }, 400);
    }
    if (
      body.role === "super_user" &&
      target.role !== "super_user" &&
      Array.from(users.values()).some((user) => user.role === "super_user")
    ) {
      return json({ message: "Akun Master hanya boleh satu." }, 409);
    }
    if (body.username?.trim() && body.username.trim() !== target.username) {
      const nextUsername = body.username.trim();
      if (Array.from(users.values()).some((user) => user.id !== target.id && user.username.toLowerCase() === nextUsername.toLowerCase())) {
        return json({ message: "Username sudah digunakan." }, 409);
      }
      users.delete(target.username);
      target.username = nextUsername;
      users.set(target.username, target);
    }
    if (body.email !== undefined) target.email = String(body.email).trim();
    if (body.role !== undefined) target.role = body.role;
    if (typeof body.active === "boolean") target.active = body.active;
    target.updatedAt = new Date().toISOString();
    return json({ data: publicUser(target) });
  }

  const passwordMatch = path.match(/^user\/([^/]+)\/password$/);
  if (passwordMatch && method === "PATCH") {
    const currentUser = getAuthenticatedUser(request);
    if (!isAccountManager(currentUser)) {
      return json({ message: "Akses reset password ditolak." }, 403);
    }

    const target = Array.from(ensureLocalUsers().values()).find((user) => user.id === passwordMatch[1]);
    if (!target) return json({ message: "Akun tidak ditemukan." }, 404);
    if (currentUser.role === "administrator" && target.role === "super_user") {
      return json({ message: "Administrator tidak dapat mengatur ulang password akun Master." }, 403);
    }

    const body = (await request.json().catch(() => ({}))) as { password?: string };
    if (!body.password || body.password.length < 6) {
      return json({ message: "Password baru minimal 6 karakter." }, 400);
    }
    target.password = body.password;
    target.updatedAt = new Date().toISOString();
    return json({
      data: { message: "Password berhasil diatur ulang.", user: publicUser(target) },
    });
  }

  if (path === "user" && method === "DELETE") {
    const currentUser = getAuthenticatedUser(request);
    if (!isAccountManager(currentUser)) {
      return json({ message: "Akses kelola akun ditolak." }, 403);
    }

    const targetId = request.nextUrl.searchParams.get("id");
    const users = ensureLocalUsers();
    const target = Array.from(users.values()).find((user) => user.id === targetId);
    if (!targetId || !target) return json({ message: "Akun tidak ditemukan." }, 404);
    if (target.id === currentUser.id) return json({ message: "Anda tidak dapat menghapus akun sendiri." }, 403);
    if (target.role === "super_user") return json({ message: "Akun Master tidak dapat dihapus." }, 403);
    users.delete(target.username);
    return json({ data: { message: "Akun berhasil dihapus." } });
  }

  if (path === "user/lookup" && method === "GET") {
    const currentUser = getAuthenticatedUser(request);
    if (!isAccountManager(currentUser)) {
      return json({ message: "Akses reset password ditolak." }, 403);
    }

    const username = request.nextUrl.searchParams.get("username")?.trim() || "";
    const target = Array.from(ensureLocalUsers().values()).find((user) => user.username === username);
    return target
      ? json({ data: { id: target.id, username: target.username, role: target.role, active: target.active } })
      : json({ message: "Akun tidak ditemukan." }, 404);
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
