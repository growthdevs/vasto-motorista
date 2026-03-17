import { X, Info, CheckCircle, AlertTriangle } from "lucide-react";

interface NotificacoesSheetProps {
  open: boolean;
  onClose: () => void;
}

const notificacoes = [
  {
    icon: Info,
    iconBg: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    title: "Cadastro em análise",
    description: "Seus documentos foram enviados e estão sendo analisados pela nossa equipe.",
    time: "2 horas atrás",
    unread: true,
  },
  {
    icon: CheckCircle,
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    title: "Novo frete disponível",
    description: "Um novo frete compatível com seu veículo foi encontrado na região de São Paulo.",
    time: "5 horas atrás",
    unread: false,
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#f59e0b]",
    title: "Atualize seus dados",
    description: "Mantenha seu cadastro atualizado para receber mais ofertas de fretes.",
    time: "1 dia atrás",
    unread: false,
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#f59e0b]",
    title: "Atualize seus dados",
    description: "Mantenha seu cadastro atualizado para receber mais ofertas de fretes.",
    time: "1 dia atrás",
    unread: false,
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#fef3c7]",
    iconColor: "text-[#f59e0b]",
    title: "Atualize seus dados",
    description: "Mantenha seu cadastro atualizado para receber mais ofertas de fretes.",
    time: "1 dia atrás",
    unread: false,
  },
];

const NotificacoesSheet = ({ open, onClose }: NotificacoesSheetProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 max-w-[430px] mx-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Full screen sheet */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e8f0f8] to-white animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="w-6" />
          <h1 className="text-base font-semibold text-[#212121]">Notificações</h1>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-[#212121]" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <div className="space-y-1">
            {notificacoes.map((notif, i) => (
              <div
                key={i}
                className="flex gap-3 py-4 border-b border-[#e5e5e5] last:border-0"
              >
                <div className={`w-10 h-10 rounded-full ${notif.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <notif.icon className={`w-5 h-5 ${notif.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#212121]">{notif.title}</h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-[#737373]">{notif.time}</span>
                      {notif.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#ffdb33]" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">{notif.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificacoesSheet;
