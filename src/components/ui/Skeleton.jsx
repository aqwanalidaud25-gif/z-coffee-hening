export default function Skeleton({ type = "card", count = 3 }) {
  if (type === "table-row") {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="h-12 animate-pulse rounded-xl bg-stone-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-24 animate-pulse rounded-2xl border border-stone-200 bg-stone-100" />
      ))}
    </div>
  );
}
