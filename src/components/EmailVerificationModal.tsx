import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface EmailVerificationModalProps {
  open: boolean;
  email: string;
  onClose: () => void;
  onVerified: () => void;
}

const CODE_LENGTH = 6;
const EXPIRY_SECONDS = 300; // 5 minutes

// Mock: encrypt value (in production, use real encryption)
function mockEncrypt(value: string): string {
  return btoa(value);
}

// Mock: send verification code to email
async function mockSendCode(email: string): Promise<void> {
  console.log(`[MOCK] Código de verificação enviado para ${email}`);
  return new Promise((resolve) => setTimeout(resolve, 800));
}

// Mock: validate code on backend
async function mockValidateCode(
  encryptedEmail: string,
  encryptedCode: string
): Promise<{ status: number; message?: string }> {
  const code = atob(encryptedCode);
  console.log("[MOCK] Validando código:", { encryptedEmail, encryptedCode });
  // Mock: "123456" is always valid
  if (code === "123456") {
    return { status: 200 };
  }
  return { status: 400, message: "Código inválido. Tente novamente." };
}

export default function EmailVerificationModal({
  open,
  email,
  onClose,
  onVerified,
}: EmailVerificationModalProps) {
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
  const [isValidating, setIsValidating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [expired, setExpired] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Send code on open
  useEffect(() => {
    if (open) {
      setDigits(Array(CODE_LENGTH).fill(""));
      setExpired(false);
      setSecondsLeft(EXPIRY_SECONDS);
      sendCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Countdown timer
  useEffect(() => {
    if (!open || expired) return;
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [open, secondsLeft, expired]);

  const sendCode = async () => {
    setIsSending(true);
    try {
      await mockSendCode(email);
      toast.success("Código enviado para seu email!");
    } catch {
      toast.error("Erro ao enviar código.");
    } finally {
      setIsSending(false);
    }
  };

  const handleResend = async () => {
    setDigits(Array(CODE_LENGTH).fill(""));
    setExpired(false);
    setSecondsLeft(EXPIRY_SECONDS);
    await sendCode();
    inputRefs.current[0]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    if (!pasted) return;
    const newDigits = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      newDigits[i] = char;
    });
    setDigits(newDigits);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const code = digits.join("");
  const isCodeComplete = code.length === CODE_LENGTH;

  const handleValidate = async () => {
    if (!isCodeComplete || expired) return;
    setIsValidating(true);
    try {
      const encryptedEmail = mockEncrypt(email);
      const encryptedCode = mockEncrypt(code);
      const result = await mockValidateCode(encryptedEmail, encryptedCode);

      if (result.status === 200) {
        toast.success("Email verificado com sucesso!");
        onVerified();
      } else {
        console.error("[EmailVerification] Erro:", result.message);
        toast.error(result.message || "Erro ao validar código.");
      }
    } catch (err) {
      console.error("[EmailVerification] Erro inesperado:", err);
      toast.error("Erro ao validar código. Tente novamente.");
    } finally {
      setIsValidating(false);
    }
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Fullscreen container */}
      <div className="relative w-full h-full bg-background p-6 flex flex-col justify-center animate-in fade-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted"
        >
          <X size={20} className="text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">Verificar email</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enviamos um código de 6 dígitos para{" "}
            <span className="font-semibold text-foreground">{email}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-border bg-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              disabled={expired || isValidating}
              data-testid={`otp-input-${i}`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          {expired ? (
            <p className="text-sm text-destructive font-medium">
              Código expirado
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Código expira em{" "}
              <span className="font-semibold text-foreground">
                {formatTime(secondsLeft)}
              </span>
            </p>
          )}
        </div>

        {/* Validate button */}
        <button
          type="button"
          onClick={handleValidate}
          disabled={!isCodeComplete || expired || isValidating}
          className="btn-primary w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-validate-email"
        >
          {isValidating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Validando...
            </div>
          ) : (
            "Validar Email"
          )}
        </button>

        {/* Resend */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={isSending || isValidating}
            className="text-sm font-semibold text-secondary underline underline-offset-2 disabled:opacity-50"
            data-testid="button-resend-code"
          >
            {isSending ? "Enviando..." : "Reenviar código"}
          </button>
        </div>
      </div>
    </div>
  );
}
