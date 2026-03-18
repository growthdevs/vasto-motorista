import { useLocation } from "wouter";
import { ArrowLeft, Zap, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState, useMemo } from "react";

interface FreightItem {
  id: string;
  value: number;
  daysLeft: number;
  date: string;
  carrier: string;
}

export default function Anticipate() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const TAXA = 0.035; // 3.5%

  const freights: FreightItem[] = [
    { id: "FRT-9021", value: 850, daysLeft: 3, date: "15 Mar 2026", carrier: "TransLogística Express" },
    { id: "FRT-8820", value: 1100, daysLeft: 7, date: "19 Mar 2026", carrier: "Logística Brasil Ltda" },
    { id: "FRT-8650", value: 1530, daysLeft: 10, date: "22 Mar 2026", carrier: "FastCargo Transportes" },
    { id: "FRT-8400", value: 720, daysLeft: 13, date: "25 Mar 2026", carrier: "Rodo Express" },
  ];

  // Check URL for pre-selected freight
  useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const freightId = params.get("freight");
    if (freightId) {
      setSelectedIds(new Set([freightId]));
    }
  }, []);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const toggleFreight = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === freights.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(freights.map((f) => f.id)));
    }
  };

  const selectedFreights = freights.filter((f) => selectedIds.has(f.id));
  const valorBruto = selectedFreights.reduce((s, f) => s + f.value, 0);
  const taxaTotal = valorBruto * TAXA;
  const valorLiquido = valorBruto - taxaTotal;

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center px-6 text-center">
        <div className="h-20 w-20 rounded-full bg-alert-success-bg flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-alert-success" />
        </div>
        <h1 className="text-2xl font-bold text-secondary mb-2">Antecipação realizada!</h1>
        <p className="text-muted-foreground text-sm mb-2">
          {selectedFreights.length} frete{selectedFreights.length > 1 ? "s" : ""} antecipado{selectedFreights.length > 1 ? "s" : ""} com sucesso.
        </p>
        <p className="text-sm text-muted-foreground mb-1">
          Valor creditado no saldo disponível:
        </p>
        <p className="text-3xl font-bold text-foreground mb-8">{formatCurrency(valorLiquido)}</p>
        <button onClick={() => setLocation("/wallet")} className="w-full btn-primary">
          Voltar para Carteira
        </button>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="min-h-screen bg-white font-sans pb-24">
        <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <button onClick={() => setStep("select")} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft size={24} className="text-secondary" />
          </button>
          <h1 className="text-xl font-bold text-secondary">Confirmar antecipação</h1>
        </header>

        <main className="px-6 space-y-6 pt-4">
          {/* Summary */}
          <div className="bg-secondary rounded-2xl p-6 text-secondary-foreground">
            <h3 className="text-sm text-muted-foreground font-medium mb-4">Resumo da antecipação</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Valor bruto</span>
                <span className="text-base font-bold text-secondary-foreground">{formatCurrency(valorBruto)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Taxa de antecipação ({(TAXA * 100).toFixed(1)}%)</span>
                <span className="text-base font-bold text-destructive">- {formatCurrency(taxaTotal)}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-secondary-foreground">Valor líquido a receber</span>
                <span className="text-xl font-bold text-primary">{formatCurrency(valorLiquido)}</span>
              </div>
            </div>
          </div>

          {/* Selected freights */}
          <div>
            <h3 className="font-bold text-sm text-secondary mb-3">
              Fretes selecionados ({selectedFreights.length})
            </h3>
            <div className="space-y-2">
              {selectedFreights.map((f) => (
                <div key={f.id} className="bg-muted rounded-xl p-3 flex items-center justify-between border border-border">
                  <div>
                    <p className="text-sm font-bold text-secondary">{f.id}</p>
                    <p className="text-xs text-muted-foreground">{f.carrier}</p>
                  </div>
                  <p className="text-sm font-bold text-secondary">{formatCurrency(f.value)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-alert-warning-bg border border-alert-warning-border rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-alert-warning shrink-0 mt-0.5" />
            <p className="text-xs text-secondary">
              Após confirmar, o valor líquido será creditado no seu saldo disponível e não poderá ser revertido.
            </p>
          </div>

          {/* CTA */}
          <button onClick={() => setStep("success")} className="w-full btn-primary flex items-center justify-center gap-2">
            <Zap size={18} />
            Confirmar antecipação
          </button>
        </main>
      </div>
    );
  }

  // Step: select
  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => setLocation("/wallet")} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft size={24} className="text-secondary" />
        </button>
        <h1 className="text-xl font-bold text-secondary">Antecipar saldo</h1>
      </header>

      <main className="px-6 space-y-6 pt-4">
        <p className="text-sm text-muted-foreground">
          Selecione os fretes que deseja antecipar. O valor será creditado no seu saldo disponível.
        </p>

        {/* Select all */}
        <button
          onClick={selectAll}
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-[0.98] ${
            selectedIds.size === freights.length
              ? "border-primary bg-accent text-secondary"
              : "border-border bg-muted text-muted-foreground"
          }`}
        >
          <Zap size={16} />
          {selectedIds.size === freights.length ? "Desmarcar tudo" : "Antecipar tudo"}
        </button>

        {/* Freight list */}
        <div className="space-y-3">
          {freights.map((f) => {
            const isSelected = selectedIds.has(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggleFreight(f.id)}
                className={`w-full text-left rounded-2xl p-4 border-2 transition-all active:scale-[0.98] ${
                  isSelected
                    ? "border-primary bg-accent"
                    : "border-border bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-border bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={14} className="text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-secondary">{f.id}</p>
                    <p className="text-xs text-muted-foreground truncate">{f.carrier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-secondary">{formatCurrency(f.value)}</p>
                    <p className="text-[10px] text-muted-foreground">em {f.daysLeft} dias</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom summary */}
        {selectedIds.size > 0 && (
          <div className="bg-secondary rounded-2xl p-5 text-secondary-foreground space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Valor bruto</span>
              <span className="font-bold">{formatCurrency(valorBruto)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxa ({(TAXA * 100).toFixed(1)}%)</span>
              <span className="font-bold text-destructive">- {formatCurrency(taxaTotal)}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between">
              <span className="text-sm font-bold">Você recebe</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(valorLiquido)}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setStep("confirm")}
          disabled={selectedIds.size === 0}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Zap size={18} />
          Continuar ({selectedIds.size} selecionado{selectedIds.size !== 1 ? "s" : ""})
        </button>
      </main>
    </div>
  );
}
