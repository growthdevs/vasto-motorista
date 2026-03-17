import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  MapPin, 
  Truck, 
  Search,
  Filter,
  MoreVertical,
  Plus,
  Calendar as CalendarIcon,
  AlertTriangle,
  ChevronDown,
  Check
} from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";

import { differenceInDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function FreightsList() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("all"); // all, active, completed, cancelled
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState(10);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  // Filter states
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [dateError, setDateError] = useState("");
  const [selectedCarriers, setSelectedCarriers] = useState<string[]>([]);

  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    let newStart = type === 'start' ? date : startDate;
    let newEnd = type === 'end' ? date : endDate;
    
    if (type === 'start') setStartDate(date);
    else setEndDate(date);

    if (newStart && newEnd) {
        const diff = differenceInDays(newEnd, newStart);
        
        if (diff < 0) {
            setDateError("A data final deve ser posterior à inicial");
        } else if (diff > 30) {
            setDateError("O período máximo é de 30 dias");
        } else {
            setDateError("");
        }
    } else {
        setDateError("");
    }
  };

  const carriers = [
    "TransLogística Express",
    "Logística Brasil Ltda",
    "FastCargo Transportes",
    "Rodonaves Transportes",
    "Jamef Transportes"
  ];

  const freights = [
    {
      id: "FRT-9021",
      carrier: "TransLogística Express",
      origin: "R. Vergueiro, 1000 - Liberdade, SP",
      originTime: "Hoje, 08:00",
      destination: "Av. Batel, 50 - Batel, Curitiba - PR",
      status: "Em andamento",
      value: "R$ 850,00",
      date: "Hoje",
      hasExpenses: true,
      pendingExpenses: 1,
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
      originTime: "Ontem, 14:30",
      destination: "Av. Atlântica, 1500 - Copacabana, RJ",
      destinationTime: "Ontem, 20:00",
      status: "Concluído",
      value: "R$ 1.100,00",
      date: "Ontem",
      hasExpenses: true,
      pendingExpenses: 0,
      stops: []
    },
    {
      id: "FRT-8100",
      carrier: "FastCargo Transportes",
      origin: "Porto de Santos, T3 - Santos, SP",
      originTime: "08 Dez, 09:15",
      destination: "Rua Augusta, 500 - Consolação, SP",
      destinationTime: "08 Dez, 13:45",
      status: "Concluído",
      value: "R$ 350,00",
      date: "08 Dez",
      hasExpenses: false,
      pendingExpenses: 0,
      stops: []
    },
    {
      id: "FRT-7500",
      carrier: "Rodonaves Transportes",
      origin: "R. da Consolação, 200 - Centro, SP",
      originTime: "05 Dez, 10:00",
      destination: "Av. Paulista, 1000 - Bela Vista, SP",
      status: "Cancelado",
      value: "R$ 150,00",
      date: "05 Dez",
      hasExpenses: false,
      pendingExpenses: 0
    },
    // Adding more items for pagination demo
    ...Array.from({ length: 15 }).map((_, i) => ({
      id: `FRT-${7000 - i}`,
      carrier: carriers[i % carriers.length],
      origin: `Rua Exemplo, ${100 + i} - Bairro, Cidade - SP`,
      originTime: `0${i + 1} Dez, 08:00`,
      destination: `Av. Destino, ${500 + i} - Centro, Cidade - PR`,
      destinationTime: `0${i + 1} Dez, 18:00`,
      status: i % 3 === 0 ? "Em andamento" : "Concluído",
      value: `R$ ${500 + (i * 50)},00`,
      date: `0${i + 1} Dez`,
      hasExpenses: i % 4 === 0,
      pendingExpenses: 0
    }))
  ];

  const toggleCarrier = (carrier: string) => {
    if (selectedCarriers.includes(carrier)) {
      setSelectedCarriers(selectedCarriers.filter(c => c !== carrier));
    } else {
      setSelectedCarriers([...selectedCarriers, carrier]);
    }
  };

  const filteredFreights = freights.filter(f => {
    // Status Filter
    if (activeFilter === "active" && f.status !== "Em andamento") return false;
    if (activeFilter === "completed" && f.status !== "Concluído") return false;
    if (activeFilter === "cancelled" && f.status !== "Cancelado") return false;

    // Search Filter (Origin, Destination, Stops)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesOrigin = f.origin.toLowerCase().includes(query);
      const matchesDestination = f.destination.toLowerCase().includes(query);
      const matchesStops = 'stops' in f && f.stops && (f.stops as any[]).some((stop: any) => stop.address.toLowerCase().includes(query));
      
      if (!matchesOrigin && !matchesDestination && !matchesStops) return false;
    }

    // Carrier Filter
    if (selectedCarriers.length > 0 && !selectedCarriers.includes(f.carrier)) return false;

    // Date Range (Mock logic)
    if (startDate && endDate && !dateError) {
       // In a real app, parse `f.date` (which is like "Hoje", "08 Dez") to compare with range
       // For mock purposes, if a specific range is set, we'll just filter out everything that isn't hardcoded "Hoje" or "Ontem" for demo
       // This is just a placeholder logic to show filtering happens
       return true;
    }

    return true;
  });

  const displayedFreights = filteredFreights.slice(0, visibleItems);

  return (
    <div className="min-h-screen bg-white font-sans pb-6 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Meus Fretes</h1>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por endereço de origem, destino ou paradas" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 bg-gray-50 rounded-xl border-none text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-ellipsis"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className={`h-12 w-12 flex items-center justify-center rounded-xl transition-all ${
              selectedCarriers.length > 0 || (startDate && endDate) 
                ? "bg-secondary text-primary shadow-lg shadow-secondary/20" 
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto mt-4 pb-2 scrollbar-hide">
          {[
            { id: "all", label: "Todos" },
            { id: "active", label: "Em andamento" },
            { id: "completed", label: "Concluídos" },
            { id: "cancelled", label: "Cancelados" }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? "bg-secondary text-primary shadow-md shadow-secondary/10"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-6 space-y-4">
        {displayedFreights.length > 0 ? (
          <>
            {displayedFreights.map((freight) => (
              <div key={freight.id} className="bg-gray-50 rounded-2xl p-4 active:bg-gray-100 transition-colors border border-gray-100 relative group">
                
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
                      freight.status === "Em andamento" ? "bg-blue-100 text-blue-700" : 
                      freight.status === "Concluído" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
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
                        <div className="flex items-center gap-2 mb-0.5">
                           <p className="text-xs text-gray-400 font-medium">Coleta</p>
                           <span className="text-[10px] text-gray-400">• {freight.originTime}</span>
                        </div>
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
                           <ChevronDown size={12} className="text-gray-400" />
                        </button>
                     </div>
                   )}

                   {/* Destination */}
                   <div className="relative flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 mt-1 relative z-10">
                         <MapPin size={16} className="text-yellow-600 fill-yellow-600" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-0.5">
                           <p className="text-xs text-gray-400 font-medium">Entrega</p>
                           {freight.destinationTime && (
                             <span className="text-[10px] text-gray-400">• {freight.destinationTime}</span>
                           )}
                        </div>
                        <p className="text-sm font-bold text-secondary leading-tight">
                          {freight.destination}
                        </p>
                      </div>
                   </div>
                </div>

                {/* Footer: Date and Value */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 mb-2">
                   <span className="text-xs text-gray-400 font-medium">
                     {freight.date} • {freight.id}
                   </span>
                   <span className="text-lg font-bold text-secondary">
                     {freight.value}
                   </span>
                </div>

                {/* Expenses Link */}
                {(freight.status === "Em andamento" || freight.hasExpenses) && (
                   <Link href={`/freights/${freight.id}/expenses`}>
                     <button className="w-full py-3 mt-2 text-xs font-bold text-secondary hover:bg-gray-200/50 rounded-xl transition-colors flex items-center justify-center gap-1 border border-gray-200/50">
                        {freight.status === "Em andamento" ? (
                           <>
                              <Plus size={14} />
                              Solicitar despesa adicional
                              {freight.pendingExpenses > 0 && (
                                 <span className="h-4 w-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center ml-1">
                                    {freight.pendingExpenses}
                                 </span>
                              )}
                           </>
                        ) : (
                           <>
                              Ver despesas adicionais
                           </>
                        )}
                     </button>
                   </Link>
                )}
              </div>
            ))}

            {visibleItems < filteredFreights.length && (
               <button 
                  onClick={() => setVisibleItems(prev => prev + 10)}
                  className="w-full py-4 text-sm font-bold text-gray-500 hover:text-secondary transition-colors"
               >
                  Carregar mais fretes...
               </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
            <Truck size={48} className="mb-4 opacity-20" />
            <p>Nenhum frete encontrado.</p>
          </div>
        )}
      </main>

      {/* Filter Modal */}
      <Drawer.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 h-[85vh] fixed bottom-0 left-0 right-0 z-50 outline-none">
             <div className="p-6 flex-1 overflow-y-auto">
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
               
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-secondary">Filtrar Fretes</h2>
                  <button 
                     onClick={() => {
                        setStartDate(undefined);
                        setEndDate(undefined);
                        setDateError("");
                        setSelectedCarriers([]);
                     }}
                     className="text-sm font-bold text-gray-400 hover:text-primary transition-colors"
                  >
                     Limpar
                  </button>
               </div>

               <div className="space-y-8">
                  {/* Date Range */}
                  <div>
                     <h3 className="text-sm font-bold text-secondary mb-4 flex items-center gap-2">
                        <CalendarIcon size={18} />
                        Período de coleta
                     </h3>
                     <div className="flex gap-3">
                        <div className="flex-1 space-y-2">
                           <label className="text-xs font-bold text-gray-500">De</label>
                           <Popover>
                              <PopoverTrigger asChild>
                                <button className={cn(
                                  "w-full h-12 px-4 bg-gray-50 rounded-2xl border-none text-secondary font-medium outline-none transition-all flex items-center justify-start text-left",
                                  !startDate && "text-gray-400"
                                )}>
                                  <CalendarIcon size={16} className="mr-2 opacity-50" />
                                  {startDate ? format(startDate, "dd/MM/yyyy") : <span>Selecione</span>}
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={startDate}
                                  onSelect={(date) => handleDateChange('start', date)}
                                  initialFocus
                                  locale={ptBR}
                                />
                              </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-1 space-y-2">
                           <label className="text-xs font-bold text-gray-500">Até</label>
                           <Popover>
                              <PopoverTrigger asChild>
                                <button className={cn(
                                  "w-full h-12 px-4 bg-gray-50 rounded-2xl border-none text-secondary font-medium outline-none transition-all flex items-center justify-start text-left",
                                  !endDate && "text-gray-400"
                                )}>
                                  <CalendarIcon size={16} className="mr-2 opacity-50" />
                                  {endDate ? format(endDate, "dd/MM/yyyy") : <span>Selecione</span>}
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={(date) => handleDateChange('end', date)}
                                  initialFocus
                                  locale={ptBR}
                                />
                              </PopoverContent>
                            </Popover>
                        </div>
                     </div>
                     {dateError && (
                        <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                           <AlertTriangle size={12} />
                           {dateError}
                        </p>
                     )}
                     <p className="text-xs text-gray-400 mt-2">
                        Selecione um intervalo de até 30 dias.
                     </p>
                  </div>

                  {/* Carriers */}
                  <div>
                     <h3 className="text-sm font-bold text-secondary mb-4 flex items-center gap-2">
                        <Truck size={18} />
                        Transportadoras
                     </h3>
                     <div className="space-y-3">
                        {carriers.map((carrier) => (
                           <button
                              key={carrier}
                              onClick={() => toggleCarrier(carrier)}
                              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group"
                           >
                              <span className={`text-sm font-medium ${selectedCarriers.includes(carrier) ? "text-secondary font-bold" : "text-gray-600"}`}>
                                 {carrier}
                              </span>
                              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                 selectedCarriers.includes(carrier)
                                    ? "bg-primary border-primary"
                                    : "border-gray-300 group-hover:border-gray-400"
                              }`}>
                                 {selectedCarriers.includes(carrier) && <Check size={14} className="text-secondary" />}
                              </div>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
             </div>

             <div className="p-6 border-t border-gray-100 bg-white">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 active:scale-[0.98] transition-all"
                >
                   Aplicar Filtros
                </button>
             </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

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