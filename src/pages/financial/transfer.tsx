import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Copy,
  Info,
  Key,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Transfer() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Amount, 2: Confirm
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get first registered Pix key from localStorage
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

  const balance = "1.250,00";

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic formatting for currency input could go here
    setAmount(e.target.value);
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

  // Calculate fees
  // The user requested that the fee be debited FROM the typed amount.
  // So: Typed Amount = Total Debited.
  // Fee = 10% of Typed Amount (or whatever base is used, but usually fee is on top or inclusive)
  // Re-reading: "O calculo deve debitar a taxa do valor digitado" -> "The calculation must debit the fee FROM the typed value".
  // So: Total Debited from Wallet = Typed Amount.
  // Fee = 10% of Typed Amount.
  // Net Received = Typed Amount - Fee.
  
  const totalDebited = parseFloat(amount.replace(',', '.'));
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
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">Transferência Realizada!</h2>
        <p className="text-gray-500 text-center mb-8 max-w-xs">
          O valor de <span className="font-bold text-secondary">R$ {formattedNetReceived}</span> já foi enviado.
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-4 w-full max-w-sm mb-8 border border-gray-100">
           <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200/60">
              <div className="h-10 w-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-secondary">
                 <Key size={20} />
              </div>
              <div>
                 <p className="text-xs text-gray-400 font-medium">Chave Pix</p>
                 <p className="text-sm font-bold text-secondary">{pixLabel}</p>
                 <p className="text-xs text-gray-500">{pixKey.value}</p>
              </div>
           </div>
           <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock size={14} />
              <span>Previsão: Imediato (Pix)</span>
           </div>
        </div>

        <Link href="/home" className="w-full max-w-sm block">
          <button className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all">
            Voltar ao Início
          </button>
        </Link>
        
        <button 
          onClick={() => toast({ description: "Comprovante compartilhado com sucesso!" })}
          className="mt-4 text-secondary font-bold text-sm hover:underline transition-all"
        >
          Compartilhar Comprovante
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-12 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div className="flex-1">
             <h1 className="text-xl font-bold text-secondary">Transferir</h1>
          </div>
        </div>
      </header>

      <main className="px-6 pt-4">
        
        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
             
             {/* Account Info Card (Top) */}
             <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                <div>
                   <p className="text-xs text-gray-400 font-medium mb-1">Conta destino (Cadastrada)</p>
                   <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-secondary" />
                      <span className="text-sm font-bold text-secondary">{userAccount.bank}</span>
                   </div>
                   <p className="text-xs text-gray-500 mt-1">Ag {userAccount.agency} • Cc {userAccount.account}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                   <ShieldCheck size={16} />
                </div>
             </div>

             <div className="space-y-4 pt-4">
               <label className="text-2xl font-bold text-secondary block text-center">Quanto você quer transferir?</label>
               
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-gray-400">R$</span>
                 <input 
                   type="text" 
                   value={amount}
                   onChange={handleAmountChange}
                   placeholder="0,00"
                   autoFocus
                   className="w-full h-24 pl-12 pr-4 bg-transparent border-b-2 border-gray-200 text-secondary font-bold text-5xl focus:border-primary outline-none transition-all placeholder:text-gray-200"
                 />
               </div>
               
               <p className="text-sm text-gray-500 text-center font-medium">
                 Disponível: <span className="text-secondary font-bold">R$ {balance}</span>
               </p>
             </div>

             <div className="pt-8">
                <button 
                  onClick={handleNextStep}
                  disabled={!amount}
                  className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continuar
                  <ArrowRight size={20} />
                </button>
             </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             
             <div className="text-center mb-6">
                <p className="text-gray-500 text-lg mb-2">Total a debitar</p>
                <h2 className="text-4xl font-bold text-secondary mb-2">R$ {amount}</h2>
             </div>

             <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                <h3 className="font-bold text-secondary mb-4 text-sm uppercase tracking-wide text-gray-400">Para</h3>
                
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-12 w-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-secondary shrink-0">
                      <Building2 size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-secondary text-lg">{userAccount.name}</h4>
                      <p className="text-sm text-gray-600">{userAccount.bank} • Ag {userAccount.agency} • Cc {userAccount.account}</p>
                      <p className="text-xs text-gray-400 mt-0.5">CPF: ***.***.***-00</p>
                   </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Valor debitado da carteira</span>
                      <span className="font-bold text-secondary">R$ {formattedTotalDebited}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Taxa Administrativa (10%)</span>
                      <span className="font-bold text-red-600">- R$ {formattedFee}</span>
                   </div>
                   <div className="flex justify-between items-center text-base pt-2 border-t border-gray-100/50">
                      <span className="font-bold text-secondary">Valor a receber</span>
                      <span className="font-bold text-green-600">R$ {formattedNetReceived}</span>
                   </div>
                </div>
             </div>

             <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <Info className="text-blue-600 shrink-0" size={20} />
                <p className="text-xs text-blue-700 leading-relaxed">
                   A transferência será feita via Pix para sua conta cadastrada.
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