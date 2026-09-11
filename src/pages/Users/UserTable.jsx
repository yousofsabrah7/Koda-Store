import { FaTrash, FaEdit, FaUserCog, FaCheckSquare, FaTimes } from "react-icons/fa";

function UsersTable({ users, setUsers }) {
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
        <tr>
          <th className="p-3 text-left">User</th>
          <th className="p-3 text-left">Role</th>
          <th className="p-3 text-left">Verified</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((u) => (
          <tr key={u.id} className="border-b border-gray-100 hover:bg-yellow-50">
            {/* User */}
            <td className="p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-700">
                {u.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{u.username}</p>
                <p className="text-xs text-gray-400">{u.email}</p>
              </div>
            </td>

            {/* Role badge */}
            <td>
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  u.role === "admin"
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {u.role}
              </span>
            </td>

            {/* Verified */}
            <td>
              {u.veriFied ? (
                <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                  <FaCheckSquare /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
                  <FaTimes /> No
                </span>
              )}
            </td>

            {/* Actions */}
            <td className="flex gap-2 py-3">
              <button className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 text-xs">
                <FaEdit />
              </button>
              <button className="w-7 h-7 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center text-yellow-700 text-xs">
                <FaUserCog />
              </button>
              <button
                onClick={() => handleDelete(u.id)}
                className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-600 text-xs"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;

