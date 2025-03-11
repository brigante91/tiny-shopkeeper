
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/inventory', icon: <ShoppingCart size={20} />, label: 'Inventory' },
    { to: '/reports', icon: <BarChart size={20} />, label: 'Reports' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  const getNavContent = (mobile = false) => (
    <nav className={cn(
      "flex flex-col gap-1",
      mobile && "mt-8"
    )}>
      {navItems.map((item) => (
        <NavItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
          isActive={location.pathname === item.to}
          onClick={mobile ? () => setIsOpen(false) : undefined}
        />
      ))}
    </nav>
  );

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <div className="w-64 h-screen p-4 border-r bg-card">
        <div className="flex items-center gap-2 px-4 py-6 mb-6">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            M
          </div>
          <span className="text-xl font-bold">Mini Market</span>
        </div>
        {getNavContent()}
      </div>
    );
  }

  // Mobile Navigation
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-card border-t">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            M
          </div>
          <span className="text-lg font-bold">Mini Market</span>
        </Link>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 pt-12">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </Button>
            {getNavContent(true)}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
