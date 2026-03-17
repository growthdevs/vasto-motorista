import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Recovery() {
  const [, setLocation] = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleRecovery = () => {
    if (identifier === "erro@email.com") {
      toast.error("E-mail/Celular não cadastrados no sistema.", {
        duration: 3000,
        style: {
          backgroundColor: "#ef4444", // Red-500
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

    if (identifier === "sucesso@email.com") {
      setShowAlert(true);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-secondary">
      {/* Alert Dialog for Success */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="rounded-xl max-w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Sucesso</AlertDialogTitle>
            <AlertDialogDescription>
              Um email com as instruções para recuperação foi enviado ao usuário.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => {
                setShowAlert(false);
                setLocation("/login");
              }}
              className="text-primary font-bold bg-transparent hover:bg-transparent shadow-none"
            >
              ENTENDI
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-white px-6 py-4 shadow-sm">
        <Link href="/login" className="mr-4 rounded-full p-2 hover:bg-gray-100">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">Recuperar Senha</h1>
      </div>

      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Esqueceu sua senha?</h2>
        <p className="text-gray-500 mb-8">
          Não se preocupe! Informe seu e-mail ou celular cadastrado e enviaremos as instruções para você.
        </p>

        <form className="flex flex-col gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">E-mail ou Celular</label>
            <input
              type="text"
              placeholder="Digite seu e-mail ou celular"
              className="input-ionic w-full"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              data-testid="input-recovery-identifier"
            />
          </div>

          <button 
            type="button"
            className="btn-primary w-full mt-2"
            onClick={handleRecovery}
            data-testid="button-send-recovery"
          >
            Enviar instruções
          </button>
        </form>
      </div>
    </div>
  );
}
