import { SlidersHorizontal } from "lucide-react";
import TableFilter from "../../components/table/TableFilter";
import Filter from "../../components/UI/Filter";
import Table from "../../components/UI/Table";
import { useAllOrders } from "../../services/apiHooks/OrdersHook";
import { orderFilters } from "../../utils/Filters";
import Search from "../../components/UI/Search";
import { useState } from "react";
import Pagination from "../../components/UI/Pagination";

export default function Orders() {
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const { data: ordersData, isLoading } = useAllOrders(page, 10, filters);
  /* =========================
     Table Columns
  ========================= */
  console.log(filters);
  const columns = [
    {
      key: "order",
      label: "Order",
    },
    {
      key: "customer",
      label: "Customer",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      key: "payment",
      label: "Payment",
      type: "payment",
    },
    {
      key: "total",
      label: "Total",
      type: "money",
    },
  ];

  /* =========================
     Filters
  ========================= */
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const checkSelect = {
    statues: [
      "All statuses",
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Returned",
    ],

    payment: ["All payments", "Pending", "Paid", "Failed"],

    method: ["All methods", "Cash", "Stripe"],
  };

  /* =========================
     Orders Table Data
  ========================= */
  const rows =
    ordersData?.orders
      ?.filter((order) => {
        if (!search.trim()) return true;

        const query = search.trim().toLowerCase();

        return Object.values(order).some((value) =>
          String(value).toLowerCase().includes(query),
        );
      })
      ?.map((order) => ({
        id: order._id,

        order: (
          <span className="font-mono text-xs font-medium text-text-primary">
            #{order._id?.slice(-8).toUpperCase()}
          </span>
        ),

        customer: (
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              size-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-surface-elevated
              text-sm
              font-semibold
              text-text-secondary
              ring-1
              ring-border-subtle
            "
            >
              {order.user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-text-primary">
                {order.user?.username || "Unknown user"}
              </p>

              <p className="max-w-[180px] truncate text-[11px] text-text-muted">
                {order.user?.email || "No email"}
              </p>
            </div>
          </div>
        ),

        date: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",

        status: order.status,

        payment: {
          status: order.paymentStatus,
          method: order.paymentMethod,
        },

        total: order.totalPrice,
      })) || [];

  return (
    <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5">
        {/* =========================
            Header
        ========================= */}
        <div className="product-top flex justify-between items-start sm:items-center gap-5 w-full bg-surface-elevated rounded-3xl p-5 md:p-8 border border-border-subtle">
          <div className="div1 flex flex-row items-center gap-4">
            <div>
              <p className="text-accent text-xs font-semibold tracking-[1px] uppercase">
                Orders Dashboard
              </p>
              <h2 className="text-text-primary text-2xl md:text-3xl font-extrabold">
                Orders
              </h2>
            </div>
          </div>
          <div
            className="
              rounded-xl
              border
              border-border-subtle
              bg-surface-card
              px-4
              py-2.5
            "
          >
            <span className="text-lg font-semibold text-text-primary">
              {ordersData?.total ?? 0}
            </span>

            <span className="ml-2 text-xs text-text-muted">total orders</span>
          </div>
        </div>

        <div className="w-full bg-surface-card rounded-3xl border border-border-subtle p-6">
          <div>
            <div className="flex gap-3">
              <div className="flex-2">
                <Search value={search} onChange={setSearch} />
              </div>
              <div className="flex-0">
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="
                  flex size-12 items-center justify-center
                  rounded-xl
                  border border-border-subtle
                  bg-surface-card
                  text-text-secondary
                  transition
                  hover:border-border-strong
                "
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </div>

            <div className={`${showFilters ? "mt-3" : ""} overflow-hidden`}>
              <Filter
                filters={orderFilters}
                values={filters}
                onChange={handleFilterChange}
                showFilters={showFilters}
              />
            </div>
          </div>
        </div>

        {/* =========================
            Table
        ========================= */}

        <Table columns={columns} rows={rows} isLoading={isLoading} />
        <div className="w-full mb-8">
          <Pagination
            currentPage={ordersData?.currentPage || page}
            totalPages={ordersData?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
