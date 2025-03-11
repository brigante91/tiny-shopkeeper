
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { FileText, Plus, Search, Calendar, Truck, DollarSign, CheckCircle, Filter, Download, Upload, Trash2, Edit, Eye, XCircle, ClockIcon } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

// Dati di esempio
const ordini = [
  { 
    id: 'ORD-001', 
    data: '2023-05-10', 
    fornitore: 'Latteria Lombarda', 
    totale: 1250.00, 
    stato: 'Ricevuto',
    dataConsegna: '2023-05-15',
    prodotti: [
      { id: 'P001', nome: 'Latte fresco', quantità: 40, prezzo: 1.20 },
      { id: 'P002', nome: 'Yogurt bianco', quantità: 50, prezzo: 0.85 },
      { id: 'P003', nome: 'Formaggio fresco', quantità: 20, prezzo: 3.50 },
    ]
  },
  { 
    id: 'ORD-002', 
    data: '2023-05-11', 
    fornitore: 'Panificio Italiano', 
    totale: 450.75, 
    stato: 'In Transito',
    dataConsegna: '2023-05-18',
    prodotti: [
      { id: 'P004', nome: 'Pane integrale', quantità: 30, prezzo: 2.50 },
      { id: 'P005', nome: 'Focaccia', quantità: 15, prezzo: 3.20 },
      { id: 'P006', nome: 'Grissini', quantità: 25, prezzo: 1.80 },
    ]
  },
  { 
    id: 'ORD-003', 
    data: '2023-05-12', 
    fornitore: 'Fattoria Le Uova', 
    totale: 720.50, 
    stato: 'In Attesa',
    dataConsegna: '2023-05-20',
    prodotti: [
      { id: 'P007', nome: 'Uova fresche (conf. 10)', quantità: 40, prezzo: 3.50 },
      { id: 'P008', nome: 'Uova bio (conf. 6)', quantità: 30, prezzo: 3.80 },
    ]
  },
  { 
    id: 'ORD-004', 
    data: '2023-05-09', 
    fornitore: 'Conserve Italia', 
    totale: 980.25, 
    stato: 'Ricevuto',
    dataConsegna: '2023-05-14',
    prodotti: [
      { id: 'P009', nome: 'Passata di pomodoro', quantità: 50, prezzo: 1.20 },
      { id: 'P010', nome: 'Pelati in lattina', quantità: 40, prezzo: 0.95 },
      { id: 'P011', nome: 'Olive in salamoia', quantità: 25, prezzo: 2.10 },
    ]
  },
  { 
    id: 'ORD-005', 
    data: '2023-05-08', 
    fornitore: 'Pastificio Del Sud', 
    totale: 540.00, 
    stato: 'Annullato',
    dataConsegna: '-',
    prodotti: [
      { id: 'P012', nome: 'Pasta di semola', quantità: 60, prezzo: 0.90 },
      { id: 'P013', nome: 'Pasta all\'uovo', quantità: 30, prezzo: 1.50 },
    ]
  },
];

// Dati dei fornitori per il form di nuovo ordine
const fornitori = [
  { id: 'F001', nome: 'Latteria Lombarda' },
  { id: 'F002', nome: 'Panificio Italiano' },
  { id: 'F003', nome: 'Fattoria Le Uova' },
  { id: 'F004', nome: 'Conserve Italia' },
  { id: 'F005', nome: 'Pastificio Del Sud' },
];

// Catalogo prodotti per il form di nuovo ordine
const catalogoProdotti = [
  { id: 'P001', nome: 'Latte fresco', categoria: 'Latticini', prezzo: 1.20 },
  { id: 'P002', nome: 'Yogurt bianco', categoria: 'Latticini', prezzo: 0.85 },
  { id: 'P003', nome: 'Formaggio fresco', categoria: 'Latticini', prezzo: 3.50 },
  { id: 'P004', nome: 'Pane integrale', categoria: 'Panetteria', prezzo: 2.50 },
  { id: 'P005', nome: 'Focaccia', categoria: 'Panetteria', prezzo: 3.20 },
  { id: 'P006', nome: 'Grissini', categoria: 'Panetteria', prezzo: 1.80 },
  { id: 'P007', nome: 'Uova fresche (conf. 10)', categoria: 'Uova', prezzo: 3.50 },
  { id: 'P008', nome: 'Uova bio (conf. 6)', categoria: 'Uova', prezzo: 3.80 },
  { id: 'P009', nome: 'Passata di pomodoro', categoria: 'Conserve', prezzo: 1.20 },
  { id: 'P010', nome: 'Pelati in lattina', categoria: 'Conserve', prezzo: 0.95 },
  { id: 'P011', nome: 'Olive in salamoia', categoria: 'Conserve', prezzo: 2.10 },
  { id: 'P012', nome: 'Pasta di semola', categoria: 'Pasta', prezzo: 0.90 },
  { id: 'P013', nome: 'Pasta all\'uovo', categoria: 'Pasta', prezzo: 1.50 },
];

export const PurchaseOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tutti');
  const [statusFilter, setStatusFilter] = useState('tutti');
  
  // Stato per il nuovo ordine
  const [nuovoOrdine, setNuovoOrdine] = useState({
    fornitore: '',
    prodotti: [],
    dataConsegna: '',
  });
  
  // Stato per il prodotto in fase di aggiunta
  const [prodottoCorrente, setProdottoCorrente] = useState({
    id: '',
    quantità: 1,
  });
  
  // Funzione per aggiungere un prodotto all'ordine
  const aggiungiProdottoAllOrdine = () => {
    if (!prodottoCorrente.id || prodottoCorrente.quantità < 1) return;
    
    const prodottoSelezionato = catalogoProdotti.find(p => p.id === prodottoCorrente.id);
    if (!prodottoSelezionato) return;
    
    const nuovoProdotto = {
      id: prodottoSelezionato.id,
      nome: prodottoSelezionato.nome,
      quantità: prodottoCorrente.quantità,
      prezzo: prodottoSelezionato.prezzo,
    };
    
    setNuovoOrdine(prev => ({
      ...prev,
      prodotti: [...prev.prodotti, nuovoProdotto],
    }));
    
    // Resetta il form
    setProdottoCorrente({
      id: '',
      quantità: 1,
    });
  };
  
  // Funzione per rimuovere un prodotto dall'ordine
  const rimuoviProdottoDallOrdine = (idProdotto) => {
    setNuovoOrdine(prev => ({
      ...prev,
      prodotti: prev.prodotti.filter(p => p.id !== idProdotto),
    }));
  };
  
  // Calcola il totale dell'ordine corrente
  const calcolaTotaleOrdine = () => {
    return nuovoOrdine.prodotti.reduce((sum, p) => sum + (p.prezzo * p.quantità), 0);
  };
  
  // Funzione per creare un nuovo ordine
  const creaOrdine = () => {
    if (!nuovoOrdine.fornitore || nuovoOrdine.prodotti.length === 0 || !nuovoOrdine.dataConsegna) {
      alert('Completa tutti i campi obbligatori');
      return;
    }
    
    const fornitoreNome = fornitori.find(f => f.id === nuovoOrdine.fornitore)?.nome || '';
    
    const nuovoOrdineCreato = {
      id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      data: format(new Date(), 'yyyy-MM-dd'),
      fornitore: fornitoreNome,
      totale: calcolaTotaleOrdine(),
      stato: 'In Attesa',
      dataConsegna: nuovoOrdine.dataConsegna,
      prodotti: nuovoOrdine.prodotti,
    };
    
    // In un'applicazione reale, qui salveremmo l'ordine nel backend
    console.log('Nuovo ordine creato:', nuovoOrdineCreato);
    
    // Resetta il form e chiudi il dialog
    setNuovoOrdine({
      fornitore: '',
      prodotti: [],
      dataConsegna: '',
    });
    setIsNewOrderOpen(false);
    
    // Per questa demo, simula l'aggiunta dell'ordine
    // ordini.push(nuovoOrdineCreato);
    alert('Ordine creato con successo!');
  };
  
  // Filtra gli ordini
  const filteredOrdini = ordini.filter(ordine => {
    // Filtra per query di ricerca
    const matchesSearch = 
      ordine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ordine.fornitore.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ordine.stato.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtra per stato
    const matchesStatus = statusFilter === 'tutti' || ordine.stato === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ricevuto':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                <CheckCircle size={12} />
                {status}
              </Badge>;
      case 'In Transito':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1">
                <Truck size={12} />
                {status}
              </Badge>;
      case 'In Attesa':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 flex items-center gap-1">
                <ClockIcon size={12} />
                {status}
              </Badge>;
      case 'Annullato':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
                <XCircle size={12} />
                {status}
              </Badge>;
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="tutti">Tutti gli Ordini</TabsTrigger>
              <TabsTrigger value="in-corso">In Corso</TabsTrigger>
              <TabsTrigger value="completati">Completati</TabsTrigger>
            </TabsList>
            
            <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={16} className="mr-2" />
                  Nuovo Ordine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Crea Nuovo Ordine di Acquisto</DialogTitle>
                  <DialogDescription>
                    Compila il modulo per creare un nuovo ordine a un fornitore.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="fornitore" className="text-sm font-medium">
                        Fornitore <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={nuovoOrdine.fornitore} 
                        onValueChange={(value) => setNuovoOrdine({...nuovoOrdine, fornitore: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona fornitore" />
                        </SelectTrigger>
                        <SelectContent>
                          {fornitori.map(fornitore => (
                            <SelectItem key={fornitore.id} value={fornitore.id}>
                              {fornitore.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="dataConsegna" className="text-sm font-medium">
                        Data Consegna Prevista <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        type="date"
                        value={nuovoOrdine.dataConsegna}
                        onChange={(e) => setNuovoOrdine({...nuovoOrdine, dataConsegna: e.target.value})}
                        min={format(new Date(), 'yyyy-MM-dd')}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Aggiungi Prodotti all'Ordine</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
                      <div className="sm:col-span-3">
                        <Select
                          value={prodottoCorrente.id}
                          onValueChange={(value) => setProdottoCorrente({...prodottoCorrente, id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona prodotto" />
                          </SelectTrigger>
                          <SelectContent>
                            {catalogoProdotti.map(prodotto => (
                              <SelectItem key={prodotto.id} value={prodotto.id}>
                                {prodotto.nome} - €{prodotto.prezzo.toFixed(2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <Input
                          type="number"
                          placeholder="Qtà"
                          min="1"
                          value={prodottoCorrente.quantità}
                          onChange={(e) => setProdottoCorrente({
                            ...prodottoCorrente, 
                            quantità: parseInt(e.target.value) || 1
                          })}
                        />
                      </div>
                      
                      <div className="sm:col-span-1">
                        <Button 
                          onClick={aggiungiProdottoAllOrdine}
                          type="button"
                          disabled={!prodottoCorrente.id}
                          className="w-full"
                        >
                          Aggiungi
                        </Button>
                      </div>
                    </div>
                    
                    {nuovoOrdine.prodotti.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Prodotto</TableHead>
                              <TableHead className="text-right">Prezzo</TableHead>
                              <TableHead className="text-right">Qtà</TableHead>
                              <TableHead className="text-right">Totale</TableHead>
                              <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {nuovoOrdine.prodotti.map((prodotto) => (
                              <TableRow key={prodotto.id}>
                                <TableCell>{prodotto.nome}</TableCell>
                                <TableCell className="text-right">€{prodotto.prezzo.toFixed(2)}</TableCell>
                                <TableCell className="text-right">{prodotto.quantità}</TableCell>
                                <TableCell className="text-right font-medium">
                                  €{(prodotto.prezzo * prodotto.quantità).toFixed(2)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => rimuoviProdottoDallOrdine(prodotto.id)}
                                  >
                                    <Trash2 size={16} className="text-red-500" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-bold">Totale Ordine:</TableCell>
                              <TableCell className="text-right font-bold">€{calcolaTotaleOrdine().toFixed(2)}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground border rounded-md">
                        Nessun prodotto aggiunto all'ordine
                      </div>
                    )}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewOrderOpen(false)}>
                    Annulla
                  </Button>
                  <Button onClick={creaOrdine} disabled={!nuovoOrdine.fornitore || nuovoOrdine.prodotti.length === 0 || !nuovoOrdine.dataConsegna}>
                    Crea Ordine
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <TabsContent value="tutti" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <FileText size={20} className="text-muted-foreground" />
                    Elenco Ordini di Acquisto
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtra per stato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutti">Tutti gli stati</SelectItem>
                        <SelectItem value="In Attesa">In Attesa</SelectItem>
                        <SelectItem value="In Transito">In Transito</SelectItem>
                        <SelectItem value="Ricevuto">Ricevuto</SelectItem>
                        <SelectItem value="Annullato">Annullato</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="icon">
                      <Download size={18} />
                    </Button>
                  </div>
                </div>
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
                          <TableCell className="text-right space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedOrder(ordine);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye size={16} />
                            </Button>
                            
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            
                            {ordine.stato !== 'Annullato' && ordine.stato !== 'Ricevuto' && (
                              <Button variant="ghost" size="icon">
                                <XCircle size={16} className="text-red-500" />
                              </Button>
                            )}
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
          </TabsContent>
          
          <TabsContent value="in-corso" className="mt-0">
            <Card>
              <CardContent className="pt-6">
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
                      {ordini
                        .filter(ordine => ordine.stato === 'In Attesa' || ordine.stato === 'In Transito')
                        .filter(ordine => 
                          ordine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ordine.fornitore.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((ordine) => (
                          <TableRow key={ordine.id}>
                            <TableCell className="font-medium font-mono">{ordine.id}</TableCell>
                            <TableCell>{ordine.data}</TableCell>
                            <TableCell>{ordine.fornitore}</TableCell>
                            <TableCell>€{ordine.totale.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(ordine.stato)}</TableCell>
                            <TableCell>{ordine.dataConsegna}</TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedOrder(ordine);
                                  setIsDetailsOpen(true);
                                }}
                              >
                                <Eye size={16} />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <XCircle size={16} className="text-red-500" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completati" className="mt-0">
            <Card>
              <CardContent className="pt-6">
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
                      {ordini
                        .filter(ordine => ordine.stato === 'Ricevuto')
                        .filter(ordine => 
                          ordine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ordine.fornitore.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((ordine) => (
                          <TableRow key={ordine.id}>
                            <TableCell className="font-medium font-mono">{ordine.id}</TableCell>
                            <TableCell>{ordine.data}</TableCell>
                            <TableCell>{ordine.fornitore}</TableCell>
                            <TableCell>€{ordine.totale.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(ordine.stato)}</TableCell>
                            <TableCell>{ordine.dataConsegna}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setSelectedOrder(ordine);
                                  setIsDetailsOpen(true);
                                }}
                              >
                                <Eye size={16} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SlideUp>
      
      {/* Dialog per i dettagli dell'ordine */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Dettaglio Ordine #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Informazioni complete sull'ordine di acquisto.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Data Ordine</p>
                  <p className="font-medium">{selectedOrder.data}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fornitore</p>
                  <p className="font-medium">{selectedOrder.fornitore}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Stato</p>
                  <div>{getStatusBadge(selectedOrder.stato)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Data Consegna Prevista</p>
                  <p className="font-medium">{selectedOrder.dataConsegna}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Totale Ordine</p>
                  <p className="font-medium">€{selectedOrder.totale.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Prodotti Ordinati</h4>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Codice</TableHead>
                        <TableHead>Prodotto</TableHead>
                        <TableHead className="text-right">Prezzo</TableHead>
                        <TableHead className="text-right">Quantità</TableHead>
                        <TableHead className="text-right">Totale</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.prodotti.map((prodotto) => (
                        <TableRow key={prodotto.id}>
                          <TableCell className="font-mono">{prodotto.id}</TableCell>
                          <TableCell>{prodotto.nome}</TableCell>
                          <TableCell className="text-right">€{prodotto.prezzo.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{prodotto.quantità}</TableCell>
                          <TableCell className="text-right font-medium">
                            €{(prodotto.prezzo * prodotto.quantità).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-bold">Totale:</TableCell>
                        <TableCell className="text-right font-bold">
                          €{selectedOrder.totale.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Chiudi
                </Button>
                
                <div className="space-x-2">
                  {selectedOrder.stato !== 'Ricevuto' && selectedOrder.stato !== 'Annullato' && (
                    <>
                      <Button variant="outline">
                        <Edit size={16} className="mr-2" />
                        Modifica
                      </Button>
                      <Button>
                        <CheckCircle size={16} className="mr-2" />
                        Segna come Ricevuto
                      </Button>
                    </>
                  )}
                  
                  <Button variant="secondary">
                    <Download size={16} className="mr-2" />
                    Esporta PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
