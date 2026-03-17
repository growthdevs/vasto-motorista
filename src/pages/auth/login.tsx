import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import vastoLogo from "@assets/vasto-logo-yellow_1765408289648.png";
import vastoLogoBlack from "@assets/vasto-logo-black_1765408289648.png";
import brickWallBg from "@assets/image_1765409475041.png";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simplified for prototype: always succeed
    toast.success("Login realizado com sucesso!", {
      duration: 2000,
      style: {
        backgroundColor: "#22c55e", // Green-500
        color: "white",
        border: "none",
        fontSize: "16px",
        padding: "16px"
      },
      action: {
        label: "✕",
        onClick: () => console.log("Closed"),
      },
    });

    // Redirect to home after successful login
    setTimeout(() => {
      setLocation("/home");
    }, 500);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Background Image - Continuity from Landing */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${brickWallBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top Section */}
        <div className="flex flex-1 flex-col items-center pt-20">
          <img 
            src={vastoLogo} 
            alt="VASTO" 
            className="h-16 object-contain mb-8"
          />
        </div>

        {/* Login Card - Slide Up Effect */}
        <div className="animate-in slide-in-from-bottom-10 duration-500 w-full rounded-t-[2rem] bg-white p-8 pb-12 shadow-2xl">
          <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-gray-300" />
          
          <h2 className="mb-6 text-2xl font-bold text-secondary">Login</h2>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Celular ou E-mail"
                className="input-ionic w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                data-testid="input-identifier"
              />
            </div>

            <div className="relative space-y-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha aqui"
                className="input-ionic w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20 pr-12"
                data-testid="input-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="text-right">
              <Link href="/recovery" className="text-sm font-medium text-gray-500 active:text-primary transition-colors">
                Não lembra a senha? <span className="font-bold text-gray-700">clique aqui</span>
              </Link>
            </div>

            <button 
              type="submit"
              className="btn-primary w-full mt-4 text-lg"
              data-testid="button-login"
            >
              Acessar conta
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Ainda não tem conta?{" "}
              <Link href="/register/step-1" className="font-bold text-secondary active:opacity-70">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}