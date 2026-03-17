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
      statusColor: "bg-vasto-secundario/20 text-vasto-foreground",
      coleta: "R. Vergueiro, 1000 – Liberdade, SP",
      paradas: 1,
      entrega: "Av. Batel, 50 – Batel, Curitiba – PR",
      data: "Hoje",
      valor: "R$ 850,00",
    },
    {
      empresa: "LOGÍSTICA BRASIL LTDA",
      status: "Concluído",
      statusColor: "bg-vasto-verde-50 text-vasto-verde",
      coleta: "Rod. Anhanguera, km 100 – Campinas, SP",
      paradas: 0,
      entrega: "Av. Atlântica, 1500 – Copacabana, RJ",
      data: "Ontem",
      valor: "R$ 1.200,00",
    },
  ];

  return (
    <div className="relative w-full min-h-screen max-w-[430px] mx-auto bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-vasto-border">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-vasto-primario border-2 border-vasto-secundario flex items-center justify-center">
              <span className="text-sm font-bold text-vasto-secundario">EM</span>
            </div>
            <div>
              <p className="text-xs text-vasto-muted-foreground">Olá,</p>
              <p className="text-base font-semibold text-vasto-foreground">Erick Motora</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setNotifOpen(true)} className="relative p-2">
              <Bell className="w-5 h-5 text-vasto-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-vasto-secundario rounded-full" />
            </button>
            <button onClick={() => setMenuOpen(true)} className="p-2">
              <Menu className="w-5 h-5 text-vasto-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Balance card */}
      <div className="mx-5 mt-5 mb-6 rounded-2xl bg-gradient-to-r from-vasto-primario to-vasto-primario-700 p-5 relative overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-white/70">Saldo em carteira</p>
          <div className="bg-vasto-secundario rounded px-2 py-0.5">
            <img src={vastoLogo} alt="VASTO" className="h-4 object-contain" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-vasto-secundario">
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
                ? "bg-vasto-primario"
                : "bg-white border border-vasto-border"
            }`}>
              <action.icon className={`w-5 h-5 ${action.active ? "text-vasto-secundario" : "text-vasto-muted-foreground"}`} />
            </div>
            <span className="text-xs text-vasto-foreground font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent shipments */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-vasto-foreground italic">Últimos fretes</h2>
          <button className="text-sm font-semibold text-vasto-foreground underline underline-offset-2">
            Ver todos
          </button>
        </div>

        <div className="space-y-4 pb-8">
          {fretes.map((frete, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-vasto-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-vasto-muted-foreground" />
                  <span className="text-xs font-semibold text-vasto-foreground uppercase">{frete.empresa}</span>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${frete.statusColor}`}>
                  {frete.status}
                </span>
              </div>

              <div className="relative pl-5 space-y-3">
                <div className="relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-vasto-muted-foreground bg-white" />
                  <p className="text-[10px] text-vasto-muted-foreground">Coleta</p>
                  <p className="text-sm text-vasto-foreground">{frete.coleta}</p>
                </div>

                <div className="absolute left-[-14px] top-4 bottom-4 w-px bg-vasto-border" />

                {frete.paradas > 0 && (
                  <div className="relative">
                    <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-vasto-muted" />
                    <button className="text-xs text-vasto-muted-foreground font-medium">
                      + {frete.paradas} paradas &gt;
                    </button>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-vasto-vermelho" />
                  <p className="text-[10px] text-vasto-muted-foreground">Entrega</p>
                  <p className="text-sm text-vasto-foreground">{frete.entrega}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-vasto-border">
                <span className="text-xs text-vasto-muted-foreground">{frete.data}</span>
                <span className="text-base font-bold text-vasto-foreground">{frete.valor}</span>
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
