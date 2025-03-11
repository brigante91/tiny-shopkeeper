
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { FileText, Plus, Search, Calendar, Truck, DollarSign } from 'lucide-react';

// Dati di esempio
const ordini = [
  { 
    id: 'ORD-001', 
    data: '2023-05-10', 
    fornitore: 'Latteria Lombarda', 
    totale: 1250.00, 
    stato: 'Ricevuto',
    dataConsegna: '2023-05-15'
  },
  { 
    id: 'ORD-002', 
    data: '2023-05-11', 
    fornitore: 'Panificio Italiano', 
    totale: 450.75, 
    stato: 'In Transito',
    dataConsegna: '2023-05-18'
  },
  { 
    id: 'ORD-003', 
    data: '2023-05-12', 
    fornitore: 'Fattoria Le Uova', 
    totale: 720.50, 
    stato: 'In Attesa',
    dataConsegna: '2023-05-20'
  },
  { 
    id: 'ORD-004', 
    data: '2023-05-09', 
    fornitore: 'Conserve Italia', 
    totale: 980.25, 
    stato: 'Ricevuto',
    dataConsegna: '2023-05-14'
  },
  { 
    id: 'ORD-005', 
    data: '2023-05-08', 
    fornitore: 'Pastificio Del Sud', 
    totale: 540.00, 
    stato: 'Annullato',
    dataConsegna: '-'
  },
];

export const PurchaseOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredOrdini = ordini.filter(ordine => 
    ordine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ordine.fornitore.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ordine.stato.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ricevuto':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
      case 'In Transito':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
      case 'In Attesa':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
      case 'Annullato':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Ordini di Acquisto</h1>
        <p className="text-muted-foreground mt-2">Gestisci gli ordini ai fornitori.</p>
      </FadeIn>
      
      <SlideUp delay={0.2}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} className="text-muted-foreground" />
              Elenco Ordini di Acquisto
            </CardTitle>
            
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Nuovo Ordine
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cerca ordini..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Numero</TableHead>
                    <TableHead>Data Ordine</TableHead>
                    <TableHead>Fornitore</TableHead>
                    <TableHead>Totale</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Data Consegna</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrdini.map((ordine) => (
                    <TableRow key={ordine.id}>
                      <TableCell className="font-medium font-mono">{ordine.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-muted-foreground" />
                          <span>{ordine.data}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Truck size={14} className="text-muted-foreground" />
                          <span>{ordine.fornitore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} className="text-muted-foreground" />
                          <span>€{ordine.totale.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(ordine.stato)}</TableCell>
                      <TableCell>{ordine.dataConsegna}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                        <Button variant="ghost" size="sm">Modifica</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredOrdini.length === 0 && (
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
    </div>
  );
};
