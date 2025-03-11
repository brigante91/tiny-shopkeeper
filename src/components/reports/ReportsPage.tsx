
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, Cell, Legend } from 'recharts';

// Dati di esempio per i grafici
const salesData = [
  { name: 'Gen', vendite: 2400, profitto: 1200 },
  { name: 'Feb', vendite: 1398, profitto: 800 },
  { name: 'Mar', vendite: 9800, profitto: 4200 },
  { name: 'Apr', vendite: 3908, profitto: 1800 },
  { name: 'Mag', vendite: 4800, profitto: 2400 },
  { name: 'Giu', vendite: 3800, profitto: 1900 },
];

const categorySalesData = [
  { name: 'Latticini', value: 4200 },
  { name: 'Panetteria', value: 3100 },
  { name: 'Frutta', value: 2800 },
  { name: 'Casa', value: 1900 },
  { name: 'Dispensa', value: 5500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Statistiche</h1>
        <p className="text-muted-foreground mt-2">Panoramica delle performance del negozio.</p>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SlideUp delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <BarChart size={20} className="text-muted-foreground" />
              <CardTitle>Vendite Mensili</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  data={salesData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${value}`} />
                  <Legend />
                  <Bar dataKey="vendite" name="Vendite (€)" fill="#8884d8" />
                  <Bar dataKey="profitto" name="Profitto (€)" fill="#82ca9d" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <LineChart size={20} className="text-muted-foreground" />
              <CardTitle>Trend Vendite</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart
                  data={salesData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${value}`} />
                  <Legend />
                  <Line type="monotone" dataKey="vendite" name="Vendite (€)" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="profitto" name="Profitto (€)" stroke="#82ca9d" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.3}>
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-2">
              <PieChart size={20} className="text-muted-foreground" />
              <CardTitle>Vendite per Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width="100%" height={300} className="max-w-md mx-auto">
                  <RechartsPieChart>
                    <Pie
                      data={categorySalesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categorySalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `€${value}`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                <div className="mt-6 md:mt-0 md:ml-6">
                  <h4 className="font-medium mb-3">Top Categorie</h4>
                  <ul className="space-y-2">
                    {categorySalesData.sort((a, b) => b.value - a.value).map((category, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm">{category.name}: €{category.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </div>
  );
};
