const Table = ({
  columns = [],
  rows = [],
  isLoading = false,
}) => {
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-border-subtle
        bg-surface-card
      "
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">

          {/* =========================
              THEAD
          ========================= */}

          <thead>
            <tr
              className="
                border-b
                border-border-subtle
                bg-surface-elevated
              "
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="
                    px-5
                    py-4
                    text-left
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[1.5px]
                    text-text-muted
                    whitespace-nowrap
                  "
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* =========================
              TBODY
          ========================= */}

          <tbody>
            {isLoading ? (
              <TableSkeleton columns={columns.length} />
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="
                    border-b
                    border-border-subtle
                    last:border-b-0
                    transition-colors
                    duration-200
                    hover:bg-accent-light
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="
                        px-5
                        py-4
                        text-sm
                        text-text-secondary
                        whitespace-nowrap
                      "
                    >
                      {renderCell(row[column.key], column)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="
                    px-5
                    py-14
                    text-center
                    text-sm
                    text-text-muted
                  "
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


/* =========================
   Cell Renderer
========================= */

const renderCell = (value, column) => {
  if (value === null || value === undefined) {
    return (
      <span className="text-text-muted">
        —
      </span>
    );
  }

  /* Status */

  if (column.type === "status") {
    return <StatusBadge status={value} />;
  }

  /* Payment */

  if (column.type === "payment") {
    return (
      <PaymentCell
        status={value?.status}
        method={value?.method}
      />
    );
  }

  /* Money */

  if (column.type === "money") {
    return (
      <span className="font-semibold tabular-nums text-text-primary">
        {Number(value).toLocaleString()} EGP
      </span>
    );
  }

  /* Custom React Element */

  if (typeof value === "object") {
    return value;
  }

  return value;
};


/* =========================
   Status Badge
========================= */

const StatusBadge = ({ status }) => {
  const styles = {
    confirmed:
      "text-accent-hover bg-accent-light border-accent/30",

    shipped:
      "text-accent-hover bg-accent-light border-accent/30",

    processing:
      "text-accent-hover bg-accent-light border-accent/30",

    pending:
      "text-accent-hover bg-accent-light border-accent/30",

    delivered:
      "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",

    cancelled:
      "text-red-500/80 bg-red-500/10 border-red-500/20",

    returned:
      "text-blue-500/80 bg-blue-500/10 border-blue-500/20",
  };

  const normalizedStatus = status?.toLowerCase();

  const style =
    styles[normalizedStatus] ||
    "text-text-secondary bg-surface-elevated border-border-subtle";

  const label = normalizedStatus
    ? normalizedStatus.charAt(0).toUpperCase() +
      normalizedStatus.slice(1)
    : "Unknown";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-3
        py-1.5
        text-[11px]
        font-medium
        ${style}
      `}
    >
      <span className="text-[10px]">
        ●
      </span>

      {label}
    </span>
  );
};


/* =========================
   Payment
========================= */

const PaymentCell = ({ status, method }) => {
  const statusStyles = {
    paid: "text-emerald-600",

    pending: "text-accent-hover",

    failed: "text-red-500/80",
  };

  const normalizedStatus = status?.toLowerCase();

  const statusColor =
    statusStyles[normalizedStatus] ||
    "text-text-secondary";

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`
          text-xs
          font-medium
          ${statusColor}
        `}
      >
        {status
          ? status.charAt(0).toUpperCase() +
            status.slice(1)
          : "—"}
      </span>

      {method && (
        <span
          className="
            text-[10px]
            font-medium
            text-text-muted
          "
        >
          {method.charAt(0).toUpperCase() +
            method.slice(1)}
        </span>
      )}
    </div>
  );
};


/* =========================
   Skeleton
========================= */

const TableSkeleton = ({ columns }) => {
  return Array.from({ length: 5 }).map((_, rowIndex) => (
    <tr
      key={rowIndex}
      className="
        border-b
        border-border-subtle
        last:border-b-0
      "
    >
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <td
          key={columnIndex}
          className="px-5 py-5"
        >
          <div
            className="
              h-3
              w-full
              max-w-[120px]
              animate-pulse
              rounded
              bg-surface-elevated
            "
          />
        </td>
      ))}
    </tr>
  ));
};

export default Table;