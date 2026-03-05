import { useEffect, useState, useRef } from 'react';
import { SplitFlapText, SplitFlapAudioProvider, SplitFlapMuteToggle } from './components/ui/split-flap-text';
import { Portal } from './pages/Portal';
import { LoginView } from './pages/LoginView';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Lock, Unlock, Check, ArrowRight, 
  Package, Shield, TrendingUp, Container, 
  Linkedin, Instagram, Menu, X,
  Headphones, FileCheck, Truck, Info
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Tooltip Component
interface TooltipProps {
  text: string;
}

function Tooltip({ text }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="inline-flex items-center justify-center w-5 h-5 ml-1 rounded-full border border-zinc-300 text-zinc-500 hover:text-zinc-700 hover:border-zinc-400 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Info className="w-3 h-3" />
      </button>
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 text-white text-xs rounded-lg whitespace-nowrap border border-zinc-200 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

interface PricingTier {
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
  color: string;
}

// Product Data
const products: Product[] = [
  {
    id: 1,
    name: "Geladeira Side-by-Side Built-in",
    category: "Eletrodomésticos Premium",
    image: "/images/product_refrigerator.jpg",
    description: "Refrigeração de alta performance com design integrado. Capacidade de 600L+ com tecnologia inverter."
  },
  {
    id: 2,
    name: "Moto Elétrica Designer",
    category: "Mobilidade Elétrica",
    image: "/images/product_motorcycle.jpg",
    description: "Design escandinavo minimalista. Autonomia de 150km, velocidade máxima de 100km/h."
  },
  {
    id: 3,
    name: "Batedeira Stand Mixer Artisan",
    category: "Utensílios de Cozinha",
    image: "/images/product_mixer.jpg",
    description: "Motor de 500W com 10 velocidades. Tigela de aço inoxidável de 4.8L."
  },
  {
    id: 4,
    name: "Robô Aspirador Laser Pro",
    category: "Smart Home",
    image: "/images/product_vacuum.jpg",
    description: "Navegação LiDAR, mapeamento inteligente, sucção de 4000Pa, integração Alexa/Google."
  }
];

// Pricing Data
const pricingTiers: PricingTier[] = [
  {
    name: "Guest",
    subtitle: "Catálogo Protegido",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Acesso ao catálogo",
      "Preços bloqueados",
      "Newsletter semanal",
      "Sem Fidelidade ou Multas"
    ],
    cta: "Criar Conta",
    color: "#71717A"
  },
  {
    name: "Gold",
    subtitle: "Comprador Ativo",
    monthlyPrice: 199,
    annualPrice: 1990,
    features: [
      "Preços abertos",
      "Mínimo 1m³",
      "Fila padrão de shipping",
      "Dashboard básico",
      "Suporte por chat",
      "Compra Direta e Imediata"
    ],
    highlighted: true,
    cta: "Escolher Gold",
    color: "#F59E0B"
  },
  {
    name: "Platinum",
    subtitle: "Escalador Premium",
    monthlyPrice: 599,
    annualPrice: 5990,
    features: [
      "Janelas de shipping selecionáveis",
      "Catálogos exclusivos",
      "Mínimo 1.5m³",
      "1.5% Cashback",
      "Agente dedicado",
      "Suporte prioritário 24/7",
      "Relatórios customizados"
    ],
    cta: "Escolher Platinum",
    color: "#8B5CF6"
  },
  {
    name: "Black",
    subtitle: "Concierge Elite",
    monthlyPrice: 1499,
    annualPrice: 14990,
    features: [
      "Fast-Pass Priority",
      "Caçador de Produtos Exclusivos",
      "Trend Radar (Vídeos/Research)",
      "3% Cashback",
      "Contrato dedicado",
      "Planejamento estratégico",
      "Acesso antecipado a produtos",
      "Atendimento VIP Próximo"
    ],
    cta: "Falar com Consultor",
    color: "#1F2937"
  }
];

// Header Component
function Header({ scrolled, onLogin }: { scrolled: boolean; onLogin: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200' 
          : 'bg-white/60 backdrop-blur-md border-b border-zinc-200/50'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PG</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-900 text-sm leading-tight">Prime Gate</span>
              <span className="text-[10px] text-zinc-600 leading-tight">Imports</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Produtos</a>
            <a href="#como-funciona" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Como Funciona</a>
            <a href="#precos" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Preços</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={onLogin}
              className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={onLogin}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition-all hover:-translate-y-0.5"
            >
              Cadastrar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-zinc-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200">
            <nav className="flex flex-col gap-4">
              <a href="#produtos" className="text-sm text-zinc-600">Produtos</a>
              <a href="#como-funciona" className="text-sm text-zinc-600">Como Funciona</a>
              <a href="#precos" className="text-sm text-zinc-600">Preços</a>
              <div className="flex gap-3 pt-4 border-t border-zinc-200">
                <button 
                  onClick={onLogin}
                  className="flex-1 px-4 py-2 text-sm text-zinc-600 border border-zinc-300 rounded-full hover:border-zinc-400"
                >
                  Login
                </button>
                <button 
                  onClick={onLogin}
                  className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full"
                >
                  Cadastrar
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Locked Product Card Component
function LockedProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-sm transition-all duration-500 hover:-translate-y-1">
      {/* Product Image */}
      <div className="aspect-square bg-zinc-50 p-8 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="text-xs text-zinc-600 uppercase tracking-wide">{product.category}</span>
        <h3 className="text-lg font-semibold text-zinc-900 mt-1 mb-2">{product.name}</h3>
        <p className="text-sm text-zinc-600 line-clamp-2">{product.description}</p>

        {/* Locked Price */}
        <div className="mt-4 pt-4 border-t border-zinc-200">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-600">Faça login para ver preços e margens</span>
          </div>
          <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
            <Unlock className="w-4 h-4" />
            Entrar para Ver Preços
          </button>
        </div>
      </div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({ 
  tier, 
  isAnnual 
}: { 
  tier: PricingTier; 
  isAnnual: boolean;
}) {
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const period = isAnnual ? '/ano' : '/mês';

  return (
    <div 
      className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1 border ${
        tier.highlighted 
          ? 'bg-white border-orange-600/30 shadow-sm' 
          : 'bg-white border-zinc-200 hover:border-zinc-300'
      }`}
    >
      {/* Popular Badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 rounded-full">
          <span className="text-white text-xs font-semibold">Mais Popular</span>
        </div>
      )}

      {/* Tier Header */}
      <div className="mb-6">
        <div 
          className="w-3 h-3 rounded-full mb-3"
          style={{ backgroundColor: tier.color }}
        />
        <h3 className="text-xl font-semibold text-zinc-900">{tier.name}</h3>
        <p className="text-sm text-zinc-600">{tier.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {price === 0 ? (
          <span className="text-3xl font-bold text-zinc-900">Grátis</span>
        ) : (
          <>
            <span className="text-3xl font-bold text-zinc-900">
              R$ {price.toLocaleString('pt-BR')}
            </span>
            <span className="text-zinc-600 ml-1">{period}</span>
          </>
        )}
        {isAnnual && price > 0 && (
          <p className="text-xs text-emerald-600 mt-1">Economize 20%</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, i) => {
          let tooltipText: string | null = null;
          
          if (tier.name === "Black") {
            if (feature === "Fast-Pass Priority") {
              tooltipText = "Sua carga tem prioridade zero. Você nunca fica para o próximo container, embarca sempre no primeiro disponível.";
            } else if (feature === "Caçador de Produtos Exclusivos") {
              tooltipText = "Nossa equipe na China localiza e negocia qualquer produto específico que você desejar, mesmo que não esteja no catálogo.";
            } else if (feature === "Trend Radar (Vídeos/Research)") {
              tooltipText = "Acesso a vídeos reais de feiras na China e relatórios de produtos que ainda nem chegaram ao Brasil.";
            }
          }
          
          return (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-zinc-600">{feature}</span>
              {tooltipText && <Tooltip text={tooltipText} />}
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      <button 
        className={`w-full py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 ${
          tier.highlighted 
            ? 'bg-orange-600 hover:bg-orange-700 text-white' 
            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200'
        }`}
      >
        {tier.cta}
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [view, setView] = useState<'home' | 'login' | 'portal'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle login success
  const handleLoginSuccess = () => {
    setView('portal');
  };

  // Handle logout
  const handleLogout = () => {
    setView('home');
  };

  // Setup scroll listeners
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (view !== 'home') return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
        gsap.fromTo(section.querySelectorAll('.animate-item'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [view]);

  // Render views
  if (view === 'login') {
    return (
      <LoginView 
        onLoginSuccess={handleLoginSuccess}
        onBack={() => setView('home')}
      />
    );
  }

  if (view === 'portal') {
    return <Portal onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header scrolled={scrolled} onLogin={() => setView('login')} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center pt-24 pb-24 overflow-hidden bg-white">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-zinc-200/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full px-6 lg:px-12 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-10 animate-fade-in">
              Clube de Importação Premium
            </p>

            <SplitFlapAudioProvider>
              <div className="flex flex-col items-center gap-0 animate-slide-up">
                <SplitFlapText text="PRIME GATE" className="justify-center" />
                <div className="mt-8 text-3xl md:text-4xl tracking-[0.5em] font-light text-zinc-900 uppercase">
                  IMPORTS
                </div>
                <SplitFlapMuteToggle className="mt-4" />
              </div>
            </SplitFlapAudioProvider>

            <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-900 font-medium mb-6 mt-12 animate-slide-up">
              O que o varejo tradicional ainda não descobriu, nós já embarcamos.
            </p>

            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-10 animate-slide-up">
              Acesso exclusivo a produtos premium da China. Preços de atacado, logística simplificada, margens reais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <button 
                onClick={() => setView('login')}
                className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-full flex items-center justify-center gap-2"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setView('login')}
                className="px-8 py-4 bg-white text-zinc-900 font-medium rounded-full border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 transition-all hover:-translate-y-0.5"
              >
                Ver Produtos
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-slide-up">
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-900">8.000+</p>
                <p className="text-sm text-zinc-600">Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-900">30%</p>
                <p className="text-sm text-zinc-600">Economia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-zinc-900">470+</p>
                <p className="text-sm text-zinc-600">Membros</p>
              </div>
            </div>
        </div>
      </section>

      {/* The 4 Pillars */}
      <section className="py-24 lg:py-32 bg-zinc-50 animate-section">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
                Os 4 Pilares
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                O que diferencia a Prime Gate da importação tradicional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Curadoria Implacável', desc: 'Apenas exclusividades que ninguém traz para o Brasil.', icon: Shield },
                { title: 'Compra Direta', desc: 'Sem cotações. Viu, gostou, comprou. Preço final na tela.', icon: TrendingUp },
                { title: 'Economia na Fonte', desc: 'Compre com preço de fábrica para revender ou equipar sua empresa.', icon: Package },
                { title: 'Sem Custos Escondidos', desc: 'Entregamos na sua porta. Cuidamos de 100% da alfândega.', icon: Truck },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-zinc-300 hover:shadow-sm animate-item">
                  <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">{item.title}</h3>
                  <p className="text-zinc-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="produtos" className="py-24 lg:py-32 bg-white animate-section">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
                Acervo Exclusivo
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="animate-item">
                  <LockedProductCard product={product} />
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Radar */}
      <section className="py-24 bg-zinc-50 animate-section">
        <div className="max-w-6xl mx-auto px-6">
           <h2 className="text-3xl font-bold text-center mb-16">Radar de Containers</h2>
           <div className="grid md:grid-cols-4 gap-6">
              {[85, 62, 71, 44].map((occ, i) => (
                <div key={i} className="bg-white border p-6 rounded-xl animate-item">
                  <Container className="w-6 h-6 text-orange-600 mb-4" />
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="bg-orange-600 h-full" style={{ width: `${occ}%` }} />
                  </div>
                  <p className="text-xs mt-2 font-bold">{occ}% Ocupado</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-24 animate-section">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Como Funciona</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Escolha', icon: Package },
              { step: '02', title: 'Cotação', icon: FileCheck },
              { step: '03', title: 'Consolidação', icon: Container },
              { step: '04', title: 'Entrega', icon: Truck },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-8 animate-item">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <span className="text-3xl font-bold text-orange-600">{item.step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-24 lg:py-32 bg-white animate-section">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
                Planos e Preços
              </h2>
            </div>

            <div className="flex justify-center mb-12 animate-item">
              <div className="bg-zinc-100 p-1 rounded-full flex items-center">
                <button onClick={() => setIsAnnual(false)} className={`px-6 py-2 rounded-full text-sm font-medium ${!isAnnual ? 'bg-orange-600 text-white' : 'text-zinc-600'}`}>Mensal</button>
                <button onClick={() => setIsAnnual(true)} className={`px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${isAnnual ? 'bg-orange-600 text-white' : 'text-zinc-600'}`}>Anual <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] rounded-full">-20%</span></button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier) => (
                <div key={tier.name} className="animate-item">
                  <PricingCard tier={tier} isAnnual={isAnnual} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-item">
              <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-full inline-flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Falar com Consultor
              </button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center gap-3 mb-6">
                <Linkedin className="w-5 h-5 text-zinc-400 hover:text-zinc-900" />
                <Instagram className="w-5 h-5 text-zinc-400 hover:text-zinc-900" />
            </div>
            <p className="text-zinc-600 text-sm">
              © 2026 Prime Gate Imports. Todos os direitos reservados.
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;