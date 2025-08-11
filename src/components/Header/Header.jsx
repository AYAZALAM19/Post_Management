import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  LogIn, 
  UserPlus, 
  Grid3X3, 
  Plus, 
  Search,
  Heart,
  MessageCircle,
  User,
  Menu,
  X
} from 'lucide-react';
import { Container as Ayaz, Logo as Logoo, LogoutBtn as Lb } from '../index';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: Home,
      mobileIcon: Home
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: LogIn,
      mobileIcon: LogIn
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: UserPlus,
      mobileIcon: UserPlus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: Grid3X3,
      mobileIcon: Grid3X3
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: Plus,
      mobileIcon: Plus
    },
  ];

  const activeNavItems = navItems.filter(item => item.active);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}>
          <div className="p-6">
            {/* Logo and Toggle */}
            <div className="flex items-center justify-between mb-8">
              <Link to='/' className={`block ${isSidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'} transition-all duration-300`}>
                <Logoo />
              </Link>
              
              {/* Toggle Button */}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                  isSidebarCollapsed ? 'mx-auto' : ''
                }`}
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {activeNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 group relative ${
                      isSidebarCollapsed ? 'justify-center' : ''
                    }`}
                    title={isSidebarCollapsed ? item.name : ''}
                  >
                    <IconComponent className="w-6 h-6 group-hover:scale-105 transition-transform flex-shrink-0" />
                    
                    {/* Text label */}
                    <span className={`font-medium transition-all duration-300 ${
                      isSidebarCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 ml-4'
                    } overflow-hidden whitespace-nowrap`}>
                      {item.name}
                    </span>

                    {/* Tooltip for collapsed state */}
                    {isSidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </button>
                );
              })}
              
              {authStatus && (
                <div className={`pt-4 border-t border-gray-200 mt-4 ${
                  isSidebarCollapsed ? 'text-center' : ''
                }`}>
                  <div className={`${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
                    <Lb />
                  </div>
                </div>
              )}
            </nav>
          </div>
        </aside>
      </div>

      {/* Mobile/Tablet Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to='/' className="flex-shrink-0">
              <Logoo />
            </Link>

            {/* Center Icons (Instagram style) */}
            <div className="flex items-center space-x-6">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="p-4">
              {activeNavItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
              
              {authStatus && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Lb />
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation (Instagram style) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {activeNavItems.slice(0, 5).map((item) => {
            const IconComponent = item.mobileIcon;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-black transition-colors duration-200"
              >
                <IconComponent className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
          
          {authStatus && (
            <div className="flex flex-col items-center py-2 px-3">
              <User className="w-6 h-6 mb-1" />
              <Lb />
            </div>
          )}
        </div>
      </div>

      {/* Content Spacer */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="lg:hidden h-16"></div> {/* Mobile header spacer */}
        <div className="lg:hidden h-16"></div> {/* Mobile bottom nav spacer */}
      </div>
    </>
  );
}

export default Header;