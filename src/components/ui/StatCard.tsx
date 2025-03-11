
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { SlideUp } from '@/components/ui/motion';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
  delay = 0,
}: StatCardProps) => {
  return (
    <SlideUp delay={delay}>
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {icon && <div className="text-primary">{icon}</div>}
          </div>
          
          <div className="flex items-baseline space-x-1">
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            {trend && trendValue && (
              <div className={cn(
                "text-sm font-medium",
                trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-yellow-500'
              )}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
              </div>
            )}
          </div>
          
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </Card>
    </SlideUp>
  );
};
