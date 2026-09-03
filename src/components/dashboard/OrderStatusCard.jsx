const OrderStatusCard = ({ status, count }) => {
  const statusConfig = orderStatusConfig[status];
  return (
    <div
      className={`${statusConfig.cardBg} ${statusConfig.border} ${statusConfig.textColor} rounded-3xl flex flex-col gap-2 p-4`}
    >
      <p>{status}</p>
      <p>{count}</p>
    </div>
  );
};

const orderStatusConfig = {
  pending: {
    textColor: "text-yellow-400",
    cardBg: "bg-yellow-400/10",
    border: "border-yellow-400/30 border-2",
  },
  processing: {
    textColor: "text-sky-400",
    cardBg: "bg-sky-400/10",
    border: "border-sky-400/30 border-2",
  },
  confirmed: {
    textColor: "text-cyan-300",
    cardBg: "bg-cyan-400/10",
    border: "border-cyan-400/30 border-2",
  },
  shipped: {
    textColor: "text-violet-400",
    cardBg: "bg-violet-500/10",
    border: "border-violet-400/30 border-2",
  },
  delivered: {
    textColor: "text-emerald-400",
    cardBg: "bg-emerald-400/10",
    border: "border-emerald-400/30 border-2",
  },
  cancelled: {
    textColor: "text-rose-400",
    cardBg: "bg-rose-400/10",
    border: "border-rose-400/30 border-2",
  },
};

export default OrderStatusCard;
