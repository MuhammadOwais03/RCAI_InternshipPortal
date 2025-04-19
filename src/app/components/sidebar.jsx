import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaCertificate,
  FaEnvelope,
  FaBriefcase,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-3 left-4 z-50 text-white bg-gray-800 p-2 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed inset-y-0 left-0 md:static md:w-56 lg:w-64 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="md:mt-[0rem] mt-[4rem]"></div>
        <div className="text-xl mb-5 font-bold hidden md:block">
          Internship Portal
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/Admin/dashboard"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/internships"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaBriefcase />
                <span>Internships</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pages/student"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaUsers />
                <span>Students</span>
              </Link>
            </li>
            <li>
              <Link
                href="/reports"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaFileAlt />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/certification"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaCertificate />
                <span>Certification</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Admin/request"
                className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700 transition duration-200 text-sm lg:text-base"
                onClick={() => setIsOpen(false)}
              >
                <FaEnvelope />
                <span>Request</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile when Sidebar is Open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-transparent bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;