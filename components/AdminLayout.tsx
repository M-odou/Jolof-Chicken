
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Utensils, PlusCircle, BarChart3, LogOut } from 'lucide-react';
import Logo from './Logo';
import { logoutAdmin } from '../services/storageService';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Déconnexion instantanée sans confirmation comme demandé
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Commandes', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Menu & Plats', path: '/admin/menu', icon: Utensils },
    { name: 'Surplus', path: '/admin/extras', icon: PlusCircle },
    { name: 'Stats', path: '/admin/stats', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-stone-800">
          <Logo size="sm" />
          <p className="text-stone-500 text-xs mt-1 uppercase tracking-widest font-bold">Admin Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-stone-400 hover:bg-red-600/10 hover:text-red-500 rounded-xl transition-all font-bold"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
