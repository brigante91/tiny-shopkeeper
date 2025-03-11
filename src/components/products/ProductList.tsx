
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Package, Plus, Search } from 'lucide-react';

// Dati di esempio
const mockProducts = [
  { id: '1', name: 'Latte Biologico', price: 4.99, stock: 15, category: 'Latticini', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '2', name: 'Pane Fresco', price: 3.49, stock: 8, category: 'Panetteria', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '3', name: 'Uova (12 pezzi)', price: 5.99, stock: 12, category: 'Latticini', image: 'https://images.unsplash.com/photo-1551797802-f2a53a5c5778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWdnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '4', name: 'Pasta', price: 2.99, stock: 25, category: 'Dispensa', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '5', name: 'Salsa di Pomodoro', price: 3.29, stock: 18, category: 'Dispensa', image: 'https://images.unsplash.com/photo-1608919283855-5c5f5c226140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRvJTIwc2F1Y2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '6', name: 'Carta Igienica (8 rotoli)', price: 8.99, stock: 2, category: 'Casa', image: 'https://images.unsplash.com/photo-1567857319940-29b384611772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9pbGV0JTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '7', name: 'Detersivo Piatti', price: 3.99, stock: 3, category: 'Casa', image: 'https://images.unsplash.com/photo-1519939640723-6bc4bb0b4b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaCUyMHNvYXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '8', name: 'Mele (1kg)', price: 4.49, stock: 20, category: 'Frutta', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
];

export const ProductList = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (id: string) => {
    console.log(`Modifica prodotto con id: ${id}`);
  };
  
  const handleView = (id: string) => {
    console.log(`Visualizza prodotto con id: ${id}`);
  };
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Prodotti</h1>
        <p className="text-muted-foreground mt-2">Gestisci il tuo catalogo prodotti.</p>
      </FadeIn>
      
      <SlideUp delay={0.1}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Package size={20} className="text-muted-foreground" />
              Catalogo Prodotti
            </CardTitle>
            
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Aggiungi Prodotto
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cerca prodotti..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  category={product.category}
                  image={product.image}
                  onEdit={handleEdit}
                  onView={handleView}
                  delay={0.1 + (index * 0.05)}
                />
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Nessun prodotto trovato</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Prova a modificare i termini di ricerca o aggiungi un nuovo prodotto.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
};
