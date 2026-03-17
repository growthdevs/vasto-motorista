import { useState } from "react";
import { Bell, Menu, ArrowUpRight, FileText, Truck, HelpCircle, Eye, EyeOff } from "lucide-react";
import MenuDrawer from "@/components/MenuDrawer";
import NotificacoesSheet from "@/components/NotificacoesSheet";
import vastoLogo from "@/assets/vasto-logo-yellow.png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showSaldo, setShowSaldo] = useState(true);

  const quickActions = [
    { icon: ArrowUpRight, label: "Transferir", active: true },
    { icon: FileText, label: "Extrato", active: false },
    { icon: Truck, label: "Fretes", active: false },
    { icon: HelpCircle, label: "Ajuda", active: false },
  ];

  const fretes = [
    {
      empresa: "TRANSLOGÍSTICA EXPRESS",
      status: "Em andamento",
      statusColor: "bg-[#ffdb33]/20 text-[#212121]",
      coleta: "R. Vergueiro, 1000 – Liberdade, SP",
      paradas: 1,
      entrega: "Av. Batel, 50 – Batel, Curitiba – PR",
      data: "Hoje",
      valor: "R$ 850,00",
    },
    {
      empresa: "LOGÍSTICA BRASIL LTDA",
      status: "Concluído",
      statusColor: "bg-[#dcfce7] text-[#16a34a]",
      coleta: "Rod. Anhanguera, km 100 – Campinas, SP",
      paradas: 0,
      entrega: "Av. Atlântica, 1500 – Copacabana, RJ",
      data: "Ontem",
      valor: "R$ 1.200,00",
    },
  ];

  return (
    <div className="relative w-full min-h-screen max-w-[430px] mx-auto bg-gradient-to-b from-[#e8f0f8] to-[#fafafa]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#ffdb33] border-2 border-[#252525] flex items-center justify-center">
            <span className="text-sm font-bold text-[#252525]">EM</span>
          </div>
          <div>
            <p className="text-xs text-[#737373]">Olá,</p>
            <p className="text-base font-semibold text-[#212121]">Erick Motora</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setNotifOpen(true)} className="relative p-2">
            <Bell className="w-5 h-5 text-[#212121]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ffdb33] rounded-full" />
          </button>
          <button onClick={() => setMenuOpen(true)} className="p-2">
            <Menu className="w-5 h-5 text-[#212121]" />
          </button>
        </div>
      </div>

      {/* Balance card */}
      <div className="mx-5 mb-6 rounded-2xl bg-gradient-to-r from-[#252525] to-[#1d1d1d] p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-white/70">Saldo em carteira</p>
          <div className="bg-[#ffdb33] rounded px-2 py-0.5">
            <img src={vastoLogo} alt="VASTO" className="h-4 object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold text-white">
            {showSaldo ? "R$ 1.250,00" : "R$ ••••••"}
          </p>
          <button onClick={() => setShowSaldo(!showSaldo)} className="text-white/60">
            {showSaldo ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex justify-between px-5 mb-8">
        {quickActions.map((action) => (
          <button key={action.label} className="flex flex-col items-center gap-2">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              action.active
                ? "bg-[#252525]"
                : "bg-white border border-[#e5e5e5]"
            }`}>
              <action.icon className={`w-5 h-5 ${action.active ? "text-[#ffdb33]" : "text-[#737373]"}`} />
            </div>
            <span className="text-xs text-[#212121] font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent shipments */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#212121] italic">Últimos fretes</h2>
          <button className="text-sm font-semibold text-[#212121] underline underline-offset-2">
            Ver todos
          </button>
        </div>

        <div className="space-y-4 pb-8">
          {fretes.map((frete, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-[#e5e5e5]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#737373]" />
                  <span className="text-xs font-semibold text-[#212121] uppercase">{frete.empresa}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${frete.statusColor}`}>
                  {frete.status}
                </span>
              </div>

              {/* Route */}
              <div className="relative pl-5 space-y-3">
                {/* Coleta */}
                <div className="relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-[#737373] bg-white" />
                  <p className="text-[10px] text-[#737373]">Coleta</p>
                  <p className="text-sm text-[#212121]">{frete.coleta}</p>
                </div>

                {/* Vertical line */}
                <div className="absolute left-[-14px] top-4 bottom-4 w-px bg-[#e5e5e5]" />

                {/* Paradas */}
                {frete.paradas > 0 && (
                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[#e5e5e5]" />
                    <button className="text-xs text-[#737373] font-medium">
                      + {frete.paradas} paradas &gt;
                    </button>
                  </div>
                )}

                {/* Entrega */}
                <div className="relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-[#dc2626]" />
                  <p className="text-[10px] text-[#737373]">Entrega</p>
                  <p className="text-sm text-[#212121]">{frete.entrega}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e5e5e5]">
                <span className="text-xs text-[#737373]">{frete.data}</span>
                <span className="text-base font-bold text-[#212121]">{frete.valor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drawers */}
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <NotificacoesSheet open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};

export default Home;
