
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Eye, Package, Pencil, Plus, Search, Trash2 } from 'lucide-react';

// Tipo per il prodotto
interface Prodotto {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  image?: string;
  barcode?: string;
  supplier?: string;
  costPrice?: number;
  tax?: number;
  sku?: string;
}

// Dati di esempio
const mockProducts = [
  { id: '1', name: 'Latte Biologico', price: 4.99, stock: 15, category: 'Latticini', barcode: '8001234567890', supplier: 'Granarolo', costPrice: 3.50, tax: 4, sku: 'LAT001', description: 'Latte fresco biologico di alta qualità', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '2', name: 'Pane Fresco', price: 3.49, stock: 8, category: 'Panetteria', barcode: '8001234567891', supplier: 'Panificio Rossi', costPrice: 2.20, tax: 4, sku: 'PAN001', description: 'Pane fresco di grano integrale', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '3', name: 'Uova (12 pezzi)', price: 5.99, stock: 12, category: 'Latticini', barcode: '8001234567892', supplier: 'Fattoria del Sole', costPrice: 4.20, tax: 10, sku: 'UOV001', description: 'Uova fresche da galline allevate a terra', image: 'https://images.unsplash.com/photo-1551797802-f2a53a5c5778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWdnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '4', name: 'Pasta', price: 2.99, stock: 25, category: 'Dispensa', barcode: '8001234567893', supplier: 'Barilla', costPrice: 1.80, tax: 4, sku: 'PAS001', description: 'Pasta di semola di grano duro', image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '5', name: 'Salsa di Pomodoro', price: 3.29, stock: 18, category: 'Dispensa', barcode: '8001234567894', supplier: 'Mutti', costPrice: 2.10, tax: 4, sku: 'SAL001', description: 'Salsa di pomodoro 100% italiana', image: 'https://images.unsplash.com/photo-1608919283855-5c5f5c226140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9tYXRvJTIwc2F1Y2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '6', name: 'Carta Igienica (8 rotoli)', price: 8.99, stock: 2, category: 'Casa', barcode: '8001234567895', supplier: 'Regina', costPrice: 6.80, tax: 22, sku: 'CAR001', description: 'Carta igienica 4 veli', image: 'https://images.unsplash.com/photo-1567857319940-29b384611772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9pbGV0JTIwcGFwZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '7', name: 'Detersivo Piatti', price: 3.99, stock: 3, category: 'Casa', barcode: '8001234567896', supplier: 'Finish', costPrice: 2.50, tax: 22, sku: 'DET001', description: 'Detersivo per piatti a mano', image: 'https://images.unsplash.com/photo-1519939640723-6bc4bb0b4b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaCUyMHNvYXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
  { id: '8', name: 'Mele (1kg)', price: 4.49, stock: 20, category: 'Frutta', barcode: '8001234567897', supplier: 'Melinda', costPrice: 3.20, tax: 4, sku: 'MEL001', description: 'Mele golden fresche', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
];

export const ProductList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Prodotto[]>(mockProducts);
  const [currentProduct, setCurrentProduct] = useState<Prodotto | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Prodotto>>({
    name: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
    barcode: '',
    supplier: '',
    costPrice: 0,
    tax: 4,
    sku: '',
  });
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleView = (id: string) => {
    console.log(`Visualizza prodotto con id: ${id}`);
    const product = products.find(p => p.id === id);
    if (product) {
      setCurrentProduct(product);
      setIsViewOpen(true);
    }
  };
  
  const handleEdit = (id: string) => {
    console.log(`Modifica prodotto con id: ${id}`);
    const product = products.find(p => p.id === id);
    if (product) {
      setCurrentProduct(product);
      setIsEditOpen(true);
    }
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      setProducts(products.filter(p => p.id !== id));
      toast({
        title: "Prodotto eliminato",
        description: "Il prodotto è stato eliminato con successo.",
      });
    }
  };
  
  const handleSaveEdit = () => {
    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      setIsEditOpen(false);
      toast({
        title: "Prodotto aggiornato",
        description: "Le modifiche sono state salvate con successo.",
      });
    }
  };
  
  const handleSaveNew = () => {
    const id = (products.length + 1).toString();
    const productToAdd = { ...newProduct, id } as Prodotto;
    setProducts([...products, productToAdd]);
    setIsNewOpen(false);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      category: '',
      description: '',
      barcode: '',
      supplier: '',
      costPrice: 0,
      tax: 4,
      sku: '',
    });
    toast({
      title: "Prodotto aggiunto",
      description: "Il nuovo prodotto è stato aggiunto con successo.",
    });
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
            
            <Button size="sm" onClick={() => setIsNewOpen(true)}>
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
                  onDelete={handleDelete}
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
      
      {/* Dialog per visualizzare un prodotto */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Dettagli Prodotto</DialogTitle>
            <DialogDescription>
              Informazioni dettagliate del prodotto selezionato.
            </DialogDescription>
          </DialogHeader>
          
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                {currentProduct.image ? (
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img src={currentProduct.image} alt={currentProduct.name} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-md bg-secondary">
                    <span className="text-2xl font-bold text-secondary-foreground">
                      {currentProduct.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">{currentProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentProduct.category}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <Label className="text-sm">Prezzo</Label>
                  <p className="font-medium text-lg">€{currentProduct.price.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm">Quantità</Label>
                  <p className="font-medium text-lg">{currentProduct.stock}</p>
                </div>
                <div>
                  <Label className="text-sm">Fornitore</Label>
                  <p className="font-medium">{currentProduct.supplier || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm">Codice a barre</Label>
                  <p className="font-medium">{currentProduct.barcode || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm">SKU</Label>
                  <p className="font-medium">{currentProduct.sku || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-sm">IVA</Label>
                  <p className="font-medium">{currentProduct.tax ? `${currentProduct.tax}%` : "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm">Descrizione</Label>
                  <p className="font-medium">{currentProduct.description || "Nessuna descrizione disponibile."}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Chiudi</Button>
            <Button onClick={() => {setIsViewOpen(false); handleEdit(currentProduct?.id || "");}}>
              <Pencil size={16} className="mr-2" />
              Modifica
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sheet per modificare un prodotto */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Modifica Prodotto</SheetTitle>
            <SheetDescription>
              Modifica i dettagli del prodotto e salva le modifiche.
            </SheetDescription>
          </SheetHeader>
          
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome</Label>
                <Input 
                  id="edit-name" 
                  value={currentProduct.name} 
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Prezzo (€)</Label>
                  <Input 
                    id="edit-price" 
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Quantità</Label>
                  <Input 
                    id="edit-stock" 
                    type="number"
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Input 
                  id="edit-category" 
                  value={currentProduct.category} 
                  onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-supplier">Fornitore</Label>
                <Input 
                  id="edit-supplier" 
                  value={currentProduct.supplier || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, supplier: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-barcode">Codice a barre</Label>
                  <Input 
                    id="edit-barcode" 
                    value={currentProduct.barcode || ""} 
                    onChange={(e) => setCurrentProduct({...currentProduct, barcode: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-sku">SKU</Label>
                  <Input 
                    id="edit-sku" 
                    value={currentProduct.sku || ""} 
                    onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-cost">Prezzo d'acquisto (€)</Label>
                  <Input 
                    id="edit-cost" 
                    type="number"
                    value={currentProduct.costPrice || 0}
                    onChange={(e) => setCurrentProduct({...currentProduct, costPrice: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-tax">IVA (%)</Label>
                  <Input 
                    id="edit-tax" 
                    type="number"
                    value={currentProduct.tax || 0}
                    onChange={(e) => setCurrentProduct({...currentProduct, tax: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descrizione</Label>
                <Textarea 
                  id="edit-description" 
                  rows={3}
                  value={currentProduct.description || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-image">URL Immagine</Label>
                <Input 
                  id="edit-image" 
                  value={currentProduct.image || ""} 
                  onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <SheetFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Annulla</Button>
            <Button onClick={handleSaveEdit}>Salva modifiche</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Sheet per aggiungere un nuovo prodotto */}
      <Sheet open={isNewOpen} onOpenChange={setIsNewOpen}>
        <SheetContent className="sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Aggiungi Nuovo Prodotto</SheetTitle>
            <SheetDescription>
              Inserisci i dettagli del nuovo prodotto.
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-name">Nome *</Label>
              <Input 
                id="new-name" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-price">Prezzo (€) *</Label>
                <Input 
                  id="new-price" 
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-stock">Quantità *</Label>
                <Input 
                  id="new-stock" 
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-category">Categoria *</Label>
              <Input 
                id="new-category" 
                value={newProduct.category} 
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-supplier">Fornitore</Label>
              <Input 
                id="new-supplier" 
                value={newProduct.supplier || ""} 
                onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-barcode">Codice a barre</Label>
                <Input 
                  id="new-barcode" 
                  value={newProduct.barcode || ""} 
                  onChange={(e) => setNewProduct({...newProduct, barcode: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-sku">SKU</Label>
                <Input 
                  id="new-sku" 
                  value={newProduct.sku || ""} 
                  onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-cost">Prezzo d'acquisto (€)</Label>
                <Input 
                  id="new-cost" 
                  type="number"
                  value={newProduct.costPrice || 0}
                  onChange={(e) => setNewProduct({...newProduct, costPrice: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-tax">IVA (%)</Label>
                <Input 
                  id="new-tax" 
                  type="number"
                  value={newProduct.tax || 4}
                  onChange={(e) => setNewProduct({...newProduct, tax: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-description">Descrizione</Label>
              <Textarea 
                id="new-description" 
                rows={3}
                value={newProduct.description || ""} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-image">URL Immagine</Label>
              <Input 
                id="new-image" 
                value={newProduct.image || ""} 
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
            </div>
          </div>
          
          <SheetFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsNewOpen(false)}>Annulla</Button>
            <Button 
              onClick={handleSaveNew}
              disabled={!newProduct.name || !newProduct.category || newProduct.price <= 0}
            >
              Aggiungi Prodotto
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
