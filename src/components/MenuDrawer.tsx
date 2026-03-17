import { X, Truck, FileText, ArrowUpRight, HelpCircle, Shield, Settings, LogOut } from "lucide-react";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  if (!open) return null;

  const mainItems = [
    { icon: Truck, label: "Meus Fretes", bg: "bg-[#ffdb33]" },
    { icon: FileText, label: "Extrato", bg: "bg-[#ffdb33]" },
    { icon: ArrowUpRight, label: "Transferir", bg: "bg-[#ffdb33]" },
  ];

  const gridItems = [
    { icon: HelpCircle, label: "Ajuda", bg: "bg-[#f5f5f5]", textColor: "text-[#212121]" },
    { icon: Shield, label: "Termos", bg: "bg-[#f5f5f5]", textColor: "text-[#212121]" },
    { icon: Settings, label: "Configurar", bg: "bg-[#f5f5f5]", textColor: "text-[#212121]" },
    { icon: LogOut, label: "Sair", bg: "bg-[#fff1f2]", textColor: "text-[#dc2626]" },
  ];

  return (
    <div className="fixed inset-0 z-50 max-w-[430px] mx-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl animate-slide-up px-6 pt-4 pb-8">
        {/* Close */}
        <div className="flex justify-end mb-4">
          <button onClick={onClose}>
            <X className="w-5 h-5 text-[#737373]" />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#ffdb33] border-3 border-[#252525] flex items-center justify-center mb-3">
            <span className="text-xl font-bold text-[#252525]">EM</span>
          </div>
          <h3 className="text-lg font-semibold text-[#212121]">Erick Motora</h3>
          <button className="text-sm text-[#737373] mt-1 flex items-center gap-1">
            Ver perfil completo &gt;
          </button>
        </div>

        {/* Main menu items */}
        <div className="space-y-3 mb-6">
          {mainItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#e5e5e5]"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className="w-5 h-5 text-[#252525]" />
              </div>
              <span className="text-base font-medium text-[#212121]">{item.label}</span>
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
  );
};

export default MenuDrawer;
