import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicInformationDetail } from "@/components/shared/public-information-detail";
import { complaintPages, surveyPages } from "@/components/data/public-information";

const ziPages = [...complaintPages, ...surveyPages];

export function generateStaticParams() {
  return ziPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = ziPages.find((item) => item.slug === slug);

  if (!page) {
    return {
      title: "Zona Integritas | MTsN 2 Kota Kediri",
    };
  }

  return {
    title: `${page.title} | Zona Integritas MTsN 2 Kota Kediri`,
    description: page.description,
  };
}

export default async function ZonaIntegritasDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = ziPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicInformationDetail
      page={page}
      backHref="/zona-integritas"
      backLabel="Kembali ke Zona Integritas"
    />
  );
}
