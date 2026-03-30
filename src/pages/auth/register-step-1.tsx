import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EmailVerificationModal from "@/components/EmailVerificationModal";

export default function RegisterStep1() {
  const [, setLocation] = useLocation();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleRegister = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Informe um email válido.");
      return;
    }

    if (name.toLowerCase().includes("erro")) {
      toast.error("Erro ao criar cadastro. Tente novamente.", {
        duration: 3000,
        style: {
          backgroundColor: "#ef4444",
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
      return;
    }

    // Open email verification modal
    setShowEmailModal(true);
  };

  const handleEmailVerified = () => {
    setShowEmailModal(false);
    // Navigate to step 2 (address)
    setLocation("/register/step-2");
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white font-sans text-secondary flex flex-col items-center justify-center px-6 animate-in fade-in duration-500">
        <div className="mb-6 rounded-full bg-green-100 p-6">
          <CheckCircle2 size={64} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Conta criada com sucesso!</h2>
        <p className="text-center text-gray-500 mb-8">
          Agora você já pode acessar sua conta e aproveitar todos os benefícios do VASTO.
        </p>
        <button 
          onClick={() => setLocation("/login")}
          className="btn-primary w-full shadow-lg"
          data-testid="button-go-to-login"
        >
          Acessar minha conta
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-secondary relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-white px-6 py-4 shadow-sm">
        <button 
          onClick={() => window.history.back()}
          className="mr-4 rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Criar Conta</h1>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Seus dados pessoais</h1>
        <p className="text-gray-500 mb-8">
          Coisas simples, mas necessárias pra ativar sua conta.
        </p>

        <form className="flex flex-col gap-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              className="input-ionic w-full"
              data-testid="input-cpf"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Nome Completo</label>
            <input
              type="text"
              placeholder="Nome"
              className="input-ionic w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Celular / WhatsApp</label>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              className="input-ionic w-full"
              data-testid="input-phone"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="input-ionic w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="input-email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Placa do Veículo</label>
            <input
              type="text"
              placeholder="ABC-1234"
              className="input-ionic w-full uppercase"
              data-testid="input-plate"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Crie sua senha"
                className="input-ionic w-full pr-12"
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
          </div>

          <div className="flex items-start gap-3 mt-2">
            <div className="flex items-center h-6">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                data-testid="checkbox-terms"
              />
            </div>
            <label htmlFor="terms" className="text-sm text-gray-600">
              Li e concordo com os <a href="#" className="font-bold text-secondary underline">Termos de Uso</a> e <a href="#" className="font-bold text-secondary underline">Política de Privacidade</a> do VASTO.
            </label>
          </div>

          <button 
            type="button"
            className="btn-primary w-full mt-6"
            disabled={!acceptedTerms}
            onClick={handleRegister}
            data-testid="button-next"
          >
            Criar conta
          </button>
        </form>
      </div>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        open={showEmailModal}
        email={email}
        onClose={() => setShowEmailModal(false)}
        onVerified={handleEmailVerified}
      />
    </div>
  );
}
