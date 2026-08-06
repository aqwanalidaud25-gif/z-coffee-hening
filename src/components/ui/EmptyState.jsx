export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 px-8 py-10 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
