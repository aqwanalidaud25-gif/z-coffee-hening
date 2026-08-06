import React from "react";

export default function PageHeader({ title, subtitle, description, status, actions }) {
  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white px-6 py-6 shadow-xl shadow-stone-200/10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {status ? (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-amber-700">
                {status}
              </span>
            ) : null}
            {subtitle ? (
              <p className="text-sm font-medium text-amber-600">{subtitle}</p>
            ) : null}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{title}</h1>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-stone-600">{description}</p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-end">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
