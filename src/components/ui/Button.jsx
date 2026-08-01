// eslint-disable-next-line no-unused-vars
import React from "react";
import { LoaderCircle } from "lucide-react";

const VARIANTS = {
  primary: "bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-70",
  secondary: "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50",
  ghost: "bg-transparent text-stone-600 hover:bg-stone-100",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

export default function Button({ children, variant = "primary", loading = false, disabled = false, className = "", ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${VARIANTS[variant] || VARIANTS.primary} ${className}`;

  return (
    <button {...props} disabled={disabled || loading} className={classes}>
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
