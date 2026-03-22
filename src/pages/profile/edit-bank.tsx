import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Copy, Plus, FileText, Mail, Phone, Shuffle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PixKeyType = "cpf" | "email" | "phone" | "random";
type Step = "list" | "select-type" | "input-key" | "success";

interface PixKey {
  id: string;
  type: PixKeyType;
  value: string;
  createdAt: string;
}

const keyTypeConfig: Record<PixKeyType, { label: string; icon: typeof FileText; placeholder: string; description: string }> = {
  cpf: { label: "CPF", icon: FileText, placeholder: "000.000.000-00", description: "Use seu CPF como chave Pix" },
  email: { label: "E-mail", icon: Mail, placeholder: "seu@email.com", description: "Use seu e-mail como chave Pix" },
  phone: { label: "Celular", icon: Phone, placeholder: "(00) 00000-0000", description: "Use seu número de celular como chave Pix" },
  random: { label: "Chave Aleatória", icon: Shuffle, placeholder: "", description: "Gere uma chave aleatória única" },
};

function generateRandomKey() {
  const chars = "abcdef0123456789";
  const sections = [8, 4, 4, 4, 12];
  return sections.map(len => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")).join("-");
}

function formatCPF(value: string) {
  const nums = value.replace(/\D/g, "").slice(0, 11);
  return nums.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value: string) {
  const nums = value.replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 2) return nums;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
}

export default function EditBank() {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("list");
  const [selectedType, setSelectedType] = useState<PixKeyType | null>(null);
  const [keyValue, setKeyValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keys, setKeys] = useState<PixKey[]>(() => {
    const saved = localStorage.getItem("pix-keys");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pix-keys", JSON.stringify(keys));
  }, [keys]);

  const handleSelectType = (type: PixKeyType) => {
    setSelectedType(type);
    setKeyValue("");
    if (type === "random") {
      setKeyValue(generateRandomKey());
    }
    setStep("input-key");
  };

  const handleInputChange = (val: string) => {
    if (!selectedType) return;
    if (selectedType === "cpf") setKeyValue(formatCPF(val));
    else if (selectedType === "phone") setKeyValue(formatPhone(val));
    else setKeyValue(val);
  };

  const handleSubmit = () => {
    if (!selectedType || (!keyValue && selectedType !== "random")) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const newKey: PixKey = {
        id: crypto.randomUUID(),
        type: selectedType,
        value: keyValue,
        createdAt: new Date().toISOString(),
      };
      setKeys(prev => [...prev, newKey]);
      setIsSubmitting(false);
      setStep("success");
    }, 1200);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Chave copiada!", description: "A chave Pix foi copiada para a área de transferência." });
  };

  const handleDelete = (id: string) => {
    setKeys(prev => prev.filter(k => k.id !== id));
    toast({ title: "Chave removida", description: "A chave Pix foi removida com sucesso." });
  };

  const handleBack = () => {
    if (step === "select-type") setStep("list");
    else if (step === "input-key") { setStep("select-type"); setSelectedType(null); setKeyValue(""); }
    else if (step === "success") { setStep("list"); setSelectedType(null); setKeyValue(""); }
  };

  // Success screen
  if (step === "success") {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
        <div className="h-24 w-24 rounded-full bg-alert-success-bg flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-alert-success" />
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">Chave Registrada!</h2>
        <p className="text-muted-foreground text-center mb-4 max-w-xs">
          Sua chave Pix foi cadastrada com sucesso.
        </p>
        <div className="bg-muted rounded-2xl p-4 w-full max-w-sm mb-8">
          <p className="text-xs text-muted-foreground mb-1">{selectedType && keyTypeConfig[selectedType].label}</p>
          <p className="text-base font-bold text-foreground break-all">{keyValue}</p>
        </div>
        <button
          onClick={() => { setStep("list"); setSelectedType(null); setKeyValue(""); }}
          className="w-full max-w-sm h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all"
        >
          Voltar às Chaves Pix
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-background sticky top-0 z-10 border-b border-border">
        <div className="flex items-center gap-4">
          {step === "list" ? (
            <Link href="/profile">
              <button className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors text-secondary">
                <ArrowLeft size={24} />
              </button>
            </Link>
          ) : (
            <button onClick={handleBack} className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold text-secondary">
            {step === "list" && "Chaves Pix"}
            {step === "select-type" && "Registrar Chave"}
            {step === "input-key" && selectedType && keyTypeConfig[selectedType].label}
          </h1>
        </div>
      </header>

      <main className="px-6 py-6">
        {/* LIST step */}
        {step === "list" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {keys.length > 0 ? (
              <div className="space-y-3">
                {keys.map(key => {
                  const config = keyTypeConfig[key.type];
                  const Icon = config.icon;
                  return (
                    <div key={key.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">{config.label}</p>
                        <p className="text-sm font-bold text-foreground truncate">{key.value}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(key.value)}
                          className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Copy size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(key.id)}
                          className="p-2 hover:bg-destructive/10 rounded-full transition-colors text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Shuffle size={28} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">Nenhuma chave Pix registrada</p>
              </div>
            )}

            <button
              onClick={() => setStep("select-type")}
              className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-base shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Plus size={20} />
              Registrar Nova Chave
            </button>
          </div>
        )}

        {/* SELECT TYPE step */}
        {step === "select-type" && (
          <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm text-muted-foreground mb-4">Escolha o tipo de chave que deseja registrar:</p>
            {(Object.entries(keyTypeConfig) as [PixKeyType, typeof keyTypeConfig["cpf"]][]).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={type}
                  onClick={() => handleSelectType(type)}
                  className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-accent/50 active:scale-[0.98] transition-all text-left"
                >
                  <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{config.label}</p>
                    <p className="text-xs text-muted-foreground">{config.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* INPUT KEY step */}
        {step === "input-key" && selectedType && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {selectedType === "random" ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Sua chave aleatória foi gerada:</p>
                <div className="bg-muted rounded-2xl p-5 text-center">
                  <p className="text-lg font-bold text-foreground break-all font-mono tracking-wide">{keyValue}</p>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Essa chave será vinculada à sua conta para recebimento via Pix.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground ml-1">
                  {keyTypeConfig[selectedType].label}
                </label>
                <input
                  type={selectedType === "email" ? "email" : "text"}
                  inputMode={selectedType === "cpf" || selectedType === "phone" ? "numeric" : undefined}
                  placeholder={keyTypeConfig[selectedType].placeholder}
                  value={keyValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl border border-border bg-card text-foreground text-base font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground ml-1 mt-2">
                  {selectedType === "cpf" && "Insira o CPF vinculado à sua conta."}
                  {selectedType === "email" && "Insira o e-mail que deseja usar como chave."}
                  {selectedType === "phone" && "Insira o número de celular com DDD."}
                </p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !keyValue}
              className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? "Registrando..." : "Registrar Chave"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
