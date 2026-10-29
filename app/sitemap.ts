import type { MetadataRoute } from "next";
import { absoluteUrl, IS_STAGING } from "@/lib/seo";
import {
  complaintPages,
  ppidDetailPages,
  surveyPages,
} from "@/components/data/public-information";
import type { NewsPaginateDTO } from "@/types/dto/news";
import type { ResearchPaginateDTO } from "@/types/dto/research";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api/v1";

const staticRoutes = [
  "/",
  "/about",
  "/about/sambutan",
  "/about/sejarah",
  "/about/visi-misi",
  "/about/budaya",
  "/about/galeri",
  "/news",
  "/research",
  "/library",
  "/organizations/extracurricular",
  "/organizations/fivesa",
  "/organizations/mpk-osis",
  "/program-madrasah/kurikulum",
  "/program-madrasah/kesiswaan",
  "/program-madrasah/humas",
  "/program-madrasah/sarana-prasarana",
  "/ppdb",
  "/ppid",
  ...ppidDetailPages.map((page) => `/ppid/${page.slug}`),
  "/zona-integritas",
  ...complaintPages.map((page) => `/zona-integritas/${page.slug}`),
  ...surveyPages.map((page) => `/zona-integritas/${page.slug}`),
];

function routeEntry(
  route: string,
  priority = 0.7,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
) {
  return {
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

async function fetchPublic<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      next: {
        revalidate: 3600,
        tags: ["sitemap"],
      },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (IS_STAGING) return [];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) =>
    routeEntry(route, route === "/" ? 1 : 0.7),
  );

  const [news, research] = await Promise.all([
    fetchPublic<NewsPaginateDTO>("/news/paginate/?page=1"),
    fetchPublic<ResearchPaginateDTO>("/research/paginate/?page=1"),
  ]);

  news?.data.forEach((item) => {
    entries.push({
      url: absoluteUrl(`/news/${item.id}`),
      lastModified: new Date(item.updatedAt || item.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  research?.data.forEach((item) => {
    entries.push({
      url: absoluteUrl(`/research/${item.id}`),
      lastModified: new Date(item.updatedAt || item.createdAt),
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  return entries;
}
