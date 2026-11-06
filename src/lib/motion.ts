/**
 * VSICO Hue Port - Centralized Motion Tokens
 * Chuẩn hóa toàn bộ thông số chuyển động cinematic cho toàn bộ hệ thống
 */

export const MOTION_TOKENS = {
  duration: {
    fast: 0.25,
    normal: 0.45,
    cinematic: 0.55,
    slow: 0.75,
  },
  ease: {
    out: "power3.out",
    cinematic: "power3.out",
    smooth: "power2.out",
    inOut: "power2.inOut",
  },
  distance: {
    sm: 10,
    md: 18,
    lg: 28,
  },
  blur: {
    none: "blur(0px)",
    sm: "blur(2px)",
    md: "blur(4px)",
    lg: "blur(6px)",
  },
  stagger: {
    fast: 0.04,
    normal: 0.06,
    cinematic: 0.08,
  },
  scrollTrigger: {
    start: "top 95%",
    // onEnter onLeave onEnterBack onLeaveBack
    // 1. onEnter: "restart" -> Cứ lướt xuống là kích hoạt lại hiệu ứng xuất hiện
    // 2. onLeave: "none" -> Tiếp tục lướt xuống dưới thì giữ nguyên trạng thái
    // 3. onEnterBack: "none" -> Lướt ngược lên trên thì KHÔNG chạy hiệu ứng (giữ nguyên tĩnh, không giật)
    // 4. onLeaveBack: "reset" -> Khi đã lướt vượt hẳn lên trên thì reset ngầm để lần lướt xuống tiếp theo lại chạy
    toggleActions: "restart none none reset",
    once: false,
  },
} as const;
