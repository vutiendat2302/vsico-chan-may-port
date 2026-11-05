import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="vi">
      <body className="flex min-h-screen items-center justify-center bg-surface font-body text-ink">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-muted">Trang không tồn tại / Page not found</p>
          <Link
            href="/vi"
            className="mt-4 inline-block font-semibold text-primary underline"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </body>
    </html>
  );
}
