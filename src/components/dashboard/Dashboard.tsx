
import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { BarChart3, ShoppingBag, Package, TrendingUp, ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
];

const inventoryData = [
  { name: 'Groceries', value: 35 },
  { name: 'Beverages', value: 25 },
  { name: 'Snacks', value: 20 },
  { name: 'Household', value: 10 },
  { name: 'Others', value: 10 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to Mini Market management system.</p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value="$24,780"
          icon={<DollarSign size={20} />}
          trend="up"
          trendValue="12%"
          delay={0.1}
        />
        <StatCard
          title="Orders"
          value="342"
          icon={<ShoppingBag size={20} />}
          trend="up"
          trendValue="8%"
          delay={0.2}
        />
        <StatCard
          title="Products"
          value="120"
          icon={<Package size={20} />}
          trend="neutral"
          trendValue="0%"
          delay={0.3}
        />
        <StatCard
          title="Low Stock"
          value="12"
          icon={<TrendingUp size={20} />}
          trend="down"
          trendValue="3%"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SlideUp className="lg:col-span-2" delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={20} className="text-muted-foreground" />
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(0,0,0,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary) / 0.2)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        <SlideUp delay={0.4}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={20} className="text-muted-foreground" />
                Inventory Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={inventoryData}
                    layout="vertical"
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="rgba(0,0,0,0.5)" fontSize={12} />
                    <YAxis dataKey="name" type="category" scale="band" stroke="rgba(0,0,0,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SlideUp delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight size={20} className="text-green-500" />
                Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { name: 'Organic Milk', sales: 120, amount: '$480' },
                  { name: 'Fresh Bread', sales: 85, amount: '$255' },
                  { name: 'Pasta', sales: 65, amount: '$195' },
                  { name: 'Fresh Eggs', sales: 60, amount: '$180' },
                ].map((product, i) => (
                  <li key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units</p>
                    </div>
                    <span className="font-bold">{product.amount}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </SlideUp>

        <SlideUp delay={0.6}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownRight size={20} className="text-red-500" />
                Low Stock Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { name: 'Toilet Paper', stock: 2 },
                  { name: 'Dish Soap', stock: 3 },
                  { name: 'Cooking Oil', stock: 4 },
                  { name: 'Laundry Detergent', stock: 4 },
                ].map((product, i) => (
                  <li key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Current stock: {product.stock}</p>
                    </div>
                    <button className="text-sm text-primary hover:underline">
                      Restock
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </div>
  );
};
