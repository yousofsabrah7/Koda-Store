// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
// import React from 'react'

// const UserBoard = ({ email, username, avatar, role, isVerified, btn1, btn2, btn3 }) => {
//   return (
//     <div className="grid grid-cols-4 items-center px-6 py-4 border-t border-white/5">

//       {/* User: avatar + name + email */}
//       <div className="flex items-center gap-3">
//         <img
//           src={avatar}
//           alt={username}
//           className="w-10 h-10 rounded-full bg-gray-600 object-cover"
//         />
//         <div>
//           <p className="text-white font-semibold">{username}</p>
//           <p className="text-gray-400 text-sm">{email}</p>
//         </div>
//       </div>

//       {/* Role: pill badge */}
//       <div>
//         <span className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-sm w-fit">
//           {role}
//         </span>
//       </div>

//       {/* Verified: icon + Yes/No */}
//       <div className="flex items-center gap-2">
//         <FontAwesomeIcon
//           icon={isVerified ? faCheck : faXmark}
//           className={isVerified ? 'text-green-500' : 'text-red-500'}
//         />
//         <span className="text-white">{isVerified ? 'Yes' : 'No'}</span>
//       </div>

//       {/* Actions: 3 circular buttons */}
//       <div className="flex gap-2">
//         <button className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600">
//           <FontAwesomeIcon icon={btn1} />
//         </button>
//         <button className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600">
//           <FontAwesomeIcon icon={btn2} />
//         </button>
//         <button className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600">
//           <FontAwesomeIcon icon={btn3} />
//         </button>
//       </div>

//     </div>
//   )
// }

// export default UserBoard