import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Briefcase, TrendingUp, Zap } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Ana Sayfa' },
    { path: '/signals', icon: Activity, label: 'Sinyaller' },
    { path: '/live-signals', icon: Zap, label: 'Canlı' },
    { path: '/portfolio', icon: Briefcase, label: 'Portföy' },
    { path: '/analysis', icon: TrendingUp, label: 'Analiz' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;

