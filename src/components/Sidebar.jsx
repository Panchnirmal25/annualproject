
import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaChartLine,
  FaCodeBranch,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaBrain,
  FaChartBar,
  FaUser,
  FaEdit,
  FaUserShield,
  FaExclamationTriangle,
  FaBook,
  FaBell,
  FaShieldAlt,
  FaFileAlt
} from 'react-icons/fa';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
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

  const getMenuItems = useMemo(() => {
    const baseItems = [
      { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
    ];

    if (!user) return baseItems;

    switch (user.role) {
      case 'admin':
        return [
          ...baseItems,
       
          { name: 'Student Management', path: '/students', icon: FaUsers },
         
 { name: 'Prediction', path: '/prediction', icon: FaChartLine },
          { name: 'Settings', path: '/settings', icon: FaCog },
       
        
         
        ];
      case 'teacher':
        return [
          ...baseItems,
          { name: 'Students', path: '/students', icon: FaUsers },
          { name: 'Prediction', path: '/prediction', icon: FaChartLine },
          
          { name: 'Settings', path: '/settings', icon: FaCog },
        ];
      case 'student':
        return [
          ...baseItems,
          { name: 'My Profile', path: '/profile', icon: FaUser },
          { name: 'Edit Profile', path: '/edit-profile', icon: FaEdit },
          { name: 'Settings', path: '/settings', icon: FaCog },
        ];
      default:
        return baseItems;
    }
  }, [user]);

  const isActive = (path) => location.pathname === path;

  const getGradientColors = () => {
    switch (user?.role) {
      case 'admin':
        return 'from-blue-600 to-blue-700';
      case 'teacher':
        return 'from-blue-600 to-indigo-700';
      case 'student':
        return 'from-green-500 to-teal-600';
      default:
        return 'from-blue-600 to-purple-600';
    }
  };

  const getSidebarBg = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-gray-900';
      case 'teacher':
        return 'bg-gradient-to-b from-blue-900 to-indigo-900';
      case 'student':
        return 'bg-gradient-to-b from-green-50 to-teal-50';
      default:
        return 'bg-gray-900';
    }
  };

  const getTextColor = () => {
    switch (user?.role) {
      case 'student':
        return 'text-gray-800';
      default:
        return 'text-white';
    }
  };

  const getActiveItemColor = () => {
    switch (user?.role) {
      case 'admin':
        return 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg';
      case 'teacher':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg';
      case 'student':
        return 'bg-gradient-to-r from-green-400 to-teal-500 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg';
    }
  };

  const getHoverColor = () => {
    switch (user?.role) {
      case 'student':
        return 'hover:bg-green-100 hover:text-green-900';
      case 'teacher':
        return 'hover:bg-blue-800 hover:text-white';
      case 'admin':
        return 'hover:bg-gray-800 hover:text-white';
      default:
        return 'hover:bg-gray-800 hover:text-white';
    }
  };

  return (
    <div className={`${getSidebarBg()} ${getTextColor()} transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen fixed left-0 top-0 z-40 shadow-xl`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${
        user?.role === 'student' ? 'border-green-200' : 'border-gray-700'
      }`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className={`bg-gradient-to-r ${getGradientColors()} p-2 rounded-lg`}>
              <FaBrain className="text-white text-lg" />
            </div>
            
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            user?.role === 'student'
              ? 'hover:bg-green-200 text-gray-600'
              : 'hover:bg-gray-800 text-gray-400'
          }`}
        >
          {isCollapsed ? (
            <FaChevronRight className={user?.role === 'student' ? 'text-gray-600' : 'text-gray-400'} />
          ) : (
            <FaChevronLeft className={user?.role === 'student' ? 'text-gray-600' : 'text-gray-400'} />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <ul className="space-y-2 px-3">
          {getMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                    isActive(item.path)
                      ? getActiveItemColor()
                      : `${getTextColor()} ${getHoverColor()} ${user?.role === 'student' ? 'text-gray-700' : 'text-gray-300'}`
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className={`text-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-white'
                      : user?.role === 'student'
                      ? 'text-gray-600 group-hover:text-green-900'
                      : 'text-gray-400 group-hover:text-white'
                  }`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                  {isActive(item.path) && !isCollapsed && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
        user?.role === 'student' ? 'border-green-200 bg-green-50/50' : 'border-gray-700'
      }`}>
        {!isCollapsed && (
          <div className="text-center">
            <p className={`text-xs mb-2 ${
              user?.role === 'student' ? 'text-gray-600' : 'text-gray-400'
            }`}>Student Performance</p>
         
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;