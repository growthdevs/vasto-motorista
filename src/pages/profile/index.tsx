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
  Settings
} from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [, setLocation] = useLocation();

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

        {/* Financial Info */}
        <section className="space-y-4">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Financeiro</h3>
           
           <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <Link href="/profile/edit-bank">
                <div className="p-4 flex items-center justify-between hover:bg-gray-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 group-hover:bg-primary/20 transition-colors">
                         <Building2 size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-gray-400 font-medium">Conta para recebimento</p>
                         <p className="text-sm font-bold text-secondary">{user.bank}</p>
                         <p className="text-xs text-gray-500">{user.account}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary bg-secondary px-2 py-0.5 rounded-md">Ativo</span>
                      <ChevronRight size={20} className="text-gray-400" />
                   </div>
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
    </div>
  );
}