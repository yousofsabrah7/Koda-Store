function SummaryRow({ label, value, total }) {
  return (
    <div
      className={
        total
          ? "mt-3 flex justify-between border-t border-border-subtle pt-3 text-sm font-bold text-text-primary"
          : "mb-2 flex justify-between text-[13px] text-text-secondary"
      }
    >
      <span>{label}</span>

      <span className={total ? "text-accent" : "text-text-primary"}>
        {value}
      </span>
    </div>
  );
}

export default SummaryRow;
