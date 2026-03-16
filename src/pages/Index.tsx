import { useState } from "react";
import { BankingAlert } from "@/components/BankingAlert";
import { BankingAlertDialog, type AlertVariant } from "@/components/BankingAlertDialog";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVariant, setDialogVariant] = useState<AlertVariant>("success");

  const openDialog = (variant: AlertVariant) => {
    setDialogVariant(variant);
    setDialogOpen(true);
  };

  const dialogContent: Record<AlertVariant, { title: string; description: string; actionLabel: string; cancelLabel?: string }> = {
    success: {
      title: "Sucesso",
      description: "Um e-mail com as instruções para recuperação de senha foi enviado para vialmeida_05@hotmail.com.",
      actionLabel: "Entendi",
    },
    warning: {
      title: "Atenção",
      description: "Sua sessão expira em 5 minutos. Salve suas alterações para não perder dados.",
      actionLabel: "Entendi",
    },
    error: {
      title: "Transação recusada",
      description: "Não foi possível concluir a transferência. Verifique os dados e tente novamente.",
      actionLabel: "Entendi",
    },
    info: {
      title: "Nova funcionalidade",
      description: "Agora você pode agendar transferências recorrentes diretamente pelo app.",
      actionLabel: "Entendi",
    },
    question: {
      title: "Confirmar transferência",
      description: "Deseja confirmar a transferência de R$ 2.500,00 para Maria Oliveira?",
      actionLabel: "Sim, confirmar",
      cancelLabel: "Não, cancelar",
    },
  };

  const buttons: { variant: AlertVariant; label: string }[] = [
    { variant: "success", label: "Sucesso" },
    { variant: "warning", label: "Atenção" },
    { variant: "error", label: "Erro" },
    { variant: "info", label: "Informação" },
    { variant: "question", label: "Confirmação" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Banking Alert System
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Componentes de alerta para aplicações bancárias digitais
          </p>
        </header>

        {/* Inline Toast Alerts */}
        <section className="space-y-3 mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
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
            description="Sua conta corrente está abaixo de R$ 100,00."
            actionLabel="Depositar"
            onAction={() => {}}
          />
          <BankingAlert
            variant="error"
            title="Cartão bloqueado"
            description="Detectamos atividade suspeita no seu cartão."
            actionLabel="Resolver"
            onAction={() => {}}
          />
          <BankingAlert
            variant="info"
            title="Atualização disponível"
            description="Atualize o app para a versão mais recente."
            actionLabel="Atualizar"
            onAction={() => {}}
          />
        </section>

        {/* Dialog Alerts */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Dialog Alerts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {buttons.map(({ variant: v, label }) => (
              <button
                key={v}
                onClick={() => openDialog(v)}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  v === "question"
                    ? "bg-vasto-primario text-primary-foreground hover:bg-vasto-primario-700 col-span-2"
                    : v === "success" ? "bg-alert-success text-card hover:bg-alert-success/90"
                    : v === "warning" ? "bg-alert-warning text-card hover:bg-alert-warning/90"
                    : v === "error" ? "bg-alert-error text-card hover:bg-alert-error/90"
                    : "bg-alert-info text-card hover:bg-alert-info/90"
                }`}
              >
                {label}
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
          actionLabel={dialogContent[dialogVariant].actionLabel}
          cancelLabel={dialogContent[dialogVariant].cancelLabel}
          onAction={() => console.log("Ação confirmada")}
          onCancel={() => console.log("Ação cancelada")}
        />
      </div>
    </div>
  );
};

export default Index;
