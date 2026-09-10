const TableSkeleton = ({ columns = 7, rows = 6 ,gridColumns}) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          style={{gridTemplateColumns:gridColumns}}
          key={rowIndex}
          className="bg-surface-elevated animate-pulse grid"
        >
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <td
              key={columnIndex}
              className="px-4 py-4"
            >
              <div
                className={`
                  h-4 rounded bg-gray-500/60
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