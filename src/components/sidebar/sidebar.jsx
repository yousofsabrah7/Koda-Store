import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { IoIosAdd } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

function Sidebar({open}) {
  
  return ( 
    <div className="sidebar-nav">
      <div className={`sidebar pt-[23px] pb-[24px] pl-[25px] w-[285px] h-screen bg-white border-r-[0.5px] border-[#e7e6e6] fixed left-0 top-0 bottom-0 z-[6] overflow-auto flex flex-col justify-between align-center  transition-transform  ${
       open ? "max-[1050px]:translate-x-0" : "max-[1050px]:-translate-x-full"
      } `} >

        <div className='sidebar-top'>
          <h4 className="tracking-[2px] text-[#6faaed] mb-[3px]"> Commerce </h4>
          <h3> Admin Panel </h3>
        </div>    
        
        <nav className="w-[90%] h-[64vh] py-[5px]">
          <ul className="list-none mt-[10px] mt-[15px] mb-[5px]">
            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/dashboard" className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
              <FiHome className="text-[18px] mr-[6px]" />
              Dashboard
              </NavLink>
            </li>

            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] mb-[2px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/users" className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
                <LuUsers className="text-[18px] mr-[6px]" />
                Users
              </NavLink>
            </li>

            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] mb-[2px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/products" className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
              <AiFillProduct className='text-[18px] mr-[6px]'/>
              Products
              </NavLink>
            </li>
             
            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] mb-[2px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/add" className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
              <IoIosAdd className='text-[18px] mr-[6px]'/>
              Add Product
              </NavLink>
            </li>

            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] mb-[2px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/orders" className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
              <FaRegFileAlt className='text-[18px] mr-[6px]'/>
              Orders
              </NavLink>
            </li>

            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] mb-[2px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/carts"className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
              <IoCartOutline className='text-[18px] mr-[6px]'/>
              Carts
              </NavLink>
            </li>
             
            <li className="mt-[2px] h-[50px] bg-white rounded-[15px] mb-[2px] flex items-center text-[18px] transition duration-400 hover:bg-[#eaedee]">
              <NavLink to="/setting" className={({ isActive }) =>
              isActive
                ? "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] bg-black text-white"
                : "flex items-center w-full h-full no-underline rounded-[15px] pl-[15px] text-black"
              }>
              <IoMdSettings className='text-[18px] mr-[6px]'/>
              Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mb-[1%] mt-[10px] w-[86%] h-[18%] rounded-[15px] bg-blue-600 p-[10px] text-white text-[18px]">
          <h4 className="text-[15px] tracking-[2px] text-[#d6d6d6] "> Live </h4>
          <p>
            Connected to the E-commerce API
          </p>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
