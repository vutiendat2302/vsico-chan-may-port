import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowLeft, Anchor, Cpu, Users, Calendar, ArrowRight } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type InfraPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: InfraPageProps) {
  const { locale } = await params;
  const isVi = locale === "vi";
  return {
    title: isVi
      ? "Chi tiết Hạ tầng & Năng lực Cảng biển | Cảng VSICO Chân Mây Huế"
      : "Infrastructure & Port Capability Details | VSICO Chan May Port Hue",
    description: isVi
      ? "Hồ sơ kỹ thuật chi tiết 540 m cầu bến, 20,4 ha diện tích, hệ thống 5 cẩu bờ STS Weihua 45t-45m, đội ngũ 250 nhân sự và lộ trình đầu tư mở rộng."
      : "Detailed technical specifications of 540 m quay, 20.4 ha port area, 5 Weihua 45t-45m STS cranes, 250 personnel, and investment roadmap.",
  };
}

export default async function InfrastructurePage({ params }: InfraPageProps) {
  const { locale } = await params;
  const validLocale: AppLocale = routing.locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : routing.defaultLocale;

  setRequestLocale(validLocale);
  const isVi = validLocale === "vi";

  return (
    <div className="min-h-screen bg-surface text-ink">
      <Header locale={validLocale} />

      <main className="pt-28 pb-24 lg:pt-36 lg:pb-32">
        <div className="container">
          {/* Breadcrumb / Quay lại Section V Hạ tầng trên trang chủ */}
          <a
            href={`/${validLocale}#infrastructure`}
            className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isVi ? "Quay lại trang chủ" : "Back to Home"}</span>
          </a>

          {/* Tiêu đề trang phong cách Spyker Editorial sang trọng */}
          <div className="mt-8 max-w-4xl border-b border-border pb-10">
            <span className="font-body text-xs font-bold tracking-[0.24em] text-primary uppercase">
              {isVi
                ? "V · CHI TIẾT HẠ TẦNG & NĂNG LỰC KHAI THÁC"
                : "V · DETAILED INFRASTRUCTURE & CAPACITY"}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {isVi
                ? "Hạ tầng cảng nước sâu & Năng lực vận hành chuẩn quốc tế"
                : "Deep-Water Port Infrastructure & World-Class Operations"}
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-muted sm:text-lg">
              {isVi
                ? "Hồ sơ năng lực chi tiết về quy hoạch 20,4 ha mặt bằng, 540 m cầu bến nước sâu -14 m, dây chuyền 5 cẩu bờ STS Weihua 45t-45m, 250 nhân sự chuyên trách và lộ trình vận hành đồng bộ cùng ICD Lao Bảo."
                : "Comprehensive specifications covering the 20.4-hectare master plan, 540 m deep-water quay with -14 m draft, 5 Weihua 45t-45m STS cranes, 250 dedicated personnel, and synchronized roadmap with Lao Bao ICD."}
            </p>
          </div>

          {/* MENU ĐIỀU HƯỚNG NHANH CÁC PHẦN */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-b border-border pb-6 sm:gap-6">
            <a
              href="#berths"
              className="font-body text-xs font-bold tracking-wider text-muted uppercase transition-colors hover:text-primary"
            >
              01. {isVi ? "Cầu bến & Mặt bằng" : "Berths & Quay"}
            </a>
            <span className="text-border">/</span>
            <a
              href="#equipment"
              className="font-body text-xs font-bold tracking-wider text-muted uppercase transition-colors hover:text-primary"
            >
              02. {isVi ? "Thiết bị xếp dỡ" : "Equipment"}
            </a>
            <span className="text-border">/</span>
            <a
              href="#workforce"
              className="font-body text-xs font-bold tracking-wider text-muted uppercase transition-colors hover:text-primary"
            >
              03. {isVi ? "Nhân sự & Vận hành" : "Workforce"}
            </a>
            <span className="text-border">/</span>
            <a
              href="#roadmap"
              className="font-body text-xs font-bold tracking-wider text-muted uppercase transition-colors hover:text-primary"
            >
              04. {isVi ? "Lộ trình khai thác" : "Roadmap"}
            </a>
          </div>

          {/* NỘI DUNG CHI TIẾT 4 PHẦN CHÍNH */}
          <div className="mt-14 space-y-24 sm:space-y-32">
            {/* MỤC 1: CẦU BẾN & MẶT BẰNG (#berths) */}
            <section id="berths" className="scroll-mt-28">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-primary font-body text-xs font-bold tracking-[0.2em] uppercase">
                    <Anchor className="h-4 w-4" />
                    <span>01. {isVi ? "HẠ TẦNG CẦU BẾN" : "BERTH SPECIFICATIONS"}</span>
                  </div>
                  <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {isVi
                      ? "Cầu bến liên tục 540 m & Mớn nước tự nhiên −14 m"
                      : "540 m Continuous Quay & Natural −14 m Draft"}
                  </h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {isVi
                      ? "Cảng VSICO Chân Mây Huế gồm 2 bến cảng liền kề (Bến số 4 và Bến số 5) có tổng chiều dài 540 mét, độ sâu trước bến đạt -14 mét mớn nước tự nhiên, không phụ thuộc vào thủy triều, cho phép tiếp nhận an toàn các thế hệ tàu biển trọng tải lớn nhất đang khai thác trong khu vực."
                      : "VSICO Chan May Port comprises two contiguous berths (Berth 4 and Berth 5) spanning 540 meters with a natural -14 m draft unaffected by tides, enabling safe berthing for the largest generation of regional vessels."}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Tổng diện tích cảng" : "Total port area"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        20,4 ha
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Chiều dài cầu bến" : "Quay length"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        540 m
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Mớn nước trước bến" : "Berth draft"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        −14 m
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Cỡ tàu tiếp nhận" : "Vessel capacity"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        4.000 TEU / 70.000 DWT
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border bg-ink shadow-md">
                    <Image
                      src="/images/port/tmp-port-layout-01.webp"
                      alt={isVi ? "Sơ đồ quy hoạch tổng thể 20,4 ha" : "Masterplan layout"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* MỤC 2: THIẾT BỊ XẾP DỠ (#equipment) */}
            <section id="equipment" className="scroll-mt-28 border-t border-border pt-16 sm:pt-20">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border bg-ink shadow-md">
                    <Image
                      src="/images/port/tmp-port-crane-01.webp"
                      alt={isVi ? "Hệ thống cẩu bờ STS Weihua 45t-45m" : "Weihua STS cranes"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-5">
                  <div className="flex items-center gap-2 text-primary font-body text-xs font-bold tracking-[0.2em] uppercase">
                    <Cpu className="h-4 w-4" />
                    <span>02. {isVi ? "THIẾT BỊ XẾP DỠ" : "EQUIPMENT SYSTEMS"}</span>
                  </div>
                  <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {isVi
                      ? "5 cẩu bờ STS Weihua 45t-45m & Băng tải hàng rời kín"
                      : "5 Weihua 45t-45m STS Cranes & Enclosed Conveyor"}
                  </h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {isVi
                      ? "Tiền phương cầu cảng được trang bị đồng bộ 5 cẩu bờ STS Weihua hiện đại với sức nâng 45 tấn và tầm với 45 mét, tối ưu cho cả tàu container và hàng tổng hợp. Kết hợp băng tải kín bảo vệ môi trường, xe nâng reach stacker, xe đầu kéo nội bãi giúp giải phóng tàu nhanh chóng và an toàn."
                      : "The quayside is equipped with 5 state-of-the-art Weihua STS cranes featuring 45-ton lift capacity and 45-meter outreach, combined with enclosed bulk conveyors and reach stackers for rapid vessel turnaround."}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Số lượng cẩu STS" : "STS Crane Count"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        5 {isVi ? "cẩu bờ" : "cranes"}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Sức nâng / Tầm với" : "Capacity / Outreach"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        45t − 45m
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Năng suất Giai đoạn 1" : "Phase 1 Productivity"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        40–45 {isVi ? "moves/giờ" : "moves/hr"}
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-xs text-muted uppercase">
                        {isVi ? "Năng suất Giai đoạn 2" : "Phase 2 Productivity"}
                      </p>
                      <p className="mt-1 font-body text-xl font-extrabold text-ink sm:text-2xl">
                        80–85 {isVi ? "moves/giờ" : "moves/hr"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MỤC 3: NHÂN SỰ CHUYÊN NGHIỆP (#workforce) */}
            <section id="workforce" className="scroll-mt-28 border-t border-border pt-16 sm:pt-20">
              <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-primary font-body text-xs font-bold tracking-[0.2em] uppercase">
                    <Users className="h-4 w-4" />
                    <span>03. {isVi ? "ĐỘI NGŨ NHÂN SỰ" : "ON-PORT WORKFORCE"}</span>
                  </div>
                  <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {isVi
                      ? "250 nhân sự chuyên trách giàu kinh nghiệm cảng biển"
                      : "250 Dedicated & Certified Maritime Specialists"}
                  </h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted sm:text-base">
                    {isVi
                      ? "Cảng quy tụ 250 cán bộ nhân viên chuyên môn cao, được đào tạo theo chuẩn quốc tế và vận hành thông suốt qua 4 khối phòng ban chức năng, đảm bảo công tác điều độ, bảo dưỡng kỹ thuật và an toàn bốc dỡ 24/7."
                      : "The port brings together 250 highly skilled specialists trained to international maritime standards across four dedicated operational divisions, guaranteeing 24/7 safe stevedoring and vessel dispatch."}
                  </p>

                  <div className="mt-8 space-y-3 border-t border-border pt-6">
                    {[
                      isVi ? "01. Khối Quản lý & Điều hành chiến lược" : "01. Port Executive & Strategic Management",
                      isVi ? "02. Khối Điều độ cảng biển & Kế hoạch cầu bến" : "02. Maritime Dispatch & Berth Planning",
                      isVi ? "03. Khối Kỹ thuật & Bảo dưỡng cơ giới Weihua" : "03. Mechanical & Equipment Engineering",
                      isVi ? "04. Khối Khai thác hiện trường & An toàn lao động" : "04. Yard Operations & HSE Safety",
                    ].map((dept) => (
                      <div
                        key={dept}
                        className="border border-border bg-white px-4 py-3 font-body text-xs font-bold text-ink sm:text-sm"
                      >
                        {dept}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none border border-border bg-ink shadow-md">
                    <Image
                      src="/images/people/tmp-port-staff-01.webp"
                      alt={isVi ? "Đội ngũ nhân sự Cảng VSICO Huế" : "Operational staff"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* MỤC 4: LỘ TRÌNH ĐẦU TƯ (#roadmap) */}
            <section id="roadmap" className="scroll-mt-28 border-t border-border pt-16 sm:pt-20">
              <div className="flex items-center gap-2 text-primary font-body text-xs font-bold tracking-[0.2em] uppercase">
                <Calendar className="h-4 w-4" />
                <span>04. {isVi ? "LỘ TRÌNH PHÁT TRIỂN CHI TIẾT" : "STRATEGIC ROADMAP"}</span>
              </div>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {isVi
                  ? "Tiến độ hoàn thiện các bến cảng & ICD vệ tinh"
                  : "Commissioning Schedule for Berths & Satellite ICD"}
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="border border-border bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-bold text-emerald-700 uppercase">
                      08/2026 · Mốc 01
                    </span>
                    <span className="border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-body text-[10px] font-bold text-emerald-800 uppercase">
                      {isVi ? "Đã vận hành" : "Operating"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                    {isVi ? "VSICO Huế Bến 4 đi vào hoạt động" : "VSICO Hue Berth 4 Enters Operation"}
                  </h3>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-body text-2xl font-extrabold text-ink">120.000 TEU</p>
                    <p className="mt-0.5 font-body text-xs text-muted">{isVi ? "Sản lượng container mục tiêu Giai đoạn 1" : "Target container throughput"}</p>
                    <p className="mt-3 font-body text-lg font-bold text-primary">40–45 moves/giờ</p>
                    <p className="mt-0.5 font-body text-xs text-muted">{isVi ? "Năng suất giải phóng tàu nhanh" : "Fast vessel turnaround productivity"}</p>
                  </div>
                </div>

                <div className="border border-primary/40 bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-bold text-primary uppercase">
                      09/2027 · Mốc 02
                    </span>
                    <span className="border border-primary/25 bg-primary/10 px-2 py-0.5 font-body text-[10px] font-bold text-primary uppercase">
                      {isVi ? "Sắp tới" : "Upcoming"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                    {isVi ? "VSICO Huế Bến 5 đi vào hoạt động" : "VSICO Hue Berth 5 Enters Operation"}
                  </h3>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-body text-2xl font-extrabold text-primary">80–85 moves/giờ</p>
                    <p className="mt-0.5 font-body text-xs text-muted">{isVi ? "Nhân đôi năng suất bốc dỡ toàn cảng" : "Doubled stevedoring productivity"}</p>
                    <p className="mt-3 font-body text-lg font-bold text-ink">540 m cầu bến</p>
                    <p className="mt-0.5 font-body text-xs text-muted">{isVi ? "Chiều dài bến liên tục Bến 4 & 5" : "Continuous quay length 540 m"}</p>
                  </div>
                </div>

                <div className="border border-border bg-white p-7 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs font-bold text-amber-700 uppercase">
                      09/2027 · Mốc 03
                    </span>
                    <span className="border border-amber-300 bg-amber-50 px-2 py-0.5 font-body text-[10px] font-bold text-amber-800 uppercase">
                      {isVi ? "Sắp tới" : "Upcoming"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-bold text-ink">
                    {isVi ? "ICD Lao Bảo đi vào hoạt động" : "ICD Lao Bao Enters Operation"}
                  </h3>
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-body text-2xl font-extrabold text-ink">86.000 m²</p>
                    <p className="mt-0.5 font-body text-xs text-muted">{isVi ? "Quy mô trung tâm logistics cửa khẩu" : "Border gate logistics hub area"}</p>
                    <p className="mt-3 font-body text-lg font-bold text-amber-700">≈150 km hành lang</p>
                    <p className="mt-0.5 font-body text-xs text-muted">{isVi ? "Tuyến khép kín nối thẳng cầu bến" : "Closed corridor to seaport"}</p>
                  </div>
                </div>
              </div>

              {/* Nút quay lại trang chủ cuối trang */}
              <div className="mt-12 text-center">
                <a
                  href={`/${validLocale}#infrastructure`}
                  className="inline-flex items-center gap-2 border border-primary bg-primary px-7 py-3.5 font-body text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-primary-dark"
                >
                  <span>{isVi ? "Khám phá các phần khác trên trang chủ" : "Explore other sections on Homepage"}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
