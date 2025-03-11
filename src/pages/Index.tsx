
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ProductList } from '@/components/products/ProductList';
import { InventoryOverview } from '@/components/inventory/InventoryOverview';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/inventory" element={<InventoryOverview />} />
        <Route path="/reports" element={<ReportsPlaceholder />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
      </Routes>
    </Layout>
  );
};

// Placeholder components for routes we haven't fully implemented yet
const ReportsPlaceholder = () => (
  <div className="space-y-4">
    <h1 className="text-4xl font-bold tracking-tight">Reports</h1>
    <p className="text-muted-foreground">Coming soon. This feature is under development.</p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="space-y-4">
    <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
    <p className="text-muted-foreground">Coming soon. This feature is under development.</p>
  </div>
);

export default Index;
