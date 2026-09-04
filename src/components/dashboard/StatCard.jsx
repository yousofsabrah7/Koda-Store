import {
  ShoppingBag,
  Clock,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";

const StatCard = ({ title, value, subtitle, type, isDark }) => {
  const config = cardConfig[type] || cardConfig.orders;
  const Icon = config.icon;
  return (
    <div
      className={`border border-border-subtle bg-surface-card hover:border-border-strong relative overflow-hidden p-8 rounded-3xl flex flex-col justify-between gap-4 ${config.cardBg} ${config.border} hover:scale-98 transition duration-300 ease-linear shadow-xs`}
    >
      <div className="flex justify-between gap-4 w-full ">
        <div className={`absolute left-0 top-0 h-1 w-full ${config.iconBg}`} />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-text-secondary">{title}</p>
          <h2 className="text-3xl font-bold font-display tracking-tight text-text-primary">
            {value}
          </h2>
          <p className="text-sm font-mono text-text-muted">{subtitle}</p>
        </div>
        <Icon
          className={`${config.iconBg} size-14 p-2 rounded-xl shadow-lg hover:scale-90 hover:rotate-15 transition duration-300 ease-linear shrink-0`}
        />
      </div>
      <div className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-border-strong to-transparent" />
    </div>
  );
};

const cardConfig = {
  orders: {
    icon: ShoppingBag,
    iconBg: "bg-emerald-500 text-white",
    cardBg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  pending: {
    icon: Clock,
    iconBg: "bg-amber-500 text-white",
    cardBg: "bg-amber-500/5 dark:bg-amber-500/10",
    border: "border-amber-500/20",
  },
  revenue: {
    icon: DollarSign,
    iconBg: "bg-accent text-white",
    cardBg: "bg-accent/5 dark:bg-accent/10",
    border: "border-accent/20",
  },
  monthlySales: {
    icon: ShoppingCart,
    iconBg: "bg-sky-500 text-white",
    cardBg: "bg-sky-500/5 dark:bg-sky-500/10",
    border: "border-sky-500/20",
  },
  topProduct: {
    icon: Package,
    iconBg: "bg-gradient-to-tr from-accent to-amber-500 text-white",
    cardBg: "bg-accent/5 dark:bg-accent/10",
    border: "border-accent/20",
  },
  users: {
    icon: Users,
    iconBg: "bg-border-strong text-text-primary",
    cardBg: "bg-surface-elevated/40",
    border: "border-border-subtle",
  },
};

export default StatCard;
