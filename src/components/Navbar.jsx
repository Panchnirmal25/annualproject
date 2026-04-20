import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaBars, FaTimes, FaTachometerAlt, FaUsers, FaCodeBranch, FaChartLine, FaUser, FaMoon, FaSun, FaChevronDown, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { FaBell, FaEdit, FaKey, FaCheckCircle, FaCircle } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { getTheme } = useTheme();
  const theme = getTheme();

  const [user] = useState(() => {
    // Initialize user from localStorage synchronously
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  });
  const location = useLocation();
  const navigate = useNavigate();

  const getDisplayName = () => {
    if (!user) return 'User';
    switch (user.role) {
      case 'admin':
        return 'Admin';
      case 'teacher':
        return 'Teacher';
      case 'student':
        return 'Student';
      default:
        return 'User';
    }
  };

  const getAvatarUrl = () => {
    const name = getDisplayName();
    return `https://ui-avatars.com/api/?name=${name}`;
  };

  const getNaBgGradient = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-gradient-to-r from-gray-800 via-gray-900 to-black';
      case 'teacher':
        return 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700';
      case 'student':
        return 'bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400';
      default:
        return 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700';
    }
  };

  const getProfileDropdownBg = () => {
    switch (user?.role) {
      case 'student':
        return 'border-green-200';
      case 'teacher':
        return 'border-blue-100';
      default:
        return 'border-blue-100';
    }
  };

  const getProfileHoverBg = () => {
    switch (user?.role) {
      case 'student':
        return 'hover:bg-green-50';
      case 'teacher':
        return 'hover:bg-blue-50';
      default:
        return 'hover:bg-blue-50';
    }
  };

  const navItems = user?.role === 'admin'
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
        { name: 'Students', path: '/students', icon: FaUsers },
        { name: 'Analytics', path: '/analytics', icon: FaChartLine },
        { name: 'Profile', path: '/profile', icon: FaUser },
      ]
    : user?.role === 'teacher'
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
        { name: 'Students', path: '/students', icon: FaUsers },
        { name: 'Prediction', path: '/prediction', icon: FaChartLine },
        { name: 'Profile', path: '/profile', icon: FaUser },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
        { name: 'My Profile', path: '/profile', icon: FaUser },
        { name: 'Prediction', path: '/prediction', icon: FaChartLine },
        { name: 'Settings', path: '/settings', icon: FaCog },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`${getNaBgGradient()} shadow-lg fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <FaChartLine className="text-white text-xl" />
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                StudentAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      isActive(item.path)
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-gray-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 relative">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200">
              <FaBell className="text-white text-lg" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-lg" />
              ) : (
                <FaMoon className="text-gray-200 text-lg" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 relative"
                onClick={() => setProfileOpen((v) => !v)}
              >
                <div className="relative">
                  <img src={getAvatarUrl()} alt="avatar" className="w-9 h-9 rounded-full border-2 border-white shadow" />
                  {/* Online status */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-400"></span>
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="font-semibold leading-tight">{getDisplayName()}</span>
                </div>
                <FaChevronDown className="ml-1" />
              </button>
              {profileOpen && (
                <div className={`absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-3 z-50 animate-fade-in border ${getProfileDropdownBg()}`}>
                  {/* Welcome message */}
                  <div className="px-4 pb-2 text-sm text-gray-700 font-semibold">
                    Welcome back!
                  </div>
                  <div className="mt-2 border-t" />
                  <button
                    className={`w-full flex items-center gap-2 px-4 py-2 text-gray-700 ${getProfileHoverBg()} transition`}
                    onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                  >
                    <FaUser /> View Profile
                  </button>
                  <button
                    className={`w-full flex items-center gap-2 px-4 py-2 text-gray-700 ${getProfileHoverBg()} transition`}
                    onClick={() => { setProfileOpen(false); navigate('/edit-profile'); }}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                  <button
                    className={`w-full flex items-center gap-2 px-4 py-2 text-gray-700 ${getProfileHoverBg()} transition`}
                    onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                  >
                    <FaCog /> Settings
                  </button>
                  <button
                    className={`w-full flex items-center gap-2 px-4 py-2 text-gray-700 ${getProfileHoverBg()} transition`}
                    onClick={() => { setProfileOpen(false); navigate('/change-password'); }}
                  >
                    <FaKey /> Change Password
                  </button>
                  <div className="border-t my-1" />
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    onClick={() => { setProfileOpen(false); localStorage.clear(); navigate('/'); }}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              >
                {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;