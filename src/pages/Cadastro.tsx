import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const Cadastro = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Step 1 fields
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [placa, setPlaca] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");

  // Step 2 fields
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);

  const progressWidth = step === 1 ? "50%" : "100%";

  const FloatingInput = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
    showToggle = false,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    type?: string;
    className?: string;
    showToggle?: boolean;
  }) => (
    <div className={`relative border border-[#e5e5e5] rounded-xl px-4 pt-4 pb-2 ${
      value ? "bg-[#eff6ff] border-[#60a5fa]" : ""
    } ${className}`}>
      <label className="absolute top-2 left-4 text-xs text-[#737373]">{label}</label>
      <input
        type={showToggle ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pt-3 text-sm text-[#212121] bg-transparent outline-none pr-10"
        placeholder={placeholder}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373]"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen max-w-[430px] mx-auto bg-gradient-to-b from-[#e8f0f8] to-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 pt-6 pb-2">
        <button onClick={() => (step === 1 ? navigate(-1) : setStep(1))} className="p-1">
          <ArrowLeft className="w-6 h-6 text-[#212121]" />
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-[#212121] pr-7">
          Criar Conta
        </h1>
      </div>

      {/* Progress bar */}
      <div className="px-6 pb-4">
        <div className="h-1 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ffdb33] rounded-full transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-[#212121] mb-1">Seus dados pessoais</h2>
            <p className="text-sm text-[#737373] mb-6 leading-relaxed">
              Coisas simples, mas necessárias pra ativar sua conta.
            </p>

            <div className="space-y-4">
              <FloatingInput label="CPF" value={cpf} onChange={setCpf} placeholder="000.000.000-00" />
              <FloatingInput label="Nome Completo" value={nome} onChange={setNome} placeholder="Nome e Sobrenome" />
              <FloatingInput label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" type="email" />
              <FloatingInput label="Celular / WhatsApp" value={celular} onChange={setCelular} placeholder="(00) 00000-0000" />
              <FloatingInput label="Placa do Veículo (opcional)" value={placa} onChange={setPlaca} placeholder="ABC1D23" />
              <FloatingInput label="Data de Nascimento" value={dataNascimento} onChange={setDataNascimento} placeholder="dd/mm/aaaa" type="date" />
              <FloatingInput label="Senha" value={senha} onChange={setSenha} placeholder="Crie uma senha" showToggle />
            </div>

            {/* Password requirements */}
            <div className="mt-4 text-xs text-[#737373] space-y-1">
              <p className="font-medium text-[#212121]">A senha deve conter:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Mínimo de 6 caracteres</li>
                <li>Ao menos uma letra maiúscula</li>
                <li>Ao menos uma letra minúscula</li>
                <li>Ao menos um caractere especial</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#212121] mb-1">Seu Endereço</h2>
            <p className="text-sm text-[#737373] mb-6 leading-relaxed">
              Informe onde você mora atualmente.
            </p>

            <div className="space-y-4">
              <FloatingInput label="CEP" value={cep} onChange={setCep} placeholder="00000-000" />
              <div className="flex gap-3">
                <FloatingInput label="Logradouro" value={logradouro} onChange={setLogradouro} placeholder="Nome da rua" className="flex-1" />
                <FloatingInput label="Número" value={numero} onChange={setNumero} placeholder="Nº" className="w-20" />
              </div>
              <FloatingInput label="Complemento (opcional)" value={complemento} onChange={setComplemento} placeholder="Apto, Bloco, etc." />
              <FloatingInput label="Bairro" value={bairro} onChange={setBairro} placeholder="Bairro" />
              <div className="flex gap-3">
                <FloatingInput label="Cidade" value={cidade} onChange={setCidade} placeholder="Cidade" className="flex-1" />
                <FloatingInput label="UF" value={uf} onChange={setUf} placeholder="UF" className="w-20" />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                checked={aceitaTermos}
                onChange={(e) => setAceitaTermos(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#e5e5e5] accent-[#252525]"
              />
              <p className="text-sm text-[#212121] leading-relaxed">
                Li e concordo com os{" "}
                <button className="font-semibold underline underline-offset-2">Termos de Uso</button>{" "}
                e{" "}
                <button className="font-semibold underline underline-offset-2">Política de Privacidade</button>{" "}
                do VASTO.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-8 pt-2">
        <button
          onClick={() => (step === 1 ? setStep(2) : undefined)}
          className={`w-full py-4 rounded-full font-semibold text-base transition-all ${
            step === 2 && !aceitaTermos
              ? "bg-[#e5e5e5] text-[#737373]"
              : "bg-[#252525] text-[#ffdb33]"
          }`}
          disabled={step === 2 && !aceitaTermos}
        >
          {step === 1 ? "Continuar" : "Criar conta"}
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
