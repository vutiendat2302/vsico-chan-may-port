"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ShieldCheck } from "lucide-react";
import type { CertificateCategoryId } from "@/data/certificates";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";

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
};

export function CertificateViewer({
  categories,
  items,
  zoomHint,
  closeDialogLabel,
}: CertificateViewerProps) {
  const [selectedCert, setSelectedCert] = useState<CertificateDisplayItem | null>(null);

  return (
    <div>
      <Tabs defaultValue="iso">
        <TabsList aria-label="Certificate categories">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => {
          const categoryItems = items.filter((item) => item.categoryId === cat.id);
          return (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryItems.map((cert) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface text-left shadow-sm transition-all hover:border-primary/45 hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 font-label text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                        <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                        {cert.code}
                      </span>
                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-ink/80 px-3 py-1 font-label text-[10px] font-semibold tracking-wider text-white uppercase transition-colors group-hover:border-highlight-light group-hover:text-highlight-light">
                        <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                        {zoomHint}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="font-heading text-lg font-bold text-ink group-hover:text-primary">
                          {cert.title}
                        </h3>
                        <p className="mt-1 font-body text-xs leading-relaxed text-muted">
                          {cert.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <Dialog
        open={Boolean(selectedCert)}
        onOpenChange={(open) => {
          if (!open) setSelectedCert(null);
        }}
      >
        {selectedCert && (
          <DialogContent closeAriaLabel={closeDialogLabel}>
            <div className="pr-10">
              <span className="inline-block rounded-full bg-primary px-3 py-1 font-label text-[10px] font-bold tracking-widest text-white uppercase">
                {selectedCert.code}
              </span>
              <DialogTitle className="mt-2 font-heading text-2xl font-bold text-white">
                {selectedCert.title}
              </DialogTitle>
              <DialogDescription className="mt-1 font-body text-sm text-white/75">
                {selectedCert.subtitle}
              </DialogDescription>
            </div>

            <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-ink">
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
