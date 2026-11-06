"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Users,
  History,
  Info,
  Network,
  Target,
  MapPin,
  Leaf,
  Cpu,
  Globe,
  Anchor,
  CheckCircle2,
  Building2,
  Briefcase,
} from "lucide-react";
import { Link, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { chanMayAboutData } from "@/data/about-chanmay";
import { PortMap } from "@/components/sections/PortMap";

type AboutClientProps = {
  locale: AppLocale;
  translations: {
    backHome: string;
    eyebrow: string;
    pageTitle: string;
    pageSubtitle: string;
    tabOverview: string;
    tabLeaders: string;
    tabHistory: string;
    tabOrg: string;
    tabGoals: string;
    tabMap: string;
    groupHdqt: string;
    groupBld: string;
    groupBks: string;
    mapEyebrow: string;
    mapTitle: string;
    mapPortName: string;
    mapAddress: string;
    openInMaps: string;
    mapIframeTitle: string;
  };
};

const SECTIONS = [
  { id: "overview", labelKey: "tabOverview", icon: Info },
  { id: "leaders", labelKey: "tabLeaders", icon: Users },
  { id: "history", labelKey: "tabHistory", icon: History },
  { id: "org", labelKey: "tabOrg", icon: Network },
  { id: "goals", labelKey: "tabGoals", icon: Target },
  { id: "map", labelKey: "tabMap", icon: MapPin },
] as const;

export function AboutClient({ locale, translations: t }: AboutClientProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [leaderFilter, setLeaderFilter] = useState<"all" | "hdqt" | "bld" | "bks">("all");

  const isVi = locale === "vi";
  const { overview, leaders, milestones, departments, strategicGoals } = chanMayAboutData;

  const filteredLeaders = leaderFilter === "all"
    ? leaders
    : leaders.filter((l) => l.group === leaderFilter);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const getGoalIcon = (name: string) => {
    switch (name) {
      case "Leaf":
        return Leaf;
      case "Cpu":
        return Cpu;
      case "Globe":
        return Globe;
      default:
        return Anchor;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Top Banner / Breadcrumb */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#250942] via-[#350F5C] to-[#250942] pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-highlight/15 blur-3xl"
        />

        <div className="container relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wider text-highlight-light uppercase transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backHome}</span>
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="font-label text-xs font-bold tracking-[0.26em] text-highlight-light uppercase">
              {t.eyebrow}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.pageTitle}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/80 sm:text-lg">
              {t.pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Thanh điều hướng nhanh Sticky */}
      <nav aria-label="Thanh điều hướng nhanh về chúng tôi" className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur-md">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar sm:gap-4">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              const label = t[sec.labelKey as keyof typeof t] || sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-[2px] px-3.5 py-2 font-body text-xs font-semibold tracking-wide transition-all",
                    isActive
                      ? "border border-primary bg-primary text-white shadow-xs"
                      : "border border-transparent bg-slate-100 text-ink/75 hover:border-border hover:bg-slate-200/80 hover:text-ink",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="container py-16 lg:py-24 space-y-24">
        {/* ======================================================================
            1. LỜI GIỚI THIỆU CHUNG
            ====================================================================== */}
        <section id="overview" className="scroll-mt-36">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="font-label text-xs font-bold tracking-[0.2em] text-primary uppercase">
                {isVi ? "TỔNG QUAN DOANH NGHIỆP" : "COMPANY OVERVIEW"}
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
                {isVi ? overview.titleVi : overview.titleEn}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ink/80 sm:text-lg">
                {isVi ? overview.introVi : overview.introEn}
              </p>

              {/* 4 Chỉ số nổi bật */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
                {overview.keyMetrics.map((metric, i) => (
                  <div key={i} className="border-l-2 border-primary pl-3">
                    <div className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-body text-xs text-muted">
                      {isVi ? metric.labelVi : metric.labelEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] border border-border shadow-md lg:col-span-5">
              <Image
                src="/images/port/port-aerial-01.webp"
                alt="Cảng Chân Mây Huế"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white font-body text-xs font-medium">
                {isVi
                  ? "Cảng Chân Mây – Cửa ngõ hướng biển gần nhất của Hành lang Đông – Tây (EWEC)"
                  : "Chan May Port – Maritime Gateway of East–West Economic Corridor"}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
            2. BAN LÃNH ĐẠO
            ====================================================================== */}
        <section id="leaders" className="scroll-mt-36 border-t border-border/70 pt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-label text-xs font-bold tracking-[0.2em] text-primary uppercase">
                {isVi ? "HỘI ĐỒNG QUẢN TRỊ & BAN ĐIỀU HÀNH" : "BOARD OF DIRECTORS & MANAGEMENT"}
              </span>
              <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
                {isVi ? "Ban Lãnh Đạo Công Ty" : "Company Leadership Directory"}
              </h2>
            </div>

            {/* Bộ lọc nhóm lãnh đạo */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLeaderFilter("all")}
                className={cn(
                  "rounded-[2px] px-3 py-1.5 font-body text-xs font-semibold transition-colors",
                  leaderFilter === "all" ? "bg-primary text-white" : "bg-slate-100 text-ink/70 hover:bg-slate-200",
                )}
              >
                {isVi ? "Tất cả" : "All"}
              </button>
              <button
                onClick={() => setLeaderFilter("hdqt")}
                className={cn(
                  "rounded-[2px] px-3 py-1.5 font-body text-xs font-semibold transition-colors",
                  leaderFilter === "hdqt" ? "bg-primary text-white" : "bg-slate-100 text-ink/70 hover:bg-slate-200",
                )}
              >
                {t.groupHdqt}
              </button>
              <button
                onClick={() => setLeaderFilter("bld")}
                className={cn(
                  "rounded-[2px] px-3 py-1.5 font-body text-xs font-semibold transition-colors",
                  leaderFilter === "bld" ? "bg-primary text-white" : "bg-slate-100 text-ink/70 hover:bg-slate-200",
                )}
              >
                {t.groupBld}
              </button>
              <button
                onClick={() => setLeaderFilter("bks")}
                className={cn(
                  "rounded-[2px] px-3 py-1.5 font-body text-xs font-semibold transition-colors",
                  leaderFilter === "bks" ? "bg-primary text-white" : "bg-slate-100 text-ink/70 hover:bg-slate-200",
                )}
              >
                {t.groupBks}
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLeaders.map((leader, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between border border-border bg-white p-6 transition-all duration-200 hover:border-primary hover:shadow-md rounded-[2px]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "rounded-[2px] px-2.5 py-0.5 font-label text-[10px] font-bold tracking-wider uppercase",
                        leader.group === "hdqt" && "bg-primary/10 text-primary",
                        leader.group === "bld" && "bg-amber-500/10 text-amber-700",
                        leader.group === "bks" && "bg-slate-500/10 text-slate-700",
                      )}
                    >
                      {leader.group === "hdqt" ? t.groupHdqt : leader.group === "bld" ? t.groupBld : t.groupBks}
                    </span>
                    <Briefcase className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
                    {leader.name}
                  </h3>
                  <p className="mt-1 font-body text-xs font-semibold text-primary/90">
                    {isVi ? leader.titleVi : leader.titleEn}
                  </p>
                </div>

                {(leader.notesVi || leader.notesEn) && (
                  <div className="mt-4 border-t border-border/60 pt-3 font-body text-xs text-muted leading-relaxed">
                    {isVi ? leader.notesVi : leader.notesEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================================
            3. LỊCH SỬ HÌNH THÀNH (TIMELINE)
            ====================================================================== */}
        <section id="history" className="scroll-mt-36 border-t border-border/70 pt-16">
          <div className="max-w-3xl">
            <span className="font-label text-xs font-bold tracking-[0.2em] text-primary uppercase">
              {isVi ? "CHẶNG ĐƯỜNG PHÁT TRIỂN" : "MILESTONES & HISTORY"}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              {isVi ? "Lịch Sử Hình Thành & Phát Triển" : "History of Formation & Milestones"}
            </h2>
            <p className="mt-3 font-body text-sm text-muted">
              {isVi
                ? "Từ chuyến thị sát của Thủ tướng Võ Văn Kiệt năm 1996 đến cụm cảng biển nước sâu hiện đại kết nối xuyên biên giới."
                : "From the visionary inspection of Prime Minister Vo Van Kiet in 1996 to today's modern international seaport hub."}
            </p>
          </div>

          <div className="relative mt-12 pl-6 sm:pl-10 before:absolute before:top-2 before:bottom-2 before:left-[11px] sm:before:left-[15px] before:w-0.5 before:bg-primary/25 space-y-10">
            {milestones.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[30px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-white transition-all group-hover:scale-125 group-hover:bg-primary" />

                <div className="border border-border/70 bg-white p-5 sm:p-6 rounded-[2px] transition-all hover:border-primary hover:shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-label text-xs font-bold tracking-widest text-primary uppercase">
                      {item.date}
                    </span>
                    <span className="font-heading text-sm font-semibold text-muted">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="mt-2 font-heading text-lg font-bold text-ink sm:text-xl">
                    {isVi ? item.titleVi : item.titleEn}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink/75">
                    {isVi ? item.contentVi : item.contentEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================================
            4. BỘ MÁY TỔ CHỨC
            ====================================================================== */}
        <section id="org" className="scroll-mt-36 border-t border-border/70 pt-16">
          <div className="max-w-3xl">
            <span className="font-label text-xs font-bold tracking-[0.2em] text-primary uppercase">
              {isVi ? "CƠ CẤU DOANH NGHIỆP" : "ORGANIZATIONAL STRUCTURE"}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              {isVi ? "Bộ Máy Tổ Chức & Điều Hành" : "Corporate Organizational Framework"}
            </h2>
            <p className="mt-3 font-body text-sm text-muted">
              {isVi
                ? "Mô hình quản trị công ty đại chúng chuyên nghiệp, gắn kết liên hoàn giữa khối hoạch định chiến lược và các phòng ban điều hành khai thác cảng 24/7."
                : "Professional corporate governance structure aligning strategy, supervisory boards, and 24/7 terminal dispatch units."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="flex flex-col justify-between border border-border bg-white p-6 rounded-[2px] transition-all hover:border-ink hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h3 className="font-heading text-base font-bold text-ink">
                      {isVi ? dept.nameVi : dept.nameEn}
                    </h3>
                  </div>
                  <p className="mt-3 font-body text-xs leading-relaxed text-ink/70">
                    {isVi ? dept.descVi : dept.descEn}
                  </p>
                </div>

                <div className="mt-4 border-t border-border/50 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span>{isVi ? "Nhiệm vụ trọng tâm" : "Core Mission"}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================================
            5. MỤC TIÊU PHÁT TRIỂN
            ====================================================================== */}
        <section id="goals" className="scroll-mt-36 border-t border-border/70 pt-16">
          <div className="max-w-3xl">
            <span className="font-label text-xs font-bold tracking-[0.2em] text-primary uppercase">
              {isVi ? "TẦM NHÌN CHIẾN LƯỢC" : "STRATEGIC VISION"}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              {isVi ? "Mục Tiêu & Định Hướng Phát Triển" : "Development Goals & Vision"}
            </h2>
            <p className="mt-3 font-body text-sm text-muted">
              {isVi
                ? "Hiện thực hóa mục tiêu trở thành cảng biển xanh, cảng thông minh và trung tâm logistics - du thuyền hàng đầu khu vực miền Trung."
                : "Realizing the strategic objective of a Green Port, Smart Terminal, and premier maritime hub in Central Vietnam."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {strategicGoals.map((goal) => {
              const Icon = getGoalIcon(goal.iconName);
              return (
                <div
                  key={goal.id}
                  className="flex gap-5 border border-border bg-white p-7 rounded-[2px] transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[2px] bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink sm:text-xl">
                      {isVi ? goal.titleVi : goal.titleEn}
                    </h3>
                    <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-ink/75">
                      {isVi ? goal.descVi : goal.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================================
            6. VỊ TRÍ THỰC ĐỊA & BẢN ĐỒ GOOGLE MAPS
            (Được chuyển vào trang Về chúng tôi theo yêu cầu)
            ====================================================================== */}
        <section id="map" className="scroll-mt-36 border-t border-border/70 pt-16">
          <PortMap
            locale={locale}
            eyebrow={t.mapEyebrow}
            title={t.mapTitle}
            portName={t.mapPortName}
            address={t.mapAddress}
            openInMapsLabel={t.openInMaps}
            iframeTitle={t.mapIframeTitle}
          />
        </section>
      </div>
    </div>
  );
}
