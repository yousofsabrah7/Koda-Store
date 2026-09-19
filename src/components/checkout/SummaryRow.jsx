function SummaryRow({ label, value, total }) {
  return (
    <div
      className={
        total
          ? "mt-3 flex justify-between border-t border-slate-200 pt-3 text-sm font-bold text-slate-800"
          : "mb-2 flex justify-between text-[13px] text-slate-600"
      }
    >
      <span>{label}</span>
      <span className={total ? "text-indigo-600" : ""}>{value}</span>
    </div>
  );
}

export default SummaryRow;