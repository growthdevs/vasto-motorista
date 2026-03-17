import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Camera, Upload, Check, ChevronRight, CreditCard, Truck, User, MapPin, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import vastoLogoBlack from "@assets/vasto-logo-black_1765408289648.png";

export default function RegisterStep2() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0); // 0: Intro, 1: Address, 2: CNH, 3: Selfie, 4: Vehicle, 5: Bank, 6: Success
  const [showCamera, setShowCamera] = useState(false);
  const [isProcessingSelfie, setIsProcessingSelfie] = useState(false);
  const [selfieError, setSelfieError] = useState(false);

  // Mock banks list
  const banks = [
    { code: "001", name: "Banco do Brasil" },
    { code: "237", name: "Bradesco" },
    { code: "104", name: "Caixa Econômica" },
    { code: "341", name: "Itaú" },
    { code: "260", name: "Nubank" },
    { code: "033", name: "Santander" },
    { code: "077", name: "Inter" },
    { code: "655", name: "Neon" },
    { code: "290", name: "PagSeguro" },
  ];

  const [formData, setFormData] = useState({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    cnhDoc: null,
    selfie: null,
    rntrc: "",
    renavam: "",
    vehicleDoc: null,
    bankType: "pix", // 'account' or 'pix'
    bankName: "",
    agency: "",
    account: "",
    pixKey: ""
  });

  const handleNext = () => {
    // Validation disabled for prototype
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else setLocation("/home");
  };

  const handleFileChange = (field: string, e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
      toast.success("Arquivo anexado com sucesso!");
    }
  };

  const handleTakeSelfie = () => {
    setIsProcessingSelfie(true);
    // Simulate processing
    setTimeout(() => {
       setIsProcessingSelfie(false);
       // Simulate success (randomly or fixed)
       // For prototype: Always success unless we want to demo error
       const success = true; 
       
       if (success) {
         setFormData({ ...formData, selfie: "captured" as any });
         setShowCamera(false);
         // Don't auto-next for selfie, let user review
       } else {
         setSelfieError(true);
       }
    }, 2000);
  };

  // Camera Overlay Component
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
             
             {/* Feedback Modal (Error) */}
             {selfieError && (
               <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6 z-20">
                 <div className="bg-white rounded-2xl p-6 text-center w-full">
                   <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                     <X size={32} />
                   </div>
                   <h3 className="text-lg font-bold text-secondary mb-2">Não foi possível identificar</h3>
                   <p className="text-gray-600 text-sm mb-6">
                     O rosto não ficou claro na foto. Tente novamente em um local mais iluminado.
                   </p>
                   <button 
                     onClick={() => setSelfieError(false)}
                     className="btn-primary w-full"
                   >
                     Tentar novamente
                   </button>
                 </div>
               </div>
             )}

             {/* Processing Spinner */}
             {isProcessingSelfie && (
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
              disabled={isProcessingSelfie}
              className="h-20 w-20 bg-white rounded-full border-4 border-gray-300 shadow-lg active:scale-95 transition-transform flex items-center justify-center mx-auto"
            >
              <div className="h-16 w-16 bg-white border-2 border-secondary rounded-full"></div>
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-secondary relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-6 pt-4 pb-2 shadow-sm">
        <div className="flex items-center mb-4">
          <button 
            onClick={handleBack}
            className="mr-4 rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Finalizar Cadastro</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-300 ease-out"
               style={{ width: `${(step / 6) * 100}%` }}
             ></div>
        </div>
      </div>

      <main className="px-6 py-8 pb-24">
        
        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Vamos completar seu cadastro!</h2>
              <p className="text-gray-500 leading-relaxed">
                Para liberar transferências de saldo para uma conta pessoal e para liberar solicitações de despesas nos fretes.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-secondary text-sm">O que vamos pedir:</h3>
              
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-secondary font-bold text-sm shadow-sm">1</div>
                <span className="text-sm font-medium text-gray-700">Endereço completo</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-secondary font-bold text-sm shadow-sm">2</div>
                <span className="text-sm font-medium text-gray-700">Cópia da CNH</span>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-secondary font-bold text-sm shadow-sm">3</div>
                <span className="text-sm font-medium text-gray-700">Uma selfie sua</span>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-secondary font-bold text-sm shadow-sm">4</div>
                <span className="text-sm font-medium text-gray-700">Dados do Veículo</span>
              </div>

               <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-secondary font-bold text-sm shadow-sm">5</div>
                <span className="text-sm font-medium text-gray-700">Dados bancários</span>
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="btn-primary w-full mt-6"
            >
              Começar
            </button>
          </div>
        )}

        {/* Step 1: Address */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Seu Endereço</h2>
              <p className="text-gray-500 text-sm">
                Informe onde você mora atualmente.
              </p>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">CEP</label>
                  <input 
                    type="text" 
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={(e) => setFormData({...formData, cep: e.target.value})}
                    className="input-ionic w-full"
                  />
               </div>
               
               <div className="flex gap-3">
                 <div className="flex-[3]">
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Rua</label>
                    <input 
                      type="text" 
                      placeholder="Nome da rua"
                      value={formData.street}
                      onChange={(e) => setFormData({...formData, street: e.target.value})}
                      className="input-ionic w-full"
                    />
                 </div>
                 <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Número</label>
                    <input 
                      type="text" 
                      placeholder="Nº"
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: e.target.value})}
                      className="input-ionic w-full"
                    />
                 </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Bairro</label>
                  <input 
                    type="text" 
                    placeholder="Bairro"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                    className="input-ionic w-full"
                  />
               </div>

               <div className="flex gap-3">
                 <div className="flex-[3]">
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Cidade</label>
                    <input 
                      type="text" 
                      placeholder="Cidade"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="input-ionic w-full"
                    />
                 </div>
                 <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Estado</label>
                    <input 
                      type="text" 
                      placeholder="UF"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="input-ionic w-full"
                    />
                 </div>
               </div>
            </div>

            <button 
              onClick={handleNext}
              className="btn-primary w-full mt-6"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 2: CNH */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Cópia da CNH</h2>
              <p className="text-gray-500 text-sm">
                Envie sua CNH Digital ou uma foto da CNH aberta exibindo todos os dados.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative bg-gray-50">
                <input 
                  type="file" 
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange('cnhDoc', e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-3">
                  {formData.cnhDoc ? (
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Check size={32} />
                    </div>
                  ) : (
                    <div className="h-16 w-16 bg-white border border-gray-200 text-gray-400 rounded-full flex items-center justify-center shadow-sm">
                      <CreditCard size={32} />
                    </div>
                  )}
                  <div className="space-y-1">
                     <span className="block font-bold text-secondary text-sm">
                        {formData.cnhDoc ? "Documento selecionado" : "Toque para enviar documento"}
                     </span>
                     <span className="block text-xs text-gray-400">PDF ou Foto legível</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-xl flex gap-3 items-start">
               <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
               <p className="text-xs text-yellow-800 leading-relaxed">
                 A foto deve estar bem iluminada e todos os dados do motorista devem estar legíveis.
               </p>
            </div>

            <button 
              onClick={handleNext}
              className="btn-primary w-full mt-6"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 3: Selfie */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
             <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Reconhecimento Facial</h2>
              <p className="text-gray-500 text-sm">
                Precisamos confirmar sua identidade. Siga as instruções abaixo para tirar sua selfie.
              </p>
            </div>

            {formData.selfie ? (
                <div className="bg-gray-50 rounded-2xl p-6 space-y-6 flex flex-col items-center">
                   <div className="h-64 w-64 rounded-2xl bg-gray-200 overflow-hidden relative shadow-md">
                       {/* Placeholder for captured image since we don't have real capture */}
                       <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                           <User size={80} className="text-white/50" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                           <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm font-medium">Foto Capturada</div>
                       </div>
                   </div>
                   
                   <p className="text-sm text-center text-gray-500">
                     Se a foto estiver nítida e bem iluminada, pode continuar.
                   </p>

                   <div className="w-full space-y-3">
                      <button 
                        onClick={handleNext}
                        className="btn-primary w-full"
                      >
                        Continuar
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
                          <h3 className="font-bold text-secondary">Como tirar a foto:</h3>
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
                         <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                               <Check size={16} />
                            </div>
                            <span className="text-sm text-gray-600">Posicione o rosto no centro da tela</span>
                         </li>
                       </ul>
                    </div>

                    <button 
                      onClick={() => setShowCamera(true)}
                      className="btn-primary w-full mt-6"
                    >
                      Tirar Selfie
                    </button>
                </>
            )}
          </div>
        )}

        {/* Step 4: Vehicle */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Dados do Veículo</h2>
              <p className="text-gray-500 text-sm">
                Informe o RENAVAM e envie o documento do veículo.
              </p>
            </div>

            <div className="space-y-4">
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
                  onChange={(e) => handleFileChange('vehicleDoc', e)}
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
            </div>

            <button 
              onClick={handleNext}
              className="btn-primary w-full mt-6"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 5: Bank */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-2">Como você quer receber?</h2>
              <p className="text-gray-500 text-sm">
                Cadastre uma conta bancária ou chave Pix para receber seus pagamentos.
              </p>
            </div>

            {/* Type Switcher */}
            <div className="bg-gray-100 p-1 rounded-xl flex">
               <button 
                 onClick={() => setFormData({...formData, bankType: 'pix'})}
                 className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${formData.bankType === 'pix' ? 'bg-white shadow-sm text-secondary' : 'text-gray-500'}`}
               >
                 Chave Pix
               </button>
               <button 
                 onClick={() => setFormData({...formData, bankType: 'account'})}
                 className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${formData.bankType === 'account' ? 'bg-white shadow-sm text-secondary' : 'text-gray-500'}`}
               >
                 Conta Bancária
               </button>
            </div>

            {formData.bankType === 'pix' ? (
               <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Sua Chave Pix</label>
                    <input 
                      type="text" 
                      placeholder="CPF, Celular ou Email"
                      value={formData.pixKey}
                      onChange={(e) => setFormData({...formData, pixKey: e.target.value})}
                      className="input-ionic w-full"
                    />
                 </div>
                 <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                   * A chave Pix deve estar vinculada ao mesmo CPF cadastrado no aplicativo.
                 </p>
               </div>
            ) : (
               <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Banco</label>
                    <div className="relative">
                      <select 
                        value={formData.bankName}
                        onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                        className="input-ionic w-full appearance-none bg-white pr-10"
                      >
                        <option value="" disabled>Selecione seu banco</option>
                        {banks.map((bank) => (
                           <option key={bank.code} value={bank.name}>
                             {bank.code} - {bank.name}
                           </option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={20} />
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Agência</label>
                      <input 
                        type="text" 
                        placeholder="0000"
                        value={formData.agency}
                        onChange={(e) => setFormData({...formData, agency: e.target.value})}
                        className="input-ionic w-full"
                      />
                    </div>
                    <div className="flex-[1.5]">
                      <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Conta com dígito</label>
                      <input 
                        type="text" 
                        placeholder="00000-0"
                        value={formData.account}
                        onChange={(e) => setFormData({...formData, account: e.target.value})}
                        className="input-ionic w-full"
                      />
                    </div>
                 </div>
                 <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                   * A conta bancária deve ser da mesma titularidade do seu CPF.
                 </p>
               </div>
            )}

            <button 
              onClick={handleNext}
              className="btn-primary w-full mt-6"
            >
              Finalizar Cadastro
            </button>
          </div>
        )}

        {/* Step 6: Success */}
        {step === 6 && (
          <div className="space-y-6 text-center pt-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6">
                 <Check size={48} />
             </div>
             
             <h2 className="text-2xl font-bold text-secondary">Documentos Enviados!</h2>
             <p className="text-gray-500">
               Recebemos suas informações. Nossa equipe vai analisar tudo e em até <b>24 horas</b> você recebe uma notificação.
             </p>

             <div className="bg-gray-50 p-5 rounded-2xl text-left border border-gray-100 mt-8">
               <h3 className="font-bold text-secondary text-sm mb-4">Próximos passos:</h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3 text-sm text-gray-600">
                   <div className="h-6 w-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">1</div>
                   <span>Aguarde a validação dos documentos</span>
                 </li>
                 <li className="flex items-start gap-3 text-sm text-gray-600">
                   <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">2</div>
                   <span>Seu saldo será liberado para tranferencia</span>
                 </li>
               </ul>
             </div>

             <Link href="/home">
               <button className="btn-primary w-full mt-8">
                 Voltar para o Início
               </button>
             </Link>
          </div>
        )}

      </main>
    </div>
  );
}