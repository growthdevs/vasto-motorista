import { Link, useLocation } from "wouter";
import { ArrowLeft, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast({
      description: checked 
        ? "Notificações ativadas" 
        : "Notificações desativadas",
    });
  };

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
          <h1 className="text-xl font-bold text-secondary">Configurações</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Preferências</h2>
          
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-secondary shrink-0 border border-gray-100">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-secondary">Notificações Push</p>
                  <p className="text-xs text-gray-500">Receber alertas de novos fretes</p>
                </div>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={handleToggle}
              />
            </div>
          </div>
        </section>

        <div className="mt-8 text-xs text-gray-400 text-center leading-relaxed max-w-xs mx-auto">
          Ao desativar as notificações, você pode perder oportunidades de fretes urgentes.
        </div>
      </main>
    </div>
  );
}