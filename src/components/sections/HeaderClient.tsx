"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  MapPin,
  ChevronDown,
  Check,
  ExternalLink,
  Globe,
  Anchor,
  Boxes,
} from "lucide-react";
import { Link, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type NavItem = {
  href: string;
  roman: string;
  label: string;
};

type HeaderClientProps = {
  locale: AppLocale;
  targetLocale: AppLocale;
  brandSubtitle: string;
  switchLocale: string;
  switchLocaleAria: string;
  openMenu: string;
  closeMenu: string;
  menuTitle: string;
  menuContactSubtitle: string;
  menuDirectInquiry: string;
  navItems: NavItem[];
  groupLabels: {
    chanMayPort: string;
    incentives: string;
    aboutVsico: string;
    contact: string;
  };
  vsicoSystem: {
    title: string;
    websiteLabel: string;
    websiteUrl: string;
    portLabel: string;
    portSub: string;
    icdLabel: string;
    icdSub: string;
  };
  hotlineDisplay: string;
  hotlineTel: string;
  portAddress: string;
};

const LANGUAGES: { code: AppLocale; name: string }[] = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "en", name: "English" },
];

export function HeaderClient({
  locale,
  brandSubtitle,
  openMenu,
  closeMenu,
  menuContactSubtitle,
  menuDirectInquiry,
  navItems,
  groupLabels,
  vsicoSystem,
  hotlineDisplay,
  hotlineTel,
  portAddress,
}: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  // Theo dõi vị trí cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xử lý đóng dropdown ngôn ngữ khi click ra ngoài hoặc bấm Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isLangOpen]);

  // Khóa cuộn trang khi menu toàn màn hình mở và đóng bằng phím Escape
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
    document.body.style.overflow = "";
  }, [isMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMenuOpen(false);
      setIsLangOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  // Logic hiển thị: Ban đầu luôn hiện; khi cuộn xuống thì ẩn, chỉ hiện khi di chuột vào vùng header hoặc khi menu/dropdown đang mở
  const isVisible = !isScrolled || isHovered || isMenuOpen || isLangOpen;

  // Gom nhóm 8 mục điều hướng theo yêu cầu (đã bỏ VII Chính sách & VIII Về VSICO)
  const portGroup = navItems.slice(0, 6); // I - VI (Năng lực cầu bến, Vị trí, Cảng & ICD, Giải pháp, Hạ tầng, Dịch vụ)
  const certGroup = navItems.slice(6, 7); // VII (Chứng nhận quốc tế & Khách hàng)
  const contactGroup = navItems.slice(7, 8); // VIII (Nhận thông tin ưu tiên)

  return (
    <>
      {/* Vùng cảm ứng vô hình ở sát đỉnh màn hình để đón chuột rê vào khi đã cuộn */}
      <div
        aria-hidden="true"
        onMouseEnter={() => setIsHovered(true)}
        className="pointer-events-auto fixed inset-x-0 top-0 z-40 h-20"
      />

      {/* Header chính: Giữ nguyên cố định, màu tím hoàng gia + gradient + blur mờ */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0",
          isScrolled || isMenuOpen
            ? "border-b border-white/15 bg-gradient-to-r from-[#200839]/92 via-[#3E116C]/85 to-[#200839]/92 shadow-[0_12px_36px_rgba(32,8,57,0.7)] backdrop-blur-2xl"
            : "border-b border-white/10 bg-gradient-to-r from-[#200839]/45 via-[#3E116C]/35 to-[#200839]/45 backdrop-blur-md",
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Bên trái: Logo VSICO & Phụ đề CHÂN MÂY · HUẾ màu vàng đang dùng */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="group flex items-center gap-3.5 focus-visible:outline-white"
          >
            <Image
              src="/logos/vsico/tmp-logo-vsico-light.svg"
              alt="VSICO Hue Port"
              width={132}
              height={34}
              priority
              className="h-10 w-auto transition-opacity group-hover:opacity-90"
            />
            <span className="hidden h-5 w-px bg-white/20 sm:inline-block" />
            <span className="hidden font-label text-[11px] font-semibold tracking-[0.24em] text-highlight-light uppercase sm:inline-block">
              {brandSubtitle}
            </span>
          </a>

          {/* Bên phải: Nút chọn ngôn ngữ tùy chọn (dropdown) & Icon tùy chọn (3 gạch / đóng X) */}
          <div className="flex items-center gap-3">
            {/* Nút chọn ngôn ngữ tùy chọn mở danh sách dropdown nhỏ */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                aria-expanded={isLangOpen}
                aria-haspopup="listbox"
                aria-label="Chọn ngôn ngữ / Select language"
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 font-label text-xs font-semibold tracking-[0.14em] uppercase transition-all focus-visible:outline-white",
                  isLangOpen
                    ? "border-highlight-light bg-white/15 text-highlight-light shadow-md"
                    : "border-white/25 bg-white/[0.08] text-white hover:border-highlight-light hover:bg-white/15 hover:text-highlight-light",
                )}
              >
                <span>{locale.toUpperCase()}</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-white/70 transition-transform duration-200",
                    isLangOpen && "rotate-180 text-highlight-light",
                  )}
                />
              </button>

              {/* Dropdown danh sách ngôn ngữ nhỏ gọn */}
              {isLangOpen && (
                <div
                  role="listbox"
                  className="absolute top-full right-0 z-50 mt-2 w-44 animate-[fadeIn_0.15s_ease-out_forwards] overflow-hidden rounded-2xl border border-white/20 bg-[#240A40]/95 p-1.5 shadow-[0_15px_35px_rgba(36,10,64,0.85)] ring-1 ring-white/10 backdrop-blur-2xl"
                >
                  {LANGUAGES.map((lang) => {
                    const isActive = locale === lang.code;
                    return (
                      <Link
                        key={lang.code}
                        href="/"
                        locale={lang.code}
                        onClick={() => setIsLangOpen(false)}
                        role="option"
                        aria-selected={isActive}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2.5 font-label text-xs transition-colors",
                          isActive
                            ? "bg-primary/40 font-semibold text-highlight-light"
                            : "text-white/80 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span className="inline-block w-6 text-center text-xs font-bold text-white/90 uppercase">
                            {lang.code.toUpperCase()}
                          </span>
                          <span className="font-body text-xs">{lang.name}</span>
                        </span>
                        {isActive && (
                          <Check className="h-3.5 w-3.5 text-highlight-light" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Icon tùy chọn: Giữ nguyên vị trí header, click mở/đóng menu (3 gạch <-> X) */}
            <button
              type="button"
              onClick={() => {
                setIsLangOpen(false);
                setIsMenuOpen((prev) => !prev);
              }}
              aria-label={isMenuOpen ? closeMenu : openMenu}
              aria-expanded={isMenuOpen}
              className={cn(
                "group inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all focus-visible:outline-white",
                isMenuOpen
                  ? "border-highlight-light bg-white/20 text-highlight-light shadow-md"
                  : "border-white/25 bg-white/[0.08] text-white hover:border-highlight-light hover:bg-white/15 hover:text-highlight-light",
              )}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Màn hình Menu Tùy Chọn mở ra bên dưới Header, giữ nguyên thanh Header cũ */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openMenu}
          className="fixed inset-0 z-40 flex animate-[fadeIn_0.25s_ease-out_forwards] flex-col overflow-y-auto bg-gradient-to-b from-[#22073E]/98 via-[#130324]/98 to-[#22073E]/98 pt-20 text-white backdrop-blur-3xl"
        >
          {/* Ánh sáng nền tím & vàng kim phong cách cinematic */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-10 right-0 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-10 left-0 h-96 w-96 rounded-full bg-highlight/15 blur-3xl"
          />

          <div className="relative z-10 container flex-1 py-8 lg:py-12">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              {/* CỘT 1: Danh mục điều hướng gom nhóm (Cảng Chân Mây, Ưu đãi, Về VSICO, Liên hệ) */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-7 lg:col-span-7">
                {/* Nhóm 1: CẢNG CHÂN MÂY */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight-light" />
                    <p className="font-label text-xs font-bold tracking-[0.22em] text-highlight-light uppercase">
                      {groupLabels.chanMayPort}
                    </p>
                  </div>
                  <ul className="mt-3.5 space-y-2.5">
                    {portGroup.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="group flex items-baseline gap-3 py-0.5 transition-all"
                        >
                          <span className="w-9 font-label text-sm font-bold tracking-tight text-white/40 transition-colors group-hover:text-highlight-light">
                            {item.roman}.
                          </span>
                          <span className="font-label text-sm font-semibold text-white/90 transition-all group-hover:translate-x-1 group-hover:text-white sm:text-base">
                            {item.label}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-highlight-light opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vạch phân cách tinh tế */}
                <div className="my-5 border-t border-white/10" />

                {/* Nhóm 2: VỀ VSICO & CHỨNG NHẬN */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight-light" />
                    <p className="font-label text-xs font-bold tracking-[0.22em] text-highlight-light uppercase">
                      {groupLabels.aboutVsico}
                    </p>
                  </div>
                  <ul className="mt-3.5 space-y-2.5">
                    {certGroup.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="group flex items-baseline gap-3 py-0.5 transition-all"
                        >
                          <span className="w-9 font-label text-sm font-bold tracking-tight text-white/40 transition-colors group-hover:text-highlight-light">
                            {item.roman}.
                          </span>
                          <span className="font-label text-sm font-semibold text-white/90 transition-all group-hover:translate-x-1 group-hover:text-white sm:text-base">
                            {item.label}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-highlight-light opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Vạch phân cách tinh tế */}
                <div className="my-5 border-t border-white/10" />

                {/* Nhóm 3: LIÊN HỆ */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight-light" />
                    <p className="font-label text-xs font-bold tracking-[0.22em] text-highlight-light uppercase">
                      {groupLabels.contact}
                    </p>
                  </div>
                  <ul className="mt-3.5 space-y-2.5">
                    {contactGroup.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="group flex items-baseline gap-3 py-0.5 transition-all"
                        >
                          <span className="w-9 font-label text-sm font-bold tracking-tight text-white/40 transition-colors group-hover:text-highlight-light">
                            {item.roman}.
                          </span>
                          <span className="font-label text-sm font-semibold text-white/90 transition-all group-hover:translate-x-1 group-hover:text-white sm:text-base">
                            {item.label}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-highlight-light opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CỘT 2: Thẻ tư vấn nhận ưu đãi & Khối Hệ thống VSICO */}
              <div className="space-y-6 lg:col-span-5">
                {/* Thẻ tư vấn & nhận ưu đãi */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7">
                  <div>
                    <span className="inline-block rounded-full border border-highlight-light/40 bg-highlight/15 px-3 py-1 font-label text-[10px] font-bold tracking-[0.2em] text-highlight-light uppercase">
                      VSICO HUE PORT
                    </span>

                    <h3 className="mt-4 font-label text-lg font-bold text-white sm:text-xl">
                      {menuDirectInquiry}
                    </h3>

                    <div className="mt-5 space-y-3 font-body text-xs text-white/75 sm:text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-highlight-light"
                          aria-hidden="true"
                        />
                        <span>{portAddress}</span>
                      </div>

                      <a
                        href={`tel:${hotlineTel}`}
                        className="flex items-center gap-3 font-semibold text-white transition-colors hover:text-highlight-light"
                      >
                        <Phone
                          className="h-4 w-4 shrink-0 text-highlight-light"
                          aria-hidden="true"
                        />
                        <span>{hotlineDisplay}</span>
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <a
                      href="#contact"
                      onClick={(e) => handleNavClick(e, "#contact")}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-label text-xs font-bold tracking-[0.18em] text-white uppercase shadow-lg transition-all hover:bg-primary-light"
                    >
                      <span>{menuDirectInquiry}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <p className="mt-2.5 text-center font-body text-xs text-white/50">
                      {menuContactSubtitle}
                    </p>
                  </div>
                </div>

                {/* Khối HỆ THỐNG VSICO: Website, Cảng, ICD */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-highlight-light" />
                    <p className="font-label text-xs font-bold tracking-[0.22em] text-highlight-light uppercase">
                      {vsicoSystem.title}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {/* Website VSICO ↗ */}
                    <a
                      href={vsicoSystem.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all hover:border-highlight-light/60 hover:bg-white/[0.08]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/30 text-white">
                          <Globe className="h-4 w-4 text-highlight-light" />
                        </div>
                        <div>
                          <p className="font-label text-xs font-bold text-white transition-colors group-hover:text-highlight-light">
                            {vsicoSystem.websiteLabel}
                          </p>
                          <p className="font-body text-[11px] text-white/55">
                            vsico.com.vn
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-white/50 transition-colors group-hover:text-highlight-light" />
                    </a>

                    {/* Cảng VSICO Huế (Chân Mây) ↗ */}
                    <a
                      href="#top"
                      onClick={(e) => handleNavClick(e, "#top")}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all hover:border-highlight-light/60 hover:bg-white/[0.08]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/30 text-white">
                          <Anchor className="h-4 w-4 text-highlight-light" />
                        </div>
                        <div>
                          <p className="font-label text-xs font-bold text-white transition-colors group-hover:text-highlight-light">
                            {vsicoSystem.portLabel}
                          </p>
                          <p className="font-body text-[11px] text-white/55">
                            {vsicoSystem.portSub}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/50 transition-colors group-hover:text-highlight-light" />
                    </a>

                    {/* ICD Lao Bảo & Hệ thống ICD ↗ */}
                    <a
                      href="#port-icd"
                      onClick={(e) => handleNavClick(e, "#port-icd")}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all hover:border-highlight-light/60 hover:bg-white/[0.08]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/30 text-white">
                          <Boxes className="h-4 w-4 text-highlight-light" />
                        </div>
                        <div>
                          <p className="font-label text-xs font-bold text-white transition-colors group-hover:text-highlight-light">
                            {vsicoSystem.icdLabel}
                          </p>
                          <p className="font-body text-[11px] text-white/55">
                            {vsicoSystem.icdSub}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/50 transition-colors group-hover:text-highlight-light" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
