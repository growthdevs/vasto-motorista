import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Wallet
} from "lucide-react";
import PixIcon from "@/components/PixIcon";
import { useState } from "react";

export default function Transfer() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getPixKey = () => {
    try {
      const keys = JSON.parse(localStorage.getItem("pix-keys") || "[]");
      return keys.length > 0 ? keys[0] : { type: "cpf", value: "123.***.***-00" };
    } catch {
      return { type: "cpf", value: "123.***.***-00" };
    }
  };
  const pixKey = getPixKey();
  const pixLabel = pixKey.type === "cpf" ? "CPF" : pixKey.type === "email" ? "E-mail" : pixKey.type === "phone" ? "Celular" : "Chave Aleatória";

  const balance = 1250.00;
  const formattedBalance = balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const quickAmounts = [50, 100, 200, 500, 1000];

  const handleAmountChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d,]/g, '');
    setAmount(cleaned);
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  };

  const handleNextStep = () => {
    if (!amount) return;
    setStep(2);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const totalDebited = parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 0;
  const fee = totalDebited * 0.10;
  const netReceived = totalDebited - fee;
  
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isAmountValid = totalDebited > 0 && totalDebited <= balance;

  // ─── SUCCESS SCREEN ───
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* Green success header */}
        <div className="bg-secondary pt-16 pb-10 px-6 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-secondary-foreground/10 flex items-center justify-center mb-5 animate-in zoom-in duration-500">
            <CheckCircle2 size={36} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-secondary-foreground mb-2">
            Saque solicitado!
          </h2>
          <p className="text-secondary-foreground/70 text-sm max-w-[260px] leading-relaxed">
            Você será notificado assim que o Pix for creditado na sua conta.
          </p>
        </div>

        {/* Receipt */}
        <div className="flex-1 px-5 -mt-4">
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Amount */}
            <div className="p-5 text-center border-b border-border">
              <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Você receberá</p>
              <p className="text-3xl font-extrabold text-green-600">R$ {fmt(netReceived)}</p>
            </div>

            {/* Details list */}
            <div className="divide-y divide-border">
              <div className="px-5 py-3.5 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Valor debitado</span>
                <span className="text-sm font-semibold text-foreground">R$ {fmt(totalDebited)}</span>
              </div>
              <div className="px-5 py-3.5 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Taxa (10%)</span>
                <span className="text-sm font-semibold text-destructive">- R$ {fmt(fee)}</span>
              </div>
              <div className="px-5 py-3.5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <PixIcon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Chave Pix</p>
                  <p className="text-sm font-semibold text-foreground truncate">{pixKey.value}</p>
                </div>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{pixLabel}</span>
              </div>
              <div className="px-5 py-3.5 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Em processamento</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 pb-8">
            <Link href="/home" className="block">
              <button className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.98] transition-transform">
                Voltar ao Início
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 1: AMOUNT ───
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* Dark header with amount */}
        <div className="bg-secondary pt-12 pb-8 px-5">
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => setLocation('/home')}
              className="p-1.5 -ml-1.5 text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-base font-semibold text-secondary-foreground">Sacar saldo</h1>
          </div>

          {/* Big input */}
          <div className="flex flex-col items-center">
            <p className="text-secondary-foreground/50 text-xs font-medium mb-4 uppercase tracking-wider">Valor do saque</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-semibold text-secondary-foreground/30">R$</span>
              <input 
                type="text" 
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0,00"
                autoFocus
                className="bg-transparent text-secondary-foreground font-extrabold text-[44px] leading-none outline-none text-center w-full max-w-[220px] placeholder:text-secondary-foreground/15 caret-primary"
              />
            </div>
            
            {/* Balance */}
            <div className="flex items-center gap-1.5 mt-4">
              <Wallet size={13} className="text-secondary-foreground/40" />
              <span className="text-xs text-secondary-foreground/50">
                Disponível: <span className="font-bold text-secondary-foreground/80">R$ {formattedBalance}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-5 pt-5">
          {/* Quick amounts - horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mb-5">
            {quickAmounts.map((val) => (
              <button
                key={val}
                onClick={() => handleQuickAmount(val)}
                className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                  totalDebited === val 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-card text-foreground border-border'
                }`}
              >
                R$ {val}
              </button>
            ))}
          </div>

          {/* Fee preview */}
          {totalDebited > 0 && totalDebited <= balance && (
            <div className="bg-card rounded-xl border border-border p-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground">Taxa (10%)</span>
                <span className="text-xs font-semibold text-destructive">- R$ {fmt(fee)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">Você recebe</span>
                <span className="text-sm font-extrabold text-green-600">R$ {fmt(netReceived)}</span>
              </div>
            </div>
          )}

          {/* Pix key */}
          <button className="bg-card rounded-xl border border-border p-3.5 flex items-center gap-3 w-full text-left mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <PixIcon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Receber via Pix</p>
              <p className="text-sm font-bold text-foreground truncate">{pixKey.value}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
          </button>

          {/* Error */}
          {totalDebited > balance && (
            <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-3 flex items-center gap-2 mb-4 animate-in fade-in duration-200">
              <Info size={14} className="text-destructive shrink-0" />
              <p className="text-xs text-destructive font-medium">Valor excede o saldo disponível</p>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          <div className="pb-8 pt-4">
            <button 
              onClick={handleNextStep}
              disabled={!isAmountValid}
              className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Revisar saque
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 2: CONFIRMATION ───
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 bg-background">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setStep(1)}
            className="p-1.5 -ml-1.5 text-foreground hover:text-foreground/70 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-base font-semibold text-foreground">Confirmar saque</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col px-5">
        {/* Amount highlight */}
        <div className="py-6 text-center">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Valor a receber</p>
          <p className="text-[40px] font-extrabold text-green-600 leading-none">R$ {fmt(netReceived)}</p>
        </div>

        {/* Breakdown card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <div className="divide-y divide-border">
            {/* From */}
            <div className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <Minus size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Debitado do saldo</p>
                <p className="text-base font-bold text-foreground">R$ {fmt(totalDebited)}</p>
              </div>
            </div>

            {/* Fee */}
            <div className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-destructive/5 flex items-center justify-center text-destructive shrink-0">
                <span className="text-xs font-bold">10%</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Taxa administrativa</p>
                <p className="text-base font-bold text-destructive">- R$ {fmt(fee)}</p>
              </div>
            </div>

            {/* To */}
            <div className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <PixIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Receber via Pix · {pixLabel}</p>
                <p className="text-sm font-bold text-foreground truncate">{pixKey.value}</p>
              </div>
              <Plus size={16} className="text-green-600 shrink-0" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-accent rounded-xl p-3.5 flex gap-3 mb-auto">
          <Info className="text-primary shrink-0 mt-0.5" size={15} />
          <p className="text-[11px] text-accent-foreground/70 leading-relaxed">
            O valor será transferido via Pix. Você receberá uma notificação quando o pagamento for processado.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-6 pb-8 space-y-3">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <PixIcon size={18} className="text-primary" />
                Confirmar saque
              </>
            )}
          </button>

          <button 
            onClick={() => setStep(1)}
            disabled={isSubmitting}
            className="w-full text-muted-foreground font-semibold text-sm py-2 hover:text-foreground transition-colors disabled:opacity-70"
          >
            Editar valor
          </button>
        </div>
      </main>
    </div>
  );
}
