import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "../../../src/index.css"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



function  Header1({modal,Setmodal}){

    return (
      <div className='bg-amber-700  px-6 flex justify-between p-3 m-12 rounded-2xl'>
        <div >
        <h1 className='tracking-widest font-thin'>User Management</h1>
       <h1 className='inline-block font-bold text-3xl '>Manage Users </h1>
       </div>
      <div >
        <div  className='relative bg-amber-950 mt-2 mr-10 rounded-2xl px-10 p-3 inline-block   border-transparent border-2 focus-within:border-blue-500'>
 <FontAwesomeIcon
    icon={faMagnifyingGlass}
    className=" text-gray-200 text-lg left-1 bottom-3.5 absolute"
  />
        <input type="search" placeholder='Search users...' className='outline-none  [&::-webkit-search-cancel-button]:appearance-none ' /> 
        </div>
        <button className='cursor-pointer' onClick={()=>Setmodal(true)}><FontAwesomeIcon icon={faUserPlus}  /> Add User</button>
        </div>
      </div>
    )
  }


export default Header1
