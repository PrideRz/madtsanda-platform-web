import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import type { PublicInformationPage } from "@/types/public-information";

export function PublicInformationDetail({
  page,
  backHref,
  backLabel,
}: {
  page: PublicInformationPage;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className="min-h-screen bg-white pt-24 text-zinc-950 dark:bg-zinc-950 dark:text-white md:pt-28">
      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-6 md:pb-24">
        <Button asChild variant="outline" className="mb-8">
          <Link href={backHref}>
            <ArrowLeft className="size-4" />
            {backLabel}
          </Link>
        </Button>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50 md:p-10">
          <Badge className="bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/25">
            <ShieldCheck className="size-3.5" />
            {page.category}
          </Badge>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 dark:text-zinc-400">
            {page.description}
          </p>

          {page.externalUrl && (
            <Button asChild className="mt-7 bg-emerald-600 text-white hover:bg-emerald-700">
              <a href={page.externalUrl} target="_blank" rel="noreferrer">
                Buka layanan resmi
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
        </div>

        {page.imageUrl && (
          <div className="mt-8 overflow-hidden rounded-lg border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-5">
            <Image
              src={page.imageUrl}
              alt={page.title}
              width={1600}
              height={1200}
              sizes="(max-width: 768px) 100vw, 960px"
              className="h-auto max-h-[75vh] w-full rounded-md object-contain"
            />
          </div>
        )}

        {page.documentUrl && (
          <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black">Dokumen PDF</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {page.title} 2026
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline">
                  <a href={page.documentUrl} target="_blank" rel="noreferrer">
                    Buka PDF
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <a href={page.documentUrl} download>
                    Unduh PDF
                    <Download className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
            <iframe
              src={`${page.documentUrl}#view=FitH`}
              title={page.title}
              className="h-[70vh] min-h-[420px] w-full rounded-md border border-zinc-200 dark:border-zinc-800"
            />
          </div>
        )}

        {page.showInformation !== false && (
          <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <FileText className="size-5" />
              </div>
              <h2 className="text-2xl font-black">Informasi layanan</h2>
            </div>
            <ul className="space-y-4">
              {page.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
