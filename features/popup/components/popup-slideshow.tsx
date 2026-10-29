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
  const hasDescription = Boolean(activeItem.description?.trim());
  const hasButton = Boolean(
    activeItem.buttonLabel?.trim() && activeItem.buttonUrl?.trim(),
  );
  const hasDetails = hasDescription || hasButton;
  const isExternalUrl = Boolean(
    activeItem.buttonUrl && /^https?:\/\//.test(activeItem.buttonUrl),
  );

  const navigation = items.length > 1 ? (
    <div
      className={`flex items-center justify-between gap-3 border-t pt-5 ${
        hasDetails
          ? "border-zinc-200 dark:border-zinc-800"
          : "border-white/30 text-white"
      }`}
    >
      <div className="flex items-center gap-1.5">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Tampilkan popup ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex
                ? "w-8 bg-emerald-500"
                : hasDetails
                  ? "w-1.5 bg-zinc-300 dark:bg-zinc-700"
                  : "w-1.5 bg-white/60"
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
          className={
            hasDetails ? undefined : "text-white hover:bg-white/20 hover:text-white"
          }
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
          className={
            hasDetails ? undefined : "text-white hover:bg-white/20 hover:text-white"
          }
          onClick={() =>
            setActiveIndex((current) => (current + 1) % items.length)
          }
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  ) : null;

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

        <div
          className={`grid max-h-[min(760px,calc(100dvh-2rem))] overflow-y-auto ${
            hasDetails ? "md:grid-cols-[1.1fr_0.9fr]" : "grid-cols-1"
          }`}
        >
          <div
            className={`relative bg-zinc-100 dark:bg-zinc-900 ${
              hasDetails
                ? "min-h-64 md:min-h-[420px]"
                : "min-h-[min(560px,calc(100dvh-2rem))]"
            }`}
          >
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

            {!hasDetails && hasImage && activeItem.title && (
              <div
                className={`absolute inset-x-0 ${navigation ? "bottom-16" : "bottom-0"} bg-linear-to-t from-black/75 to-transparent p-6 pt-16 text-white`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                  Pengumuman
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">
                  {activeItem.title}
                </h2>
              </div>
            )}

            {!hasDetails && navigation && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 p-4 pt-14">
                {navigation}
              </div>
            )}
          </div>

          {hasDetails && (
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
                  <Button
                    asChild
                    className="mt-7 bg-emerald-600 text-white hover:bg-emerald-700"
                  >
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

              {navigation}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
