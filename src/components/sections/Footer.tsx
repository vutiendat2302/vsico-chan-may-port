import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { companyInfo } from "@/data/company";

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const navItems = [
    { href: "#berth-specs", label: tNav("berthSpecs") },
    { href: "#location", label: tNav("location") },
    { href: "#port-icd", label: tNav("portIcd") },
    { href: "#solutions", label: tNav("solutions") },
    { href: "#infrastructure", label: tNav("infrastructure") },
    { href: "#services", label: tNav("services") },
    { href: "#certifications", label: tNav("certifications") },
    { href: "#contact", label: tNav("contact") },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-gradient-to-r from-[#200839] via-[#3E116C] to-[#200839] py-16 font-body text-white shadow-[0_-12px_36px_rgba(32,8,57,0.5)]">
      {/* Hiệu ứng ánh sáng nền tím hoàng gia nhẹ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-highlight/10 blur-3xl"
      />

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Thương hiệu */}
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3">
              <Image
                src="/logos/vsico/tmp-logo-vsico-light.svg"
                alt="VSICO Hue Port"
                width={132}
                height={34}
                className="h-10 w-auto"
              />
              <span className="border-l border-white/20 pl-3 font-body text-[11px] font-bold tracking-[0.22em] text-highlight-light uppercase">
                {tNav("brandSubtitle")}
              </span>
            </a>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white/70">
              {tFooter("tagline")}
            </p>
          </div>

          {/* Điều hướng nhanh */}
          <div className="lg:col-span-4">
            <p className="font-body text-xs font-bold tracking-[0.2em] text-highlight-light uppercase">
              {tFooter("quickLinks")}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kênh truyền thông */}
          <div className="lg:col-span-3">
            <p className="font-body text-xs font-bold tracking-[0.2em] text-highlight-light uppercase">
              {tFooter("socialLinks")}
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-white/75">
              <li>
                <a
                  href={companyInfo.contact.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body transition-colors hover:text-highlight-light"
                >
                  {companyInfo.contact.websiteDisplay}
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body transition-colors hover:text-highlight-light"
                >
                  Facebook · VSICO
                </a>
              </li>
              <li>
                <span className="font-body text-white/75">
                  TikTok · {companyInfo.contact.tiktokHandle}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.contact.hotlineTel}`}
                  className="font-body transition-colors hover:text-highlight-light"
                >
                  {companyInfo.contact.hotlineDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 font-body text-xs text-white/50">
          {tFooter("copyright", { year: 2026 })}
        </div>
      </div>
    </footer>
  );
}
