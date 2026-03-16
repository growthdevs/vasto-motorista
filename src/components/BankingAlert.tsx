import React, { useEffect, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

const bankingAlertVariants = cva(
  "relative flex items-start gap-3 rounded-lg border px-4 py-3.5 text-sm transition-all duration-200 animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      variant: {
        success: "bg-alert-success-bg border-alert-success-border",
        warning: "bg-alert-warning-bg border-alert-warning-border",
        error: "bg-alert-error-bg border-alert-error-border",
        info: "bg-alert-info-bg border-alert-info-border",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

interface BankingAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bankingAlertVariants> {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  autoClose?: number;
}

const BankingAlert = React.forwardRef<HTMLDivElement, BankingAlertProps>(
  (
    {
      className,
      variant = "info",
      title,
      description,
      actionLabel,
      onAction,
      dismissible = true,
      onDismiss,
      autoClose,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);
    const Icon = iconMap[variant || "info"];

    useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(() => {
          setVisible(false);
          onDismiss?.();
        }, autoClose);
        return () => clearTimeout(timer);
      }
    }, [autoClose, onDismiss]);

    if (!visible) return null;

    const handleDismiss = () => {
      setVisible(false);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(bankingAlertVariants({ variant }), className)}
        {...props}
      >
        <Icon
          className={cn("h-5 w-5 shrink-0 mt-0.5", {
            "text-alert-success": variant === "success",
            "text-alert-warning": variant === "warning",
            "text-alert-error": variant === "error",
            "text-alert-info": variant === "info",
          })}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-alert-text leading-tight">{title}</p>
          {description && (
            <p className="mt-1 text-alert-text-muted leading-snug">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 self-center">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className={cn(
                "text-sm font-semibold whitespace-nowrap transition-colors",
                {
                  "text-alert-success hover:text-alert-success/80": variant === "success",
                  "text-alert-warning hover:text-alert-warning/80": variant === "warning",
                  "text-alert-error hover:text-alert-error/80": variant === "error",
                  "text-alert-info hover:text-alert-info/80": variant === "info",
                }
              )}
            >
              {actionLabel}
            </button>
          )}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="text-alert-text-muted hover:text-alert-text transition-colors p-0.5 rounded"
              aria-label="Fechar alerta"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

BankingAlert.displayName = "BankingAlert";

export { BankingAlert };
