
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import { useAuth } from '@/context/AuthContext';

const NavigationBar = () => {
  const { pathname } = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (!isAuthenticated) return null;

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      isActive: isActive('/dashboard'),
    },
    {
      name: 'Classes',
      icon: GraduationCap,
      href: '/classes',
      isActive: isActive('/classes'),
    },
    {
      name: 'Lectures',
      icon: BookOpen,
      href: '/lectures',
      isActive: isActive('/lectures'),
    },
    {
      name: 'Assignments',
      icon: ClipboardList,
      href: '/assignments',
      isActive: isActive('/assignments'),
    },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          scrolled
            ? 'bg-cream/90 dark:bg-earthy-dark/90 backdrop-blur-md shadow-sm py-3'
            : 'bg-cream dark:bg-earthy-dark py-4'
        )}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-earthy rounded-lg flex items-center justify-center">
                <GraduationCap className="text-cream" size={20} />
              </div>
              <span className="font-semibold text-xl text-earthy-dark dark:text-cream">EduLearn</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant={item.isActive ? 'default' : 'ghost'}
                    className={cn(
                      'gap-2',
                      item.isActive 
                        ? 'bg-earthy/10 text-earthy hover:bg-earthy/20' 
                        : 'hover:bg-cream-dark dark:hover:bg-earthy'
                    )}
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
                <UserAvatar name={user.name} role={user.role} imageUrl={user.avatar} />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="hidden md:flex"
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-cream/80 backdrop-blur-sm transition-all duration-300 md:hidden',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className={cn(
            'fixed inset-y-0 right-0 w-full max-w-xs bg-cream dark:bg-earthy-dark shadow-xl flex flex-col transition-transform duration-300 ease-in-out',
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-sage/20">
            <span className="font-semibold text-earthy-dark dark:text-cream">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-4">
            <nav className="flex flex-col px-2 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 py-6',
                      item.isActive
                        ? 'bg-earthy/10 text-earthy hover:bg-earthy/20'
                        : 'hover:bg-cream-dark dark:hover:bg-earthy'
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                    <ChevronRight
                      size={16}
                      className="ml-auto text-muted-foreground"
                    />
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {user && (
            <div className="p-4 border-t border-sage/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar name={user.name} role={user.role} imageUrl={user.avatar} />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default NavigationBar;
