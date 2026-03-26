import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  Check,
  Info,
  Wallet,
  X
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

  const handleAmountChange = (raw: string) => {
    const cleaned = raw.replace(/[^\d,]/g, '');
    setAmount(cleaned);
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
    }, 1800);
  };

  const totalDebited = parseFloat(amount.replace(/\./g, '').replace(',', '.')) || 0;
  const fee = totalDebited * 0.10;
  const netReceived = totalDebited - fee;
  
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isAmountValid = totalDebited > 0 && totalDebited <= balance;

  // ─── SUCCESS ───
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* Header */}
        <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <button onClick={() => setLocation('/home')} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <X size={24} className="text-secondary" />
          </button>
          <h1 className="text-xl font-bold text-secondary">Comprovante</h1>
        </header>

        <div className="flex-1 flex flex-col px-5">
          {/* Status icon */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Check size={20} strokeWidth={3} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Saque solicitado</h2>
              <p className="text-sm text-muted-foreground">Em processamento</p>
            </div>
          </div>

          {/* Value */}
          <div className="mb-8">
            <p className="text-[40px] font-extrabold text-foreground leading-none">
              R$ {fmt(netReceived)}
            </p>
          </div>

          {/* Details list - Nubank receipt style */}
          <div className="space-y-0">
            <div className="py-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-0.5">Valor debitado</p>
              <p className="text-sm font-semibold text-foreground">R$ {fmt(totalDebited)}</p>
            </div>
            <div className="py-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-0.5">Taxa administrativa</p>
              <p className="text-sm font-semibold text-destructive">- R$ {fmt(fee)}</p>
            </div>
            <div className="py-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-0.5">Tipo</p>
              <div className="flex items-center gap-2">
                <PixIcon size={14} className="text-foreground" />
                <p className="text-sm font-semibold text-foreground">Pix</p>
              </div>
            </div>
            <div className="py-4 border-b border-border">
              <p className="text-xs text-muted-foreground mb-0.5">Chave Pix · {pixLabel}</p>
              <p className="text-sm font-semibold text-foreground">{pixKey.value}</p>
            </div>
          </div>

          <div className="flex-1" />

          <div className="pb-8 pt-6">
            <Link href="/home" className="block">
              <button className="w-full h-14 bg-secondary text-secondary-foreground rounded-xl font-bold text-base active:scale-[0.98] transition-transform">
                Fechar
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
        {/* Header */}
        <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <button onClick={() => setLocation('/home')} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft size={24} className="text-secondary" />
          </button>
          <h1 className="text-xl font-bold text-secondary">Sacar saldo</h1>
        </header>

        <div className="flex-1 flex flex-col px-6">
          {/* Pix destination - moved up */}
          <div className="py-4 border-b border-border flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
              <PixIcon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Receber via Pix · {pixLabel}</p>
              <p className="text-sm font-semibold text-foreground truncate">{pixKey.value}</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-foreground mb-1">Qual o valor do saque?</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Saldo disponível <span className="font-semibold text-foreground">R$ {fmt(balance)}</span>
          </p>

          {/* Amount input */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-[32px] font-bold text-muted-foreground/25">R$</span>
            <input 
              type="text" 
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0,00"
              autoFocus
              className="bg-transparent text-foreground font-extrabold text-[32px] leading-none outline-none w-full placeholder:text-muted-foreground/20 caret-primary"
            />
          </div>
          
          {/* Underline */}
          <div className={`h-0.5 rounded-full transition-colors duration-300 mb-4 ${
            totalDebited > 0 ? (totalDebited > balance ? 'bg-destructive' : 'bg-primary') : 'bg-border'
          }`} />

          {/* Live fee preview */}
          {totalDebited > 0 && totalDebited <= balance && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="text-sm text-muted-foreground">
                Você recebe <span className="font-bold text-foreground">R$ {fmt(netReceived)}</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Taxa de 10% · R$ {fmt(fee)}
              </p>
            </div>
          )}

          {totalDebited > balance && (
            <p className="text-sm text-destructive font-medium animate-in fade-in duration-200">
              Valor acima do saldo disponível
            </p>
          )}

          <div className="flex-1" />

          {/* CTA */}
          <div className="pb-8">
            <button 
              onClick={handleNextStep}
              disabled={!isAmountValid}
              className="w-full h-14 bg-secondary text-secondary-foreground rounded-xl font-bold text-base active:scale-[0.98] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── STEP 2: CONFIRM ───
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => setStep(1)} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft size={24} className="text-secondary" />
        </button>
        <h1 className="text-xl font-bold text-secondary">Revisar saque</h1>
      </header>

      <div className="flex-1 flex flex-col px-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Revise o saque</h2>
        <p className="text-sm text-muted-foreground mb-8">Confira os dados antes de confirmar</p>

        {/* Amount */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground mb-1">Valor a receber</p>
          <p className="text-[36px] font-extrabold text-foreground leading-none">
            R$ {fmt(netReceived)}
          </p>
        </div>

        {/* Details - vertical list Nubank-style */}
        <div className="space-y-0">
          <div className="py-4 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">Valor do saque</span>
            <span className="text-sm font-semibold text-foreground">R$ {fmt(totalDebited)}</span>
          </div>
          <div className="py-4 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">Taxa (10%)</span>
            <span className="text-sm font-semibold text-destructive">- R$ {fmt(fee)}</span>
          </div>
          <div className="py-4 border-t border-border border-b flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
              <PixIcon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Chave Pix · {pixLabel}</p>
              <p className="text-sm font-semibold text-foreground truncate">{pixKey.value}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex gap-2 mt-5 mb-auto">
          <Info size={14} className="text-muted-foreground/50 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Você receberá uma notificação quando o Pix for creditado.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-6 pb-8 space-y-3">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 bg-secondary text-secondary-foreground rounded-xl font-bold text-base active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              "Confirmar saque"
            )}
          </button>

          <button 
            onClick={() => setStep(1)}
            disabled={isSubmitting}
            className="w-full text-muted-foreground font-medium text-sm py-2 hover:text-foreground transition-colors disabled:opacity-70"
          >
            Editar valor
          </button>
        </div>
      </div>
    </div>
  );
}
