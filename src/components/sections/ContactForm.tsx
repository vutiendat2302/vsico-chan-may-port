"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";

type ContactFormLabels = {
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  role: string;
  roleShippingLine: string;
  roleCargoOwner: string;
  roleForwarder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  resetButton: string;
  errors: {
    nameMin: string;
    companyMin: string;
    emailInvalid: string;
    phoneMin: string;
  };
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

export function ContactForm({ labels }: ContactFormProps) {
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    company: string;
  } | null>(null);

  const schema = z.object({
    name: z.string().trim().min(2, labels.errors.nameMin),
    company: z.string().trim().min(2, labels.errors.companyMin),
    role: z.enum(["shippingLine", "cargoOwner", "forwarder"]),
    email: z.string().trim().email(labels.errors.emailInvalid),
    phone: z.string().trim().min(7, labels.errors.phoneMin),
    message: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      role: "shippingLine",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Giả lập gửi form (front-end only)
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedData({ name: data.name, company: data.company });
  };

  if (submittedData) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
          {labels.successTitle}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
          {labels.successMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSubmittedData(null);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 font-label text-xs font-semibold tracking-widest text-ink uppercase shadow-sm transition-colors hover:border-primary hover:text-primary"
        >
          {labels.resetButton}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-border bg-white p-7 text-ink shadow-sm sm:p-9"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-label text-xs font-bold tracking-wider text-ink/80 uppercase"
          >
            {labels.name} *
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder={labels.namePlaceholder}
            {...register("name")}
            className="mt-2 w-full rounded-xl border border-border bg-surface-subtle px-4 py-3 font-body text-sm text-ink transition-colors placeholder:text-muted-light focus:border-primary focus:bg-white focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1.5 font-body text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-company"
            className="block font-label text-xs font-bold tracking-wider text-ink/80 uppercase"
          >
            {labels.company} *
          </label>
          <input
            id="contact-company"
            type="text"
            placeholder={labels.companyPlaceholder}
            {...register("company")}
            className="mt-2 w-full rounded-xl border border-border bg-surface-subtle px-4 py-3 font-body text-sm text-ink transition-colors placeholder:text-muted-light focus:border-primary focus:bg-white focus:outline-none"
          />
          {errors.company && (
            <p className="mt-1.5 font-body text-xs text-red-500">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-role"
          className="block font-label text-xs font-bold tracking-wider text-ink/80 uppercase"
        >
          {labels.role} *
        </label>
        <select
          id="contact-role"
          {...register("role")}
          className="mt-2 w-full rounded-xl border border-border bg-surface-subtle px-4 py-3 font-body text-sm text-ink transition-colors focus:border-primary focus:bg-white focus:outline-none"
        >
          <option value="shippingLine">{labels.roleShippingLine}</option>
          <option value="cargoOwner">{labels.roleCargoOwner}</option>
          <option value="forwarder">{labels.roleForwarder}</option>
        </select>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-email"
            className="block font-label text-xs font-bold tracking-wider text-ink/80 uppercase"
          >
            {labels.email} *
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder={labels.emailPlaceholder}
            {...register("email")}
            className="mt-2 w-full rounded-xl border border-border bg-surface-subtle px-4 py-3 font-body text-sm text-ink transition-colors placeholder:text-muted-light focus:border-primary focus:bg-white focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1.5 font-body text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block font-label text-xs font-bold tracking-wider text-ink/80 uppercase"
          >
            {labels.phone} *
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder={labels.phonePlaceholder}
            {...register("phone")}
            className="mt-2 w-full rounded-xl border border-border bg-surface-subtle px-4 py-3 font-body text-sm text-ink transition-colors placeholder:text-muted-light focus:border-primary focus:bg-white focus:outline-none"
          />
          {errors.phone && (
            <p className="mt-1.5 font-body text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="block font-label text-xs font-bold tracking-wider text-ink/80 uppercase"
        >
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          rows={3}
          placeholder={labels.messagePlaceholder}
          {...register("message")}
          className="mt-2 w-full rounded-xl border border-border bg-surface-subtle px-4 py-3 font-body text-sm text-ink transition-colors placeholder:text-muted-light focus:border-primary focus:bg-white focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 font-label text-xs font-bold tracking-[0.18em] text-white uppercase shadow-md transition-all hover:bg-primary-light disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>{isSubmitting ? labels.submitting : labels.submit}</span>
      </button>
    </form>
  );
}
