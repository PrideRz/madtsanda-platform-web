import type { Metadata } from "next";
import type { NewsItem } from "@/types/dto/news";
import type { ResearchItem } from "@/types/dto/research";

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.mtsn2kotakediri.sch.id";
export const IS_STAGING = process.env.NEXT_PUBLIC_IS_STAGING === "true";

export const SCHOOL_NAME = "MTsN 2 Kota Kediri";
export const SITE_NAME = "Madtsanda Platform";
export const SCHOOL_DESCRIPTION =
  "Website resmi MTsN 2 Kota Kediri untuk informasi madrasah, berita, riset murid, program unggulan, perpustakaan, organisasi, dan layanan Madtsanda Connect.";

export const SCHOOL_KEYWORDS = [
  "MTsN 2 Kota Kediri",
  "Madtsanda",
  "Madtsanda Connect",
  "madrasah tsanawiyah Kediri",
  "sekolah islam Kediri",
  "madrasah riset Kediri",
  "PPDB MTsN 2 Kota Kediri",
  "perpustakaan MTsN 2 Kota Kediri",
  "berita MTsN 2 Kota Kediri",
];

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/icons/icon.png",
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : absoluteUrl("/icons/icon.png");

  return {
    title,
    description,
    keywords: [...SCHOOL_KEYWORDS, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SCHOOL_NAME,
      locale: "id_ID",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#school"),
    name: SCHOOL_NAME,
    alternateName: "Madtsanda",
    url: SITE_URL,
    logo: absoluteUrl("/icons/icon.png"),
    description: SCHOOL_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Sunan Ampel No. 12",
      addressLocality: "Kota Kediri",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    telephone: "0354-687895",
    email: "mtsn_kdr_2@yahoo.co.id",
    sameAs: [
      "https://www.instagram.com/mtsn2kotakediri",
      "https://www.youtube.com/@mtsn2kotakediri",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: `${SCHOOL_NAME} - ${SITE_NAME}`,
    url: SITE_URL,
    publisher: {
      "@id": absoluteUrl("/#school"),
    },
    inLanguage: "id-ID",
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function newsArticleJsonLd(news: NewsItem) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    image: news.imageUrl ? [absoluteUrl(news.imageUrl)] : [absoluteUrl("/icons/icon.png")],
    datePublished: news.createdAt,
    dateModified: news.updatedAt,
    author: {
      "@type": "Person",
      name: news.user?.username || "Redaksi Madtsanda",
    },
    publisher: {
      "@id": absoluteUrl("/#school"),
    },
    mainEntityOfPage: absoluteUrl(`/news/${news.id}`),
    articleSection: news.newsCategory?.category,
    inLanguage: "id-ID",
  };
}

export function researchArticleJsonLd(research: ResearchItem) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: research.title,
    abstract: research.abstrack,
    datePublished: research.publishedDate || research.createdAt,
    dateModified: research.updatedAt,
    author: {
      "@type": "Person",
      name: research.user?.username || "Research Team",
    },
    publisher: {
      "@id": absoluteUrl("/#school"),
    },
    mainEntityOfPage: absoluteUrl(`/research/${research.id}`),
    keywords: research.researchTag?.category,
    inLanguage: "id-ID",
  };
}

export function collectionJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    about: {
      "@id": absoluteUrl("/#school"),
    },
    inLanguage: "id-ID",
  };
}
