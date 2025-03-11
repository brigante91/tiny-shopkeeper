
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScaleIn } from '@/components/ui/motion';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  className?: string;
  delay?: number;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  stock,
  category,
  image,
  className,
  delay = 0,
  onEdit,
  onView,
  onDelete,
}: ProductCardProps) => {
  const stockStatus = stock <= 0 ? 'out-of-stock' : stock < 5 ? 'low-stock' : 'in-stock';
  
  return (
    <ScaleIn delay={delay}>
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-secondary text-secondary-foreground">
              <span className="text-lg font-medium">{name.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
          
          {category && (
            <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{name}</h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-xl">€{price.toFixed(2)}</span>
            <Badge variant={
              stockStatus === 'out-of-stock' ? 'destructive' : 
              stockStatus === 'low-stock' ? 'outline' : 'secondary'
            }>
              {stockStatus === 'out-of-stock' ? 'Esaurito' : 
               stockStatus === 'low-stock' ? `Basso: ${stock}` : `Disponibile: ${stock}`}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex gap-2">
          {onView && (
            <Button variant="secondary" className="flex-1" onClick={() => onView(id)}>
              Visualizza
            </Button>
          )}
          {onEdit && (
            <Button variant="outline" className="flex-1" onClick={() => onEdit(id)}>
              Modifica
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="icon" className="ml-auto" onClick={() => onDelete(id)}>
              <span className="sr-only">Elimina</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </Button>
          )}
        </CardFooter>
      </Card>
    </ScaleIn>
  );
};
