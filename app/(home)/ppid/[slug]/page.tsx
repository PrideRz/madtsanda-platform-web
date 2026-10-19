import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicInformationDetail } from "@/components/shared/public-information-detail";
import { ppidDetailPages } from "@/components/data/public-information";

export function generateStaticParams() {
  return ppidDetailPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = ppidDetailPages.find((item) => item.slug === slug);

  if (!page) {
    return {
      title: "PPID | MTsN 2 Kota Kediri",
    };
  }

  return {
    title: `${page.title} | PPID MTsN 2 Kota Kediri`,
    description: page.description,
  };
}

export default async function PpidDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = ppidDetailPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicInformationDetail
      page={page}
      backHref="/ppid"
      backLabel="Kembali ke PPID"
    />
  );
}
