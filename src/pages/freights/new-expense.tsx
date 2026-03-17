import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  Upload,
  Camera,
  X,
  FileText,
  AlertTriangle,
  ChevronDown,
  Info,
  Plus,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NewExpense() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (files.length < 3) {
        setFiles([...files, e.target.files[0]]);
      } else {
        toast({
          title: "Limite de arquivos",
          description: "Você pode anexar no máximo 3 arquivos.",
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setTitle(value);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">Solicitação Enviada!</h2>
        <p className="text-gray-500 text-center mb-8 max-w-xs">
          Sua solicitação de despesa foi enviada para análise da transportadora.
        </p>
        <Link href="/freights/FRT-9021/expenses" className="w-full max-w-sm block">
          <button className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all">
            Voltar para Despesas
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/freights/FRT-9021/expenses">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Nova Despesa</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
            <Info className="text-blue-600 shrink-0" size={20} />
            <div className="space-y-1">
              <p className="text-xs text-blue-700 leading-relaxed font-bold">
                Recomendação Importante
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Antes de solicitar, recomendamos que você combine a despesa com a transportadora, se possível. Isso agiliza a aprovação.
              </p>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary ml-1 flex justify-between">
              Título
              <span className="text-xs text-gray-400 font-normal">{title.length}/20</span>
            </label>
            <input 
              type="text" 
              value={title}
              onChange={handleTitleChange}
              placeholder="Ex: Pedágio Extra"
              required
              className="w-full h-14 px-4 bg-gray-50 rounded-2xl border-none text-secondary font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary ml-1">Valor (R$)</label>
            <input 
              type="text" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              required
              className="w-full h-14 px-4 bg-gray-50 rounded-2xl border-none text-secondary font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all text-lg"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary ml-1">O que é essa despesa?</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Pedágio extra no desvio da BR-116..."
              required
              className="w-full h-32 p-4 bg-gray-50 rounded-2xl border-none text-secondary font-medium focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
            />
          </div>

          {/* Attachments */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-secondary ml-1 flex justify-between">
              Anexar arquivo
              <span className="text-gray-400 font-normal text-xs">(Como comprovantes ou fotos)</span>
            </label>
            
            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2 mb-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0 text-green-600">
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            {files.length < 3 && (
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative min-h-[100px]">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                {files.length > 0 ? (
                  <div className="flex items-center gap-2 bg-white text-secondary px-6 py-3 rounded-full shadow-sm border border-gray-100">
                    <Plus size={18} />
                    <span className="text-sm font-bold">Adicionar outro arquivo</span>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-secondary">
                      <Camera size={24} />
                    </div>
                    <p className="text-sm font-bold text-secondary">Adicionar foto ou arquivo</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG ou PDF (Máx. 3)</p>
                  </>
                )}
              </div>
            )}
            
            {files.length >= 3 && (
               <p className="text-xs text-center text-gray-400 mt-2">
                  Limite de 3 arquivos atingido.
               </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                "Enviar Solicitação"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}