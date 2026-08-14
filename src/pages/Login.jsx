// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo-Zcoffee-Hening-rb.png";
import Button from "../components/ui/Button";
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
    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Masukkan email yang valid.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

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
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(166,109,35,0.12),_transparent_30%),linear-gradient(135deg,_#efebe3_0%,_#f6f0e8_100%)] px-4 py-10">
      <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[var(--shadow)]">
        <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-stone-950 p-8 text-stone-50 md:p-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-stone-700 bg-white/5 px-4 py-2.5">
              <img src={logo} alt="Z Coffee Hening" className="h-12 w-auto md:h-16 object-contain" />
              <div className="hidden md:block text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Z Coffee</p>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Hening</p>
              </div>
            </div>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white">Kelola kafe dengan lebih terkontrol.</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-stone-300">
              Pantau pemasukan, kelola stok, dan layani pelanggan dengan dashboard yang terasa premium dan siap dipakai.
            </p>

            <div className="mt-10 space-y-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              {[
                "Pantau penjualan real-time",
                "Notifikasi stok dan transaksi penting",
                "Layout responsif untuk desktop dan tablet",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-stone-200">
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

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email"
                    required
                    className="w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-300"
                  />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
                <div className="relative">
                  <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="Password"
                      required
                      className="w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 pr-12 text-sm text-stone-900 outline-none transition focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-300"
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
                <p id="login-error" role="alert" className="rounded-[1.25rem] border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">{error}</p>
              ) : null}

              <Button type="submit" loading={loading} className="w-full flex items-center justify-center rounded-[1.25rem]">
                {loading ? 'Memproses...' : (
                  <>
                    Masuk ke Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
