import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../src/index.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header1({ modal, Setmodal }) {
  return (
    <div>
      <div className="bg-surface-card relative top-6 px-6 mt-20 flex justify-between p-3 m-12 rounded-2xl">
        <div>
          <h1 className="tracking-widest text-accent font-thin">
            User Management
          </h1>
          <h1 className="inline-block font-bold text-3xl ">Manage Users </h1>
        </div>
        <div>
          <div className="relative bg-surface-card mt-2 mr-10 rounded-2xl px-10 p-3 inline-block   border-transparent border-2 focus-within:border-accent">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#e2976f] text-lg left-1 bottom-3.5 absolute"
            />
            <input
              type="search"
              placeholder="Search users..."
              className="outline-none text-text-primary [&::-webkit-search-cancel-button]:appearance-none focus:border-[#e2976f]"
            />
          </div>
          <button
            className="cursor-pointer border border-transparent rounded-4xl p-2.5 hover:border-[#e2976f]"
            onClick={() => Setmodal(true)}
          >
            <FontAwesomeIcon icon={faUserPlus} /> Add User
          </button>
        </div>
      </div>
      <div>
        <div className="relative bg-amber-950 mt-2 mr-10 rounded-2xl px-10 p-3 inline-block   border-transparent border-2 focus-within:border-blue-500">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" text-gray-200 text-lg left-1 bottom-3.5 absolute"
          />
          <input
            type="search"
            placeholder="Search users..."
            className="outline-none  [&::-webkit-search-cancel-button]:appearance-none "
          />
        </div>
        <button className="cursor-pointer" onClick={() => Setmodal(true)}>
          <FontAwesomeIcon icon={faUserPlus} /> Add User
        </button>
      </div>
    </div>
  );
}

export default Header1;
