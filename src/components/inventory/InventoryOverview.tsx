
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { ShoppingCart, Plus, Search, AlertTriangle, RefreshCw } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Dati di esempio
const initialInventoryItems = [
  { id: '1', name: 'Latte Biologico', sku: 'MLK-001', stock: 15, status: 'In Magazzino', supplier: 'Latteria Lombarda', lastUpdated: '2023-05-10' },
  { id: '2', name: 'Pane Fresco', sku: 'BRD-002', stock: 8, status: 'In Magazzino', supplier: 'Panificio Locale', lastUpdated: '2023-05-11' },
  { id: '3', name: 'Uova (12 pezzi)', sku: 'EGG-003', stock: 12, status: 'In Magazzino', supplier: 'Fattoria Le Uova', lastUpdated: '2023-05-09' },
  { id: '4', name: 'Pasta', sku: 'PST-004', stock: 25, status: 'In Magazzino', supplier: 'Pastificio Del Sud', lastUpdated: '2023-05-06' },
  { id: '5', name: 'Salsa di Pomodoro', sku: 'SOS-005', stock: 18, status: 'In Magazzino', supplier: 'Conserve Italia', lastUpdated: '2023-05-05' },
  { id: '6', name: 'Carta Igienica (8 rotoli)', sku: 'TLP-006', stock: 2, status: 'Scorta Bassa', supplier: 'Articoli Casa', lastUpdated: '2023-05-08' },
  { id: '7', name: 'Detersivo Piatti', sku: 'DSP-007', stock: 3, status: 'Scorta Bassa', supplier: 'Pulizia & Igiene Srl', lastUpdated: '2023-05-07' },
  { id: '8', name: 'Mele (1kg)', sku: 'APL-008', stock: 20, status: 'In Magazzino', supplier: 'Frutta Fresca', lastUpdated: '2023-05-10' },
];

export const InventoryOverview = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    stock: 0,
    supplier: '',
  });
  const [quantityToAdd, setQuantityToAdd] = useState(0);
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const lowStockCount = inventoryItems.filter(item => item.status === 'Scorta Bassa').length;
  
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku) {
      toast({
        title: "Errore",
        description: "Nome prodotto e SKU sono campi obbligatori.",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const newId = (inventoryItems.length + 1).toString();
    
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      sku: newProduct.sku,
      stock: newProduct.stock,
      status: newProduct.stock < 5 ? 'Scorta Bassa' : 'In Magazzino',
      supplier: newProduct.supplier,
      lastUpdated: today
    };
    
    setInventoryItems([...inventoryItems, productToAdd]);
    setNewProduct({ name: '', sku: '', stock: 0, supplier: '' });
    setIsNewProductOpen(false);
    
    toast({
      title: "Prodotto aggiunto",
      description: "Il prodotto è stato aggiunto all'inventario."
    });
  };
  
  const handleOpenUpdate = (item: any) => {
    setCurrentItem(item);
    setQuantityToAdd(0);
    setIsUpdateOpen(true);
  };
  
  const handleUpdateQuantity = () => {
    if (!currentItem) return;
    
    const today = new Date().toISOString().split('T')[0];
    const updatedItems = inventoryItems.map(item => {
      if (item.id === currentItem.id) {
        const newStock = item.stock + quantityToAdd;
        return {
          ...item,
          stock: newStock,
          status: newStock < 5 ? 'Scorta Bassa' : 'In Magazzino',
          lastUpdated: today
        };
      }
      return item;
    });
    
    setInventoryItems(updatedItems);
    setIsUpdateOpen(false);
    
    toast({
      title: "Quantità aggiornata",
      description: `La quantità di ${currentItem.name} è stata aggiornata.`
    });
  };
  
  // Questa funzione simula l'aggiornamento delle quantità quando un ordine è ricevuto
  const updateQuantityFromOrder = (productId: string, quantity: number) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedItems = inventoryItems.map(item => {
      if (item.id === productId) {
        const newStock = item.stock + quantity;
        return {
          ...item,
          stock: newStock,
          status: newStock < 5 ? 'Scorta Bassa' : 'In Magazzino',
          lastUpdated: today
        };
      }
      return item;
    });
    
    setInventoryItems(updatedItems);
  };
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Inventario</h1>
        <p className="text-muted-foreground mt-2">Gestisci l'inventario del tuo negozio.</p>
      </FadeIn>
      
      {lowStockCount > 0 && (
        <SlideUp delay={0.1}>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle size={16} />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Avviso Scorte Basse</h3>
              <p className="text-sm text-amber-600">Hai {lowStockCount} prodotti con scorte in esaurimento.</p>
            </div>
          </div>
        </SlideUp>
      )}
      
      <SlideUp delay={0.2}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-muted-foreground" />
              Stato Inventario
            </CardTitle>
            
            <Button size="sm" onClick={() => setIsNewProductOpen(true)}>
              <Plus size={16} className="mr-2" />
              Nuovo Prodotto
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cerca nell'inventario..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prodotto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Quantità</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Fornitore</TableHead>
                    <TableHead>Ultimo Aggiornamento</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Scorta Bassa' ? 'outline' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenUpdate(item)}>
                          <RefreshCw size={16} className="mr-2" />
                          Aggiorna
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Nessun risultato trovato.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </SlideUp>
      
      {/* Sheet per aggiungere nuovo prodotto */}
      <Sheet open={isNewProductOpen} onOpenChange={setIsNewProductOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Aggiungi Nuovo Prodotto</SheetTitle>
            <SheetDescription>
              Inserisci i dettagli del nuovo prodotto da aggiungere all'inventario.
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="product-name">Nome Prodotto *</Label>
              <Input 
                id="product-name" 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Es. Pasta di Semola"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="product-sku">SKU *</Label>
              <Input 
                id="product-sku" 
                value={newProduct.sku}
                onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                placeholder="Es. PST-001"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="product-quantity">Quantità Iniziale</Label>
              <Input 
                id="product-quantity" 
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                min="0"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="product-supplier">Fornitore</Label>
              <Input 
                id="product-supplier" 
                value={newProduct.supplier}
                onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                placeholder="Es. Barilla S.p.A."
              />
            </div>
          </div>
          
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsNewProductOpen(false)}>Annulla</Button>
            <Button onClick={handleAddProduct}>Aggiungi Prodotto</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Sheet per aggiornare la quantità */}
      <Sheet open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Aggiorna Quantità</SheetTitle>
            <SheetDescription>
              Aggiorna la quantità in inventario per {currentItem?.name || "questo prodotto"}.
            </SheetDescription>
          </SheetHeader>
          
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="p-4 rounded-md bg-muted">
                <p className="text-sm font-medium">Informazioni Prodotto</p>
                <h3 className="text-lg font-semibold mt-1">{currentItem.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">SKU: {currentItem.sku}</p>
                <div className="flex items-center mt-2">
                  <p className="text-sm mr-2">Quantità attuale:</p>
                  <Badge variant={currentItem.status === 'Scorta Bassa' ? 'outline' : 'secondary'}>
                    {currentItem.stock}
                  </Badge>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="quantity-to-add">Quantità da Aggiungere</Label>
                <Input 
                  id="quantity-to-add" 
                  type="number"
                  value={quantityToAdd}
                  onChange={(e) => setQuantityToAdd(parseInt(e.target.value) || 0)}
                />
                <p className="text-sm text-muted-foreground">
                  Inserisci un valore positivo per aggiungere, negativo per sottrarre.
                </p>
              </div>
              
              <div className="p-3 rounded-md bg-secondary mt-2">
                <p className="text-sm">
                  Quantità dopo aggiornamento: <span className="font-semibold">{currentItem.stock + quantityToAdd}</span>
                </p>
              </div>
            </div>
          )}
          
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>Annulla</Button>
            <Button onClick={handleUpdateQuantity}>Aggiorna Quantità</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
