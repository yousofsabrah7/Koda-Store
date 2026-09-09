import {useState } from "react";
import TableFilter from "../../components/table/TableFilter";
import { useSelector } from "react-redux";
import TableCom from "../../components/table/TableCom";
import { useAllOrders } from "../../services/apiHooks/OrdersHook";
export default function Orders() {
  const { data: Dataorders, isLoading } = useAllOrders(1);
  console.log(Dataorders)
  const [dataorders, setDataorders] = useState(Dataorders?.orders);
  // Names columns in Table orders
  const ThTable = ["Order", "Customer", "Date", "Status", "Payment", "Total"];
  // Values in Select Filter
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
  // Style Data Columns in Table [td : status]
  const TdStatusBg = [
    {
      name: "confirmed",
      textColor: "text-accent-hover",
      bgColor: "bg-accent-light",
      borderColor: "border-border-subtle",
    },
    {
      name: "shipped",
      textColor: "text-accent-hover",
      bgColor: "bg-accent-light",
      borderColor: "border-border-subtle",
    },
    {
      name: "delivered",
      textColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500",
    },
    {
      name: "cancelled",
      textColor: "text-red-500/80",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500",
    },
    {
      name: "returned",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500",
    },
    {
      name: "processing",
      textColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-500/10",
      borderColor: "border-fuchsia-500",
    },
    {
      name: "pending",
      textColor: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500",
    },
  ];
  // prit th in thead table
  const thead = ThTable?.map((t, n) => {
    return (
      <th className="text-center   p-3" key={n}>
        {t.toUpperCase()}
      </th>
    );
  });
  const gridColumns = "1fr 2fr 1fr 1fr 1fr 1fr";
  // print tr in tbody table
  const tbody = dataorders?.map((o) => {
    console.log(o)
    return (
      <tr
       style={{gridTemplateColumns:gridColumns}}
        key={o._id}
        className={`*:text-sm grid  *:flex  *:justify-center   *:items-center *:p-2 *:h-full   bg-surface-card   border-t border-border-subtle `}
      >
        <td className="">#{o._id.slice(0, 9)}</td>
        <td className="">
          <div className="flex items-center w-full gap-2 ">
            <div className="bg-surface-elevated  text-text-secondary rounded-full  p-2 w-9 h-9 flex justify-center items-center">
              {o.user?.username.charAt(0) || "U"}
            </div>
            <div className="flex flex-col items-start ">
              <p className="text-text-primary">{o.user?.username || "____"}</p>
              <p className="text-text-secondary">{o.user?.email || "____"}</p>
            </div>
          </div>
        </td>
        <td className="">
          {new Date(o.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </td>
        {TdStatusBg.map((s) => {
          if (s.name === o.status) {
            return (
              <td className="">
                <div
                  className={`w-auto px-[5px] border  rounded-xl flex justify-start items-center gap-1  ${s.textColor} ${s.bgColor} ${s.borderColor} `}
                >
                  <span className="text-lg">•</span>
                  <span>
                    {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                  </span>
                </div>
              </td>
            );
          }
        })}
        <td className=" ">
          {(o.paymentMethod === "cash") && (o.paymentStatus === "pending") ? (
            <div className="flex flex-col items-start gap-1 me-5">
              <span className="text-yellow-500 p-1 rounded-md text-start w-30 bg-yellow-500/20 border-yellow-500 px-2">
                {o.paymentStatus.charAt(0).toUpperCase() +
                  o.paymentStatus.slice(1)}
              </span>
              <span>
                {o.paymentMethod.charAt(0).toUpperCase() +
                  o.paymentMethod.slice(1)}
              </span>
            </div>
          ) : (
            ""
          )}
        </td>
        <td className="text-text-primary font-bold  text-center ">
          {o.totalPrice.toLocaleString()} EGP
        </td>
      </tr>
    );
  });
  return (
    <div className="p-13 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-text-secondary text-xs uppercase tracking-[3px]">
            Admin · Management
          </p>
          <h1 className="text-text-primary text-3xl font-bold">Orders</h1>
        </div>
        <div className="bg-surface-card border rounded-lg p-3 border-border-subtle">
          <div className="flex gap-2 items-center justify-center">
            <p className="text-xl font-bold text-text-primary">
              {Dataorders?.total}
            </p>
            <p className="text-text-muted">total orders</p>
          </div>
        </div>
      </div>
      <div>
        <TableFilter
          dataorders={Dataorders}
          isLoading={isLoading}
          checkSelect={checkSelect}
        />
      </div>
      <div className="overflow-x-auto overflow-y-auto w-full">
        <TableCom
          isLoading={isLoading}
          tbody={tbody}
          thead={thead}
          Arrycolumns={ThTable}
          gridColumns={gridColumns}
        />
      </div>
    </div>
  );
}
