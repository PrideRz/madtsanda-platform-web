"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, SquareArrowOutUpRight, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { navigationData } from "../data/navigation";
import type { NavigationItem } from "@/types/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  const showSolid = scrolled || !isHome;

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleItem = (key: string) => {
    setExpandedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  return (
    <>
      <nav
        className={`fixed top-[var(--site-banner-offset,0px)] w-full z-50 transition-all duration-500 ${
          showSolid
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl py-3 shadow-sm border-b border-zinc-200/50 dark:border-zinc-800/50"
            : "bg-transparent py-3 lg:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center gap-3">
          {/* Logo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
              <Image
                suppressHydrationWarning
                src="/icons/icon.png"
                alt="Logo MTsN 2 Kota Kediri"
                width={50}
                height={50}
                className="w-10 shrink-0 object-contain px-0 tracking-wide lg:w-14"
              />
              <motion.div
                className={`flex min-w-0 flex-col text-xl font-bold tracking-wide transition-colors duration-300 ${
                  showSolid ? "text-zinc-900 dark:text-white" : "text-white"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <span className="hidden text-md md:block leading-tight">MTsN 2</span>
                <span className="hidden text-sm md:block leading-tight">Kota Kediri</span>
                <span className="block max-w-[190px] truncate text-sm tracking-wider sm:max-w-[260px] md:hidden">
                  MTsN 2 Kota Kediri
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            animate={{ y: 0, opacity: 1 }}
            className={`hidden lg:flex items-center space-x-3 xl:space-x-8 text-sm font-medium ${
              showSolid ? "text-zinc-900 dark:text-white" : "text-white/90"
            }`}
          >
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {navigationData.map((labels, index) => {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger
                        className={
                          "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 hover:text-emerald-400 focus:text-emerald-400 font-medium transition-all outline-none hover:bg-transparent focus:bg-transparent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-transparent/50 data-popup-open:hover:bg-transparent data-open:bg-transparent/50 data-open:hover:bg-transparent data text-xl"
                        }
                      >
                        {labels.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={
                          labels.label === "Zona Integritas"
                            ? "max-h-[calc(100dvh-6.5rem)] overflow-hidden"
                            : undefined
                        }
                      >
                          <ul
                          className="grid max-w-[calc(100vw-2rem)] gap-3 p-2 md:w-100 lg:w-150 lg:grid-cols-[.75fr_1fr]"
                        >
                          <li className="row-span-3">
                            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-bl from-emerald-100 via-emerald-500  to-emerald-600 p-6 no-underline outline-none focus:shadow-md relative overflow-hidden text-white">
                              <div className="mb-2 mt-4 text-lg font-medium">
                                <div className="text-xl font-bold leading-tight">
                                  {labels.label}
                                </div>
                              </div>
                              <p className="text-sm leading-tight opacity-70">
                                {labels.description}
                              </p>
                            </div>
                          </li>

                          <li
                            className={`list-none min-w-0 scrollbar-thin ${
                              labels.label === "Zona Integritas"
                                ? "max-h-[calc(100dvh-7.5rem)] overflow-y-auto overscroll-contain pr-2 pb-2"
                                : ""
                            }`}
                          >
                            <ul
                              className={
                                labels.label === "Zona Integritas"
                                  ? "flex min-w-0 flex-col gap-1"
                                  : "flex flex-col gap-1"
                              }
                            >
                              {labels.items.map((item) => (
                                <DesktopNavigationItem
                                  key={item.href}
                                  item={item}
                                  pathname={pathname}
                                />
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>

          {/* Desktop Actions */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:flex items-center space-x-4"
          >
            <ThemeToggle />
            <Link href="/login" prefetch>
              <button className="dark:bg-emerald-950 bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-400 border-b-4 font-bold font-mono overflow-hidden relative px-4 py-1 rounded-xl dark:hover:brightness-150 hover:brightness-110 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span className="dark:bg-emerald-400 bg-emerald-100 shadow-emerald-400 absolute top-[-150%] left-0 inline-flex w-80 h-1.25 rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                Connect
              </button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            animate={{ x: 0, opacity: 1 }}
            className="relative z-50 lg:hidden flex size-11 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`transition-colors ${
                mobileOpen
                  ? "text-white"
                  : showSolid
                    ? "text-zinc-900 dark:text-white"
                    : "text-white"
              }`}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-x-0 bottom-0 top-[var(--site-banner-offset,0px)] z-40 bg-black/60 lg:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed bottom-0 right-0 top-[var(--site-banner-offset,0px)] z-50 w-full max-w-[320px] overflow-y-auto bg-white shadow-2xl dark:bg-zinc-950 lg:hidden"
            >
              <div className="pb-6 px-4 pt-4">
                {/* Header Mobile */}
                <div className="flex items-center justify-end mb-4">
                  <button onClick={() => setMobileOpen(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Sections */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-sm border border-zinc-200 px-3 py-3 font-semibold transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    Beranda
                  </Link>
                  {navigationData.map((section, index) => {
                    const isExpanded = expandedSections.includes(index);

                    return (
                      <div
                        key={index}
                        className="border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden"
                      >
                        {/* Section Header */}
                        <button
                          onClick={() => toggleSection(index)}
                          className="w-full flex items-center justify-between px-3 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                        >
                          <div>
                            <div className="font-semibold text-base">
                              {section.label}
                            </div>
                            <div className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
                              {section.description}
                            </div>
                          </div>
                          <ChevronDown
                            className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {/* List Items */}
                              <div className="px-2 pb-4 space-y-1">
                                {section.items.map((item) => (
                                  <MobileNavigationItem
                                    key={item.href}
                                    item={item}
                                    pathname={pathname}
                                    expandedItems={expandedItems}
                                    onToggle={toggleItem}
                                    onNavigate={() => setMobileOpen(false)}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Actions */}
                <div className="mt-8 space-y-3">
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>

                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    prefetch
                  >
                    <button className="w-full dark:bg-emerald-950 bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-400 border-b-4 font-bold font-mono overflow-hidden relative px-4 py-3 rounded-2xl dark:hover:brightness-150 hover:brightness-110 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                      <span className="dark:bg-emerald-400 bg-emerald-100 shadow-emerald-400 absolute top-[-150%] left-0 inline-flex w-80 h-1.25 rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                      Connect
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DesktopNavigationItem({
  item,
  pathname,
  nested = false,
}: {
  item: NavigationItem;
  pathname: string;
  nested?: boolean;
}) {
  const isActive = pathname === item.href;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="list-none">
      {item.children?.length ? (
        <div
          className="min-w-0 rounded-lg border border-zinc-200/70 p-2 dark:border-zinc-800/70"
        >
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="group/item flex w-full items-start justify-between gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            aria-expanded={isOpen}
          >
            <NavigationItemContent item={item} isActive={isActive} />
            <ChevronDown
              className={`mt-0.5 size-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mt-2 space-y-1 overflow-hidden border-l border-emerald-200 pl-2 dark:border-emerald-500/30 ${
                  nested ? "ml-1" : "ml-2"
                }`}
              >
                {item.children.map((child) => (
                  <DesktopNavigationItem
                    key={child.href}
                    item={child}
                    pathname={pathname}
                    nested
                  />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <DesktopNavigationItemLink
          item={item}
          className="group/item block select-none rounded-lg p-2.5 transition-colors outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800/60 focus:bg-zinc-100 dark:focus:bg-zinc-800/60"
        >
          <NavigationItemContent item={item} isActive={isActive} />
        </DesktopNavigationItemLink>
      )}
    </li>
  );
}

function MobileNavigationItem({
  item,
  pathname,
  expandedItems,
  onToggle,
  onNavigate,
  depth = 0,
}: {
  item: NavigationItem;
  pathname: string;
  expandedItems: string[];
  onToggle: (key: string) => void;
  onNavigate: () => void;
  depth?: number;
}) {
  const isActive = pathname === item.href;
  const isExpanded = expandedItems.includes(item.href);

  if (item.children?.length) {
    return (
      <div
        className={`overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 ${
          depth > 0 ? "ml-3" : ""
        }`}
      >
        <button
          onClick={() => onToggle(item.href)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <div className="min-w-0">
            <div className="text-sm font-medium">{item.label}</div>
            <div className="mt-0.5 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
              {item.description}
            </div>
          </div>
          <ChevronDown
            className={`size-5 shrink-0 text-zinc-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-1 px-2 pb-2">
                {item.children.map((child) => (
                  <MobileNavigationItem
                    key={child.href}
                    item={child}
                    pathname={pathname}
                    expandedItems={expandedItems}
                    onToggle={onToggle}
                    onNavigate={onNavigate}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <MobileNavigationItemLink
      item={item}
      onClick={onNavigate}
      className={`block rounded-xl px-4 py-3 transition-colors ${
        depth > 0 ? "ml-3" : ""
      } ${
        isActive
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
          : "text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-900"
      }`}
    >
      <div className="text-sm font-medium">{item.label}</div>
      <div className="mt-0.5 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
        {item.description}
      </div>
    </MobileNavigationItemLink>
  );
}

function DesktopNavigationItemLink({
  item,
  className,
  children,
  onClick,
}: {
  item: NavigationItem;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const linkProps = {
    className,
    onClick,
    ...(item.isExternal
      ? { target: "_blank", rel: "noreferrer" }
      : {}),
  };

  return (
    <NavigationMenuLink asChild>
      {item.isExternal ? (
        <a href={item.href} {...linkProps}>
          {children}
        </a>
      ) : (
        <Link href={item.href} {...linkProps}>
          {children}
        </Link>
      )}
    </NavigationMenuLink>
  );
}

function MobileNavigationItemLink({
  item,
  className,
  children,
  onClick,
}: {
  item: NavigationItem;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const linkProps = {
    className,
    onClick,
    ...(item.isExternal
      ? { target: "_blank", rel: "noreferrer" }
      : {}),
  };

  return item.isExternal ? (
    <a href={item.href} {...linkProps}>
      {children}
    </a>
  ) : (
    <Link href={item.href} {...linkProps}>
      {children}
    </Link>
  );
}

function NavigationItemContent({
  item,
  isActive,
}: {
  item: NavigationItem;
  isActive: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 text-sm">
      <span
        className={`flex min-w-0 flex-row items-start gap-1.5 transition-colors ${
          isActive
            ? "font-semibold text-emerald-600 dark:text-emerald-400"
            : "text-zinc-900 group-hover/item:text-emerald-600 dark:text-white dark:group-hover/item:text-emerald-400"
        }`}
      >
        <SquareArrowOutUpRight
          className={`size-4 shrink-0 transition-colors ${
            isActive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 dark:text-zinc-400 group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400"
          }`}
        />
        <span className="min-w-0 break-words leading-tight font-medium">
          {item.label}
        </span>
      </span>
      <span
        className={`line-clamp-3 whitespace-normal break-words text-xs transition-colors ${
          isActive
            ? "text-emerald-700/80 dark:text-emerald-300/80"
            : "text-zinc-500 dark:text-zinc-400 group-hover/item:text-zinc-700 dark:group-hover/item:text-zinc-300"
        }`}
      >
        {item.description}
      </span>
    </div>
  );
}
