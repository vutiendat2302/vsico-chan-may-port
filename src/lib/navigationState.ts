/**
 * Quản lý trạng thái điều hướng nội bộ của ứng dụng VSICO Chan May Port.
 * - Khi người dùng tải lại trang (F5 / tải mới URL): Trạng thái bộ nhớ JS khởi tạo lại -> Coi là lượt tải trang mới (load trang chủ).
 * - Khi người dùng di chuyển giữa các trang qua Next.js Link / Router rồi quay lại trang chủ -> Coi là quay lại trang (isReturningNavigation = true).
 */

let isAppInitialized = false;

export function isReturningNavigation(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return isAppInitialized;
}

export function markAppInitialized(): void {
  if (typeof window !== "undefined") {
    isAppInitialized = true;
  }
}
