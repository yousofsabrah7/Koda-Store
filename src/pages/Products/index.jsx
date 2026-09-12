import {
  Pencil,
  Shield,
  ShieldCheck,
  Trash2,
  UserPlus,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import Search from "../../components/UI/Search";
import Table from "../../components/UI/Table";
import Pagination from "../../components/UI/Pagination";
import Statecard from "../../components/User_components/StateCard";

import {
  useDeleteUser,
  useUpdateUser,
  useUsers,
} from "../../services/apiHooks/usersHook";

import { selectUser } from "../../redux/services/authSlice";

const USERS_PER_PAGE = 10;

const Users = () => {
  /* =========================
     State
  ========================= */

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const currentUser = useSelector(selectUser);

  /* =========================
     API
  ========================= */

  const { data, isLoading, isError } = useUsers();

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  /* =========================
     Search
  ========================= */

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  /* =========================
     Change Role
  ========================= */

  const handleChangeRole = (user) => {
    if (!user?._id) return;

    const newRole =
      user.role?.toLowerCase() === "admin" ? "customer" : "admin";

    updateUser({
      id: user._id,
      payload: {
        role: newRole,
      },
    });
  };

  /* =========================
     Edit User
  ========================= */

  const handleEdit = (user) => {
    if (!user?._id) return;

    console.log("Edit user:", user);

    // هنا بعدين ممكن تفتح EditUser modal/drawer
  };

  /* =========================
     Delete User
  ========================= */

  const handleDelete = (user) => {
    if (!user?._id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.username || "this user"}?`,
    );

    if (!confirmed) return;

    deleteUser(user._id);
  };

  /* =========================
     Users Data
  ========================= */

  const users = data?.users || [];

  /* =========================
     Filter Users
  ========================= */

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return (
        user?._id?.toLowerCase().includes(query) ||
        user?.username?.toLowerCase().includes(query) ||
        user?.email?.toLowerCase().includes(query) ||
        user?.role?.toLowerCase().includes(query) ||
        user?.phone?.toLowerCase().includes(query) ||
        String(user?.isVerified).toLowerCase().includes(query) ||
        String(user?.createdAt).toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  /* =========================
     Pagination
  ========================= */

  const totalPages = Math.ceil(
    filteredUsers.length / USERS_PER_PAGE,
  );

  /*
    لو حصل Delete لآخر user في آخر page
    نرجع تلقائي للصفحة السابقة
  */

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }

    if (totalPages === 0 && page !== 1) {
      setPage(1);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * USERS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  );

  /* =========================
     Table Columns
  ========================= */

  const columns = [
    {
      key: "user",
      label: "User",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "verified",
      label: "Verified",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "createdAt",
      label: "Joined",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  /* =========================
     Table Rows
  ========================= */

  const rows = paginatedUsers.map((user) => {
    const isAdmin = user?.role?.toLowerCase() === "admin";

    const canManageUser =
      currentUser?.email === "admin@koda.com";

    return {
      id: user._id,

      user: (
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-accent-light
              text-accent
              font-semibold
              uppercase
            "
          >
            {user?.username?.charAt(0) || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-text-primary">
              {user?.username || "Unknown"}
            </p>

            <p className="truncate text-xs text-text-muted">
              {user?._id}
            </p>
          </div>
        </div>
      ),

      email: (
        <span className="text-text-secondary">
          {user?.email || "—"}
        </span>
      ),

      role: (
        <span
          className={`
            inline-flex
            items-center
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${
              isAdmin
                ? "bg-accent-light text-accent"
                : "bg-surface-elevated text-text-secondary"
            }
          `}
        >
          {user?.role || "Customer"}
        </span>
      ),

      verified: (
        <span
          className={`
            inline-flex
            items-center
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${
              user?.isVerified
                ? "bg-accent-light text-accent"
                : "bg-surface-elevated text-text-muted"
            }
          `}
        >
          {user?.isVerified ? "Verified" : "Not verified"}
        </span>
      ),

      phone: (
        <span className="text-text-secondary">
          {user?.phone || "—"}
        </span>
      ),

      createdAt: (
        <span className="whitespace-nowrap text-text-secondary">
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "—"}
        </span>
      ),

      actions: canManageUser ? (
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Change Role */}

          <button
            type="button"
            title={isAdmin ? "Make Customer" : "Make Admin"}
            disabled={isUpdating}
            onClick={() => handleChangeRole(user)}
            className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-accent-light
              hover:text-accent
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isAdmin ? (
              <ShieldCheck size={17} />
            ) : (
              <Shield size={17} />
            )}
          </button>

          {/* Edit */}

          <button
            type="button"
            title="Edit User"
            onClick={() => handleEdit(user)}
            className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-accent-light
              hover:text-accent
            "
          >
            <Pencil size={17} />
          </button>

          {/* Delete */}

          <button
            type="button"
            title="Delete User"
            disabled={isDeleting}
            onClick={() => handleDelete(user)}
            className="
              rounded-lg
              p-2
              text-text-secondary
              transition
              hover:bg-red-500/10
              hover:text-red-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={17} />
          </button>
        </div>
      ) : (
        <span className="text-text-muted">—</span>
      ),
    };
  });

  /* =========================
     Add User
  ========================= */

  const handleAddUser = () => {
    toast("Add user functionality coming soon");
  };

  /* =========================
     Render
  ========================= */

  return (
    <div className="flex flex-col items-center gap-4 px-8 py-6">
      {/* =========================
          Header
      ========================= */}

      <div
        className="
          flex
          w-full
          flex-col
          items-start
          justify-between
          gap-5
          rounded-3xl
          border
          border-border-subtle
          bg-surface-elevated
          p-5
          md:flex-row
          md:items-center
          md:p-8
        "
      >
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Users
          </h1>

          <p className="mt-1 text-sm text-text-muted">
            Manage users and their permissions
          </p>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <Search
            onChange={handleSearch}
            value={search}
          />

          <button
            type="button"
            onClick={handleAddUser}
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              bg-accent
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-accent-hover
            "
          >
            <UserPlus size={17} />

            <span className="hidden sm:inline">
              Add User
            </span>
          </button>
        </div>
      </div>

      {/* =========================
          Stats
      ========================= */}

      <div className="w-full">
        <Statecard />
      </div>

      {/* =========================
          Table
      ========================= */}

      <div className="w-full overflow-hidden rounded-3xl border border-border-subtle bg-surface-card">
        <Table
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      {/* =========================
          Pagination
      ========================= */}

      <div className="w-full">
        <Pagination
          currentPage={page}
          totalPages={totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Users;