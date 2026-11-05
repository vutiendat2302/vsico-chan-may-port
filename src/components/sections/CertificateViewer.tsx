"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ShieldCheck, ArrowRight } from "lucide-react";
import type { CertificateCategoryId } from "@/data/certificates";
import { Link } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

export type CertificateDisplayItem = {
  id: string;
  categoryId: CertificateCategoryId;
  code: string;
  title: string;
  subtitle: string;
  image: string;
};

type CertificateViewerProps = {
  categories: {
    id: CertificateCategoryId;
    label: string;
  }[];
  items: CertificateDisplayItem[];
  zoomHint: string;
  closeDialogLabel: string;
  viewAllLabel: string;
  scrollHintLabel: string;
};

export function CertificateViewer({
  categories,
  items,
  zoomHint,
  closeDialogLabel,
  viewAllLabel,
  scrollHintLabel,
}: CertificateViewerProps) {
  const [activeTab, setActiveTab] = useState<CertificateCategoryId>("iso");
  const [selectedCert, setSelectedCert] = useState<CertificateDisplayItem | null>(null);

  const activeCategoryItems = items.filter((item) => item.categoryId === activeTab);
  // Hiển thị 3-4 chứng chỉ đại diện
  const displayedItems = activeCategoryItems.slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Thanh Tab Options: Chia đều 4 cột (grid grid-cols-2 md:grid-cols-4), vừa khít 100% khung hình, không bị tràn hay phải kéo ngang */}
      <div className="w-full border-b border-border bg-surface-subtle/50">
        <div
          role="tablist"
          aria-label="Certificate categories"
          className="grid grid-cols-2 md:grid-cols-4 w-full divide-x divide-border/60"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center justify-center px-2 py-3.5 text-center font-body text-xs font-bold tracking-[0.08em] uppercase transition-all focus:outline-none sm:px-4 sm:tracking-[0.12em]",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "bg-transparent text-muted hover:bg-white hover:text-ink",
                )}
              >
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Gợi ý cuộn ngang trên điện thoại */}
      <div className="mt-3 flex items-center justify-end gap-1 font-body text-[11px] text-muted-light lg:hidden">
        <span>{scrollHintLabel}</span>
        <ArrowRight className="h-3 w-3" />
      </div>

      {/* 3. Slot các chứng chỉ: Phong cách Spyker Cars (ảnh vuông góc/khung chữ nhật, full w, không card tròn) */}
      <div
        data-lenis-prevent
        className="mt-8 flex gap-6 overflow-x-auto pb-4 scrollbar-thin lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:pb-0"
      >
        {displayedItems.map((cert) => (
          <article
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="group flex w-[280px] shrink-0 cursor-pointer flex-col border border-border bg-white text-left transition-all duration-300 hover:border-primary hover:shadow-xl sm:w-[320px] lg:w-auto"
          >
            {/* Ảnh chứng chỉ: Chiếm 7 phần chiều cao (aspect-[7/10] hoặc chiều cao 70% card) */}
            <div className="relative aspect-[7/8] w-full overflow-hidden bg-slate-100">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 25vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />

              {/* Tag mã chứng chỉ góc trên: Nền xám mờ (bg-slate-700/60), chữ dịu */}
              <span className="absolute top-0 left-0 inline-flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 font-body text-[10px] font-semibold tracking-wider text-white/80 backdrop-blur-md">
                <ShieldCheck className="h-3 w-3 text-slate-300" aria-hidden="true" />
                {cert.code}
              </span>

              {/* Nhãn Nhấn để phóng to góc dưới: Nền xám mờ, opacity thấp, hover nét hơn */}
              <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 bg-slate-800/60 px-2.5 py-1 font-body text-[10px] font-medium tracking-wide text-white/75 backdrop-blur-md transition-all group-hover:bg-primary/80 group-hover:text-white">
                <ZoomIn className="h-3 w-3" aria-hidden="true" />
                {zoomHint}
              </span>
            </div>

            {/* Nội dung tiêu đề: Chiếm 3 phần chiều cao */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div>
                <span className="font-body text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">
                  VERIFIED ACCREDITATION
                </span>
                <h3 className="mt-1.5 font-heading text-base font-bold leading-snug text-ink transition-colors group-hover:text-primary sm:text-lg">
                  {cert.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 font-body text-xs leading-relaxed text-muted">
                  {cert.subtitle}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 4. Nút "Xem tất cả" mở sang trang riêng (/certifications): Nút màu tím VSICO, hover giảm opacity */}
      <div className="mt-12 flex justify-center border-t border-border/80 pt-8">
        <Link
          href="/certifications"
          className="inline-flex items-center gap-3 bg-primary px-8 py-3.5 font-body text-xs font-bold tracking-[0.22em] text-white uppercase shadow-sm transition-all duration-300 hover:opacity-85 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
        >
          <span>{viewAllLabel}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Dialog phóng to: Khung cực rộng (max-w-6xl / 95vw), tập trung hiển thị ảnh to rõ nét */}
      <Dialog
        open={Boolean(selectedCert)}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        {selectedCert && (
          <DialogContent
            closeAriaLabel={closeDialogLabel}
            className="w-[96vw] max-w-6xl rounded-none border border-white/20 bg-[#0B0A14] p-4 sm:p-7"
          >
            {/* Header thông tin ngắn gọn, nhường toàn bộ không gian cho ảnh */}
            <div className="flex flex-wrap items-center justify-between gap-3 pr-10 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="bg-slate-700/60 px-3 py-1 font-body text-xs font-semibold tracking-wider text-white/90">
                  {selectedCert.code}
                </span>
                <DialogTitle className="font-heading text-lg font-bold text-white sm:text-xl">
                  {selectedCert.title}
                </DialogTitle>
              </div>
              <DialogDescription className="font-body text-xs text-white/60">
                {selectedCert.subtitle}
              </DialogDescription>
            </div>

            {/* Khung ảnh to lớn, tràn rộng, hiển thị chi tiết tài liệu chuẩn */}
            <div className="relative mt-4 h-[75vh] min-h-[450px] w-full overflow-hidden border border-white/10 bg-black/60">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                sizes="95vw"
                priority
                className="object-contain p-2"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
