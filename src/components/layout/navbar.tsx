"use client";

import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Stia</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/properties" className="text-gray-300 hover:text-white">
            Properties
          </Link>
          <Link href="/reservations" className="text-gray-300 hover:text-white">
            Reservations
          </Link>
          <Link href="/maintenance" className="text-gray-300 hover:text-white">
            Maintenance
          </Link>
          <Link href="/inventory" className="text-gray-300 hover:text-white">
            Inventory
          </Link>
          <Link href="/settings" className="text-gray-300 hover:text-white">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
