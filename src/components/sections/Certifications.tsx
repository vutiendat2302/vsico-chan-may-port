import { getTranslations } from "next-intl/server";
import { Building2, Container } from "lucide-react";
import { certificateCategories, certificates } from "@/data/certificates";
import { groupCustomers, chanMayCustomers } from "@/data/customers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CertificateViewer, type CertificateDisplayItem } from "./CertificateViewer";

export async function Certifications() {
  const t = await getTranslations("certifications");
  const tCommon = await getTranslations("common");
  const isProd = process.env.NODE_ENV === "production";

  const categories = certificateCategories.map((id) => ({
    id,
    label: t(`tabs.${id}`),
  }));

  const certificateItems: CertificateDisplayItem[] = certificates
    .filter((item) => (isProd ? item.status === "confirmed" : true))
    .map((item) => ({
      id: item.id,
      categoryId: item.categoryId,
      code: item.code,
      title: t(item.titleKey),
      subtitle: t(item.subtitleKey),
      image: item.image,
    }));

  const visibleGroupCustomers = groupCustomers.filter((c) =>
    isProd ? c.status === "confirmed" : true,
  );
  const visibleChanMayCustomers = chanMayCustomers.filter((c) =>
    isProd ? c.status === "confirmed" : true,
  );

  return (
    <section
      id="certifications"
      className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            roman={t("roman")}
            eyebrow={t("eyebrow")}
            title={t("title")}
            summary={t("summary")}
          />
        </Reveal>

        {/* Bộ trình chiếu 4 nhóm chứng chỉ có phóng to */}
        <Reveal delay={0.08}>
          <div className="mt-12">
            <CertificateViewer
              categories={categories}
              items={certificateItems}
              zoomHint={t("zoomHint")}
              closeDialogLabel={t("closeDialog")}
            />
          </div>
        </Reveal>

        {/* Tường khách hàng tiêu biểu & Khách hàng container khu vực Chân Mây */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-3xl border border-border bg-surface-subtle p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {t("customersHeading")}
                </h3>
              </div>
              <span className="rounded-full border border-highlight/40 bg-highlight/10 px-3.5 py-1 font-label text-[10px] font-bold tracking-widest text-highlight uppercase">
                {tCommon("pendingBadge")}
              </span>
            </div>

            <p className="mt-3 font-body text-xs text-muted">
              {t("logoPermissionPendingNote")}
            </p>

            {visibleGroupCustomers.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {visibleGroupCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-3.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-label text-[9px] font-semibold tracking-wider text-muted uppercase">
                        {t(`sectors.${customer.sectorKey}`)}
                      </span>
                      {customer.status === "pending" && (
                        <span className="rounded bg-highlight/15 px-1.5 py-0.5 font-label text-[8px] font-bold text-highlight uppercase">
                          PENDING
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-heading text-sm font-bold text-ink">
                      {customer.name}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Khách hàng container khu vực Chân Mây */}
            <div className="mt-10 border-t border-border pt-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Container className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="font-heading text-xl font-bold text-ink">
                  {t("chanMayCustomersHeading")}
                </h4>
              </div>

              {visibleChanMayCustomers.length > 0 && (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleChanMayCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-xs"
                    >
                      <span className="font-body text-xs font-bold text-ink">
                        {customer.name}
                      </span>
                      {customer.status === "pending" && (
                        <span className="shrink-0 rounded bg-highlight/15 px-2 py-0.5 font-label text-[9px] font-bold text-highlight uppercase">
                          PENDING
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
