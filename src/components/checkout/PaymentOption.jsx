import { CreditCard } from "lucide-react";

function PaymentOption({ selected, onSelect, name, description }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={[
        "flex w-full items-center gap-3 rounded-xl border-[1.5px] px-4 py-3.5 text-left transition",
        "focus:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-light",
        selected
          ? "border-accent bg-accent-light"
          : "border-border-subtle bg-surface-card hover:border-accent",
      ].join(" ")}
    >
      <span
        className={[
          "grid h-8 w-8 flex-none place-items-center rounded-lg text-accent",
          selected
            ? "bg-surface-card"
            : "bg-accent-light",
        ].join(" ")}
      >
        <CreditCard className="h-4 w-4" />
      </span>

      <span>
        <span className="block text-[13.5px] font-semibold text-text-primary">
          {name}
        </span>

        <span className="mt-0.5 block text-xs text-text-secondary">
          {description}
        </span>
      </span>
    </button>
  );
}

export default PaymentOption;
