const TableSkeleton = ({ columns = 7, rows = 6 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="
            grid
            gap-x-5
            p-3
            bg-surface-elevated
            animate-pulse
            *:text-[11px]
            *:text-white/60
          "
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <td
              key={columnIndex}
              className="px-4 py-4"
            >
              <div
                className={`
                  h-4
                  rounded
                  bg-gray-500/60
                  ${
                    columnIndex % 4 === 0
                      ? "w-32"
                      : columnIndex % 4 === 1
                      ? "w-40"
                      : columnIndex % 4 === 2
                      ? "w-20"
                      : "w-24"
                  }
                `}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableSkeleton;


