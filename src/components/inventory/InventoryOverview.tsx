
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { ShoppingCart, Plus, Search, AlertTriangle } from 'lucide-react';

// Mock data
const inventoryItems = [
  { id: '1', name: 'Organic Milk', sku: 'MLK-001', stock: 15, status: 'In Stock', supplier: 'Dairy Farms Inc.', lastUpdated: '2023-05-10' },
  { id: '2', name: 'Fresh Bread', sku: 'BRD-002', stock: 8, status: 'In Stock', supplier: 'Local Bakery', lastUpdated: '2023-05-11' },
  { id: '3', name: 'Eggs (1 Dozen)', sku: 'EGG-003', stock: 12, status: 'In Stock', supplier: 'Happy Hens Co.', lastUpdated: '2023-05-09' },
  { id: '4', name: 'Pasta', sku: 'PST-004', stock: 25, status: 'In Stock', supplier: 'Pasta Paradise', lastUpdated: '2023-05-06' },
  { id: '5', name: 'Tomato Sauce', sku: 'SOS-005', stock: 18, status: 'In Stock', supplier: 'Fresh Foods Inc.', lastUpdated: '2023-05-05' },
  { id: '6', name: 'Toilet Paper (8 pack)', sku: 'TLP-006', stock: 2, status: 'Low Stock', supplier: 'Household Essentials', lastUpdated: '2023-05-08' },
  { id: '7', name: 'Dish Soap', sku: 'DSP-007', stock: 3, status: 'Low Stock', supplier: 'Clean & Clear Ltd.', lastUpdated: '2023-05-07' },
  { id: '8', name: 'Apples (1kg)', sku: 'APL-008', stock: 20, status: 'In Stock', supplier: 'Fresh Farms', lastUpdated: '2023-05-10' },
];

export const InventoryOverview = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const lowStockCount = inventoryItems.filter(item => item.status === 'Low Stock').length;
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground mt-2">Manage your store inventory.</p>
      </FadeIn>
      
      {lowStockCount > 0 && (
        <SlideUp delay={0.1}>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <AlertTriangle size={16} />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Low Stock Alert</h3>
              <p className="text-sm text-amber-600">You have {lowStockCount} items that are running low on stock.</p>
            </div>
          </div>
        </SlideUp>
      )}
      
      <SlideUp delay={0.2}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart size={20} className="text-muted-foreground" />
              Inventory Status
            </CardTitle>
            
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              New Item
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search inventory..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Low Stock' ? 'outline' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Update</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
};
