
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function for formatting currency in Euro
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Interface for inventory item
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  status: string;
  supplier: string;
  lastUpdated: string;
}

// Interface for purchase order item
export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

// Interface for purchase order
export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  items: PurchaseOrderItem[];
  status: 'In attesa' | 'Confermato' | 'Ricevuto' | 'Annullato';
  total: number;
}

// Function to update inventory when a purchase order is received
export function updateInventoryFromOrder(
  inventoryItems: InventoryItem[],
  order: PurchaseOrder
): InventoryItem[] {
  if (order.status !== 'Ricevuto') {
    return inventoryItems; // Only update if the order is marked as received
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  return inventoryItems.map(item => {
    // Find if this item is in the order
    const orderItem = order.items.find(orderItem => orderItem.productId === item.id);
    
    if (orderItem) {
      // Update the stock
      const newStock = item.stock + orderItem.quantity;
      return {
        ...item,
        stock: newStock,
        status: newStock < 5 ? 'Scorta Bassa' : 'In Magazzino',
        lastUpdated: today
      };
    }
    
    return item;
  });
}
