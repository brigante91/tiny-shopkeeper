
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FadeIn, SlideUp } from '@/components/ui/motion';
import { Settings, Bell, Shield, Database, Store, Printer, CreditCard } from 'lucide-react';
import { toast } from "sonner";

export const SettingsPage = () => {
  // Stati delle impostazioni con valori predefiniti
  const [storeSettings, setStoreSettings] = useState({
    name: 'Mini Market',
    address: 'Via Roma 123, Milano',
    email: 'info@minimarket.it',
    phone: '+39 02 1234567',
    vatNumber: 'IT12345678901',
  });
  
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    lowStock: true,
    newOrders: true,
    systemUpdates: false,
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90, // giorni
    sessionTimeout: 30, // minuti
  });
  
  const [receiptSettings, setReceiptSettings] = useState({
    showLogo: true,
    showVAT: true,
    additionalFooterText: 'Grazie per il tuo acquisto!',
  });

  const [paymentMethods, setPaymentMethods] = useState({
    cash: true,
    creditCard: true,
    bankTransfer: true,
    digitalWallet: false,
  });
  
  const handleSaveStoreSettings = () => {
    // Qui andrebbe implementata la logica per salvare le impostazioni
    toast.success("Impostazioni del negozio salvate con successo");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Preferenze di notifica aggiornate");
  };
  
  const handleSaveSecurity = () => {
    toast.success("Impostazioni di sicurezza aggiornate");
  };
  
  const handleSaveReceipt = () => {
    toast.success("Impostazioni scontrino aggiornate");
  };
  
  const handleSavePayments = () => {
    toast.success("Metodi di pagamento aggiornati");
  };
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground mt-2">Configura il tuo Mini Market.</p>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SlideUp delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Store size={20} className="text-muted-foreground" />
              <div>
                <CardTitle>Informazioni Negozio</CardTitle>
                <CardDescription>Configura i dettagli principali del tuo negozio</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Nome Negozio</Label>
                <Input 
                  id="store-name" 
                  value={storeSettings.name} 
                  onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Indirizzo</Label>
                <Input 
                  id="store-address" 
                  value={storeSettings.address} 
                  onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-email">Email</Label>
                <Input 
                  id="store-email" 
                  type="email"
                  value={storeSettings.email} 
                  onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-phone">Telefono</Label>
                <Input 
                  id="store-phone" 
                  value={storeSettings.phone} 
                  onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-vat">Partita IVA</Label>
                <Input 
                  id="store-vat" 
                  value={storeSettings.vatNumber} 
                  onChange={(e) => setStoreSettings({...storeSettings, vatNumber: e.target.value})}
                />
              </div>
              
              <Button onClick={handleSaveStoreSettings} className="w-full">Salva Informazioni</Button>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Bell size={20} className="text-muted-foreground" />
              <div>
                <CardTitle>Notifiche</CardTitle>
                <CardDescription>Gestisci le tue preferenze di notifica</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="low-stock">Avvisi Scorta Bassa</Label>
                  <p className="text-sm text-muted-foreground">Ricevi notifiche quando i prodotti stanno per esaurirsi</p>
                </div>
                <Switch 
                  id="low-stock" 
                  checked={notificationsEnabled.lowStock}
                  onCheckedChange={(checked) => setNotificationsEnabled({...notificationsEnabled, lowStock: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-orders">Nuovi Ordini</Label>
                  <p className="text-sm text-muted-foreground">Ricevi notifiche per i nuovi ordini di acquisto</p>
                </div>
                <Switch 
                  id="new-orders" 
                  checked={notificationsEnabled.newOrders}
                  onCheckedChange={(checked) => setNotificationsEnabled({...notificationsEnabled, newOrders: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">Aggiornamenti Sistema</Label>
                  <p className="text-sm text-muted-foreground">Ricevi notifiche sugli aggiornamenti del sistema</p>
                </div>
                <Switch 
                  id="system-updates" 
                  checked={notificationsEnabled.systemUpdates}
                  onCheckedChange={(checked) => setNotificationsEnabled({...notificationsEnabled, systemUpdates: checked})}
                />
              </div>
              
              <Button onClick={handleSaveNotifications} className="w-full mt-4">Salva Preferenze</Button>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.3}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Shield size={20} className="text-muted-foreground" />
              <div>
                <CardTitle>Sicurezza</CardTitle>
                <CardDescription>Configura le impostazioni di sicurezza</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticazione a Due Fattori</Label>
                  <p className="text-sm text-muted-foreground">Aggiunge un livello extra di sicurezza</p>
                </div>
                <Switch 
                  id="two-factor" 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="password-expiry">Scadenza Password (giorni)</Label>
                <Input 
                  id="password-expiry" 
                  type="number"
                  min="0"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout Sessione (minuti)</Label>
                <Input 
                  id="session-timeout" 
                  type="number"
                  min="1"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <Button onClick={handleSaveSecurity} className="w-full">Salva Impostazioni</Button>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.4}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Printer size={20} className="text-muted-foreground" />
              <div>
                <CardTitle>Scontrino</CardTitle>
                <CardDescription>Personalizza il formato degli scontrini</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-logo">Mostra Logo</Label>
                <Switch 
                  id="show-logo" 
                  checked={receiptSettings.showLogo}
                  onCheckedChange={(checked) => setReceiptSettings({...receiptSettings, showLogo: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-vat">Mostra Partita IVA</Label>
                <Switch 
                  id="show-vat" 
                  checked={receiptSettings.showVAT}
                  onCheckedChange={(checked) => setReceiptSettings({...receiptSettings, showVAT: checked})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer-text">Testo Piè di Pagina</Label>
                <Input 
                  id="footer-text" 
                  value={receiptSettings.additionalFooterText}
                  onChange={(e) => setReceiptSettings({...receiptSettings, additionalFooterText: e.target.value})}
                />
              </div>
              
              <Button onClick={handleSaveReceipt} className="w-full">Salva Impostazioni</Button>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.5}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CreditCard size={20} className="text-muted-foreground" />
              <div>
                <CardTitle>Metodi di Pagamento</CardTitle>
                <CardDescription>Configura i metodi di pagamento accettati</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="cash-payment">Contanti</Label>
                <Switch 
                  id="cash-payment" 
                  checked={paymentMethods.cash}
                  onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, cash: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="card-payment">Carta di Credito</Label>
                <Switch 
                  id="card-payment" 
                  checked={paymentMethods.creditCard}
                  onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, creditCard: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="transfer-payment">Bonifico Bancario</Label>
                <Switch 
                  id="transfer-payment" 
                  checked={paymentMethods.bankTransfer}
                  onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, bankTransfer: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="digital-payment">Portafoglio Digitale</Label>
                <Switch 
                  id="digital-payment" 
                  checked={paymentMethods.digitalWallet}
                  onCheckedChange={(checked) => setPaymentMethods({...paymentMethods, digitalWallet: checked})}
                />
              </div>
              
              <Button onClick={handleSavePayments} className="w-full">Salva Impostazioni</Button>
            </CardContent>
          </Card>
        </SlideUp>
        
        <SlideUp delay={0.6}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Database size={20} className="text-muted-foreground" />
              <div>
                <CardTitle>Database</CardTitle>
                <CardDescription>Gestisci i dati del tuo negozio</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">Esporta Dati</Button>
              <Button variant="outline" className="w-full">Importa Dati</Button>
              <Button variant="outline" className="w-full">Backup Database</Button>
              <Button variant="destructive" className="w-full">Ripristina Database</Button>
            </CardContent>
          </Card>
        </SlideUp>
      </div>
    </div>
  );
};
