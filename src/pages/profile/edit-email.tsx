import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  CheckCircle2,
  Mail,
  Info
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EditEmail() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("jackson.five@email.com");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Edit, 2: Code
  const [code, setCode] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate Email sending
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      toast({
        title: "Código enviado",
        description: "Enviamos um código para seu novo e-mail.",
      });
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">E-mail Atualizado!</h2>
        <p className="text-gray-500 text-center mb-8 max-w-xs">
          Seu endereço de e-mail foi alterado com sucesso.
        </p>
        <Link href="/profile" className="w-full max-w-sm block">
          <button className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all">
            Voltar ao Perfil
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Alterar E-mail</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        
        {step === 1 ? (
          <form onSubmit={handleSendCode} className="space-y-6 animate-in slide-in-from-right duration-300">
             <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                <Info className="text-blue-600 shrink-0" size={20} />
                <p className="text-sm text-blue-800 leading-relaxed">
                   Enviaremos um código de verificação para o novo endereço de e-mail.
                </p>
             </div>

             <div className="space-y-2">
               <label className="text-sm font-bold text-secondary ml-1">Novo E-mail</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 rounded-2xl border-none text-secondary font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all text-lg"
                  />
               </div>
             </div>

             <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Enviar Código"
                )}
              </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6 animate-in slide-in-from-right duration-300">
             <div className="text-center mb-6">
                <p className="text-gray-500 mb-1">Enviamos um código para</p>
                <p className="text-lg font-bold text-secondary">{email}</p>
             </div>

             <div className="space-y-2">
               <label className="text-sm font-bold text-secondary ml-1 block text-center">Código de Confirmação</label>
               <input 
                 type="text" 
                 value={code}
                 onChange={(e) => setCode(e.target.value)}
                 placeholder="000000"
                 maxLength={6}
                 required
                 autoFocus
                 className="w-full h-16 text-center tracking-[1em] bg-gray-50 rounded-2xl border-none text-secondary font-bold text-2xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
               />
             </div>

             <div className="text-center">
                <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 underline">
                   Alterar e-mail
                </button>
             </div>

             <button 
                type="submit"
                disabled={isSubmitting || code.length < 6}
                className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Confirmar Alteração"
                )}
              </button>
          </form>
        )}

      </main>
    </div>
  );
}