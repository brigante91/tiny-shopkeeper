
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ProductList } from '@/components/products/ProductList';
import { InventoryOverview } from '@/components/inventory/InventoryOverview';
import { FornitorList } from '@/components/fornitori/FornitorList';
import { UserList } from '@/components/utenti/UserList';
import { PurchaseOrders } from '@/components/acquisti/PurchaseOrders';
import { ReportsPage } from '@/components/reports/ReportsPage';
import { SettingsPage } from '@/components/settings/SettingsPage';

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
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/impostazioni" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
};

export default Index;
