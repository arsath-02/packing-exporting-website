import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="p-3 m-4 rounded-md bg-gray-800 text-white">
      <div className="flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4">
        {/* Logo */}

          <h1 className="text-2xl font-bold cursor-pointer">Quality Checking & Shipping</h1>
          
     

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
            <li><Link to="/Manager/orders" className="hover:text-gray-400">Dashboard</Link></li>
            <li><Link to="/Manager/quality-check" className="hover:text-gray-400">Quality Check</Link></li>
            <li><Link to="/Manager/packed-orders" className="hover:text-gray-400">Packing & Shipping</Link></li>
            <li><Link to="/" className="hover:text-gray-400">Logout</Link></li> {/* Assuming logout goes to Signin */}
        </ul>


        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[60%] bg-gray-800 border-r border-gray-700 transition-all duration-300 z-10 ${
          nav ? 'left-0' : '-left-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Textile</h1>
          <AiOutlineClose size={24} onClick={handleNav} className="cursor-pointer" />
        </div>
        <ul className="flex flex-col p-4 space-y-4 text-white">
            <li><Link to="/Manager/orders" onClick={handleNav} className="hover:text-gray-400">Orders</Link></li>
            <li><Link to="/Manager/quality-check" onClick={handleNav} className="hover:text-gray-400">Stock Check</Link></li>
            <li><Link to="/Manager/packed-orders" onClick={handleNav} className="hover:text-gray-400">Packed Orders</Link></li>
            <li><Link to="/" onClick={handleNav} className="hover:text-gray-400">Logout</Link></li>
        </ul>

      </div>
    </div>
  );
};

export default Navbar;
