import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
    const chartData =
        data?.map((item) => ({
            date: item._id,
            revenue: item.revenue,
        })) || [];

    return (
        <div className="w-full rounded-3xl bg-surface-card border border-border-subtle p-5 mt-8">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
                Revenue - Last 7 Days
            </h2>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--color-border-subtle)"
                        />

                        <XAxis
                            dataKey="date"
                            stroke="var(--color-text-muted)"
                            tick={{ fill: "var(--color-text-muted)" }}
                        />

                        <YAxis
                            stroke="var(--color-text-muted)"
                            tick={{ fill: "var(--color-text-muted)" }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--color-surface-elevated)",
                                border: "1px solid var(--color-border-strong)",
                                color: "var(--color-text-primary)",
                                borderRadius: "12px",
                            }}
                            labelStyle={{
                                color: "var(--color-text-primary)",
                            }}
                            itemStyle={{
                                color: "var(--color-accent)",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-accent)"
                            strokeWidth={3}
                            dot={{
                                fill: "var(--color-accent)",
                            }}
                            activeDot={{
                                r: 6,
                                fill: "var(--color-accent)",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;