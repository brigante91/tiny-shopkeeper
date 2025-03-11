
import React from 'react';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Navbar />
      
      <main className={cn(
        "flex-1 transition-all",
        isMobile ? "pb-20" : "ml-64"
      )}>
        <div className="container py-8 mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
