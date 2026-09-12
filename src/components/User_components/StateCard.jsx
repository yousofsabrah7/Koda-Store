import React from "react";
import {
  faUsers,
  faShieldHalved,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

import Stateformation from "./Stateformation";
import { useUsers } from "../../services/apiHooks/usersHook";

const Statecard = () => {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              h-[116px]
              animate-pulse
              rounded-2xl
              border border-border-subtle
              bg-surface-card
            "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          w-full rounded-2xl
          border border-red-500/20
          bg-red-500/5
          px-5 py-4
          text-sm text-red-500
        "
      >
        Failed to load users statistics.
      </div>
    );
  }

  const users = data?.users || [];

  const totalUsers = data?.count || 0;

  const totalAdmins = users.filter(
    (user) => user.role?.toLowerCase() === "admin",
  ).length;

  const totalCustomers = users.filter(
    (user) => user.role?.toLowerCase() !== "admin",
  ).length;

  const totalVerified = users.filter((user) => user.isVerified === true).length;

  const statsData = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: faUsers,
    },
    {
      label: "Admins",
      value: totalAdmins,
      icon: faShieldHalved,
    },
    {
      label: "Customers",
      value: totalCustomers,
      icon: faUsers,
    },
    {
      label: "Verified",
      value: totalVerified,
      icon: faUserCheck,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Stateformation
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default Statecard;
