import React from 'react'
import { faUsers, faShieldHalved, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Stateformation from './Stateformation';
import { useUsers } from '../../services/hooksApi';

const Statecard = () => {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) return <p className="text-white mx-12">Loading stats...</p>;
  if (isError) return <p className="text-red-400 mx-12">Failed to load stats.</p>;

  const users = data?.users || [];

  const totalUsers = data?.count || 0;
  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalCustomers = users.filter((u) => u.role !== 'admin').length;
  const totalVerified = users.filter((u) => u.isVerified === true).length;

  const statsData = [
    { label: "Total Users", value: totalUsers, icon: faUsers, color: 'bg-cyan-500' },
    { label: "Admins", value: totalAdmins, icon: faShieldHalved, color: 'bg-cyan-500' },
    { label: "Customers", value: totalCustomers, icon: faUsers, color: 'bg-cyan-500' },
    { label: "Verified", value: totalVerified, icon: faUserCheck, color: 'bg-cyan-500' },
  ];

  return (
    <div className="flex gap-4 mx-12">
      {statsData.map((stat) => (
        <Stateformation
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default Statecard;