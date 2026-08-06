// eslint-disable-next-line no-unused-vars
import React from "react";
import { LoaderCircle } from "lucide-react";

const VARIANTS = {
  primary: "bg-amber-600 text-white shadow-[0_20px_45px_-25px_rgba(217,119,6,0.5)] hover:bg-amber-700 disabled:opacity-70",
  secondary: "bg-white border border-stone-200 text-stone-700 shadow-sm hover:border-stone-300 hover:bg-stone-50 disabled:bg-stone-100",
  ghost: "bg-transparent text-stone-700 hover:bg-stone-100 disabled:text-stone-400",
  danger: "bg-rose-600 text-white shadow-sm hover:bg-rose-700 disabled:bg-rose-300",
};

export default function Button({ children, variant = "primary", loading = false, disabled = false, className = "", ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[1.5rem] px-4 py-2.5 text-sm font-semibold transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 ${VARIANTS[variant] || VARIANTS.primary} ${className}`;

  return (
    <button {...props} disabled={disabled || loading} className={classes}>
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
