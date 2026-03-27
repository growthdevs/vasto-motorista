import { Link, useLocation } from "wouter";
import { ArrowLeft, Clock, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface FreightRelease {
  id: string;
  value: number;
  date: string;
  daysLeft: number;
  carrier: string;
  anticipated: boolean;
}

export default function ReleaseSchedule() {
  const [, setLocation] = useLocation();

  const items: FreightRelease[] = [
    { id: "FRT-9021", value: 850, date: "15 Mar 2026", daysLeft: 3, carrier: "TransLogística Express", anticipated: false },
    { id: "FRT-8820", value: 1100, date: "19 Mar 2026", daysLeft: 7, carrier: "Logística Brasil Ltda", anticipated: false },
    { id: "FRT-8650", value: 1530, date: "22 Mar 2026", daysLeft: 10, carrier: "FastCargo Transportes", anticipated: false },
    { id: "FRT-8400", value: 720, date: "25 Mar 2026", daysLeft: 13, carrier: "Rodo Express", anticipated: false },
    { id: "FRT-7900", value: 480, date: "12 Mar 2026", daysLeft: 0, carrier: "TransLogística Express", anticipated: true },
  ];

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const pendingItems = items.filter((i) => !i.anticipated);
  const anticipatedItems = items.filter((i) => i.anticipated);
  const totalPending = pendingItems.reduce((s, i) => s + i.value, 0);

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => setLocation("/wallet")} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft size={24} className="text-secondary" />
        </button>
        <h1 className="text-xl font-bold text-secondary">Saldo a liberar</h1>
      </header>

      <main className="space-y-6 pt-2">
        {/* Summary */}
        <section className="px-6">
          <div className="bg-secondary rounded-2xl p-5 text-secondary-foreground">
            <span className="text-sm text-muted-foreground font-medium">Total a liberar</span>
            <h2 className="text-2xl font-bold text-primary mt-1">{formatCurrency(totalPending)}</h2>
            <p className="text-xs text-muted-foreground mt-2">
              {pendingItems.length} fretes com valores retidos
            </p>
          </div>
        </section>

        {/* Pending list */}
        <section className="px-6">
          <h3 className="font-bold text-lg text-secondary mb-4">Aguardando liberação</h3>
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div key={item.id} className="bg-background rounded-2xl border border-border overflow-hidden">
                {/* Top: Full-width header with value */}
                <div className="px-4 pt-4 pb-3 flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <Clock size={14} className="text-primary" />
                      </div>
                      <p className="text-sm font-bold text-secondary">{item.id}</p>
                    </div>
                    <p className="text-xs text-muted-foreground ml-9">{item.carrier}</p>
                  </div>
                  <p className="text-lg font-bold text-secondary whitespace-nowrap">{formatCurrency(item.value)}</p>
                </div>

                {/* Bottom bar: Date + Action */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/5 border-t border-border">
                  <span className="text-[11px] text-muted-foreground">
                    Disponível em <span className="font-bold text-secondary">{item.daysLeft} dias</span> · {item.date}
                  </span>
                  <Link href={`/wallet/anticipate?freight=${item.id}`}>
                    <button className="text-[11px] font-bold text-primary bg-secondary px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform">
                      <Zap size={11} /> Antecipar
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anticipated */}
        {anticipatedItems.length > 0 && (
          <section className="px-6">
            <h3 className="font-bold text-lg text-secondary mb-4">Antecipados</h3>
            <div className="space-y-3">
              {anticipatedItems.map((item) => (
                <div key={item.id} className="bg-muted rounded-2xl p-4 border border-border opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-alert-success-bg flex items-center justify-center shrink-0">
                      <CheckCircle2 size={18} className="text-alert-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-secondary">{item.id}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.carrier}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-secondary">{formatCurrency(item.value)}</p>
                      <span className="text-[10px] font-bold text-alert-success">Antecipado</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
