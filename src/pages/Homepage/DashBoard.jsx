import { dashboardStats, orderStatuses, topProducts, recentOrders } from "../../components/dashboard/DashBoardMockData"
import StatCard from '../../components/dashboard/StatCard'
import OrderStatusCard from '../../components/dashboard/OrderStatusCard';

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
        <div className={`p-4 sm:p-6 lg:p-8 min-h-screen ${isDark ? "bg-slate-950" : "bg-slate-100"}`}>

            <div className={`adminOverView border p-5 sm:p-6 lg:p-8 flex flex-col gap-4 rounded-3xl ${
                isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}>
                <p className='text-cyan-400 text-sm tracking-[0.35em] uppercase '>
                    Admin overview
                </p>

                <h1 className={`text-xl text-2xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                    Real-time commerce health
                </h1>

                <p className={isDark ? "text-slate-300" : "text-slate-500"}>
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

                <div className={`orderStatus w-full lg:w-[55%] border p-5 sm:p-6 lg:p-8 rounded-3xl ${
                    isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}>

                    <div className="top flex flex-row items-center justify-between gap-4">

                        <div className="left flex flex-col gap-4">
                            <p className='text-cyan-400 text-sm tracking-[0.2em] sm:tracking-[0.35em] uppercase'>
                                Order status
                            </p>

                            <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                                Live fulfillment breakdown
                            </h2>
                        </div>

                        <p className='bg-emerald-500/10 text-xs text-emerald-300 rounded-full py-1 px-3 w-fit'>
                            Updated from API
                        </p>
                    </div>

                    <div className='mapping grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
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

                <div className={`topProducts w-full lg:w-[45%] border p-5 sm:p-6 lg:p-8 rounded-3xl ${
                    isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                }`}>

                    <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                        Best sellers
                    </h2>

                    <div className='flex flex-col gap-4 mt-4'>
                        {topProducts.map((product) => (
                            <article
                                key={product.id}
                                className={`border-2 rounded-3xl flex flex-col sm:flex-row p-4 items-start sm:items-center gap-4 sm:gap-6 ${
                                    isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                                }`}
                            >
                                <img
                                    src={product.image}
                                    alt=""
                                    className='size-14 rounded-2xl object-cover shrink-0'
                                />

                                <div className='min-w-0 flex-1'>
                                    <p className={`font-semibold break-words ${isDark ? "text-white" : "text-slate-900"}`}>
                                        {product.name}
                                    </p>

                                    <p className={`text-sm sm:text-base ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                                        {product.unitsSold} units sold • {product.revenue}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

            </div>
            <div className={`bottom mt-8 w-full border p-5 sm:p-6 lg:p-8 rounded-3xl ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}>
                <div className="top flex flex-row items-center justify-between gap-4">

                    <div className="left flex flex-col gap-4">
                        <p className='text-cyan-400 text-sm tracking-[0.2em] sm:tracking-[0.35em] uppercase'>
                            Recent orders
                        </p>

                        <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                            Latest customer activity
                        </h2>
                    </div>

                    <p className='bg-cyan-500/10 text-xs text-cyan-300 rounded-full py-1 px-3 w-fit'>
                        5 orders
                    </p>
                </div>
                <div className={`rounded-3xl flex flex-col p-4 gap-4 ${isDark ? "bg-slate-900" : "bg-white"}`}>
                    {recentOrders.map((order) => (
                        <div
                            key={order.id}
                            className={`border-2 rounded-3xl flex flex-col md:flex-row md:justify-between p-4 items-start gap-2 ${
                                isDark ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
                            }`}
                        >
                            <div>
                                <h2 className={`font-semibold break-words ${isDark ? "text-white" : "text-slate-900"}`}>{order.customer}</h2>
                                <p className={`text-xs break-words ${isDark ? "text-slate-400" : "text-slate-300"}`}>{order.product} {order.date}</p>
                            </div>

                            <p className={`break-words ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                                <span className='bg-emerald-500/10 text-xs text-emerald-300 rounded-full py-1 px-3 w-fit mr-3'>{order.status}</span> {order.total}$
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashBoard