import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchUsers,createUser } from "../../redux/usersSlice";
import UsersTable from "./UserTable";
import AddUserModal from "./AddUser";
import { FaUsers, FaUserCheck, FaUserShield, FaUserPlus, FaSearch } from "react-icons/fa";

const Users = () => {
  const dispatch = useDispatch();
  const {list:users,loading} = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(fetchUsers())
  })
    const [search, setSearch] = useState("");
 
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [recentlyAdded, setRecentlyAdded] = useState([]); 

  // 
useEffect(() => {
  dispatch(fetchUsers())
},[dispatch])

  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  // const handleAddUser = (newUser) => {
  //   setUsers([...users, newUser]);
  //   setRecentlyAdded([newUser, ...recentlyAdded]); 
  //       setShowAddModal(false);
  //   setSuccessMsg(`Done"${newUser.username}"Good`);
  //   setTimeout(() => setSuccessMsg(""), 3000);
  // };
const handleAddUser= async(newUser) => {
  await dispatch(createUser(newUser));
  setShowAddModal(false);
  setSuccessMsg(`Done"${newUser.username}" success`);
  setTimeout(() => setSuccessMsg("") , 3000)
};
  const stats = [
    { label: "Total Users", value: users.length, icon: <FaUsers /> },
    { label: "Admins", value: users.filter((u) => u.role === "admin").length, icon: <FaUserShield /> },
    { label: "Customers", value: users.filter((u) => u.role === "customer").length, icon: <FaUsers /> },
    { label: "Verified", value: users.filter((u) => u.veriFied).length, icon: <FaUserCheck /> },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-12 p-6 relative">
      {/* Massge*/}
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg shadow-md z-50">
          {successMsg}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white rounded-2xl p-4 mb-4 border border-yellow-300 shadow-sm relative">
        <div>
          <p className="text-xs tracking-widest text-yellow-600 font-semibold">
            USER MANAGEMENT
          </p>
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition text-sm w-56"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition text-sm"
          >
            <FaUserPlus /> Add User
          </button>
        </div>

        {showAddModal && (
          <AddUserModal
            onSave={handleAddUser}
            onCancel={() => setShowAddModal(false)}
          />
        )}
      </div>

      {/* DrobList*/}
      {recentlyAdded.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
           Users
          </p>
          <div className="flex flex-wrap gap-2">
            {recentlyAdded.map((u, i) => (
              <span
                key={i}
                className="bg-white border border-yellow-300 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {u.username}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* componte*/}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div>
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-yellow-400 text-gray-900 flex items-center justify-center text-lg">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-yellow-600 mb-4">Loading...</p>}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <UsersTable users={filteredUsers} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default Users;