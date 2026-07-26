import { LoaderCircle } from "lucide-react";

const variants = {
  primary: "bg-amber-600 text-white hover:bg-amber-700",
  secondary: "bg-stone-100 text-stone-700 hover:bg-stone-200",
  ghost: "bg-transparent text-stone-600 hover:bg-stone-100",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
