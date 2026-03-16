import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info, HelpCircle } from "lucide-react";

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
  question: HelpCircle,
};

const colorMap = {
  success: "text-alert-success bg-alert-success/10",
  warning: "text-alert-warning bg-alert-warning/10",
  error: "text-alert-error bg-alert-error/10",
  info: "text-alert-info bg-alert-info/10",
  question: "text-vasto-primario bg-alert-question-bg",
};

type AlertVariant = "success" | "warning" | "error" | "info" | "question";

interface BankingAlertDialogProps {
  open: boolean;
  onClose: () => void;
  variant?: AlertVariant;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
}

const BankingAlertDialog: React.FC<BankingAlertDialogProps> = ({
  open,
  onClose,
  variant = "success",
  title,
  description,
  actionLabel = "Entendi",
  onAction,
  cancelLabel,
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);
  const Icon = iconMap[variant];
  const isQuestion = variant === "question";

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  const handleAction = () => {
    onAction?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-200",
        visible ? "bg-vasto-primario/50" : "bg-transparent"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "w-full max-w-sm bg-card rounded-xl shadow-2xl transition-all duration-200 overflow-hidden",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", colorMap[variant])}>
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-alert-text">{title}</h3>
          <p className="mt-2 text-sm text-alert-text-muted leading-relaxed">{description}</p>
        </div>
        <div className="px-6 pb-6">
          {isQuestion ? (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-lg text-sm font-semibold border border-border text-alert-text bg-card hover:bg-muted transition-all duration-150"
              >
                {cancelLabel || "Cancelar"}
              </button>
              <button
                onClick={handleAction}
                className="flex-1 py-3 rounded-lg text-sm font-semibold bg-vasto-primario text-primary-foreground hover:bg-vasto-primario-700 transition-all duration-150"
              >
                {actionLabel}
              </button>
            </div>
          ) : (
            <button
              onClick={handleAction}
              className={cn(
                "w-full py-3 rounded-lg text-sm font-semibold transition-all duration-150",
                {
                  "bg-alert-success text-card hover:bg-alert-success/90": variant === "success",
                  "bg-alert-warning text-card hover:bg-alert-warning/90": variant === "warning",
                  "bg-alert-error text-card hover:bg-alert-error/90": variant === "error",
                  "bg-alert-info text-card hover:bg-alert-info/90": variant === "info",
                }
              )}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { BankingAlertDialog };
export type { AlertVariant, BankingAlertDialogProps };
