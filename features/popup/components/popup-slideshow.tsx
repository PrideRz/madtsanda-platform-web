"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { PopupItem } from "@/types/dto/popup";

export function PopupSlideshow({ items }: { items: PopupItem[] }) {
  const [isOpen, setIsOpen] = useState(items.length > 0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isOpen || items.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isOpen, items.length]);

  if (!isOpen || items.length === 0) return null;

  const activeItem = items[activeIndex] ?? items[0];
  const hasImage = Boolean(activeItem.imageUrl);
  const isExternalUrl = Boolean(
    activeItem.buttonUrl && /^https?:\/\//.test(activeItem.buttonUrl),
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Tutup popup"
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 cursor-default"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-zinc-950"
      >
        <button
          type="button"
          aria-label="Tutup popup"
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <X className="size-5" />
        </button>

        <div className="grid max-h-[min(760px,calc(100dvh-2rem))] overflow-y-auto md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-64 bg-zinc-100 dark:bg-zinc-900 md:min-h-[420px]">
            {hasImage ? (
              <Image
                src={activeItem.imageUrl as string}
                alt={activeItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-64 items-center justify-center bg-linear-to-br from-emerald-500 to-teal-700 p-8 text-center text-white md:min-h-[420px]">
                <span className="text-3xl font-black">{activeItem.title}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-8 p-6 md:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
                Pengumuman
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
                {activeItem.title}
              </h2>
              {activeItem.description && (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                  {activeItem.description}
                </p>
              )}

              {activeItem.buttonLabel && activeItem.buttonUrl && (
                <Button asChild className="mt-7 bg-emerald-600 text-white hover:bg-emerald-700">
                  {isExternalUrl ? (
                    <a
                      href={activeItem.buttonUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {activeItem.buttonLabel}
                      <ArrowRight className="size-4" />
                    </a>
                  ) : (
                    <Link href={activeItem.buttonUrl}>
                      {activeItem.buttonLabel}
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </Button>
              )}
            </div>

            {items.length > 1 && (
              <div className="flex items-center justify-between gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <div className="flex items-center gap-1.5">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`Tampilkan popup ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-8 bg-emerald-600"
                          : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Popup sebelumnya"
                    onClick={() =>
                      setActiveIndex(
                        (current) => (current - 1 + items.length) % items.length,
                      )
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Popup berikutnya"
                    onClick={() =>
                      setActiveIndex((current) => (current + 1) % items.length)
                    }
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
