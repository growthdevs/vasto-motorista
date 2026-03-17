import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, User, Camera, X, CheckCircle2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EditPhoto() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showCamera, setShowCamera] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selfieError, setSelfieError] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTakeSelfie = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
       setIsProcessing(false);
       setCapturedPhoto("captured"); // Dummy state
       setShowCamera(false);
    }, 2000);
  };

  const handleSave = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-6 text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-2 text-center">Foto Atualizada!</h2>
        <p className="text-gray-500 text-center mb-8 max-w-xs">
          Sua foto de perfil foi alterada com sucesso.
        </p>
        <Link href="/profile" className="w-full max-w-sm block">
          <button className="w-full h-14 bg-secondary text-primary rounded-2xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 active:scale-[0.98] transition-all">
            Voltar ao Perfil
          </button>
        </Link>
      </div>
    );
  }

  // Camera Overlay (Reused from Register Step 2)
  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-between py-10 px-6 animate-in slide-in-from-bottom duration-300">
         {/* Top Bar */}
         <div className="w-full flex justify-between items-center text-white">
            <div className="w-8"></div>
            <span className="font-bold text-lg">Selfie</span>
            <button onClick={() => setShowCamera(false)}><X size={32} /></button>
         </div>

         {/* Camera View Area */}
         <div className="relative flex-1 w-full max-w-sm my-6 rounded-3xl overflow-hidden bg-gray-800 flex items-center justify-center">
             {/* Simulated Camera Feed */}
             <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
             <p className="relative z-10 text-gray-400 text-sm">Câmera Ativa</p>
             
             {/* Face Guide Overlay */}
             <div className="absolute inset-0 border-[3px] border-white/30 rounded-[45%] w-3/4 h-3/5 m-auto"></div>
             
             {/* Processing Spinner */}
             {isProcessing && (
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-primary" />
               </div>
             )}
         </div>

         {/* Instructions & Trigger */}
         <div className="w-full max-w-sm space-y-6 text-center">
            <p className="text-white text-sm">Posicione seu rosto dentro da marcação</p>
            <button 
              onClick={handleTakeSelfie}
              disabled={isProcessing}
              className="h-20 w-20 bg-white rounded-full border-4 border-gray-300 shadow-lg active:scale-95 transition-transform flex items-center justify-center mx-auto"
            >
              <div className="h-16 w-16 bg-white border-2 border-secondary rounded-full"></div>
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Alterar Foto</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Esta foto será usada para identificação no app.
              </p>
            </div>

            {capturedPhoto ? (
                <div className="bg-gray-50 rounded-2xl p-6 space-y-6 flex flex-col items-center">
                   <div className="h-64 w-64 rounded-2xl bg-gray-200 overflow-hidden relative shadow-md">
                       {/* Placeholder for captured image */}
                       <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                           <User size={80} className="text-white/50" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                           <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium">Foto Capturada</div>
                       </div>
                   </div>
                   
                   <p className="text-sm text-center text-gray-500">
                     Se a foto estiver nítida e bem iluminada, pode salvar.
                   </p>

                   <div className="w-full space-y-3">
                      <button 
                        onClick={handleSave}
                        disabled={isProcessing}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <div className="h-5 w-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                        ) : "Salvar Foto"}
                      </button>
                      
                      <button 
                        onClick={() => setShowCamera(true)}
                        className="w-full py-4 text-secondary font-bold text-sm underline"
                      >
                        Tirar nova foto
                      </button>
                   </div>
                </div>
            ) : (
                <>
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                       <div className="flex flex-col items-center gap-4 text-center">
                          <div className="h-32 w-32 rounded-full border-4 border-dashed border-gray-300 bg-white flex items-center justify-center relative">
                             <User size={64} className="text-gray-300" />
                             <div className="absolute top-0 right-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-secondary border-4 border-white">
                                <Camera size={18} />
                             </div>
                          </div>
                          <h3 className="font-bold text-secondary">Tire uma selfie</h3>
                       </div>

                       <ul className="space-y-4">
                         <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                               <Check size={16} />
                            </div>
                            <span className="text-sm text-gray-600">Esteja em um local bem iluminado</span>
                         </li>
                         <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                               <Check size={16} />
                            </div>
                            <span className="text-sm text-gray-600">Não use boné, óculos ou máscara</span>
                         </li>
                       </ul>
                    </div>

                    <button 
                      onClick={() => setShowCamera(true)}
                      className="btn-primary w-full mt-6"
                    >
                      Abrir Câmera
                    </button>
                </>
            )}
        </div>
      </main>
    </div>
  );
}