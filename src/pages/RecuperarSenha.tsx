import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");

  return (
    <div className="relative w-full min-h-screen max-w-[430px] mx-auto bg-gradient-to-b from-[#e8f0f8] to-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-6 h-6 text-[#212121]" />
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-[#212121] pr-7">
          Recuperar Senha
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4 flex flex-col">
        <h2 className="text-2xl font-bold text-[#212121] mb-2">Esqueceu sua senha?</h2>
        <p className="text-sm text-[#737373] mb-8 leading-relaxed">
          Não se preocupe! Informe seu e-mail ou celular cadastrado e enviaremos as instruções para você.
        </p>

        {/* Input field */}
        <div className="relative border border-[#e5e5e5] rounded-xl px-4 pt-4 pb-2">
          <label className="absolute top-2 left-4 text-xs text-[#737373]">
            E-mail ou Celular
          </label>
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full pt-3 text-sm text-[#212121] bg-transparent outline-none"
            placeholder="Digite seu e-mail ou celular cadastrado"
          />
        </div>
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-8">
        <button className="w-full py-4 rounded-full bg-[#252525] text-[#ffdb33] font-semibold text-base">
          Enviar instruções
        </button>
      </div>
    </div>
  );
};

export default RecuperarSenha;
