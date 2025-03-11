
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Truck, Plus, Search, Mail, Phone, MapPin } from 'lucide-react';

// Dati di esempio
const fornitori = [
  { 
    id: '1', 
    nome: 'Latteria Lombarda', 
    categoria: 'Latticini', 
    contatto: 'Marco Rossi', 
    email: 'info@latterialombarda.it', 
    telefono: '02 4567890',
    indirizzo: 'Via Latte 123, Milano',
    stato: 'Attivo'
  },
  { 
    id: '2', 
    nome: 'Panificio Italiano', 
    categoria: 'Panetteria', 
    contatto: 'Giulia Bianchi', 
    email: 'ordini@panificioitaliano.it', 
    telefono: '02 1234567',
    indirizzo: 'Via del Pane 45, Milano',
    stato: 'Attivo'
  },
  { 
    id: '3', 
    nome: 'Fattoria Le Uova', 
    categoria: 'Uova e Derivati', 
    contatto: 'Luca Verdi', 
    email: 'info@fattorialeuova.it', 
    telefono: '02 9876543',
    indirizzo: 'Via Campagna 78, Monza',
    stato: 'Attivo'
  },
  { 
    id: '4', 
    nome: 'Pastificio Del Sud', 
    categoria: 'Pasta', 
    contatto: 'Anna Esposito', 
    email: 'vendite@pastificiodelsud.it', 
    telefono: '02 6543210',
    indirizzo: 'Via della Pasta 56, Milano',
    stato: 'Inattivo'
  },
  { 
    id: '5', 
    nome: 'Conserve Italia', 
    categoria: 'Conserve', 
    contatto: 'Paolo Neri', 
    email: 'info@conserveitalia.it', 
    telefono: '02 5432109',
    indirizzo: 'Via Pomodoro 34, Monza',
    stato: 'Attivo'
  },
];

export const FornitorList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = fornitori.filter(item => 
    item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.contatto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Fornitori</h1>
        <p className="text-muted-foreground mt-2">Gestisci i fornitori del tuo negozio.</p>
      </FadeIn>
      
      <SlideUp delay={0.2}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Truck size={20} className="text-muted-foreground" />
              Elenco Fornitori
            </CardTitle>
            
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Nuovo Fornitore
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cerca fornitori..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Contatto</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell>{item.categoria}</TableCell>
                      <TableCell>{item.contatto}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail size={14} className="text-muted-foreground" />
                          <span>{item.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone size={14} className="text-muted-foreground" />
                          <span>{item.telefono}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.stato === 'Attivo' ? 'secondary' : 'outline'}>
                          {item.stato}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                        <Button variant="ghost" size="sm">Modifica</Button>
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
    </div>
  );
};
