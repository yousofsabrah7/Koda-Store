// =========================
// Dashboard Overview
// =========================

export const dashboardStats = [
    {
        id: 1,
        title: "Total Orders",
        value: 169,
        subtitle: "All orders received",
        type: "orders",
    },
    {
        id: 2,
        title: "Pending Orders",
        value: 11,
        subtitle: "Awaiting action",
        type: "pending",
    },
    {
        id: 3,
        title: "Revenue",
        value: 16079595.16,
        subtitle: "Total gross revenue",
        type: "revenue",
    },
    {
        id: 4,
        title: "This Month",
        value: 15960652.9,
        subtitle: "Monthly sales target",
        type: "monthlySales",
    },
    {
        id: 5,
        title: "Top Product",
        value: "Modern",
        subtitle: "53 sold",
        type: "topProduct",
    },
    {
        id: 6,
        title: "Users",
        value: 1,
        subtitle: "Registered customers",
        type: "users",
    },
];

// =========================
// Order Status
// =========================

export const orderStatuses = [
    {
        id: 1,
        status: "pending",
        count: 11,
    },
    {
        id: 2,
        status: "processing",
        count: 16,
    },
    {
        id: 3,
        status: "confirmed",
        count: 20,
    },
    {
        id: 4,
        status: "shipped",
        count: 23,
    },
    {
        id: 5,
        status: "delivered",
        count: 48,
    },
    {
        id: 6,
        status: "cancelled",
        count: 48,
    },
];

// =========================
// Top Products
// =========================

export const topProducts = [
    {
        id: 1,
        name: "Modern Floor Lamp",
        image: "https://placehold.co/100x100",
        unitsSold: 53,
        revenue: 4187,
    },
    {
        id: 2,
        name: "Air Fryer XL",
        image: "https://placehold.co/100x100",
        unitsSold: 38,
        revenue: 5282,
    },
    {
        id: 3,
        name: "Nike Men's Air Max Torch Shoes",
        image: "https://placehold.co/100x100",
        unitsSold: 34,
        revenue: 340,
    },
    {
        id: 4,
        name: "CeraVe Moisturizing Cream",
        image: "https://placehold.co/100x100",
        unitsSold: 21,
        revenue: 1050,
    },
    {
        id: 5,
        name: "Wooden Table",
        image: "https://placehold.co/100x100",
        unitsSold: 20,
        revenue: 3718,
    },
];

// =========================
// Recent Orders
// =========================

export const recentOrders = [
    {
        id: 1,
        customer: "Customer",
        product: "Porsche 911 GT3 (992) – Midnight Gloss Edition",
        date: "Aug 28, 2026",
        status: "delivered",
        total: 15960000,
    },
    {
        id: 2,
        customer: "Customer",
        product: "drhgjhkjh",
        date: "Aug 28, 2026",
        status: "processing",
        total: 67.1,
    },
    {
        id: 3,
        customer: "Customer",
        product: "I phone 17 pro max",
        date: "Aug 24, 2026",
        status: "shipped",
        total: 59.12,
    },
    {
        id: 4,
        customer: "Customer",
        product: "drhgjhkjh",
        date: "Aug 18, 2026",
        status: "confirmed",
        total: 268.88,
    },
    {
        id: 5,
        customer: "Customer",
        product: "2323wasda",
        date: "Aug 15, 2026",
        status: "processing",
        total: 454.7,
    },
];
