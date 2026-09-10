// =========================
// Helper
// =========================

const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};


// =========================
// Dashboard Overview
// =========================

export const getDashboardStats = (dashboard) => {
    if (!dashboard) return [];

    const topProduct = dashboard.topProducts?.[0];

    return [
        {
            id: 1,
            title: "Total Orders",
            value: dashboard.orders?.total ?? 0,
            subtitle: "All orders received",
            type: "orders",
        },
        {
            id: 2,
            title: "Pending Orders",
            value: dashboard.orders?.pending ?? 0,
            subtitle: "Awaiting action",
            type: "pending",
        },
        {
            id: 3,
            title: "Revenue",
            value: `$${dashboard.revenue?.total ?? 0}`,
            subtitle: "Total gross revenue",
            type: "revenue",
        },
        {
            id: 4,
            title: "This Month",
            value: `$${dashboard.revenue?.thisMonth ?? 0}`,
            subtitle: "Monthly sales target",
            type: "monthlySales",
        },
        {
            id: 5,
            title: "Top Product",
            value: topProduct?.name ?? "No product",
            subtitle: `${topProduct?.totalSold ?? 0} sold`,
            type: "topProduct",
        },
        {
            id: 6,
            title: "Users",
            value: dashboard.totalCustomers ?? 0,
            subtitle: "Registered customers",
            type: "users",
        },
    ];
};


// =========================
// Order Status
// =========================

export const getOrderStatuses = (dashboard) => {
    return (
        dashboard?.ordersByStatus?.map((item) => ({
            id: item._id,
            status: item._id,
            count: item.count,
        })) ?? []
    );
};

// =========================
// Top Products
// =========================

export const getTopProducts = (dashboard) => {
    return (
        dashboard?.topProducts?.map((product) => ({
            id: product._id,
            name: product.name,
            image: product.image,
            unitsSold: product.totalSold,
            revenue: product.revenue,
        })) ?? []
    );
};


// =========================
// Recent Orders
// =========================

export const getRecentOrders = (dashboard) => {
    return (
        dashboard?.recentOrders?.map((order) => ({
            id: order._id,
            customer: order.shippingAddress?.fullName ?? "Customer",
            product: order.items?.[0]?.name ?? "No product",
            date: formatDate(order.createdAt),
            status: order.status,
            total: order.totalPrice,
        })) ?? []
    );
};