"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Check, AlertCircle, Info } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

export type RoleDetails = {
  label: string;
  policyHint: string;
  companyLabel: string;
  companyPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
};

export type ContactFormLabels = {
  roleLegend: string;
  roles: {
    shippingLine: RoleDetails;
    cargoOwner: RoleDetails;
    forwarder: RoleDetails;
  };
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  consentLabel: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  resetButton: string;
  errorMessage: string;
  errors: {
    nameMin: string;
    companyMin: string;
    emailInvalid: string;
    consentRequired: string;
  };
};

type ContactFormProps = {
  labels: ContactFormLabels;
  hotlineDisplay?: string;
  hotlineTel?: string;
};

export function ContactForm({ labels }: ContactFormProps) {
  const [selectedRole, setSelectedRole] = useState<
    "shippingLine" | "cargoOwner" | "forwarder"
  >("shippingLine");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentRoleData = labels.roles[selectedRole];

  const schema = z.object({
    name: z.string().trim().min(2, labels.errors.nameMin),
    company: z.string().trim().min(2, labels.errors.companyMin),
    email: z.string().trim().email(labels.errors.emailInvalid),
    phone: z.string().trim().optional(),
    message: z.string().trim().optional(),
    consent: z.boolean().refine((val) => val === true, {
      message: labels.errors.consentRequired,
    }),
    _gotcha: z.string().optional(),
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
      email: "",
      phone: "",
      message: "",
      consent: false,
      _gotcha: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Chống bot spam (Honeypot trap)
    if (data._gotcha) {
      return;
    }

    try {
      setSubmitError(null);
      // Giả lập gửi form client-side
      await new Promise((resolve) => setTimeout(resolve, 850));
      setIsSuccess(true);
    } catch {
      setSubmitError(labels.errorMessage);
    }
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmitError(null);
    setSelectedRole("shippingLine");
  };

  // Trạng thái Gửi thành công: Thay toàn bộ form bằng thông điệp trang trọng
  if (isSuccess) {
    return (
      <div
        aria-live="polite"
        className="flex min-h-[380px] flex-col justify-center py-6 text-left"
      >
        <div className="flex items-center gap-3 text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-primary text-white">
            <Check className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-body text-xs font-bold tracking-widest uppercase">
            YÊU CẦU ĐÃ ĐƯỢC TIẾP NHẬN
          </span>
        </div>

        <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-ink uppercase sm:text-3xl">
          {labels.successTitle}
        </h3>
        <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-muted">
          {labels.successMessage}
        </p>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-body text-xs font-bold tracking-widest text-ink uppercase outline-none transition-colors hover:border-primary hover:text-primary focus:outline-none"
          >
            <span>{labels.resetButton}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  const roleOptions: {
    value: "shippingLine" | "cargoOwner" | "forwarder";
    label: string;
  }[] = [
    { value: "shippingLine", label: labels.roles.shippingLine.label },
    { value: "cargoOwner", label: labels.roles.cargoOwner.label },
    { value: "forwarder", label: labels.roles.forwarder.label },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-0 text-ink"
    >
      {/* 1. CHỌN VAI TRÒ: 3 Lựa chọn chữ nằm ngang trên cùng form */}
      <div>
        <span
          id="role-group-label"
          className="block font-body text-[11px] font-bold tracking-wider text-muted uppercase"
        >
          {labels.roleLegend}
        </span>
        <div
          role="radiogroup"
          aria-labelledby="role-group-label"
          className="mt-3 flex flex-wrap items-center gap-6 border-b border-border/60 pb-3 sm:gap-8"
        >
          {roleOptions.map((opt) => {
            const isSelected = selectedRole === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedRole(opt.value)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setSelectedRole(opt.value);
                  }
                }}
                className={`relative pb-1.5 font-body text-sm transition-colors cursor-pointer select-none outline-none focus:outline-none ${
                  isSelected
                    ? "font-bold text-primary"
                    : "font-normal text-muted hover:text-ink"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="absolute inset-x-0 -bottom-3.5 h-[2px] bg-primary" />
                )}
              </button>
            );
          })}
        </div>

        {/* Thanh gợi ý chính sách ưu đãi riêng biệt theo vai trò */}
        <div className="mt-3 flex items-start gap-2.5 border-l-2 border-primary bg-surface-subtle/70 p-3 text-xs text-ink/80 transition-all duration-200">
          <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
          <p className="font-body text-xs leading-relaxed text-ink/85">
            {currentRoleData.policyHint}
          </p>
        </div>
      </div>

      {/* Ô ẩn chống spam bot (Honeypot) */}
      <input
        type="text"
        {...register("_gotcha")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* 2. CÁC Ô NHẬP LIỆU KIỂU GẠCH CHÂN (Tự động thay đổi linh hoạt theo vai trò) */}
      <div className="mt-8 space-y-7">
        {/* Hàng 1: Họ và tên * & Doanh nghiệp * (nhãn thay đổi theo Hãng tàu / Chủ hàng / Forwarder) */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-body text-[11px] font-bold tracking-wider text-muted uppercase"
            >
              {labels.name} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              disabled={isSubmitting}
              placeholder={labels.namePlaceholder}
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name")}
              className={`mt-1.5 w-full border-0 border-b bg-transparent px-0 py-2.5 font-body text-sm text-ink placeholder:text-muted/40 transition-colors focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0 ${
                errors.name
                  ? "border-b-2 border-red-500"
                  : "border-border hover:border-muted focus:border-primary"
              }`}
            />
            {errors.name && (
              <p className="mt-1 font-body text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-company"
              className="block font-body text-[11px] font-bold tracking-wider text-muted uppercase"
            >
              {currentRoleData.companyLabel} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-company"
              type="text"
              autoComplete="organization"
              disabled={isSubmitting}
              placeholder={currentRoleData.companyPlaceholder}
              aria-invalid={errors.company ? "true" : "false"}
              {...register("company")}
              className={`mt-1.5 w-full border-0 border-b bg-transparent px-0 py-2.5 font-body text-sm text-ink placeholder:text-muted/40 transition-colors focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0 ${
                errors.company
                  ? "border-b-2 border-red-500"
                  : "border-border hover:border-muted focus:border-primary"
              }`}
            />
            {errors.company && (
              <p className="mt-1 font-body text-xs text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        {/* Hàng 2: Email công việc * & Số điện thoại */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-email"
              className="block font-body text-[11px] font-bold tracking-wider text-muted uppercase"
            >
              {labels.email} <span className="text-primary">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              disabled={isSubmitting}
              placeholder={labels.emailPlaceholder}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
              className={`mt-1.5 w-full border-0 border-b bg-transparent px-0 py-2.5 font-body text-sm text-ink placeholder:text-muted/40 transition-colors focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0 ${
                errors.email
                  ? "border-b-2 border-red-500"
                  : "border-border hover:border-muted focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="mt-1 font-body text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="block font-body text-[11px] font-bold tracking-wider text-muted uppercase"
            >
              {labels.phone}
            </label>
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              disabled={isSubmitting}
              placeholder={labels.phonePlaceholder}
              {...register("phone")}
              className="mt-1.5 w-full border-0 border-b border-border bg-transparent px-0 py-2.5 font-body text-sm text-ink placeholder:text-muted/40 transition-colors hover:border-muted focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Hàng 3: Nhu cầu chuyên biệt (nhãn & placeholder thay đổi theo vai trò) */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-body text-[11px] font-bold tracking-wider text-muted uppercase"
          >
            {currentRoleData.messageLabel}
          </label>
          <input
            id="contact-message"
            type="text"
            disabled={isSubmitting}
            placeholder={currentRoleData.messagePlaceholder}
            {...register("message")}
            className="mt-1.5 w-full border-0 border-b border-border bg-transparent px-0 py-2.5 font-body text-sm text-ink placeholder:text-muted/40 transition-colors hover:border-muted focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0"
          />
        </div>

        {/* 3. Ô ĐỒNG Ý LIÊN HỆ & BẢO MẬT DỮ LIỆU */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              disabled={isSubmitting}
              {...register("consent")}
              className="mt-0.5 h-4 w-4 rounded-[2px] border-border text-primary accent-primary focus:ring-primary"
            />
            <span className="font-body text-xs text-muted leading-relaxed">
              {labels.consentLabel}
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 font-body text-xs text-red-500">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {/* Thông báo lỗi nếu gửi thất bại */}
      {submitError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-2.5 border-l-2 border-red-500 bg-red-50/50 p-3 text-xs text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{submitError}</p>
        </div>
      )}

      {/* 4. NÚT GỬI: Tím đặc, cao ~52px, chữ viết hoa thay đổi theo mục đích từng vai trò */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[2px] bg-primary px-8 font-body text-xs font-bold tracking-[0.18em] text-white uppercase shadow-sm outline-none transition-all duration-200 hover:opacity-90 hover:shadow-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Spinner size="xs" variant="white" />
              <span>{labels.submitting}</span>
            </>
          ) : (
            <>
              <span>{currentRoleData.submit}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
