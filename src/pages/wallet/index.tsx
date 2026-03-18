import { Link, useLocation } from "wouter";
import { ArrowLeft, Eye, EyeOff, ChevronRight, Zap, Clock, Wallet, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import vastoLogoYellow from "@assets/vasto-logo-yellow_1765408289648.png";

export default function WalletPage() {
  const [, setLocation] = useLocation();
  const [showBalance, setShowBalance] = useState(true);

  // Mock data
  const saldoDisponivel = 1250.0;
  const saldoALiberar = 3480.0;
  const totalGeral = saldoDisponivel + saldoALiberar;
  const taxaAntecipacao = 0.035; // 3.5%
  const valorAntecipavelLiquido = saldoALiberar * (1 - taxaAntecipacao);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const hiddenValue = "R$ ••••";

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => setLocation("/home")} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft size={24} className="text-secondary" />
        </button>
        <h1 className="text-xl font-bold text-secondary">Carteira</h1>
        <div className="ml-auto">
          <button onClick={() => setShowBalance(!showBalance)} className="text-muted-foreground hover:text-secondary transition-colors p-1">
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </header>

      <main className="space-y-6 pt-2">
        {/* Total Card */}
        <section className="px-6">
          <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-400">Seus saldos</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-white transition-colors p-1">
                    {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <img src={vastoLogoYellow} alt="VASTO" className="h-4 object-contain" />
                </div>
              </div>

              {/* Two balances */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Wallet size={14} className="text-primary" />
                    <span className="text-xs text-gray-400 font-medium">Disponível</span>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    {showBalance ? formatCurrency(saldoDisponivel) : "••••"}
                  </p>
                </div>
                <Link href="/wallet/release-schedule">
                  <div className="bg-white/10 rounded-xl p-3 active:bg-white/15 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">A liberar</span>
                      <ChevronRight size={14} className="text-gray-400 ml-auto group-active:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-lg font-bold text-white">
                      {showBalance ? formatCurrency(saldoALiberar) : "••••"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 bg-primary/10 rounded-full blur-xl" />
          </div>
        </section>

        {/* Anticipation CTA */}
        <section className="px-6">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Zap size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-secondary text-sm">Antecipe e receba hoje</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Você pode antecipar{" "}
                  <span className="font-bold text-secondary">
                    {showBalance ? formatCurrency(saldoALiberar) : "••••"}
                  </span>{" "}
                  e receber{" "}
                  <span className="font-bold text-secondary">
                    {showBalance ? formatCurrency(valorAntecipavelLiquido) : "••••"}
                  </span>{" "}
                  agora.
                </p>
              </div>
            </div>
            <Link href="/wallet/anticipate">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <Zap size={18} />
                Antecipar saldo
              </button>
            </Link>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="px-6">
          <div className="grid grid-cols-2 gap-3">
            <Link href="/wallet/release-schedule">
              <div className="bg-muted rounded-2xl p-4 flex items-center gap-3 active:bg-muted/80 transition-colors">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">A liberar</p>
                  <p className="text-xs text-muted-foreground">Ver detalhes</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground ml-auto" />
              </div>
            </Link>
            <Link href="/transfer">
              <div className="bg-muted rounded-2xl p-4 flex items-center gap-3 active:bg-muted/80 transition-colors">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <ArrowUpRight size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">Transferir</p>
                  <p className="text-xs text-muted-foreground">Saldo disponível</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground ml-auto" />
              </div>
            </Link>
          </div>
        </section>

        {/* Próximas liberações */}
        <section className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-secondary">Próximas liberações</h3>
            <Link href="/wallet/release-schedule">
              <button className="text-sm font-medium text-secondary hover:text-muted-foreground underline decoration-border underline-offset-4">Ver todos</button>
            </Link>
          </div>

          <div className="space-y-3">
            {[
              { id: "FRT-9021", value: 850, days: 3, date: "15 Mar 2026" },
              { id: "FRT-8820", value: 1100, days: 7, date: "19 Mar 2026" },
              { id: "FRT-8650", value: 1530, days: 10, date: "22 Mar 2026" },
            ].map((item) => (
              <div key={item.id} className="bg-muted rounded-2xl p-4 flex items-center gap-4 border border-border">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-secondary">{item.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Disponível em <span className="font-bold text-secondary">{item.days} dias</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-secondary">
                    {showBalance ? formatCurrency(item.value) : "••••"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
