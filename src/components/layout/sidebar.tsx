"use client";

import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <h2 className="text-xl font-bold p-4">Stia</h2>
      <nav className="mt-4">
        <ul>
          <li className="p-2 hover:bg-gray-700">
            <a href="/properties">Properties</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="/reservations">Reservations</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="/maintenance">Maintenance</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="/inventory">Inventory</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="/manual">House Manual</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="/settings">Settings</a>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <a href="/users">Users</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
