import { getTranslations } from "next-intl/server";
import { MapPin, Building, Phone, Globe } from "lucide-react";
import { companyInfo } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-surface py-20 text-ink lg:py-28"
    >
      <div className="relative container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Cột trái: Tiêu đề & Địa chỉ Cảng / Trụ sở */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                roman={t("roman")}
                eyebrow={t("eyebrow")}
                title={t("title")}
                summary={t("summary")}
              />

              <div className="mt-10 space-y-5">
                <div className="rounded-2xl border border-border bg-surface-subtle p-5 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ink">
                        {t("portAddressTitle")}
                      </h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                        {t("portAddressValue")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-surface-subtle p-5 shadow-sm">
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Building className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-ink">
                        {t("hqAddressTitle")}
                      </h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                        {t("hqAddressValue")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <a
                    href={`tel:${companyInfo.contact.hotlineTel}`}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface-subtle p-4 shadow-sm transition-colors hover:border-primary"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-label text-[10px] font-semibold tracking-widest text-muted uppercase">
                        {t("hotlineLabel")}
                      </p>
                      <p className="mt-0.5 font-body text-sm font-bold text-ink">
                        {companyInfo.contact.hotlineDisplay}
                      </p>
                    </div>
                  </a>

                  <a
                    href={companyInfo.contact.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface-subtle p-4 shadow-sm transition-colors hover:border-primary"
                  >
                    <Globe className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="font-label text-[10px] font-semibold tracking-widest text-muted uppercase">
                        {t("websiteLabel")}
                      </p>
                      <p className="mt-0.5 font-body text-sm font-bold text-ink">
                        {companyInfo.contact.websiteDisplay}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Cột phải: Form đăng ký nhận thông tin ưu tiên */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <ContactForm
                labels={{
                  name: t("form.name"),
                  namePlaceholder: t("form.namePlaceholder"),
                  company: t("form.company"),
                  companyPlaceholder: t("form.companyPlaceholder"),
                  role: t("form.role"),
                  roleShippingLine: t("form.roleShippingLine"),
                  roleCargoOwner: t("form.roleCargoOwner"),
                  roleForwarder: t("form.roleForwarder"),
                  email: t("form.email"),
                  emailPlaceholder: t("form.emailPlaceholder"),
                  phone: t("form.phone"),
                  phonePlaceholder: t("form.phonePlaceholder"),
                  message: t("form.message"),
                  messagePlaceholder: t("form.messagePlaceholder"),
                  submit: t("form.submit"),
                  submitting: t("form.submitting"),
                  successTitle: t("form.successTitle"),
                  successMessage: t("form.successMessage"),
                  resetButton: t("form.resetButton"),
                  errors: {
                    nameMin: t("form.errors.nameMin"),
                    companyMin: t("form.errors.companyMin"),
                    emailInvalid: t("form.errors.emailInvalid"),
                    phoneMin: t("form.errors.phoneMin"),
                  },
                }}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
