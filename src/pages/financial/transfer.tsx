import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  Check,
  ChevronDown,
  Info,
  Sparkles,
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

  const quickAmounts = [50, 100, 200, 500];

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
      <div className="min-h-screen bg-secondary font-sans flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
        {/* Animated check */}
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mb-8 animate-in zoom-in duration-700">
          <Check size={40} strokeWidth={3} className="text-primary-foreground" />
        </div>

        <h2 className="text-2xl font-bold text-secondary-foreground text-center mb-2">
          Saque solicitado
        </h2>
        <p className="text-secondary-foreground/60 text-center text-sm max-w-[260px] mb-10 leading-relaxed">
          Você receberá <span className="font-bold text-secondary-foreground">R$ {fmt(netReceived)}</span> via Pix assim que processado.
        </p>

        {/* Mini receipt */}
        <div className="w-full max-w-xs bg-secondary-foreground/5 rounded-2xl p-5 mb-10 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-foreground/50">Debitado</span>
            <span className="font-semibold text-secondary-foreground">R$ {fmt(totalDebited)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary-foreground/50">Taxa</span>
            <span className="font-semibold text-secondary-foreground/70">- R$ {fmt(fee)}</span>
          </div>
          <div className="h-px bg-secondary-foreground/10" />
          <div className="flex justify-between text-sm">
            <span className="font-bold text-secondary-foreground">Pix</span>
            <span className="font-bold text-primary">R$ {fmt(netReceived)}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <PixIcon size={14} className="text-secondary-foreground/40" />
            <span className="text-xs text-secondary-foreground/40 truncate">{pixKey.value}</span>
          </div>
        </div>

        <Link href="/home" className="w-full max-w-xs block">
          <button className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold text-base active:scale-[0.97] transition-transform">
            Voltar ao início
          </button>
        </Link>
      </div>
    );
  }

  // ─── STEP 1: AMOUNT ───
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        {/* Top bar */}
        <header className="px-4 pt-12 pb-2 flex items-center gap-3">
          <button 
            onClick={() => setLocation('/home')}
            className="p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors rounded-xl"
          >
            <ArrowLeft size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5">
            <Wallet size={13} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">R$ {fmt(balance)}</span>
          </div>
        </header>

        {/* Amount section */}
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <p className="text-muted-foreground text-sm font-medium mb-8">Quanto quer sacar?</p>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-muted-foreground/30">R$</span>
            <input 
              type="text" 
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0,00"
              autoFocus
              className="bg-transparent text-foreground font-extrabold text-[52px] leading-none outline-none text-center w-full max-w-[250px] placeholder:text-muted-foreground/15 caret-primary"
            />
          </div>

          {/* Live fee calc */}
          {totalDebited > 0 && totalDebited <= balance && (
            <p className="text-sm text-muted-foreground animate-in fade-in duration-200">
              Recebe <span className="font-bold text-green-600">R$ {fmt(netReceived)}</span> <span className="text-muted-foreground/60">(-10% taxa)</span>
            </p>
          )}

          {totalDebited > balance && (
            <p className="text-sm text-destructive font-medium animate-in fade-in duration-200">
              Saldo insuficiente
            </p>
          )}

          {/* Quick pills */}
          <div className="flex gap-2 mt-8">
            {quickAmounts.map((val) => (
              <button
                key={val}
                onClick={() => handleQuickAmount(val)}
                className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  totalDebited === val 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="px-5 pb-8">
          {/* Pix destination */}
          <div className="flex items-center gap-3 mb-5 px-1">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <PixIcon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Pix · {pixLabel}</p>
              <p className="text-sm font-semibold text-foreground truncate">{pixKey.value}</p>
            </div>
          </div>

          <button 
            onClick={handleNextStep}
            disabled={!isAmountValid}
            className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.97] transition-all disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // ─── STEP 2: CONFIRM ───
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="px-4 pt-12 pb-2 flex items-center gap-3">
        <button 
          onClick={() => setStep(1)}
          className="p-2 -ml-2 text-foreground/70 hover:text-foreground transition-colors rounded-xl"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-base font-semibold text-foreground">Revisar saque</h1>
      </header>

      <main className="flex-1 flex flex-col px-5 pt-4">
        {/* Amount card */}
        <div className="bg-secondary rounded-2xl p-6 text-center mb-5">
          <p className="text-secondary-foreground/50 text-xs uppercase tracking-wider font-medium mb-2">Você recebe</p>
          <p className="text-4xl font-extrabold text-primary leading-none mb-1">R$ {fmt(netReceived)}</p>
          <p className="text-secondary-foreground/40 text-xs">via Pix</p>
        </div>

        {/* Details */}
        <div className="space-y-0">
          {[
            { label: "Valor do saque", value: `R$ ${fmt(totalDebited)}`, color: "text-foreground" },
            { label: "Taxa administrativa (10%)", value: `- R$ ${fmt(fee)}`, color: "text-destructive" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-3.5 border-b border-border">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
            </div>
          ))}
          
          {/* Pix key */}
          <div className="flex items-center gap-3 py-3.5 border-b border-border">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <PixIcon size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Chave Pix</p>
            </div>
            <p className="text-sm font-semibold text-foreground truncate max-w-[140px]">{pixKey.value}</p>
          </div>
        </div>

        {/* Info */}
        <div className="flex gap-2.5 mt-5 mb-auto">
          <Sparkles size={14} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Você será notificado assim que o Pix for creditado na sua conta.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-6 pb-8 space-y-3">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-14 bg-secondary text-secondary-foreground rounded-2xl font-bold text-base active:scale-[0.97] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sacar agora"
            )}
          </button>

          <button 
            onClick={() => setStep(1)}
            disabled={isSubmitting}
            className="w-full text-muted-foreground font-medium text-sm py-2 hover:text-foreground transition-colors disabled:opacity-70"
          >
            Alterar valor
          </button>
        </div>
      </main>
    </div>
  );
}
