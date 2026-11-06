import { ArrowUpRight, MapPin } from "lucide-react";
import { type SupportedLocale } from "@/lib/formatters";

type PortMapProps = {
  locale: SupportedLocale;
  eyebrow: string;
  title: string;
  portName: string;
  address: string;
  openInMapsLabel: string;
  iframeTitle: string;
};

export function PortMap({
  locale,
  eyebrow,
  title,
  portName,
  address,
  openInMapsLabel,
  iframeTitle,
}: PortMapProps) {
  // Google Maps embed URL trực tiếp cho Công ty Cổ phần Cảng Chân Mây
  const embedUrl =
    locale === "en"
      ? "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1zQ0hBTiBNQVkgUE9SVCBKT0lOVCBTVE9DSyBDT01QQU5ZLSBDw7RuZyB0eSBD4buVIHBo4bqnbiBD4bqjbmcgQ2jDom4gTcOieQ!6i15!3m1!1sen!5m1!1sen"
      : "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1zQ0hBTiBNQVkgUE9SVCBKT0lOVCBTVE9DSyBDT01QQU5ZLSBDw7RuZyB0eSBD4buVIHBo4bqnbiBD4bqjbmcgQ2jDom4gTcOieQ!6i15!3m1!1svi!5m1!1svi";

  const directMapUrl =
    "https://www.google.com/maps/search/?api=1&query=CHAN+MAY+PORT+JOINT+STOCK+COMPANY-+C%C3%B4ng+ty+C%E1%BB%95+ph%E1%BA%A7n+C%E1%BA%A3ng+Ch%C3%A2n+M%C3%A2y";

  return (
    <div className="w-full">
      {/* Header thanh mảnh phía trên bản đồ */}
      <div className="mb-4 flex flex-col justify-between gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-body text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
            {eyebrow}
          </span>
          <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
            {title}
          </h3>
          <div className="mt-1.5 flex items-start gap-1.5 text-xs text-muted">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            <p className="font-body leading-relaxed">
              <span className="font-semibold text-ink">{portName}</span> · {address}
            </p>
          </div>
        </div>

        <a
          href={directMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[2px] border border-primary/40 bg-white px-3.5 py-2 font-body text-xs font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
        >
          <span>{openInMapsLabel}</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Khung nhúng Google Maps tương tác */}
      <div
        data-lenis-prevent
        className="relative h-[380px] w-full overflow-hidden rounded-[2px] border border-border/80 bg-slate-100 sm:h-[460px] lg:h-[520px]"
      >
        <iframe
          src={embedUrl}
          title={iframeTitle}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
