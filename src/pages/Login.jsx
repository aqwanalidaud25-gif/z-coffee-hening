import { useState } from "react";
import { Coffee, ShieldCheck, ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import logo from "../assets/logo-Zcoffee-Hening-rb.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@zcoffee.id");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const success = login({ email, password });

    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Email atau password salah. Coba admin@zcoffee.id dan password123.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_35%),linear-gradient(135deg,_#f8f5ed_0%,_#f5f5f4_100%)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_25px_80px_-25px_rgba(41,37,36,0.35)]">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-stone-900 p-8 text-stone-50 md:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-3 py-2">
              <img src={logo} alt="Z Coffee Hening" className="h-12 w-auto md:h-16 object-contain" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Kelola kafe dengan tenang.</h1>
            <p className="mt-3 text-sm leading-6 text-stone-300">
              Pantau transaksi, stok, dan pelanggan dari satu dashboard yang bersih, profesional, dan mudah dipakai.
            </p>

            <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4">
              {[
                "Pantau penjualan real-time",
                "Terima notifikasi stok dan transaksi",
                "Akses dashboard dari desktop maupun mobile",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-stone-200">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-10">
            <p className="text-sm font-medium text-amber-600">Masuk ke dashboard</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">Selamat datang, Admin</h2>
            <p className="mt-2 text-sm text-stone-500">Masukkan kredensial Anda untuk melanjutkan.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none ring-0 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 pr-11 text-sm outline-none ring-0 focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error ? (
                <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk ke Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-stone-500">
              Demo login: admin@zcoffee.id / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
