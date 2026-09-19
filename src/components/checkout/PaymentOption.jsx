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
        "focus:outline-none focus-visible:ring-[3px] focus-visible:ring-indigo-500/25",
        selected
          ? "border-indigo-500 bg-indigo-50"
          : "border-slate-200 bg-white hover:border-indigo-400",
      ].join(" ")}
    >
      <span
        className={[
          "grid h-8 w-8 flex-none place-items-center rounded-lg text-indigo-600",
          selected ? "bg-white" : "bg-indigo-50",
        ].join(" ")}
      >
        <CreditCard className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-[13.5px] font-semibold text-slate-800">
          {name}
        </span>
        <span className="mt-0.5 block text-xs text-slate-500">
          {description}
        </span>
      </span>
    </button>
  );
}

export default PaymentOption;