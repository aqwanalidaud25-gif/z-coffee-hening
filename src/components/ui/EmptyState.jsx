export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-6 py-10 text-center">
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-500">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
