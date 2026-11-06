import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { companyInfo } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";

export async function Contact() {
  const t = await getTranslations("contact");

  // Khối thông tin liên hệ phẳng, ngăn bằng đường kẻ mảnh 1px, không viền hộp
  const renderContactInfo = () => (
    <div className="border-t border-border/80 divide-y divide-border/60">
      <div className="py-4">
        <p className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
          {t("portAddressTitle")}
        </p>
        <p className="mt-1 font-body text-sm font-medium leading-relaxed text-ink">
          {t("portAddressValue")}
        </p>
      </div>

      <div className="py-4">
        <p className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
          {t("hqAddressTitle")}
        </p>
        <p className="mt-1 font-body text-sm font-medium leading-relaxed text-ink">
          {t("hqAddressValue")}
        </p>
      </div>

      <div className="py-4">
        <p className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
          {t("hotlineLabel")}
        </p>
        <a
          href={`tel:${companyInfo.contact.hotlineTel}`}
          className="mt-1 inline-block font-body text-sm font-bold text-ink transition-colors hover:text-primary"
        >
          {companyInfo.contact.hotlineDisplay}
        </a>
      </div>

      <div className="py-4">
        <p className="font-body text-[11px] font-bold tracking-wider text-muted uppercase">
          {t("websiteLabel")}
        </p>
        <a
          href={companyInfo.contact.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 font-body text-sm font-bold text-ink transition-colors hover:text-primary"
        >
          <span>vsico.com.vn</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface py-20 text-ink lg:py-28"
    >
      <div className="container relative">
        {/* DẢI ẢNH NGANG: Chiều cao nhỏ bằng 1/3 hiện tại (~180px), khép trang kiểu điện ảnh letterbox */}
        <Reveal scale={0.96} duration={1.1}>
          <div className="relative mb-12 w-full overflow-hidden rounded-[2px] border border-border/60 shadow-xs lg:mb-14">
            <div className="relative h-[120px] w-full sm:h-[150px] lg:h-[180px]">
              <Image
                src="/images/port/port-aerial-02.webp"
                alt={t("bannerAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="object-cover transition-transform duration-700 hover:scale-[1.01]"
                priority={false}
              />
            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* BỐ CỤC 2 CỘT: Trái ~40% (Tiêu đề + Thông tin), Phải ~60% (Form không khung) */}
        {/* Mobile: Tiêu đề -> Form -> Thông tin liên hệ                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* CỘT TRÁI (Desktop): Tiêu đề & Thông tin liên hệ (Dính sticky khi cuộn) */}
          <div className="hidden lg:col-span-5 lg:block lg:sticky lg:top-28 lg:self-start">
            <Reveal x={-25} duration={1}>
              <SectionHeading
                roman={t("roman")}
                eyebrow={t("eyebrow")}
                title={t("title")}
                summary={t("summary")}
              />

              <div className="mt-10">{renderContactInfo()}</div>
            </Reveal>
          </div>

          {/* TRÊN MOBILE (< lg): Tiêu đề và mô tả nằm trên cùng */}
          <div className="block lg:hidden">
            <Reveal>
              <SectionHeading
                roman={t("roman")}
                eyebrow={t("eyebrow")}
                title={t("title")}
                summary={t("summary")}
              />
            </Reveal>
          </div>

          {/* CỘT PHẢI: Form đăng ký nhận thông tin ưu tiên (Thuần túy, không khung bao) */}
          <div className="lg:col-span-7">
            <Reveal x={25} delay={0.12} duration={1}>
              <ContactForm
                labels={{
                  roleLegend: t("form.roleLegend"),
                  roles: {
                    shippingLine: {
                      label: t("form.roles.shippingLine.label"),
                      policyHint: t("form.roles.shippingLine.policyHint"),
                      companyLabel: t("form.roles.shippingLine.companyLabel"),
                      companyPlaceholder: t("form.roles.shippingLine.companyPlaceholder"),
                      messageLabel: t("form.roles.shippingLine.messageLabel"),
                      messagePlaceholder: t("form.roles.shippingLine.messagePlaceholder"),
                      submit: t("form.roles.shippingLine.submit"),
                    },
                    cargoOwner: {
                      label: t("form.roles.cargoOwner.label"),
                      policyHint: t("form.roles.cargoOwner.policyHint"),
                      companyLabel: t("form.roles.cargoOwner.companyLabel"),
                      companyPlaceholder: t("form.roles.cargoOwner.companyPlaceholder"),
                      messageLabel: t("form.roles.cargoOwner.messageLabel"),
                      messagePlaceholder: t("form.roles.cargoOwner.messagePlaceholder"),
                      submit: t("form.roles.cargoOwner.submit"),
                    },
                    forwarder: {
                      label: t("form.roles.forwarder.label"),
                      policyHint: t("form.roles.forwarder.policyHint"),
                      companyLabel: t("form.roles.forwarder.companyLabel"),
                      companyPlaceholder: t("form.roles.forwarder.companyPlaceholder"),
                      messageLabel: t("form.roles.forwarder.messageLabel"),
                      messagePlaceholder: t("form.roles.forwarder.messagePlaceholder"),
                      submit: t("form.roles.forwarder.submit"),
                    },
                  },
                  name: t("form.name"),
                  namePlaceholder: t("form.namePlaceholder"),
                  email: t("form.email"),
                  emailPlaceholder: t("form.emailPlaceholder"),
                  phone: t("form.phone"),
                  phonePlaceholder: t("form.phonePlaceholder"),
                  consentLabel: t("form.consentLabel"),
                  submitting: t("form.submitting"),
                  successTitle: t("form.successTitle"),
                  successMessage: t("form.successMessage"),
                  resetButton: t("form.resetButton"),
                  errorMessage: t("form.errorMessage"),
                  errors: {
                    nameMin: t("form.errors.nameMin"),
                    companyMin: t("form.errors.companyMin"),
                    emailInvalid: t("form.errors.emailInvalid"),
                    consentRequired: t("form.errors.consentRequired"),
                  },
                }}
                hotlineDisplay={companyInfo.contact.hotlineDisplay}
                hotlineTel={companyInfo.contact.hotlineTel}
              />
            </Reveal>

            {/* TRÊN MOBILE (< lg): Thông tin liên hệ đặt sau form (vì form là hành động chính) */}
            <div className="mt-14 block lg:hidden">
              <Reveal delay={0.15}>{renderContactInfo()}</Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
