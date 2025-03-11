
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Users, Plus, Search, Mail, ShieldCheck, ShieldAlert, UserCheck } from 'lucide-react';

// Dati di esempio
const users = [
  { 
    id: '1', 
    nome: 'Roberto Bianchi', 
    email: 'roberto.bianchi@minimarket.it', 
    ruolo: 'Amministratore', 
    stato: 'Attivo',
    ultimoAccesso: '2023-05-10 14:30'
  },
  { 
    id: '2', 
    nome: 'Laura Verdi', 
    email: 'laura.verdi@minimarket.it', 
    ruolo: 'Cassiere', 
    stato: 'Attivo',
    ultimoAccesso: '2023-05-11 09:15'
  },
  { 
    id: '3', 
    nome: 'Marco Rossi', 
    email: 'marco.rossi@minimarket.it', 
    ruolo: 'Responsabile Magazzino', 
    stato: 'Attivo',
    ultimoAccesso: '2023-05-09 16:45'
  },
  { 
    id: '4', 
    nome: 'Giulia Neri', 
    email: 'giulia.neri@minimarket.it', 
    ruolo: 'Cassiere', 
    stato: 'Inattivo',
    ultimoAccesso: '2023-04-28 10:30'
  },
  { 
    id: '5', 
    nome: 'Paolo Gialli', 
    email: 'paolo.gialli@minimarket.it', 
    ruolo: 'Responsabile Acquisti', 
    stato: 'Attivo',
    ultimoAccesso: '2023-05-10 11:20'
  },
];

export const UserList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.ruolo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Amministratore':
        return <ShieldCheck size={16} className="text-blue-500" />;
      case 'Responsabile Magazzino':
      case 'Responsabile Acquisti':
        return <ShieldAlert size={16} className="text-amber-500" />;
      default:
        return <UserCheck size={16} className="text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Utenti</h1>
        <p className="text-muted-foreground mt-2">Gestisci gli utenti del sistema.</p>
      </FadeIn>
      
      <SlideUp delay={0.2}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-muted-foreground" />
              Elenco Utenti
            </CardTitle>
            
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Nuovo Utente
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Cerca utenti..."
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
                    <TableHead>Email</TableHead>
                    <TableHead>Ruolo</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Ultimo Accesso</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.nome}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail size={14} className="text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(user.ruolo)}
                          <span>{user.ruolo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.stato === 'Attivo' ? 'secondary' : 'outline'}>
                          {user.stato}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.ultimoAccesso}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm">Dettagli</Button>
                        <Button variant="ghost" size="sm">Modifica</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
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
