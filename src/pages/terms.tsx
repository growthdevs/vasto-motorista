import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white font-sans pb-24 relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-secondary">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-secondary">Termos e Privacidade</h1>
        </div>
      </header>

      <main className="px-6 py-8 space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-secondary mb-2">1. Introdução</h2>
          <p>
            Bem-vindo ao VASTO. Ao utilizar nosso aplicativo, você concorda com estes termos de uso e nossa política de privacidade. Nosso objetivo é facilitar a gestão de fretes e despesas para caminhoneiros autônomos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-secondary mb-2">2. Uso de Dados (LGPD)</h2>
          <p>
            Respeitamos sua privacidade e a Lei Geral de Proteção de Dados (LGPD). Seus dados pessoais, como CPF, telefone e e-mail, são utilizados apenas para identificação, validação de cadastro e processamento de pagamentos. Não compartilhamos suas informações com terceiros sem seu consentimento explícito, exceto quando necessário para a prestação do serviço (ex: transportadoras contratantes).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-secondary mb-2">3. Cadastro e Segurança</h2>
          <p>
            Você é responsável pela veracidade das informações fornecidas e pela segurança de sua senha de acesso. Recomendamos o uso de senhas fortes e a não divulgação de suas credenciais a terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-secondary mb-2">4. Pagamentos e Transferências</h2>
          <p>
            As transferências realizadas pelo aplicativo estão sujeitas aos prazos e taxas bancárias aplicáveis. O VASTO atua como intermediário facilitador e não se responsabiliza por erros nos dados bancários fornecidos pelo usuário.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-secondary mb-2">5. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas através do aplicativo ou por e-mail.
          </p>
        </section>
        
        <div className="pt-8 text-xs text-gray-400 text-center">
          Última atualização: Dezembro de 2025
        </div>
      </main>
    </div>
  );
}