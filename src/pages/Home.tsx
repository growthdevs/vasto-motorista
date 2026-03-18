import { Link, useLocation } from "wouter";
import { 
  Bell, 
  Wallet, 
  ArrowUpRight, 
  FileText, 
  Truck, 
  ChevronRight, 
  AlertTriangle,
  Home as HomeIcon,
  User,
  Eye,
  EyeOff,
  Plus,
  QrCode,
  ArrowRightLeft,
  Menu,
  HelpCircle,
  X,
  LogOut,
  Settings,
  Shield,
  CheckCircle2,
  Info,
  MapPin
} from "lucide-react";
import { useState } from "react";
import vastoLogoBlack from "@assets/vasto-logo-black_1765408289648.png";
import vastoLogoYellow from "@assets/vasto-logo-yellow_1765408289648.png";

import { Drawer } from "vaul";

export default function Home() {
  const [, setLocation] = useLocation();
  const [showBalance, setShowBalance] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  // Mock data
  const balance = "R$ 1.250,00";
  const hiddenBalance = "R$ ••••";
  
  const notifications = [
    {
      id: 1,
      title: "Cadastro em análise",
      message: "Seus documentos foram enviados e estão sendo analisados pela nossa equipe.",
      time: "2 horas atrás",
      read: false,
      type: "info"
    },
    {
      id: 2,
      title: "Novo frete disponível",
      message: "Um novo frete compatível com seu veículo foi encontrado na região de São Paulo.",
      time: "5 horas atrás",
      read: true,
      type: "success"
    },
    {
      id: 3,
      title: "Atualize seus dados",
      message: "Mantenha seu cadastro atualizado para receber mais ofertas de fretes.",
      time: "1 dia atrás",
      read: true,
      type: "warning"
    }
  ];

  const recentFreights = [
    {
      id: "FRT-9021",
      carrier: "TransLogística Express",
      origin: "R. Vergueiro, 1000 - Liberdade, SP",
      destination: "Av. Batel, 50 - Batel, Curitiba - PR",
      status: "Em andamento",
      value: "R$ 850,00",
      date: "Hoje",
      stops: [
        { address: "R. Vergueiro, 1000 - Liberdade, SP", type: "Coleta" },
        { address: "Av. Industrial, 500 - Santo André, SP", type: "Parada 1" },
        { address: "Av. Batel, 50 - Batel, Curitiba - PR", type: "Entrega" }
      ]
    },
    {
      id: "FRT-8820",
      carrier: "Logística Brasil Ltda",
      origin: "Rod. Anhanguera, km 100 - Campinas, SP",
      destination: "Av. Atlântica, 1500 - Copacabana, RJ",
      status: "Concluído",
      value: "R$ 1.100,00",
      date: "Ontem",
      stops: []
    },
    {
      id: "FRT-8100",
      carrier: "FastCargo Transportes",
      origin: "Porto de Santos, T3 - Santos, SP",
      destination: "Rua Augusta, 500 - Consolação, SP",
      status: "Concluído",
      value: "R$ 350,00",
      date: "08 Dez",
      stops: []
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={20} className="text-green-600" />;
      case 'warning': return <AlertTriangle size={20} className="text-yellow-600" />;
      default: return <Info size={20} className="text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch(type) {
      case 'success': return 'bg-green-100';
      case 'warning': return 'bg-yellow-100';
      default: return 'bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      
      {/* Fullscreen Notifications Overlay */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
               <h2 className="text-xl font-bold text-secondary">Notificações</h2>
               <button onClick={() => setIsNotificationsOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                 <X size={24} className="text-secondary" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto">
               {notifications.length > 0 ? (
                 <div className="divide-y divide-gray-100">
                   {notifications.map((notification) => (
                     <div key={notification.id} className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex gap-4">
                           <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${getNotificationBg(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                 <h3 className={`font-bold text-sm ${!notification.read ? 'text-secondary' : 'text-gray-600'}`}>
                                   {notification.title}
                                 </h3>
                                 <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                              </div>
                              <p className="text-sm text-gray-500 leading-relaxed">
                                {notification.message}
                              </p>
                           </div>
                           {!notification.read && (
                             <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></div>
                           )}
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
                    <Bell size={48} className="mb-4 opacity-20" />
                    <p>Nenhuma notificação por enquanto.</p>
                 </div>
               )}
            </div>
        </div>
      )}

      {/* Fullscreen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header with Close Button */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-end">
               <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                 <X size={24} className="text-secondary" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
                {/* Profile Section - Centered */}
                <div className="flex flex-col items-center mb-10">
                   <div className="h-24 w-24 rounded-full bg-secondary overflow-hidden border-4 border-primary mb-4 shadow-xl">
                      <img src="https://ui-avatars.com/api/?name=Jackson+Five&background=212121&color=FFDB33" alt="Perfil" className="w-full h-full object-cover" />
                   </div>
                   <h3 className="text-2xl font-bold text-secondary">Jackson Five</h3>
                   <Link href="/profile" className="text-sm text-gray-500 flex items-center gap-1 mt-2 font-medium hover:text-primary transition-colors bg-gray-100 px-4 py-1.5 rounded-full" onClick={() => setIsMenuOpen(false)}>
                      Ver perfil completo <ChevronRight size={14} />
                   </Link>
                </div>

                {/* Menu Items */}
                <nav className="space-y-3 w-full max-w-sm mx-auto">
                   <Link href="/home" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold text-lg transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                      <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center shadow-sm text-secondary">
                        <HomeIcon size={20} />
                      </div>
                      Início
                   </Link>
                   <Link href="/freights" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold text-lg transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                      <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center shadow-sm text-secondary">
                        <Truck size={20} />
                      </div>
                      Meus Fretes
                   </Link>
                   <Link href="/extract" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold text-lg transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                      <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center shadow-sm text-secondary">
                         <FileText size={20} />
                      </div>
                      Extrato
                   </Link>
                   <Link href="/transfer" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold text-lg transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                      <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center shadow-sm text-secondary">
                         <ArrowUpRight size={20} />
                      </div>
                      Transferir
                   </Link>
                   
                   <div className="h-px bg-gray-100 my-4" />
                   
                   <div className="grid grid-cols-2 gap-3">
                     <Link href="/help" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                        <HelpCircle size={24} className="text-gray-400" />
                        <span className="text-sm">Ajuda</span>
                     </Link>
                     <Link href="/terms" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                        <Shield size={24} className="text-gray-400" />
                        <span className="text-sm">Termos</span>
                     </Link>
                     <Link href="/settings" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-secondary font-bold transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                        <Settings size={24} className="text-gray-400" />
                        <span className="text-sm">Configurar</span>
                     </Link>
                      <Link href="/" className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-all active:scale-[0.98]" onClick={() => setIsMenuOpen(false)}>
                        <LogOut size={24} />
                        <span className="text-sm">Sair</span>
                     </Link>
                   </div>
                </nav>
            </div>

            {/* Footer */}
            <div className="p-6 text-center bg-white">
               <p className="text-xs text-gray-400 font-medium">
                  Versão 1.0.0 (Beta)
               </p>
            </div>
        </div>
      )}

      {/* Header - Cora Style (Clean, Light) */}
      <header className="px-6 pt-12 pb-2 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden border-2 border-primary cursor-pointer active:scale-95 transition-transform">
                <img src="https://ui-avatars.com/api/?name=Jackson+Five&background=212121&color=FFDB33" alt="Perfil" />
              </div>
            </Link>
            <div>
              <p className="text-xs text-gray-500 font-medium">Olá,</p>
              <h1 className="text-lg font-bold text-secondary leading-tight">Jackson Five</h1>
            </div>
          </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="text-gray-400 hover:text-secondary transition-colors relative"
          >
            <Bell size={24} />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-white"></span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-secondary hover:text-gray-600 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-8 pt-4">
        
        {/* Wallet Card */}
        <section className="px-6">
          <Link href="/wallet">
            <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground shadow-xl relative overflow-hidden active:scale-[0.99] transition-transform cursor-pointer">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-muted-foreground text-sm font-medium">Saldo em carteira</span>
                  <img src={vastoLogoYellow} alt="VASTO" className="h-4 object-contain" />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-primary">
                    {showBalance ? balance : hiddenBalance}
                  </h2>
                  <button onClick={(e) => { e.preventDefault(); setShowBalance(!showBalance); }} className="text-muted-foreground hover:text-secondary-foreground transition-colors p-1">
                    {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {/* Mini saldo a liberar */}
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Clock size={14} className="text-vasto-secundario-300" />
                  <span className="text-xs text-muted-foreground">A liberar:</span>
                  <span className="text-xs font-bold text-vasto-secundario-300">
                    {showBalance ? "R$ 3.480,00" : "••••"}
                  </span>
                  <ChevronRight size={14} className="text-muted-foreground ml-auto" />
                </div>
              </div>
              
              <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </Link>
        </section>

        {/* Quick Actions - Centered and Aligned */}
        <section className="px-6">
          <div className="flex justify-between items-center">
            
            <Link href="/transfer">
              <button className="flex flex-col items-center gap-2 w-[72px]">
                <div className="h-16 w-16 rounded-[18px] bg-secondary flex items-center justify-center shadow-lg shadow-gray-200 active:scale-95 transition-transform">
                  <ArrowUpRight className="text-primary" size={28} />
                </div>
                <span className="text-xs font-bold text-gray-700 text-center leading-tight">Transferir</span>
              </button>
            </Link>

            <Link href="/extract">
              <button className="flex flex-col items-center gap-2 w-[72px]">
                <div className="h-16 w-16 rounded-[18px] bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
                  <FileText className="text-secondary" size={28} />
                </div>
                <span className="text-xs font-bold text-gray-700 text-center leading-tight">Extrato</span>
              </button>
            </Link>

            <Link href="/freights">
              <button className="flex flex-col items-center gap-2 w-[72px]">
                <div className="h-16 w-16 rounded-[18px] bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
                  <Truck className="text-secondary" size={28} />
                </div>
                <span className="text-xs font-bold text-gray-700 text-center leading-tight">Fretes</span>
              </button>
            </Link>

            <Link href="/help">
              <button className="flex flex-col items-center gap-2 w-[72px]">
                <div className="h-16 w-16 rounded-[18px] bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
                   <HelpCircle className="text-secondary" size={28} />
                </div>
                <span className="text-xs font-bold text-gray-700 text-center leading-tight">Ajuda</span>
              </button>
            </Link>

          </div>
        </section>

         {/* Notification Banner - Etapa 2 */}
        <section className="px-6">
           <div className="bg-primary/10 border border-primary/40 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-bold text-secondary text-sm">Cadastro incompleto</h3>
              <p className="text-xs text-gray-600 mt-1">
                Precisamos de alguns dados adicionais para liberar algumas funções como transferência.
              </p>
              <Link href="/register/step-2">
                <button className="text-xs font-bold text-yellow-600 underline mt-2">
                  Finalizar cadastro
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Activity List */}
        <section className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-secondary">Últimos fretes</h3>
            <Link href="/freights">
              <button className="text-sm font-medium text-secondary hover:text-gray-600 underline decoration-gray-300 underline-offset-4">Ver todos</button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentFreights.map((freight) => (
              <div key={freight.id} className="bg-gray-50 rounded-2xl p-4 active:bg-gray-100 transition-colors border border-gray-100">
                
                {/* Header: Carrier and Status */}
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-gray-100 text-secondary shrink-0">
                        <Truck size={16} />
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide truncate">
                        {freight.carrier}
                      </span>
                   </div>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${
                      freight.status === "Em andamento" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}>
                      {freight.status}
                    </span>
                </div>

                {/* Route: Origin -> Stops -> Destination */}
                <div className="relative pl-2 space-y-4 mb-4">
                   {/* Origin */}
                   <div className="relative flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-1 relative z-10">
                         <div className="h-3 w-3 rounded-full border-2 border-gray-400 bg-white"></div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">Coleta</p>
                        <p className="text-sm font-bold text-secondary leading-tight">
                          {freight.origin}
                        </p>
                      </div>
                   </div>

                   {/* Stops Indicator (if any) */}
                   {freight.stops && freight.stops.length > 0 && (
                     <div className="relative flex items-center gap-3">
                        <div className="h-8 w-8 flex items-center justify-center shrink-0 relative z-10">
                           <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                        </div>
                        <button 
                          onClick={() => setSelectedRoute(freight)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                           <span className="text-xs font-bold text-gray-600">
                             + {freight.stops.length - 2} paradas
                           </span>
                           <ChevronRight size={12} className="text-gray-400" />
                        </button>
                     </div>
                   )}

                   {/* Destination */}
                   <div className="relative flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 mt-1 relative z-10">
                         <MapPin size={16} className="text-yellow-600 fill-yellow-600" />
                      </div>
                      <div>
                         <p className="text-xs text-gray-400 font-medium mb-0.5">Entrega</p>
                        <p className="text-sm font-bold text-secondary leading-tight">
                          {freight.destination}
                        </p>
                      </div>
                   </div>
                </div>

                {/* Footer: Date and Value */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                   <span className="text-xs text-gray-400 font-medium">
                     {freight.date}
                   </span>
                   <span className="text-lg font-bold text-secondary">
                     {freight.value}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* Route Details Modal */}
      <Drawer.Root open={!!selectedRoute} onOpenChange={(open) => !open && setSelectedRoute(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 h-auto fixed bottom-0 left-0 right-0 z-50 outline-none max-h-[85vh]">
             {selectedRoute && (
               <div className="p-6 flex-1 overflow-y-auto">
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                 
                 <div className="mb-6">
                    <h2 className="text-xl font-bold text-secondary mb-1">Rota Completa</h2>
                    <p className="text-sm text-gray-500">Frete {selectedRoute.id} • {selectedRoute.carrier}</p>
                 </div>

                 <div className="relative pl-4 space-y-8 pb-8">
                    {/* Continuous Line */}
                    <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-200"></div>

                    {selectedRoute.stops && selectedRoute.stops.map((stop: any, index: number) => (
                      <div key={index} className="relative flex items-start gap-4">
                         <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-1 relative z-10 border-2 bg-white ${
                            index === 0 ? 'border-gray-400' : 
                            index === selectedRoute.stops.length - 1 ? 'border-yellow-500 bg-yellow-50' : 
                            'border-gray-300'
                         }`}>
                            {index === selectedRoute.stops.length - 1 ? (
                              <MapPin size={12} className="text-yellow-600 fill-yellow-600" />
                            ) : (
                              <div className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
                            )}
                         </div>
                         <div>
                           <p className="text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wide">
                             {stop.type}
                           </p>
                           <p className="text-sm font-bold text-secondary leading-snug">
                             {stop.address}
                           </p>
                         </div>
                      </div>
                    ))}
                 </div>
               </div>
             )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}