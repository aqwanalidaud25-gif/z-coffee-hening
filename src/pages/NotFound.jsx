import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-stone-900">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Route yang Anda cari tidak tersedia. Kembali ke dashboard untuk melanjutkan.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/">
            <Button variant="primary">Kembali ke dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
