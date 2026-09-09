import { useState } from "react";
import { FaUserPlus, FaTimes, FaSave, FaBan } from "react-icons/fa";
import { addUser } from "../../services/endpointapi";

function AddUserModal({ onSave, onCancel }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!form.username || !form.email || !form.password) {
      setError("Please enter your data");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const newUser = await addUser({
        username: form.username,
        email: form.email,
        password: form.password,
        role: "customer",
        veriFied: false,
      });
      onSave(newUser);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
      setError("Someting went Wrong please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-yellow-300 rounded-2xl shadow-xl p-6 z-40">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center text-gray-900 text-lg">
            <FaUserPlus />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Add User</h3>
        </div>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-lg">
          <FaTimes />
        </button>
      </div>

      {/* Error*/}
      {error && (
        <p className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-2">
          {error}
        </p>
      )}

      {/* faild*/}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            placeholder="example@email.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            placeholder="********"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
          />
        </div>
      </div>

      {/* Bottons*/}
      <div className="flex justify-between gap-3 mt-6">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition text-base disabled:opacity-50"
        >
       {/* CANCEL */}
          <FaBan /> 
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition text-base disabled:opacity-50"
        >
          <FaSave /> {loading ? "Loading.." : "Save Data"}
        </button>
      </div>
    </div>
  );
}

export default AddUserModal;