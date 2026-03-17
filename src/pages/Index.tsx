import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "@/assets/bg-login.png";
import vastoLogo from "@/assets/vasto-logo-yellow.png";

const Index = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative w-full min-h-screen max-w-[430px] mx-auto overflow-hidden bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgLogin})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

      {/* Logo */}
      <div className="relative z-10 flex justify-center pt-20">
        <div className="bg-[#ffdb33] px-5 py-2.5 rounded-sm">
          <img src={vastoLogo} alt="VASTO" className="h-8 object-contain" />
        </div>
      </div>

      {/* Bottom sheet */}
      <div
        className={`absolute left-0 right-0 z-20 transition-all duration-500 ease-out ${
          showLogin ? "bottom-0" : "bottom-0"
        }`}
      >
        {!showLogin ? (
          /* Splash state */
          <div className="px-6 pb-10 flex flex-col items-center gap-4">
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-4 rounded-full bg-[#252525]/90 text-white font-semibold text-base backdrop-blur-sm"
            >
              Acessar conta
            </button>
            <p className="text-white/80 text-sm">
              Tá chegando agora?{" "}
              <button
                onClick={() => navigate("/cadastro")}
                className="text-white font-semibold underline underline-offset-2"
              >
                Comece clicando aqui.
              </button>
            </p>
          </div>
        ) : (
          /* Login form bottom sheet */
          <div className="bg-white rounded-t-3xl px-6 pt-4 pb-8 animate-slide-up">
            {/* Handle bar */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 rounded-full bg-gray-300" />
            </div>

            <h2 className="text-2xl font-bold text-[#212121] mb-6 italic">Login</h2>

            {/* Email field */}
            <div className="mb-4">
              <div className="relative border border-[#e5e5e5] rounded-xl px-4 pt-4 pb-2">
                <label className="absolute top-2 left-4 text-xs text-[#737373]">
                  Celular ou E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pt-3 text-sm text-[#212121] bg-transparent outline-none"
                  placeholder="Digite seu e-mail ou celular"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-3">
              <div className="relative border border-[#e5e5e5] rounded-xl px-4 pt-4 pb-2">
                <label className="absolute top-2 left-4 text-xs text-[#737373]">
                  Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pt-3 text-sm text-[#212121] bg-transparent outline-none pr-10"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737373]"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-center mb-6">
              <span className="text-sm text-[#737373]">Não lembra da senha? </span>
              <button
                onClick={() => navigate("/recuperar-senha")}
                className="text-sm font-bold text-[#212121]"
              >
                clique aqui
              </button>
            </div>

            {/* Login button */}
            <button className="w-full py-4 rounded-full bg-[#252525] text-[#ffdb33] font-semibold text-base mb-4">
              Acessar conta
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-[#737373]">
              Ainda não tem conta?{" "}
              <button
                onClick={() => navigate("/cadastro")}
                className="font-bold text-[#212121]"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
