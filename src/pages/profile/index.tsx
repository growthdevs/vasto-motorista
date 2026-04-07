import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Camera, 
  ChevronRight, 
  Building2, 
  LogOut,
  ShieldCheck,
  CreditCard,
  Truck,
  Settings,
  AlertTriangle,
  UserX,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showCloseAccount, setShowCloseAccount] = useState(false);
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  // Mock: saldo disponível para saque
  const mockBalance = 0;

  const handleCloseAccount = () => {
    if (mockBalance > 0) {
      toast({
        variant: "destructive",
        title: "Não é possível encerrar",
        description: "Você possui saldo disponível para saque. Realize o saque antes de encerrar sua conta.",
      });
      setShowCloseAccount(false);
      return;
    }
    console.log("Conta encerrada (mock)");
    toast({ description: "Sua conta foi encerrada com sucesso." });
    setShowCloseAccount(false);
    setLocation("/");
  };

  // Mock user data
  const user = {
    name: "Jackson Five",
    cpf: "123.***.***-00",
    phone: "(11) 9****-4321",
    email: "jac*******@email.com",
    avatar: "https://ui-avatars.com/api/?name=Jackson+Five&background=212121&color=FFDB33",
    bank: "Nubank",
    account: "Ag 0001 • Cc 123456-7"
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Meu Perfil</h1>
        </div>
      </header>

      <main className="px-6 py-8 space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center">
           <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full bg-secondary overflow-hidden border-4 border-primary shadow-xl">
                 <img src={user.avatar} alt="Perfil" className="w-full h-full object-cover" />
              </div>
              <Link href="/profile/edit-photo">
                <button className="absolute bottom-0 right-0 h-10 w-10 bg-primary rounded-full border-4 border-white flex items-center justify-center text-secondary shadow-md active:scale-95 transition-transform">
                   <Camera size={18} />
                </button>
              </Link>
           </div>
           <h2 className="text-2xl font-bold text-secondary">{user.name}</h2>
           <p className="text-gray-500 font-medium">CPF: {user.cpf}</p>
        </div>

        {/* Contact Info */}
        <section className="space-y-4">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Dados de Contato</h3>
           
           <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
              <Link href="/profile/edit-contact">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                         <Phone size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-gray-400 font-medium">Celular</p>
                         <p className="text-sm font-bold text-secondary">{user.phone}</p>
                      </div>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>

              <Link href="/profile/edit-email">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                         <Mail size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-gray-400 font-medium">E-mail</p>
                         <p className="text-sm font-bold text-secondary">{user.email}</p>
                      </div>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>
           </div>
        </section>

        {/* Vehicle Info */}
        <section className="space-y-4">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Veículo</h3>
           
           <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <Link href="/profile/edit-vehicle">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                         <Truck size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-gray-400 font-medium">Meu Veículo</p>
                         <p className="text-sm font-bold text-secondary">ABC-1234</p>
                      </div>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>
           </div>
        </section>

        {/* Chaves Pix */}
        <section className="space-y-4">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Pix</h3>
           
           <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <Link href="/profile/edit-bank">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                          <CreditCard size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-gray-400 font-medium">Minhas Chaves Pix</p>
                         <p className="text-sm font-bold text-secondary">Gerenciar chaves</p>
                      </div>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>
           </div>
        </section>

        {/* Security & Support */}
        <section className="space-y-4">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Configurações</h3>
           
           <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
              <Link href="/settings">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                         <Settings size={20} />
                      </div>
                      <span className="text-sm font-bold text-secondary">Preferências do App</span>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>
           </div>
        </section>

        {/* Security & Support */}
        <section className="space-y-4">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Segurança</h3>
           
           <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
              <Link href="/terms">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                         <ShieldCheck size={20} />
                      </div>
                      <span className="text-sm font-bold text-secondary">Termos de Uso e Privacidade</span>
                   </div>
                   <ChevronRight size={20} className="text-gray-400" />
                </div>
              </Link>

               {/* Outras opções - expandable */}
               <button
                 onClick={() => setShowOtherOptions(!showOtherOptions)}
                 className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group"
               >
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Settings size={20} />
                     </div>
                     <span className="text-sm font-bold text-secondary">Outras opções</span>
                  </div>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform duration-200 ${showOtherOptions ? 'rotate-180' : ''}`} />
               </button>

               {showOtherOptions && (
                 <button
                   onClick={() => setShowCloseAccount(true)}
                   className="w-full p-4 pl-18 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group"
                 >
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                          <UserX size={20} />
                       </div>
                       <span className="text-sm font-bold text-secondary">Encerrar minha conta</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                 </button>
               )}
             </div>

             {/* Sair da conta - fora do accordion */}
             <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mt-3">
               <div className="p-4 flex items-center justify-between hover:bg-red-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-red-600 shrink-0 group-hover:bg-red-100 transition-colors">
                        <LogOut size={20} />
                     </div>
                     <span className="text-sm font-bold text-red-600">Sair da conta</span>
                  </div>
               </div>
             </div>
            
            <p className="text-center text-xs text-gray-400 pt-4">
               Versão 1.0.0 (Beta)
            </p>
         </section>

      </main>

      {/* Fullscreen Close Account Confirmation */}
      {showCloseAccount && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in fade-in duration-300">
          <header className="px-6 pt-12 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCloseAccount(false)}
                className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors text-secondary"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-bold text-secondary">Encerrar Conta</h1>
            </div>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
              <AlertTriangle size={40} className="text-destructive" />
            </div>

            <h2 className="text-2xl font-bold text-secondary mb-3">Tem certeza?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Ao encerrar sua conta, <strong className="text-secondary">todos os seus dados serão permanentemente removidos</strong> e essa ação não poderá ser desfeita.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Você só poderá encerrar sua conta se <strong className="text-secondary">não possuir saldo disponível para saque</strong>.
            </p>

            <div className="w-full space-y-3 max-w-xs">
              <button
                onClick={handleCloseAccount}
                className="w-full py-4 rounded-2xl bg-destructive text-destructive-foreground font-bold text-sm active:scale-[0.98] transition-transform"
              >
                Encerrar minha conta
              </button>
              <button
                onClick={() => setShowCloseAccount(false)}
                className="w-full py-4 rounded-2xl bg-muted text-secondary font-bold text-sm active:scale-[0.98] transition-transform"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}