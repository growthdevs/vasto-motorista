import { useState } from "react";
import { BankingAlert } from "@/components/BankingAlert";
import { BankingAlertDialog } from "@/components/BankingAlertDialog";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVariant, setDialogVariant] = useState<"success" | "warning" | "error" | "info">("success");

  const openDialog = (variant: "success" | "warning" | "error" | "info") => {
    setDialogVariant(variant);
    setDialogOpen(true);
  };

  const dialogContent = {
    success: {
      title: "Sucesso",
      description: "Um e-mail com as instruções para recuperação de senha foi enviado para vialmeida_05@hotmail.com.",
    },
    warning: {
      title: "Atenção",
      description: "Sua sessão expira em 5 minutos. Salve suas alterações para não perder dados.",
    },
    error: {
      title: "Transação recusada",
      description: "Não foi possível concluir a transferência. Verifique os dados e tente novamente.",
    },
    info: {
      title: "Nova funcionalidade",
      description: "Agora você pode agendar transferências recorrentes diretamente pelo app.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-alert-text tracking-tight">
            Banking Alert System
          </h1>
          <p className="mt-1 text-sm text-alert-text-muted">
            Componentes de alerta para aplicações bancárias digitais
          </p>
        </header>

        {/* Inline Toast Alerts */}
        <section className="space-y-3 mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-alert-text-muted mb-4">
            Inline Alerts
          </h2>

          <BankingAlert
            variant="success"
            title="Transferência realizada"
            description="R$ 1.250,00 enviados para João Silva com sucesso."
            actionLabel="Ver comprovante"
            onAction={() => {}}
            dismissible={false}
          />

          <BankingAlert
            variant="warning"
            title="Saldo insuficiente"
            description="Sua conta corrente está abaixo de R$ 100,00. Considere fazer um depósito."
            actionLabel="Depositar"
            onAction={() => {}}
          />

          <BankingAlert
            variant="error"
            title="Cartão bloqueado"
            description="Detectamos atividade suspeita. Seu cartão foi bloqueado preventivamente."
            actionLabel="Resolver"
            onAction={() => {}}
          />

          <BankingAlert
            variant="info"
            title="Atualização de segurança"
            description="Atualize seu app para a versão mais recente para continuar usando todos os recursos."
            actionLabel="Atualizar"
            onAction={() => {}}
          />
        </section>

        {/* Dialog Alerts */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-alert-text-muted mb-4">
            Dialog Alerts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {(["success", "warning", "error", "info"] as const).map((v) => (
              <button
                key={v}
                onClick={() => openDialog(v)}
                className={`py-3 px-4 rounded-lg text-sm font-semibold text-background transition-all duration-150 ${
                  v === "success" ? "bg-alert-success hover:bg-alert-success/90" :
                  v === "warning" ? "bg-alert-warning hover:bg-alert-warning/90" :
                  v === "error" ? "bg-alert-error hover:bg-alert-error/90" :
                  "bg-alert-info hover:bg-alert-info/90"
                }`}
              >
                {v === "success" ? "Sucesso" : v === "warning" ? "Atenção" : v === "error" ? "Erro" : "Informação"}
              </button>
            ))}
          </div>
        </section>

        <BankingAlertDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          variant={dialogVariant}
          title={dialogContent[dialogVariant].title}
          description={dialogContent[dialogVariant].description}
        />
      </div>
    </div>
  );
};

export default Index;
