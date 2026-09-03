import {
  dashboardStats,
  orderStatuses,
  topProducts,
  recentOrders,
} from "../../components/dashboard/DashBoardMockData";
import StatCard from "../../components/dashboard/StatCard";
import OrderStatusCard from "../../components/dashboard/OrderStatusCard";

const DashBoard = ({ isDark }) => {
  // const cardStyles = {
  //     orders: "bg-emerald-400",
  //     pending: "bg-orange-400",
  //     revenue: "bg-pink-500",
  //     monthlySales: "bg-sky-400",
  //     topProduct: "bg-purple-500",
  //     users: "bg-slate-400",
  // };
  return (
    <div
      className="p-4 sm:p-6 lg:p-8 min-h-screen bg-surface-base"
    >
      <div
        className="adminOverView border border-border-subtle bg-surface-card text-text-primary p-5 sm:p-6 lg:p-8 flex flex-col gap-4 rounded-3xl shadow-xs"
      >
        <p className="text-accent text-sm tracking-[0.35em] uppercase font-mono font-semibold">
          Admin overview
        </p>

        <h1
          className="text-xl sm:text-2xl font-bold font-display text-text-primary"
        >
          Real-time commerce health
        </h1>

        <p className="text-text-secondary">
          Monitor your storefront with AI-style clarity and live API metrics.
        </p>
      </div>

      <div className="DashBoardStates grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mt-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            type={stat.type}
            isDark={isDark}
          />
        ))}
      </div>

      <div className="medium mt-8 flex flex-col lg:flex-row gap-8">
        <div
          className="orderStatus w-full lg:w-[55%] border border-border-subtle bg-surface-card p-5 sm:p-6 lg:p-8 rounded-3xl shadow-xs"
        >
          <div className="top flex flex-row items-center justify-between gap-4">
            <div className="left flex flex-col gap-4">
              <p className="text-accent text-sm tracking-[0.2em] sm:tracking-[0.35em] uppercase font-mono font-semibold">
                Order status
              </p>

              <h2
                className="text-xl sm:text-2xl font-bold font-display text-text-primary"
              >
                Live fulfillment breakdown
              </h2>
            </div>

            <p className="bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 rounded-full py-1 px-3 w-fit font-mono font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Updated from API
            </p>
          </div>

          <div className="mapping grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {orderStatuses.map((status1) => (
              <OrderStatusCard
                key={status1.id}
                status={status1.status}
                count={status1.count}
                isDark={isDark}
              />
            ))}
          </div>
        </div>

        <div
          className="topProducts w-full lg:w-[45%] border border-border-subtle bg-surface-card p-5 sm:p-6 lg:p-8 rounded-3xl shadow-xs"
        >
          <h2
            className="text-xl sm:text-2xl font-bold font-display text-text-primary"
          >
            Best sellers
          </h2>

          <div className="flex flex-col gap-4 mt-4">
            {topProducts.map((product) => (
              <article
                key={product.id}
                className="border border-border-subtle bg-surface-elevated/60 hover:border-border-strong rounded-3xl flex flex-col sm:flex-row p-4 items-start sm:items-center gap-4 sm:gap-6 transition"
              >
                <img
                  src={product.image}
                  alt=""
                  className="size-14 rounded-2xl object-cover shrink-0 border border-border-subtle"
                />

                <div className="min-w-0 flex-1">
                  <p
                    className="font-semibold break-words text-text-primary"
                  >
                    {product.name}
                  </p>

                  <p
                    className="text-sm font-mono sm:text-base text-text-muted"
                  >
                    {product.unitsSold} units sold • {product.revenue}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div
        className="bottom mt-8 w-full border border-border-subtle bg-surface-card p-5 sm:p-6 lg:p-8 rounded-3xl shadow-xs"
      >
        <div className="top flex flex-row items-center justify-between gap-4">
          <div className="left flex flex-col gap-4">
            <p className="text-accent text-sm tracking-[0.2em] sm:tracking-[0.35em] uppercase font-mono font-semibold">
              Recent orders
            </p>

            <h2
              className="text-xl sm:text-2xl font-bold font-display text-text-primary"
            >
              Latest customer activity
            </h2>
          </div>

          <p className="bg-accent-light border border-accent/20 text-xs text-accent rounded-full py-1 px-3 w-fit font-mono font-medium">
            5 orders
          </p>
        </div>
        <div
          className="rounded-3xl flex flex-col p-4 gap-4 bg-surface-card"
        >
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-border-subtle bg-surface-elevated/60 rounded-3xl flex flex-col md:flex-row md:justify-between p-4 items-start gap-2"
            >
              <div>
                <h2
                  className="font-semibold break-words text-text-primary"
                >
                  {order.customer}
                </h2>
                <p
                  className="text-xs break-words font-mono text-text-muted"
                >
                  {order.product} {order.date}
                </p>
              </div>

              <p
                className="break-words text-text-secondary"
              >
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 rounded-full py-1 px-3 w-fit mr-3 font-medium">
                  {order.status}
                </span>{" "}
                <span className="font-mono font-bold text-text-primary">${order.total}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
