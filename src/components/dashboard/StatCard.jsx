import {
    ShoppingBag,
    Clock,
    DollarSign,
    ShoppingCart,
    Package,
    Users,
} from "lucide-react";

const StatCard = ({ title, value, subtitle, type, isDark }) => {
    const config = cardConfig[type]
    const Icon = config.icon
    return (
        <div className={`border relative overflow-hidden p-8 rounded-3xl flex flex-col justify-between gap-4 ${
            isDark ? "bg-slate-900" : "bg-white"
        } ${config.cardBg} ${config.border} hover:scale-104 transition`} >
            <div className='flex justify-between gap-4 w-full '>
                <div className={`absolute left-0 top-0 h-1 w-full ${config.iconBg}`} />
                <div className='flex flex-col gap-2'>
                    <p className={isDark ? "font-subBold text-slate-500" : "font-subBold text-slate-600"}>{title}</p>
                    <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{value}</h2>
                    <p className={isDark ? "text-slate-400" : "text-slate-500"}>{subtitle}</p>
                </div>
                <Icon className={`${config.iconBg} size-14 p-2 rounded-xl shadow-lg hover:scale-115 hover:rotate-15 transition shrink-0`} />
            </div>
            <div className={`mt-8 h-[2px] bg-gradient-to-r from-transparent to-transparent ${
                isDark ? "via-slate-600" : "via-slate-300"
            }`} />
        </div>
    )
}

const cardConfig = {
    orders: {
        icon: ShoppingBag,
        iconBg: "bg-emerald-400",
        cardBg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
    },
    pending: {
        icon: Clock,
        iconBg: "bg-orange-400",
        cardBg: "bg-orange-400/10",
        border: "border-orange-400/20",
    },
    revenue: {
        icon: DollarSign,
        iconBg: "bg-pink-500",
        cardBg: "bg-pink-500/10",
        border: "border-pink-500/20",
    },
    monthlySales: {
        icon: ShoppingCart,
        iconBg: "bg-sky-400",
        cardBg: "bg-sky-400/10",
        border: "border-sky-400/20",
    },
    topProduct: {
        icon: Package,
        iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
        cardBg: "bg-purple-500/10",
        border: "border-purple-500/20",
    },
    users: {
        icon: Users,
        iconBg: "bg-slate-400",
        cardBg: "bg-slate-400/10",
        border: "border-slate-400/20",
    },
};

export default StatCard;