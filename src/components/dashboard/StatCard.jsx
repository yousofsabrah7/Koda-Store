import {
  ShoppingBag,
  Clock,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";
const cardConfig = {
  orders: {
    icon: ShoppingBag,
    iconBg: "bg-emerald-400/50 text-white",
    cardBg: "bg-emerald-400/5 dark:bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  pending: {
    icon: Clock,
    iconBg: "bg-amber-400/50  text-white",
    cardBg: "bg-amber-400/5 dark:bg-amber-400/10",
    border: "border-amber-400/20",
  },
  revenue: {
    icon: DollarSign,
    iconBg: "bg-accent/50 text-white",
    cardBg: "bg-accent/5 dark:bg-accent/10",
    border: "border-accent/20",
  },
  monthlySales: {
    icon: ShoppingCart,
    iconBg: "bg-sky-400/50  text-white",
    cardBg: "bg-sky-400/5 dark:bg-sky-400/10",
    border: "border-sky-400/20",
  },
  topProduct: {
    icon: Package,
    iconBg: "bg-gradient-to-tr from-accent to-amber-400/50  text-white",
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
const StatCard = ({ title, value, subtitle, type }) => {
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
            {value.length > 12 ? value.slice(0, 12) + " ..." : value}
          </h2>
          <p className="text-sm font-mono text-text-muted">{subtitle}</p>
        </div>
        <Icon
          className={`${config.iconBg} size-12 p-1.5 rounded-xl shadow-lg hover:scale-90 hover:rotate-15 transition duration-300 ease-linear shrink-0`}
        />
      </div>
      <div className="mt-4 h-0.5 bg-linear-to-r from-transparent via-border-strong to-transparent" />
    </div>
  );
};



export default StatCard;
