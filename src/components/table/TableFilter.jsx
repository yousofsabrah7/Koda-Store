import { Search } from "lucide-react";
function TableFilter({ dataorders ,isLoading,checkSelect}) {
  return (
    <div className="flex flex-col gap-5">
      <form className="grid md:grid-cols-6 gap-2 *:bg-surface-card ">
        <div className="relative col-span-3">
          <input
            type="text"
            placeholder="Search ID , customer..."
            className="w-full p-1 rounded-lg border px-9"
          />
          <Search
            width={30}
            height={17}
            className="absolute top-2 left-1 text-text-secondary"
          />
        </div>
        <select
          className="border rounded-lg p-1 text-center"
          
        >
          {checkSelect["statues"].map((s, n) => {
            return (
              <option key={n} className="" value={s}>
                {s}
              </option>
            );
          })}
        </select>
        <select
          className="border rounded-lg p-1 text-center"
          
        >
          {checkSelect["payment"].map((s, n) => {
            return (
              <option key={n} className="" value={s}>
                {s}
              </option>
            );
          })}
        </select>
        <select
          className="border rounded-lg p-1 text-center"
          
        >
          {checkSelect["method"].map((s, n) => {
            return (
              <option key={n} className="" value={s}>
                {s}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}

export default TableFilter;
