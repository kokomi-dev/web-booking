import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Xin lỗi, trang này hiện đang không thể truy cập
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/home"
              className="rounded-md bg-blue_sub px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue_active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay lại
            </Link>
            <Link
              href="tel:0961326123"
              className="text-sm font-semibold text-gray-900"
            >
              Liên hệ hỗ trợ <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
