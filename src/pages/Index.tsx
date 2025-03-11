
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ProductList } from '@/components/products/ProductList';
import { InventoryOverview } from '@/components/inventory/InventoryOverview';
import { FornitorList } from '@/components/fornitori/FornitorList';
import { UserList } from '@/components/utenti/UserList';
import { PurchaseOrders } from '@/components/acquisti/PurchaseOrders';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prodotti" element={<ProductList />} />
        <Route path="/inventario" element={<InventoryOverview />} />
        <Route path="/fornitori" element={<FornitorList />} />
        <Route path="/utenti" element={<UserList />} />
        <Route path="/acquisti" element={<PurchaseOrders />} />
        <Route path="/reports" element={<ReportsPlaceholder />} />
        <Route path="/impostazioni" element={<SettingsPlaceholder />} />
      </Routes>
    </Layout>
  );
};

// Placeholder components for routes we haven't fully implemented yet
const ReportsPlaceholder = () => (
  <div className="space-y-4">
    <h1 className="text-4xl font-bold tracking-tight">Statistiche</h1>
    <p className="text-muted-foreground">In arrivo. Questa funzionalità è in fase di sviluppo.</p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="space-y-4">
    <h1 className="text-4xl font-bold tracking-tight">Impostazioni</h1>
    <p className="text-muted-foreground">In arrivo. Questa funzionalità è in fase di sviluppo.</p>
  </div>
);

export default Index;
