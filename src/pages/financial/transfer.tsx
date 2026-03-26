import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Info,
  ShieldCheck,
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

  const quickAmounts = [50, 100, 200, 500];

  const handleAmountChange = (raw: string) => {
    // Allow only numbers and comma
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

  // Step indicators
  const steps = ["Valor", "Confirmar"];

  // ─── SUCCESS SCREEN ───
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500">
        {/* Animated icon */}
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in duration-500">
            <Clock size={44} className="text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <PixIcon size={14} className="text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-secondary mb-3 text-center">
          Solicitação enviada!
        </h2>
        <p className="text-muted-foreground text-center mb-1 max-w-[280px] text-sm leading-relaxed">
          Seu saque de <span className="font-bold text-secondary">R$ {fmt(netReceived)}</span> está sendo processado.
        </p>
        <p className="text-muted-foreground/70 text-center mb-8 max-w-[280px] text-xs leading-relaxed">
          Você receberá uma notificação assim que o valor cair na sua chave Pix. Fique tranquilo!
        </p>
        
        {/* Receipt card */}
        <div className="w-full max-w-sm mb-8">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Pix destination */}
            <div className="p-4 flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary">
                <PixIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Destino</p>
                <p className="text-sm font-bold text-secondary truncate">{pixKey.value}</p>
              </div>
              <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{pixLabel}</span>
            </div>

            <div className="h-px bg-border mx-4" />

            {/* Summary rows */}
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Debitado</span>
                <span className="font-semibold text-secondary">R$ {fmt(totalDebited)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Taxa (10%)</span>
                <span className="font-semibold text-destructive">- R$ {fmt(fee)}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between text-sm">
                <span className="font-bold text-secondary">Recebido via Pix</span>
                <span className="font-bold text-green-600">R$ {fmt(netReceived)}</span>
              </div>
            </div>

            <div className="h-px bg-border mx-4" />

            {/* Status */}
            <div className="p-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-secondary">Em processamento</span>
            </div>
          </div>
        </div>

        <Link href="/home" className="w-full max-w-sm block">
          <button className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.98] transition-transform">
            Voltar ao Início
          </button>
        </Link>
      </div>
    );
  }

  // ─── MAIN FLOW ───
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col relative">
      {/* Header */}
      <header className="px-5 pt-12 pb-3 bg-background sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => step === 1 ? setLocation('/home') : setStep(1)}
            className="p-2 -ml-2 hover:bg-muted rounded-xl transition-colors text-secondary"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-lg font-bold text-secondary flex-1">Transferir</h1>
        </div>

        {/* Step indicator - inspired by Nubank/Wise */}
        <div className="flex items-center gap-2 mt-4">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i + 1 <= step ? 'bg-primary' : 'bg-border'
                }`} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {steps.map((label, i) => (
            <span key={label} className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              i + 1 <= step ? 'text-primary' : 'text-muted-foreground/50'
            }`}>{label}</span>
          ))}
        </div>
      </header>

      <main className="flex-1 flex flex-col px-5 pt-2">
        
        {/* ─── STEP 1: AMOUNT ─── */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Amount input area - Wise/Nubank style: centered, large */}
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <p className="text-sm text-muted-foreground font-medium mb-6">Quanto deseja sacar?</p>
              
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-2xl font-bold text-muted-foreground/40">R$</span>
                <input 
                  type="text" 
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0,00"
                  autoFocus
                  className="bg-transparent text-secondary font-bold text-[48px] leading-none outline-none text-center w-full max-w-[240px] placeholder:text-muted-foreground/20 caret-primary"
                />
              </div>

              {/* Balance indicator */}
              <div className="flex items-center gap-1.5 mt-3 mb-6">
                <Wallet size={14} className="text-muted-foreground/60" />
                <span className="text-xs text-muted-foreground">
                  Saldo disponível: <span className="font-bold text-secondary">R$ {formattedBalance}</span>
                </span>
              </div>

              {/* Quick amount chips - Nubank style */}
              <div className="flex gap-2 flex-wrap justify-center">
                {quickAmounts.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleQuickAmount(val)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all active:scale-95 ${
                      totalDebited === val 
                        ? 'bg-secondary text-secondary-foreground border-secondary' 
                        : 'bg-card text-secondary border-border hover:border-secondary/30'
                    }`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Pix key info - compact bottom card */}
            <div className="mb-4">
              <div className="bg-card rounded-xl p-3.5 border border-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0">
                  <PixIcon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground font-medium">Receber via Pix</p>
                  <p className="text-sm font-bold text-secondary truncate">{pixKey.value}</p>
                </div>
                <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <ShieldCheck size={14} />
                </div>
              </div>
            </div>

            {/* Error message */}
            {totalDebited > balance && (
              <p className="text-xs text-destructive font-medium text-center mb-3 animate-in fade-in duration-200">
                Valor excede o saldo disponível
              </p>
            )}

            {/* CTA */}
            <div className="pb-8">
              <button 
                onClick={handleNextStep}
                disabled={!isAmountValid}
                className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: CONFIRMATION ─── */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
            
            {/* Big amount header - Itaú/C6 style */}
            <div className="text-center pt-6 pb-8">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Valor do saque</p>
              <h2 className="text-[42px] font-extrabold text-secondary leading-none">
                R$ {fmt(totalDebited)}
              </h2>
            </div>

            {/* Details card */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
              {/* Destination */}
              <div className="p-4 flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0">
                  <PixIcon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Destino Pix</p>
                  <p className="text-sm font-bold text-secondary truncate">{pixKey.value}</p>
                </div>
                <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full shrink-0">{pixLabel}</span>
              </div>

              <div className="h-px bg-border" />

              {/* Fee breakdown */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Valor debitado</span>
                  <span className="text-sm font-semibold text-secondary">R$ {fmt(totalDebited)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Taxa administrativa (10%)</span>
                  <span className="text-sm font-semibold text-destructive">- R$ {fmt(fee)}</span>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-secondary">Você recebe</span>
                  <span className="text-lg font-extrabold text-green-600">R$ {fmt(netReceived)}</span>
                </div>
              </div>
            </div>

            {/* Info banner */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-3.5 flex gap-3 mb-auto">
              <Info className="text-primary shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] text-secondary/70 leading-relaxed">
                A transferência será processada via Pix. Você será notificado assim que o valor for creditado.
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
                  "Confirmar Saque"
                )}
              </button>

              <button 
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="w-full text-muted-foreground font-semibold text-sm py-2.5 hover:text-secondary transition-colors disabled:opacity-70"
              >
                Editar valor
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
