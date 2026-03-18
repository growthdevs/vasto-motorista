import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar as CalendarIcon,
  AlertTriangle,
  Eye,
  EyeOff,
  Share2,
  X,
  FileText } from
"lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import { differenceInDays, format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger } from
"@/components/ui/popover";
import { cn } from "@/lib/utils";
import vastoLogoYellow from "@assets/vasto-logo-yellow_1765408289648.png";
import { useToast } from "@/hooks/use-toast";

export default function Extract() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all"); // all, credit, debit
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Filter states
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [dateError, setDateError] = useState("");

  const balance = "R$ 1.250,00";
  const hiddenBalance = "R$ ••••";

  // Mock transactions
  const allTransactions = [
  {
    id: "TRX-1001",
    type: "credit",
    description: "Pagamento Frete FRT-8820",
    entity: "Logística Brasil Ltda",
    date: new Date(), // Hoje
    amount: "R$ 1.100,00",
    status: "Concluído"
  },
  {
    id: "TRX-1002",
    type: "debit",
    description: "Transferência Pix",
    entity: "Jackson Five",
    date: subDays(new Date(), 1), // Ontem
    amount: "R$ 350,00",
    status: "Concluído"
  },
  {
    id: "TRX-1003",
    type: "credit",
    description: "Reembolso Despesa #402",
    entity: "FastCargo Transportes",
    date: subDays(new Date(), 2),
    amount: "R$ 45,50",
    status: "Concluído"
  },
  {
    id: "TRX-1004",
    type: "debit",
    description: "Taxa de Transferência",
    entity: "VASTO Pagamentos",
    date: subDays(new Date(), 1),
    amount: "R$ 35,00",
    status: "Concluído"
  },
  {
    id: "TRX-1005",
    type: "credit",
    description: "Pagamento Frete FRT-8100",
    entity: "FastCargo Transportes",
    date: subDays(new Date(), 5),
    amount: "R$ 350,00",
    status: "Concluído"
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `TRX-${2000 + i}`,
    type: i % 3 === 0 ? "debit" : "credit",
    description: i % 3 === 0 ? "Transferência Pix" : `Pagamento Frete FRT-${7000 + i}`,
    entity: i % 3 === 0 ? "Jackson Five" : "Transportadora Exemplo",
    date: subDays(new Date(), 10 + i),
    amount: `R$ ${200 + i * 50},00`,
    status: "Concluído"
  }))];


  const handleDateChange = (type: 'start' | 'end', date: Date | undefined) => {
    let newStart = type === 'start' ? date : startDate;
    let newEnd = type === 'end' ? date : endDate;

    if (type === 'start') setStartDate(date);else
    setEndDate(date);

    if (newStart && newEnd) {
      const diff = differenceInDays(newEnd, newStart);

      if (diff < 0) {
        setDateError("A data final deve ser posterior à inicial");
      } else if (diff > 90) {
        setDateError("O período máximo é de 90 dias");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  };

  const filteredTransactions = allTransactions.filter((t) => {
    // Type Filter
    if (activeFilter === "credit" && t.type !== "credit") return false;
    if (activeFilter === "debit" && t.type !== "debit") return false;

    // Date Range Filter (Mock logic)
    if (startDate && endDate && !dateError) {
      // In a real app, compare t.date with range
      // For mock purposes, if a specific range is set, we'll just filter slightly to simulate
      return true;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white font-sans pb-6 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/home">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Extrato</h1>
        </div>

        {/* Wallet Card */}
        <div className="bg-secondary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden mb-6">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-sm font-medium">Saldo disponível</span>
              <img src={vastoLogoYellow} alt="VASTO" className="h-4 object-contain" />
            </div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-primary">
                {showBalance ? balance : hiddenBalance}
              </h2>
              <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-white transition-colors p-1">
                {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-primary/10 rounded-full blur-xl"></div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
            <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
              {[
            { id: "all", label: "Todos" },
            { id: "credit", label: "Entradas" },
            { id: "debit", label: "Saídas" }].
            map((filter) =>
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === filter.id ?
              "bg-secondary text-primary shadow-md shadow-secondary/10" :
              "bg-gray-50 text-gray-500 hover:bg-gray-100"}`
              }>
              
                  {filter.label}
                </button>
            )}
            </div>
            
            <div className="w-px h-6 bg-gray-200 mx-1"></div>

            <button
            onClick={() => setIsFilterOpen(true)}
            className={`h-9 px-3 rounded-full flex items-center justify-center transition-all gap-2 ${
            startDate && endDate ?
            "bg-secondary text-primary shadow-md shadow-secondary/10" :
            "bg-gray-50 text-gray-500 hover:bg-gray-100"}`
            }>
            
              <CalendarIcon size={16} />
              <span className="text-xs font-bold">Data</span>
            </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-4 space-y-4">
        {filteredTransactions.length > 0 ?
        <div className="space-y-4">
              {/* Group by date logic could go here, for now simple list */}
              {filteredTransactions.map((trx) =>
          <button
            key={trx.id}
            onClick={() => setSelectedTransaction(trx)}
            className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-xl">
            
                   <div className="flex items-center gap-4 text-left">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
              trx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`
              }>
                         {trx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-secondary mb-0.5">{trx.description}</p>
                         <p className="text-xs text-gray-400">{trx.entity} • {format(trx.date, "dd MMM", { locale: ptBR })}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className={`text-sm font-bold ${trx.type === 'credit' ? 'text-green-600' : 'text-secondary'}`}>
                         {trx.type === 'credit' ? '+' : '-'} {trx.amount}
                      </p>
                   </div>
                </button>
          )}
           </div> :

        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
            <Filter size={48} className="mb-4 opacity-20" />
            <p>Nenhuma transação encontrada para este filtro.</p>
          </div>
        }
      </main>

      {/* Filter Modal (Date Only) */}
      <Drawer.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 h-auto fixed bottom-0 left-0 right-0 z-50 outline-none">
             <div className="p-6">
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
               
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-secondary">Filtrar por Data</h2>
                  <button
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                    setDateError("");
                  }}
                  className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">
                  
                     Limpar
                  </button>
               </div>

               <div className="space-y-8">
                  {/* Date Range */}
                  <div>
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
                            locale={ptBR} />
                          
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
                            locale={ptBR} />
                          
                              </PopoverContent>
                            </Popover>
                        </div>
                     </div>
                     {dateError &&
                  <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                           <AlertTriangle size={12} />
                           {dateError}
                        </p>
                  }
                     <p className="text-xs text-gray-400 mt-2">
                        Selecione um intervalo de até 90 dias.
                     </p>
                  </div>
               </div>

               <div className="pt-8">
                  <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 active:scale-[0.98] transition-all">
                  
                     Aplicar Filtros
                  </button>
               </div>
             </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* Transaction Details Modal */}
      <Drawer.Root open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 h-auto fixed bottom-0 left-0 right-0 z-50 outline-none">
             {selectedTransaction &&
            <div className="p-6">
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
                 
                 <div className="text-center mb-8">
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                selectedTransaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`
                }>
                       {selectedTransaction.type === 'credit' ? <ArrowDownLeft size={32} /> : <ArrowUpRight size={32} />}
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Valor da transação</p>
                    <h2 className="text-3xl font-bold text-secondary">{selectedTransaction.amount}</h2>
                 </div>

                 <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-500">Tipo</span>
                       <span className="font-bold text-secondary capitalize">{selectedTransaction.type === 'credit' ? 'Entrada' : 'Saída'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-500">Data</span>
                       <span className="font-bold text-secondary">{format(selectedTransaction.date, "dd/MM/yyyy 'às' HH:mm")}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-500">Descrição</span>
                       <span className="font-bold text-secondary">{selectedTransaction.description}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-500">{selectedTransaction.type === 'credit' ? 'Origem' : 'Destino'}</span>
                       <span className="font-bold text-secondary">{selectedTransaction.entity}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-gray-500">ID da Transação</span>
                       <span className="font-bold text-gray-400 font-mono text-xs">{selectedTransaction.id}</span>
                    </div>
                 </div>

                 {selectedTransaction.type === 'debit' &&
              <button
                onClick={() => {
                  toast({ description: "Comprovante compartilhado com sucesso!" });
                  setSelectedTransaction(null);
                }}
                className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                
                       <Share2 size={20} />
                       Compartilhar Comprovante
                    </button>
              }
               </div>
            }
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>);

}