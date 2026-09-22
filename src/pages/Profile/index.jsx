import React from "react";

import ProfileHeader from "./ProfileHeader";
import AddressSection from "./AddressSection";
import SecuritySection from "./SecuritySection";

import { useLogout, useProfile } from "../../services/apiHooks/authHook";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const profile = useProfile();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      navigate("/login", { replace: true });
    } catch (error) {
    }
  };

  if (profile.isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-border-subtle bg-surface-card p-8">
          <p className="text-sm text-text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (profile.isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-3xl border border-border-subtle bg-surface-card p-8">
          <p className="text-sm text-red-500">Failed to load profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl bg-surface-base px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-text-primary">My Profile</h1>

      <ProfileHeader />

      <AddressSection />

      <SecuritySection onLogout={handleLogout} isPending={logout.isPending} />
    </div>
  );
}
