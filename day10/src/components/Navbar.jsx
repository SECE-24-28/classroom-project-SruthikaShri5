import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUser, FiCreditCard, FiLogOut, FiSmartphone, FiStar, FiTrendingUp } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import OfferBanner from './OfferBanner';
import ThemeToggle from './ThemeToggle';

const Navbar = () => { 
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { path: '/dashboard', label: 'Dashboard', icon: FiTrendingUp, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { path: '/recharge', label: 'Recharge', icon: FiCreditCard, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { path: '/plans', label: 'Plans', icon: FiStar, color: 'text-rose-600', bgColor: 'bg-rose-50' }
  ];

  return (
    <>
      <OfferBanner />
      <nav className="bg-white shadow-xl border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                <FiSmartphone className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-montserrat bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  MobRecharge
                </span>
                <span className="text-xs font-opensans text-gray-500 -mt-1">Professional Recharge Platform</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 font-roboto font-medium ${
                      isActive(item.path)
                        ? `${item.color} ${item.bgColor} shadow-md transform scale-105`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <>
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <span className="text-gray-700 font-medium font-lato">Welcome, {user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl hover:from-rose-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="font-roboto font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-6 py-2 text-emerald-600 hover:text-emerald-700 font-medium font-roboto transition-colors duration-300 border-2 border-emerald-200 rounded-xl hover:border-emerald-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 font-roboto font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 shadow-md"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 font-roboto font-medium ${
                      isActive(item.path)
                        ? `${item.color} ${item.bgColor} shadow-md`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-center mb-4">
                  <ThemeToggle />
                </div>
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <span className="text-gray-700 font-medium font-lato">Welcome, {user.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-4 text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 font-roboto font-medium"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-4 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-300 font-roboto font-medium border-2 border-emerald-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-center font-roboto font-medium shadow-lg"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
