import {
  ChevronDown,
  LayoutDashboard,
  Monitor,
  Moon,
  PanelLeft,
  Sun,
  User,
} from "lucide-react";

export const SettingsSection = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card">
      <div className="flex items-start gap-4 border-b border-border-subtle p-5 md:p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
          <Icon size={18} />
        </div>

        <div>
          <h3 className="text-base font-bold text-text-primary">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 md:p-6">{children}</div>
    </section>
  );
};

export const SettingRow = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text-primary">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-text-muted">
          {description}
        </p>
      </div>

      <div className="shrink-0">{children}</div>
    </div>
  );
};

export const ThemeSelector = ({
  value,
  onChange,
}) => {
  const themes = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isActive = value === theme.value;

        return (
          <button
            key={theme.value}
            type="button"
            onClick={() => onChange(theme.value)}
            className={`
              flex min-w-20 flex-col items-center gap-2 rounded-xl border
              px-3 py-3 text-xs font-medium transition-all duration-200
              ${
                isActive
                  ? "border-accent bg-accent-light text-accent"
                  : "border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong hover:bg-surface-elevated"
              }
            `}
          >
            <Icon size={17} />

            <span>{theme.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export const Toggle = ({
  checked,
  onChange,
  label = "Toggle",
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`
        relative flex h-6 w-11 shrink-0 items-center rounded-full
        p-1 transition-colors duration-200
        ${checked ? "bg-accent" : "bg-surface-elevated"}
        border border-border-subtle
      `}
    >
      <span
        className={`
          size-4 rounded-full bg-white shadow-sm transition-transform duration-200
          ${checked ? "translate-x-5" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export const SelectSetting = ({
  value,
  onChange,
  options = [],
  ariaLabel,
}) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="
          h-11 min-w-32 appearance-none rounded-xl border
          border-border-subtle bg-surface-card px-4 pr-9
          text-sm text-text-primary outline-none transition
          hover:border-border-strong
          focus:border-accent focus:ring-1 focus:ring-accent
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
      />
    </div>
  );
};

export const DashboardPreview = ({
  theme,
  sidebarCollapsed,
}) => {
  const isDark = theme === "dark";

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border-subtle bg-surface-base lg:block">
      <div className="border-b border-border-subtle px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[1px] text-text-muted">
          Preview
        </p>
      </div>

      <div className="flex h-48">
        <div
          className={`
            flex shrink-0 flex-col border-r border-border-subtle
            bg-surface-card p-3 transition-all duration-200
            ${sidebarCollapsed ? "w-14" : "w-36"}
          `}
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-accent-light text-accent">
            <LayoutDashboard size={14} />
          </div>

          {!sidebarCollapsed && (
            <div className="mt-5 space-y-2">
              <div className="h-2 w-20 rounded bg-surface-elevated" />
              <div className="h-2 w-16 rounded bg-surface-elevated" />
              <div className="h-2 w-24 rounded bg-surface-elevated" />
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-surface-elevated" />

            <div className="flex size-7 items-center justify-center rounded-lg bg-accent-light text-accent">
              <PanelLeft size={13} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 rounded-xl border border-border-subtle bg-surface-card p-2"
              >
                <div className="h-2 w-10 rounded bg-surface-elevated" />
                <div className="mt-3 h-3 w-12 rounded bg-surface-elevated" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminProfileCard = ({
  profile,
  isLoading,
}) => {
  const username =
    profile?.username ||
    profile?.user?.username ||
    "Unknown user";

  const email =
    profile?.email ||
    profile?.user?.email ||
    "Email unavailable";

  const role =
    profile?.role ||
    profile?.user?.role ||
    "Admin";

  const avatar =
    profile?.avatar ||
    profile?.user?.avatar;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-base p-4 sm:flex-row sm:items-center">
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent-light text-accent">
        {avatar ? (
          <img
            src={avatar}
            alt={username}
            className="h-full w-full object-cover"
          />
        ) : (
          <User size={20} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        {isLoading ? (
          <>
            <div className="h-3 w-32 animate-pulse rounded bg-surface-elevated" />
            <div className="mt-2 h-2.5 w-48 animate-pulse rounded bg-surface-elevated" />
          </>
        ) : (
          <>
            <p className="truncate text-sm font-semibold text-text-primary">
              {username}
            </p>

            <p className="mt-1 truncate text-xs text-text-muted">
              {email}
            </p>
          </>
        )}
      </div>

      {!isLoading && (
        <span className="rounded-full border border-accent/20 bg-accent-light px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
          {role}
        </span>
      )}
    </div>
  );
};