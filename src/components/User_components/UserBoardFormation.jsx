import React from 'react'
import { faPen, faShieldHalved, faTrash } from '@fortawesome/free-solid-svg-icons';
import UserBoard from './UserBoard';
import { useUsers } from '../../services/hooksApi';

const UserBoardFormation = () => {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) return <p className="text-white mx-12">Loading users...</p>;
  if (isError) return <p className="text-red-400 mx-12">Failed to load users.</p>;

  const users = data?.users || [];

  return (
    <div className="mx-12 bg-[#0d1224] rounded-2xl overflow-hidden mt-5">
      {/* Header row */}
      <div className="grid grid-cols-4 px-6 py-4 bg-[#131a30] text-gray-300 font-semibold">
        <span>User</span>
        <span>Role</span>
        <span>Verified</span>
        <span>Actions</span>
      </div>

      {/* One row per user */}
      {users.map((user) => (
        <UserBoard
          key={user._id}
          email={user.email}
          username={user.username}
          avatar={user.avatar}
          role={user.role}
          isVerified={user.isVerified}
          btn1={faPen}
          btn2={faShieldHalved}
          btn3={faTrash}
        />
      ))}
    </div>
  )
}

export default UserBoardFormation