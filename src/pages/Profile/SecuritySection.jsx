import React, { useState } from "react";
import { FiLock, FiLogOut } from "react-icons/fi";

export default function SecuritySection({ onLogout, isPending }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      alert("الرجاء إدخال رمز التحقق (OTP) وكلمة المرور الجديدة");
      return;
    }

    alert("تم إعادة تعيين كلمة المرور بنجاح!");
    setOtp("");
    setNewPassword("");
  };

  return (
    <div className="space-y-6">
      {/* Change password */}
      <div className="rounded-3xl border border-border-subtle bg-surface-card p-6 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.18)] transition-all sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <FiLock size={20} className="text-accent" />
          <h3 className="text-lg font-bold text-text-primary">
            Change Password
          </h3>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-2xl border border-border-subtle bg-surface-card px-4 py-3 text-sm text-text-primary shadow-sm placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-2xl bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(209,109,59,0.28)] transition-all hover:bg-accent-hover"
            >
              Reset Password
            </button>

            <button
              type="button"
              onClick={() => {
                setOtp("");
                setNewPassword("");
              }}
              className="rounded-2xl border border-border-subtle bg-surface-card px-6 py-2.5 text-sm font-semibold text-text-secondary shadow-sm transition-all hover:bg-surface-elevated hover:text-text-primary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={onLogout}
          disabled={isPending}
          className={"flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(220,38,38,0.28)] transition-all duration-300 hover:bg-red-600 hover:shadow-[0_18px_40px_rgba(220,38,38,0.35)] disabled:cursor-not-allowed disabled:bg-red-500/80"}
        >
          <FiLogOut size={20} />
          <span>{isPending?"Logout ...":"Logout"}</span>
        </button>
      </div>
    </div>
  );
}
