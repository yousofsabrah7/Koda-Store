import React, { useEffect, useState } from "react";
import { FiEdit3, FiMail, FiPhone, FiCheck, FiX } from "react-icons/fi";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/services/authSlice";
import { useUpdateUser } from "../../services/apiHooks/usersHook";



export default function ProfileHeader() {
  const user = useSelector(selectUser);

  const updateUser = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);

  const [tempData, setTempData] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  /*
   * Sync local form state whenever Redux user changes.
   */
  useEffect(() => {
    if (!user) return;

    setTempData({
      username: user.username || "",
      phone: user.phone || "",
      avatar: user.avatar || "",
    });
  }, [user]);

  const handleEdit = () => {
    setTempData({
      username: user?.username || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });

    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    const payload = {
      username: tempData.username,
      phone: tempData.phone,
      avatar: tempData.avatar,
    };

    updateUser.mutate(
      {
        id: user.id,
        payload,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleCancel = () => {
    if (user) {
      setTempData({
        username: user.username || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
    }

    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="mb-8 rounded-3xl border border-border-subtle bg-surface-card p-8">
        <p className="text-sm text-text-muted">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-3xl border border-border-subtle bg-surface-card p-6 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.18)] transition-all sm:p-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Profile information */}
        <div className="flex w-full flex-col items-center gap-6 sm:flex-row">
          <div className="relative">
            <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-surface-card bg-surface-elevated shadow-[0_15px_35px_rgba(0,0,0,0.22)] sm:h-60 sm:w-60">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-accent">
                  {user.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <span className="absolute bottom-4 right-4 h-7 w-7 rounded-full border-2 border-surface-card bg-emerald-500 shadow-lg" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="mb-1 text-2xl font-bold text-text-primary">
              {user.username || "Customer"}
            </h2>

            <p className="mb-3 text-sm font-medium capitalize text-accent">
              {user.role || "Customer"}
            </p>

            <div className="space-y-1.5 text-sm text-text-secondary">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <FiMail className="text-text-muted" size={16} />

                <span>{user.email || "No email"}</span>
              </div>

              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <FiPhone className="text-text-muted" size={16} />

                <span>{user.phone || "Not set"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit button */}
        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface-card px-5 py-2.5 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-accent hover:bg-accent-light hover:text-accent"
          >
            <FiEdit3 size={16} className="text-accent" />

            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Edit form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="mt-6 space-y-4 border-t border-border-subtle pt-6"
        >
          {/* Username */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={tempData.username}
              onChange={handleChange}
              disabled={updateUser.isPending}
              className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={tempData.phone}
              placeholder="Enter phone number"
              onChange={handleChange}
              disabled={updateUser.isPending}
              className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-text-secondary">
              Avatar URL
            </label>

            <input
              type="text"
              name="avatar"
              value={tempData.avatar}
              onChange={handleChange}
              disabled={updateUser.isPending}
              className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            {/* Save */}
            <button
              type="submit"
              disabled={updateUser.isPending}
              className="flex items-center gap-2 rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(209,109,59,0.28)] transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiCheck size={16} />

              <span>{updateUser.isPending ? "Saving..." : "Save"}</span>
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={updateUser.isPending}
              className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface-card px-5 py-2.5 text-sm font-semibold text-text-secondary shadow-sm transition-all hover:bg-surface-elevated hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiX size={16} />

              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
