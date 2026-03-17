import { Link, useLocation } from "wouter";
import vastoLogo from "@assets/vasto-logo-yellow_1765408289648.png";
import brickWallBg from "@assets/image_1765409475041.png";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Background Image with Gradient Filter */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${brickWallBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-12">
        {/* Logo Area - Back to previous version (Yellow Logo, No Box) */}
        <div className="mt-20 flex w-full justify-center">
          <img 
            src={vastoLogo} 
            alt="VASTO" 
            className="h-16 object-contain"
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex w-full flex-col gap-6 pb-12">
          <button 
            onClick={() => setLocation("/login")}
            className="btn-primary w-full text-lg shadow-xl"
            data-testid="button-access-account"
          >
            Acessar conta
          </button>

          <div className="text-center w-full">
            <p className="text-white drop-shadow-md font-medium text-center leading-relaxed">
              Tá chegando agora?<br />
              Comece <Link href="/register/step-1" className="link-yellow" data-testid="link-register">
                clicando aqui.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
