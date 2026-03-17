import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EditBank() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    bankType: "pix", // 'account' or 'pix'
    bankName: "",
    agency: "",
    account: "",
    pixKey: ""
  });

  const banks = [
    { code: "001", name: "Banco do Brasil" },
    { code: "237", name: "Bradesco" },
    { code: "104", name: "Caixa Econômica" },
    { code: "341", name: "Itaú" },
    { code: "260", name: "Nubank" },
    { code: "033", name: "Santander" },
    { code: "077", name: "Inter" },
    { code: "655", name: "Neon" },
    { code: "290", name: "PagSeguro" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate save
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
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">Dados Atualizados!</h2>
        <p className="text-gray-500 text-center mb-8 max-w-xs">
          Sua conta para recebimento foi atualizada com sucesso.
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
          <h1 className="text-xl font-bold text-secondary">Dados Bancários</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Type Switcher */}
            <div className="bg-gray-100 p-1 rounded-xl flex">
               <button 
                 type="button"
                 onClick={() => setFormData({...formData, bankType: 'pix'})}
                 className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${formData.bankType === 'pix' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Chave Pix
               </button>
               <button 
                 type="button"
                 onClick={() => setFormData({...formData, bankType: 'account'})}
                 className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${formData.bankType === 'account' ? 'bg-white text-secondary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Conta Bancária
               </button>
            </div>

            {formData.bankType === 'pix' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Chave Pix</label>
                    <input 
                      type="text" 
                      placeholder="CPF, E-mail, Celular ou Aleatória"
                      value={formData.pixKey}
                      onChange={(e) => setFormData({...formData, pixKey: e.target.value})}
                      className="input-ionic w-full"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-2 ml-1">
                      Certifique-se de que a chave Pix esteja cadastrada no seu CPF.
                    </p>
                 </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Banco</label>
                    <select 
                      value={formData.bankName}
                      onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                      className="input-ionic w-full appearance-none bg-white"
                      required
                    >
                      <option value="">Selecione o banco</option>
                      {banks.map(bank => (
                        <option key={bank.code} value={bank.name}>{bank.code} - {bank.name}</option>
                      ))}
                    </select>
                 </div>

                 <div className="flex gap-3">
                   <div className="flex-[2]">
                      <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Agência</label>
                      <input 
                        type="text" 
                        placeholder="0000"
                        value={formData.agency}
                        onChange={(e) => setFormData({...formData, agency: e.target.value})}
                        className="input-ionic w-full"
                        required
                      />
                   </div>
                   <div className="flex-[3]">
                      <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Conta</label>
                      <input 
                        type="text" 
                        placeholder="00000-0"
                        value={formData.account}
                        onChange={(e) => setFormData({...formData, account: e.target.value})}
                        className="input-ionic w-full"
                        required
                      />
                   </div>
                 </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-6"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </button>
        </form>
      </main>
    </div>
  );
}