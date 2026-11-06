/**
 * VSICO Hue Port - Centralized Motion Tokens
 * Chuẩn hóa toàn bộ thông số chuyển động cinematic cho toàn bộ hệ thống
 */

export const MOTION_TOKENS = {
  duration: {
    fast: 0.45,
    normal: 0.85,
    cinematic: 0.95,
    slow: 1.25,
  },
  ease: {
    out: "power3.out",
    cinematic: "power3.out",
    smooth: "power2.out",
    inOut: "power2.inOut",
  },
  distance: {
    sm: 20,
    md: 35,
    lg: 45,
  },
  blur: {
    none: "blur(0px)",
    sm: "blur(6px)",
    md: "blur(10px)",
    lg: "blur(12px)",
  },
  stagger: {
    fast: 0.06,
    normal: 0.1,
    cinematic: 0.14,
  },
  scrollTrigger: {
    start: "top 90%",
    // onEnter onLeave onEnterBack onLeaveBack
    // 1. onEnter: "restart" -> Cứ lướt xuống là kích hoạt lại hiệu ứng xuất hiện
    // 2. onLeave: "none" -> Tiếp tục lướt xuống dưới thì giữ nguyên trạng thái
    // 3. onEnterBack: "none" -> Lướt ngược lên trên thì KHÔNG chạy hiệu ứng (giữ nguyên tĩnh, không giật)
    // 4. onLeaveBack: "reset" -> Khi đã lướt vượt hẳn lên trên thì reset ngầm để lần lướt xuống tiếp theo lại chạy
    toggleActions: "restart none none reset",
    once: false,
  },
} as const;
