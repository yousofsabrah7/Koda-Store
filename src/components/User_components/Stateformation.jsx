import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stateformation = ({ label, value, icon }) => {
  return (
    <div
      className="
        group
        relative
        flex min-h-[116px]
        items-center justify-between
        overflow-hidden
        rounded-2xl
        border border-border-subtle
        bg-surface-card
        p-5
        transition-all duration-200
        hover:border-border-strong
        hover:-translate-y-0.5
        hover:shadow-lg
        hover:shadow-black/5
        dark:hover:shadow-black/20
      "
    >
      {/* Subtle accent decoration */}
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          size-24
          rounded-full
          bg-accent-light
          opacity-60
          blur-2xl
          transition-opacity duration-200
          group-hover:opacity-100
        "
      />

      {/* Content */}
      <div className="relative z-10 min-w-0">
        <p
          className="
            text-xs
            font-medium
            text-text-muted
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-2xl
            font-bold
            tracking-tight
            tabular-nums
            text-text-primary
            sm:text-3xl
          "
        >
          {Number(value).toLocaleString()}
        </p>
      </div>

      {/* Icon */}
      <div
        className="
          relative z-10
          flex size-11 shrink-0
          items-center justify-center
          rounded-xl
          border border-accent/20
          bg-accent-light
          text-accent
          transition-transform duration-200
          group-hover:scale-105
        "
      >
        <FontAwesomeIcon
          icon={icon}
          className="text-base"
        />
      </div>
    </div>
  );
};

export default Stateformation;