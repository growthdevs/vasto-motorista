import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  Info,
  Key,
  Copy
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface PixKey {
  id: string;
  type: 'cpf' | 'email' | 'celular' | 'aleatoria';
  value: string;
}

const pixTypeLabels: Record<string, string> = {
  cpf: 'CPF',
  email: 'E-mail',
  celular: 'Celular',
  aleatoria: 'Chave Aleatória',
};

export default function Transfer() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pixKeys, setPixKeys] = useState<PixKey[]>([]);
  const [selectedKey, setSelectedKey] = useState<PixKey | null>(null);

  const balance = "1.250,00";

  useEffect(() => {
    const stored = localStorage.getItem("pix_keys");
    if (stored) {
      const keys: PixKey[] = JSON.parse(stored);
      setPixKeys(keys);
      if (keys.length > 0) setSelectedKey(keys[0]);
    }
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleNextStep = () => {
    if (!amount || !selectedKey) return;
    setStep(2);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const totalDebited = parseFloat(amount.replace(',', '.')) || 0;
  const fee = totalDebited * 0.10;
  const netReceived = totalDebited - fee;
  
  const formattedFee = fee.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedNetReceived = netReceived.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedTotalDebited = totalDebited.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">Solicitação Enviada!</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          Sua solicitação de transferência de <span className="font-bold text-green-600">R$ {formattedNetReceived}</span> foi enviada com sucesso. Você será notificado quando for finalizada.
        </p>
        
        {selectedKey && (
          <div className="bg-muted rounded-2xl p-4 w-full max-w-sm mb-8 border border-border">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
              <div className="h-10 w-10 rounded-full bg-white border border-border flex items-center justify-center text-secondary">
                <Key size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Chave Pix destino</p>
                <p className="text-sm font-bold text-secondary">{pixTypeLabels[selectedKey.type]}</p>
                <p className="text-xs text-muted-foreground">{selectedKey.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info size={14} />
              <span>Aguardando processamento</span>
            </div>
          </div>
        )}

        <Link href="/home" className="w-full max-w-sm block">
          <button className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all">
            Voltar ao Início
          </button>
        </Link>
      </div>
    );
  }

  if (pixKeys.length === 0) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Link href="/home">
              <button className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors text-secondary">
                <ArrowLeft size={24} />
              </button>
            </Link>
            <h1 className="text-xl font-bold text-secondary">Transferir</h1>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center px-6 pt-20 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Key size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-secondary mb-2">Nenhuma chave Pix cadastrada</h2>
          <p className="text-sm text-muted-foreground mb-6">Cadastre uma chave Pix para poder realizar transferências.</p>
          <Link href="/profile/edit-bank">
            <button className="h-12 px-6 bg-secondary text-primary rounded-xl font-bold">
              Cadastrar Chave Pix
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-12 relative">
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => step === 1 ? setLocation("/home") : setStep(1)} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors text-secondary">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-secondary">Transferir</h1>
        </div>
      </header>

      <main className="px-6 pt-4">
        
        {/* Step 1: Chave + Valor */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
             
            {/* Pix Key Selection */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-muted-foreground">Chave Pix de destino</p>
              {pixKeys.map((key) => (
                <button
                  key={key.id}
                  onClick={() => setSelectedKey(key)}
                  className={`w-full rounded-xl p-4 border flex items-center gap-3 text-left transition-all ${
                    selectedKey?.id === key.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                    selectedKey?.id === key.id ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Key size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium">{pixTypeLabels[key.type]}</p>
                    <p className="text-sm font-bold text-secondary truncate">{key.value}</p>
                  </div>
                  {selectedKey?.id === key.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <label className="text-2xl font-bold text-secondary block text-center">Quanto quer transferir?</label>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-muted-foreground">R$</span>
                <input 
                  type="text" 
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0,00"
                  autoFocus
                  className="w-full h-24 pl-12 pr-4 bg-transparent border-b-2 border-border text-secondary font-bold text-5xl focus:border-primary outline-none transition-all placeholder:text-muted-foreground/30"
                />
              </div>
              
              <p className="text-sm text-muted-foreground text-center font-medium">
                Disponível: <span className="text-secondary font-bold">R$ {balance}</span>
              </p>
            </div>

            <div className="pt-8">
              <button 
                onClick={handleNextStep}
                disabled={!amount || !selectedKey}
                className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && selectedKey && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             
            <div className="text-center mb-6">
              <p className="text-muted-foreground text-lg mb-2">Total a debitar</p>
              <h2 className="text-4xl font-bold text-secondary mb-2">R$ {amount}</h2>
            </div>

            <div className="bg-muted rounded-2xl p-6 border border-border space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">Destino</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-white border border-border flex items-center justify-center text-secondary shrink-0">
                  <Key size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{pixTypeLabels[selectedKey.type]}</p>
                  <h4 className="font-bold text-secondary text-lg truncate">{selectedKey.value}</h4>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(selectedKey.value);
                    toast({ description: "Chave copiada!" });
                  }}
                  className="ml-auto p-2 hover:bg-white/50 rounded-lg transition-colors text-muted-foreground"
                >
                  <Copy size={16} />
                </button>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Valor debitado da carteira</span>
                  <span className="font-bold text-secondary">R$ {formattedTotalDebited}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Taxa Administrativa (10%)</span>
                  <span className="font-bold text-red-600">- R$ {formattedFee}</span>
                </div>
                <div className="flex justify-between items-center text-base pt-2 border-t border-border/50">
                  <span className="font-bold text-secondary">Valor a receber</span>
                  <span className="font-bold text-green-600">R$ {formattedNetReceived}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <Info className="text-blue-600 shrink-0" size={20} />
              <p className="text-xs text-blue-700 leading-relaxed">
                Após confirmar, sua solicitação será processada e você será notificado quando a transferência for concluída.
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Confirmar Transferência"
                )}
              </button>

              <button 
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="w-full text-secondary font-bold text-sm hover:underline transition-all disabled:opacity-70 py-2"
              >
                Voltar
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}