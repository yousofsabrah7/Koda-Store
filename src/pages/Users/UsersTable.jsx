import React from "react";
import { useUsers } from "../../services/apiHooks/usersHook";
import { Check, X } from "lucide-react";

const UsersTable = () => {
  const { data: usersData, isLoading } = useUsers(1);
  const ThTable = ["User", "Role", "Verified", "Actions"];
  const roleStyles = {
    admin: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500",
    customer: "bg-accent-light text-accent-hover border-border-subtle",
  };
  const gridColumns = "2fr 1fr 1fr 1fr";

  const THead = ThTable?.map((title, index) => {
    return (
      <th className="p-3" key={index}>
        {title}
      </th>
    );
  });

  const TBody = usersData?.users?.map((user) => {
    return (
      <tr
        key={user._id}
        style={{ gridTemplateColumns: gridColumns }}
        className="*:text-sm grid *:flex *justify-center *:items-center *:p2 *:h-full bg-surface-card border-t border-border-subtle"
      >
        {/* User */}
        <td>
          <div className="flex items-center w-full gap-3 justify-start px-2">
            <div className="bg-slate-700/50 text-slate-300 rounded-full w-10 h-10 flex justify-center items-center font-bold flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <svg className="w-6 h-6 fill-slate-400" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <div className="flex flex-col items-start truncate">
              <p className="text-text-primary font-semibold truncate">
                {user.username || "____"}
              </p>
              <p className="text-text-secondary text-xs truncate">
                {user.email || "____"}
              </p>
            </div>
          </div>
        </td>

        {/* role */}
        <td>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${roleStyles[user.role?.toLowerCase()] || roleStyles.customer}`}
          >
            {user.role || "customer"}
          </span>
        </td>

        {/* Verified */}
        <td>
          {user.isVerified ? (
            <div className="flex items-center gap-1 text-emerald-400 font-medium text-xs">
              <Check size={16} />
              <span>Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-text-secondary font-medium text-xs">
              <X size={16} />
              <span>No</span>
            </div>
          )}
        </td>
      </tr>
    );
  });
  return (
    <>
      <THead />
      <TBody />
    </>
  );
};
export default UsersTable;
