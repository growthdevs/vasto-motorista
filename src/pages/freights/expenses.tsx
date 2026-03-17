import { Link, useLocation, useRoute } from "wouter";
import { 
  ArrowLeft, 
  MapPin, 
  Truck, 
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign,
  Info
} from "lucide-react";
import { useState } from "react";

export default function FreightExpenses() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/freights/:id/expenses");
  const freightId = params?.id || "FRT-9021";

  // Mock data - In a real app, verify if the freight is active
  const freight = {
    id: freightId,
    carrier: "TransLogística Express",
    origin: "R. Vergueiro, 1000 - Liberdade, SP",
    destination: "Av. Batel, 50 - Batel, Curitiba - PR",
    status: "Em andamento", // Could be "Concluído"
  };

  const isFreightActive = freight.status === "Em andamento";

  const expenses = [
    {
      id: 1,
      type: "Pedágio",
      amount: "R$ 45,90",
      date: "Hoje, 14:30",
      status: "pending", // pending, approved, rejected
      description: "Pedágio adicional não previsto na rota inicial devido a desvio."
    },
    {
      id: 2,
      type: "Abastecimento",
      amount: "R$ 350,00",
      date: "Hoje, 10:15",
      status: "approved",
      description: "Abastecimento emergencial autorizado."
    },
    {
      id: 3,
      type: "Estadia",
      amount: "R$ 120,00",
      date: "Ontem, 22:00",
      status: "rejected",
      description: "Pernoite não autorizado. O tempo de espera não excedeu 5 horas conforme contrato.",
      rejectionReason: "Pernoite não autorizado. O tempo de espera não excedeu 5 horas conforme contrato."
    }
  ];

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'approved':
        return {
          icon: <CheckCircle2 size={18} className="text-green-600" />,
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Aprovado"
        };
      case 'rejected':
        return {
          icon: <XCircle size={18} className="text-red-600" />,
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Reprovado"
        };
      default:
        return {
          icon: <Clock size={18} className="text-yellow-600" />,
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Em análise"
        };
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/freights">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-secondary">Despesas Adicionais</h1>
            <p className="text-xs text-gray-500 font-medium">Frete {freight.id}</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        
        {/* Info Box - Explanation */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex gap-3">
             <Info className="text-secondary shrink-0" size={20} />
             <div>
                <h3 className="text-sm font-bold text-secondary mb-1">Sobre Despesas Adicionais</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                   Use esta função para solicitar reembolso de custos não previstos no contrato inicial, como pedágios extras, pernoites não planejados ou manutenção emergencial.
                </p>
             </div>
          </div>
        </div>

        {/* Action Button - Only if active */}
        {isFreightActive && (
          <Link href={`/freights/${freightId}/expenses/new`}>
            <button className="w-full py-4 bg-secondary text-primary rounded-2xl font-bold shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-secondary/90 mb-8">
              <Plus size={20} />
              Nova Solicitação
            </button>
          </Link>
        )}

        {/* Expenses List */}
        <div>
          <h2 className="text-lg font-bold text-secondary mb-4">Solicitações Recentes</h2>
          
          <div className="space-y-4">
            {expenses.map((expense) => {
              const status = getStatusConfig(expense.status);
              const isExpanded = expandedId === expense.id;

              return (
                <div key={expense.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div 
                    className="p-4 flex items-center gap-4 cursor-pointer"
                    onClick={() => toggleExpand(expense.id)}
                  >
                    {/* Icon */}
                    <div className={`h-12 w-12 rounded-full ${status.bg} flex items-center justify-center shrink-0`}>
                      {status.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-secondary text-sm truncate">{expense.type}</h3>
                        <span className="font-bold text-secondary text-sm whitespace-nowrap">{expense.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                        <span className="text-xs text-gray-400">{expense.date}</span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="h-px bg-gray-100 mb-4"></div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold text-gray-400 mb-1">Descrição</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {expense.description}
                          </p>
                        </div>

                        {expense.status === 'rejected' && (
                          <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                            <p className="text-xs font-bold text-red-700 mb-1 flex items-center gap-1">
                              <XCircle size={12} />
                              Motivo da reprovação
                            </p>
                            <p className="text-xs text-red-600 leading-relaxed">
                              {expense.rejectionReason}
                            </p>
                          </div>
                        )}

                        {expense.status === 'pending' && (
                          <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                             <p className="text-xs text-yellow-700 leading-relaxed">
                              Para saber sobre a análise, contate a transportadora.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}