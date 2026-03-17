import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Phone, 
  Mail,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

export default function Help() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      category: "Fretes",
      items: [
        {
          question: "Como aceitar um frete?",
          answer: "Os fretes são atribuídos diretamente pela transportadora. Quando um novo frete estiver disponível para você, ele aparecerá na tela 'Meus Fretes' com o status 'Novo'."
        },
        {
          question: "O que fazer se o frete for cancelado?",
          answer: "Se um frete for cancelado, você receberá uma notificação. Caso já esteja em rota, entre em contato imediatamente com a transportadora para instruções."
        }
      ]
    },
    {
      category: "Despesas",
      items: [
        {
          question: "Quais despesas posso solicitar?",
          answer: "Você pode solicitar reembolso para pedágios não previstos, estadias excedentes, descargas e outras taxas extras acordadas com a transportadora."
        },
        {
          question: "Quanto tempo demora a aprovação?",
          answer: "Geralmente, as transportadoras analisam as solicitações em até 30 minutos durante o horário comercial."
        }
      ]
    },
    {
      category: "Pagamentos",
      items: [
        {
          question: "Como transfiro meu saldo?",
          answer: "Acesse a opção 'Transferir' no menu inicial, digite o valor desejado e confirme. O valor será enviado via Pix para sua conta cadastrada."
        },
        {
          question: "Existe taxa de transferência?",
          answer: "Sim, existe uma taxa administrativa de 10% sobre o valor solicitado para cobrir custos operacionais e impostos."
        }
      ]
    },
    {
      category: "Cadastro",
      items: [
        {
          question: "Como altero meus dados?",
          answer: "Vá em 'Meu Perfil' no menu. Lá você pode alterar seu telefone, e-mail, foto e dados bancários. Algumas alterações exigem confirmação por código."
        }
      ]
    }
  ];

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
          <h1 className="text-xl font-bold text-secondary">Ajuda</h1>
        </div>
      </header>

      <main className="px-6 py-8 space-y-8">
        
        {/* FAQ */}
        <section className="space-y-6">
           <h2 className="text-lg font-bold text-secondary">Perguntas Frequentes</h2>
           
           <div className="space-y-6">
              {faqs.map((category, catIndex) => (
                <div key={catIndex}>
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 ml-1">{category.category}</h3>
                   <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                      {category.items.map((item, index) => {
                        const globalIndex = catIndex * 100 + index;
                        const isOpen = openFaq === globalIndex;
                        
                        return (
                          <div key={index} className="bg-white">
                             <button 
                               onClick={() => toggleFaq(globalIndex)}
                               className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                             >
                                <span className="text-sm font-bold text-secondary pr-4">{item.question}</span>
                                {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                             </button>
                             
                             {isOpen && (
                               <div className="px-4 pb-4 pt-0 text-sm text-gray-600 leading-relaxed bg-gray-50/50 animate-in slide-in-from-top-2 duration-200">
                                  <div className="h-px w-full bg-gray-100 mb-3"></div>
                                  {item.answer}
                               </div>
                             )}
                          </div>
                        );
                      })}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Contact Support */}
        <section className="space-y-4">
           <h2 className="text-lg font-bold text-secondary">Fale Conosco</h2>
           <div className="grid gap-3">
              <a href="mailto:suporte@vasto.com.br" className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                 <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm">
                    <Mail size={20} />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-secondary text-sm">Enviar E-mail</h3>
                    <p className="text-xs text-gray-500">suporte@vasto.com.br</p>
                 </div>
                 <ExternalLink size={16} className="text-gray-400" />
              </a>

              <a href="tel:08001234567" className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                 <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm">
                    <Phone size={20} />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-secondary text-sm">Central de Atendimento</h3>
                    <p className="text-xs text-gray-500">0800 123 4567</p>
                 </div>
                 <ExternalLink size={16} className="text-gray-400" />
              </a>

              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="bg-green-50 p-4 rounded-2xl flex items-center gap-4 border border-green-100 hover:bg-green-100 transition-colors">
                 <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                    <MessageSquare size={20} />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-green-800 text-sm">WhatsApp</h3>
                    <p className="text-xs text-green-600">(11) 99999-9999</p>
                 </div>
                 <ExternalLink size={16} className="text-green-400" />
              </a>
           </div>
        </section>

      </main>
    </div>
  );
}