import React, { useState, useEffect } from "react";
import { FaCog, FaUser, FaBell, FaLock, FaDatabase, FaPalette, FaSave, FaKey, FaEnvelope, FaGlobe, FaMoon, FaSun, FaLanguage, FaDownload, FaUpload } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'College Management System',
    institutionName: 'ABC Engineering College',
    address: '123 College Street, City, State - 123456',
    phone: '+91-9876543210',
    email: 'info@abccollege.edu',
    website: 'https://www.abccollege.edu',

    // User Preferences
    theme: 'light',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    performanceAlerts: true,
    systemUpdates: true,

    // Security
    passwordExpiry: 90,
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5,
    passwordPolicy: 'strong',

    // Data Management
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365,
    exportFormat: 'csv',
    compressionEnabled: true,

    // AI Settings
    aiEnabled: true,
    predictionThreshold: 70,
    autoRecommendations: true,
    modelUpdateFrequency: 'weekly'
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    }, 1500);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'system-settings.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(prev => ({ ...prev, ...importedSettings }));
          alert('Settings imported successfully!');
        } catch  {
          alert('Invalid settings file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings({
        // General Settings
        systemName: 'College Management System',
        institutionName: 'ABC Engineering College',
        address: '123 College Street, City, State - 123456',
        phone: '+91-9876543210',
        email: 'info@abccollege.edu',
        website: 'https://www.abccollege.edu',

        // User Preferences
        theme: 'light',
        language: 'en',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '12h',

        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        weeklyReports: true,
        performanceAlerts: true,
        systemUpdates: true,

        // Security
        passwordExpiry: 90,
        sessionTimeout: 30,
        twoFactorAuth: false,
        loginAttempts: 5,
        passwordPolicy: 'strong',

        // Data Management
        autoBackup: true,
        backupFrequency: 'daily',
        dataRetention: 365,
        exportFormat: 'csv',
        compressionEnabled: true,

        // AI Settings
        aiEnabled: true,
        predictionThreshold: 70,
        autoRecommendations: true,
        modelUpdateFrequency: 'weekly'
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'preferences', label: 'Preferences', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'data', label: 'Data Management', icon: FaDatabase },
    { id: 'ai', label: 'AI Settings', icon: FaPalette }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex">
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />

        <main className={`flex-1 transition-all duration-300 pt-16 overflow-x-auto ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-8">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">System Settings</h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Configure system preferences and administrative settings
              </p>
            </div>

            {/* Success Message */}
            {showSaveSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
                <FaSave className="text-green-600" />
                Settings saved successfully!
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Sidebar Tabs */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border h-fit`}>
                <h2 className="text-xl font-bold mb-4">Settings Categories</h2>
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : `${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                        }`}
                      >
                        <Icon />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={saveSettings}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Settings
                      </>
                    )}
                  </button>

                  <button
                    onClick={exportSettings}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Export Settings
                  </button>

                  <label className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer">
                    <FaUpload />
                    Import Settings
                    <input
                      type="file"
                      accept=".json"
                      onChange={importSettings}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={resetToDefaults}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaCog />
                    Reset to Defaults
                  </button>
                </div>
              </div>

              {/* Settings Content */}
              <div className={`${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } p-6 rounded-xl shadow-lg border lg:col-span-3`}>

                {/* General Settings */}
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FaCog className="text-blue-500" />
                      General Settings
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            System Name
                          </label>
                          <input
                            type="text"
                            value={settings.systemName}
                            onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Institution Name
                          </label>
                          <input
                            type="text"
                            value={settings.institutionName}
                            onChange={(e) => handleSettingChange('general', 'institutionName', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Address
                        </label>
                        <textarea
                          value={settings.address}
                          onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
                          rows={3}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            darkMode
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => handleSettingChange('general', 'phone', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email
                          </label>
                          <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleSettingChange('general', 'email', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Website
                          </label>
                          <input
                            type="url"
                            value={settings.website}
                            onChange={(e) => handleSettingChange('general', 'website', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Preferences */}
                {activeTab === 'preferences' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FaUser className="text-green-500" />
                      User Preferences
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Theme
                          </label>
                          <select
                            value={settings.theme}
                            onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Language
                          </label>
                          <select
                            value={settings.language}
                            onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="mr">Marathi</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Timezone
                          </label>
                          <select
                            value={settings.timezone}
                            onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                            <option value="UTC">UTC</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Date Format
                          </label>
                          <select
                            value={settings.dateFormat}
                            onChange={(e) => handleSettingChange('preferences', 'dateFormat', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Time Format
                          </label>
                          <select
                            value={settings.timeFormat}
                            onChange={(e) => handleSettingChange('preferences', 'timeFormat', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="12h">12 Hour</option>
                            <option value="24h">24 Hour</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FaBell className="text-yellow-500" />
                      Notification Settings
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Communication Channels</h3>

                          <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                              <FaEnvelope className="text-blue-500" />
                              <div>
                                <div className="font-medium">Email Notifications</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Receive notifications via email
                                </div>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.emailNotifications}
                              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>

                          <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                              <FaBell className="text-green-500" />
                              <div>
                                <div className="font-medium">Push Notifications</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Browser push notifications
                                </div>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.pushNotifications}
                              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>

                          <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3">
                              <FaKey className="text-purple-500" />
                              <div>
                                <div className="font-medium">SMS Notifications</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Receive notifications via SMS
                                </div>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.smsNotifications}
                              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Alert Types</h3>

                          <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div>
                              <div className="font-medium">Weekly Reports</div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Weekly performance summaries
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.weeklyReports}
                              onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>

                          <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div>
                              <div className="font-medium">Performance Alerts</div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Student performance notifications
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.performanceAlerts}
                              onChange={(e) => handleSettingChange('notifications', 'performanceAlerts', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>

                          <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div>
                              <div className="font-medium">System Updates</div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                System maintenance and updates
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={settings.systemUpdates}
                              onChange={(e) => handleSettingChange('notifications', 'systemUpdates', e.target.checked)}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FaLock className="text-red-500" />
                      Security Settings
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Password Expiry (days)
                          </label>
                          <input
                            type="number"
                            value={settings.passwordExpiry}
                            onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            min="30"
                            max="365"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Session Timeout (minutes)
                          </label>
                          <input
                            type="number"
                            value={settings.sessionTimeout}
                            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            min="5"
                            max="480"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Max Login Attempts
                          </label>
                          <input
                            type="number"
                            value={settings.loginAttempts}
                            onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            min="3"
                            max="10"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Password Policy
                          </label>
                          <select
                            value={settings.passwordPolicy}
                            onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="basic">Basic (6+ chars)</option>
                            <option value="medium">Medium (8+ chars, mixed case)</option>
                            <option value="strong">Strong (12+ chars, special chars)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Two-Factor Authentication</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Enable 2FA for enhanced security
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Management */}
                {activeTab === 'data' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FaDatabase className="text-purple-500" />
                      Data Management
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Backup Frequency
                          </label>
                          <select
                            value={settings.backupFrequency}
                            onChange={(e) => handleSettingChange('data', 'backupFrequency', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Data Retention (days)
                          </label>
                          <input
                            type="number"
                            value={settings.dataRetention}
                            onChange={(e) => handleSettingChange('data', 'dataRetention', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            min="30"
                            max="2555"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Export Format
                          </label>
                          <select
                            value={settings.exportFormat}
                            onChange={(e) => handleSettingChange('data', 'exportFormat', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="csv">CSV</option>
                            <option value="excel">Excel</option>
                            <option value="json">JSON</option>
                            <option value="pdf">PDF</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">Auto Backup</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Automatic system backups
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.autoBackup}
                            onChange={(e) => handleSettingChange('data', 'autoBackup', e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Compression Enabled</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Compress exported files
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.compressionEnabled}
                          onChange={(e) => handleSettingChange('data', 'compressionEnabled', e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Settings */}
                {activeTab === 'ai' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <FaPalette className="text-indigo-500" />
                      AI Settings
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Prediction Threshold (%)
                          </label>
                          <input
                            type="number"
                            value={settings.predictionThreshold}
                            onChange={(e) => handleSettingChange('ai', 'predictionThreshold', parseInt(e.target.value))}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            min="50"
                            max="95"
                          />
                          <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Minimum score for pass prediction
                          </div>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Model Update Frequency
                          </label>
                          <select
                            value={settings.modelUpdateFrequency}
                            onChange={(e) => handleSettingChange('ai', 'modelUpdateFrequency', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                              darkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="manual">Manual Only</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">AI Features Enabled</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Enable AI-powered predictions and recommendations
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.aiEnabled}
                            onChange={(e) => handleSettingChange('ai', 'aiEnabled', e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">Auto Recommendations</div>
                            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Automatically generate study recommendations
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.autoRecommendations}
                            onChange={(e) => handleSettingChange('ai', 'autoRecommendations', e.target.checked)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
