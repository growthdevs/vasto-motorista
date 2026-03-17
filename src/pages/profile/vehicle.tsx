import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Check, Truck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProfileVehicle() {
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    plate: "ABC-1234",
    renavam: "12345678900",
    rntrc: "12345678",
    vehicleDoc: null as File | null
  });

  const handleSave = () => {
    toast.success("Dados do veículo atualizados com sucesso!");
    setTimeout(() => setLocation("/profile"), 1000);
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, vehicleDoc: e.target.files[0] });
      toast.success("Arquivo anexado com sucesso!");
    }
  };

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
          <h1 className="text-xl font-bold text-secondary">Dados do Veículo</h1>
        </div>
      </header>

      <main className="px-6 py-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary mb-2">Editar Veículo</h2>
          <p className="text-gray-500 text-sm">
            Mantenha os dados do seu veículo atualizados.
          </p>
        </div>

        <div className="space-y-4">
           <div>
              <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Placa do Veículo</label>
              <input 
                type="text" 
                placeholder="ABC-1234"
                value={formData.plate}
                onChange={(e) => setFormData({...formData, plate: e.target.value})}
                className="input-ionic w-full uppercase"
              />
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">RENAVAM</label>
              <input 
                type="text" 
                placeholder="00000000000"
                value={formData.renavam}
                onChange={(e) => setFormData({...formData, renavam: e.target.value})}
                className="input-ionic w-full"
              />
           </div>

           <div>
              <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">RNTRC (Opcional)</label>
              <input 
                type="text" 
                placeholder="00000000"
                value={formData.rntrc}
                onChange={(e) => setFormData({...formData, rntrc: e.target.value})}
                className="input-ionic w-full"
              />
           </div>

           <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative bg-gray-50 mt-2">
             <input 
              type="file" 
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-3">
              {formData.vehicleDoc ? (
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check size={32} />
                </div>
              ) : (
                <div className="h-16 w-16 bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center shadow-sm">
                  <Truck size={32} />
                </div>
              )}
              <div className="space-y-1">
                 <span className="block font-bold text-secondary text-sm">
                    {formData.vehicleDoc ? "Documento selecionado" : "Foto do CRLV (Documento)"}
                 </span>
                 <span className="block text-xs text-gray-400">PDF ou Foto legível</span>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-xl flex gap-3 items-start">
             <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
             <p className="text-xs text-yellow-800 leading-relaxed">
               Mantenha o documento do veículo sempre atualizado para evitar problemas no carregamento.
             </p>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="btn-primary w-full mt-6"
        >
          Salvar Alterações
        </button>
      </main>
    </div>
  );
}
