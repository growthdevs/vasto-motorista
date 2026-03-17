import { X, Truck, FileText, ArrowUpRight, HelpCircle, Shield, Settings, LogOut } from "lucide-react";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  if (!open) return null;

  const mainItems = [
    { icon: Truck, label: "Meus Fretes" },
    { icon: FileText, label: "Extrato" },
    { icon: ArrowUpRight, label: "Transferir" },
  ];

  const gridItems = [
    { icon: HelpCircle, label: "Ajuda", bg: "bg-vasto-muted", textColor: "text-vasto-foreground" },
    { icon: Shield, label: "Termos", bg: "bg-vasto-muted", textColor: "text-vasto-foreground" },
    { icon: Settings, label: "Configurar", bg: "bg-vasto-muted", textColor: "text-vasto-foreground" },
    { icon: LogOut, label: "Sair", bg: "bg-vasto-vermelho-50", textColor: "text-vasto-vermelho" },
  ];

  return (
    <div className="fixed inset-0 z-50 max-w-[430px] mx-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Fullscreen sheet */}
      <div className="absolute inset-0 bg-white animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4">
          <div className="w-6" />
          <h1 className="text-base font-semibold text-vasto-foreground">Menu</h1>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-vasto-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-vasto-primario border-3 border-vasto-secundario flex items-center justify-center mb-3">
              <span className="text-xl font-bold text-vasto-secundario">EM</span>
            </div>
            <h3 className="text-lg font-semibold text-vasto-foreground">Erick Motora</h3>
            <button className="text-sm text-vasto-muted-foreground mt-1 flex items-center gap-1">
              Ver perfil completo &gt;
            </button>
          </div>

          {/* Main menu items */}
          <div className="space-y-3 mb-6">
            {mainItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-vasto-border"
              >
                <div className="w-10 h-10 rounded-xl bg-vasto-secundario flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-vasto-primario" />
                </div>
                <span className="text-base font-medium text-vasto-foreground">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Grid items */}
          <div className="grid grid-cols-2 gap-3">
            {gridItems.map((item) => (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-2 py-4 rounded-2xl ${item.bg}`}
              >
                <item.icon className={`w-5 h-5 ${item.textColor}`} />
                <span className={`text-sm font-medium ${item.textColor}`}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
