import { useEffect, useState, useRef } from 'react';
import { SplitFlapText, SplitFlapAudioProvider, SplitFlapMuteToggle } from './components/ui/split-flap-text';
import { Portal } from './pages/Portal';
import { LoginView } from './pages/LoginView';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Lock, Unlock, Check, ArrowRight, 
  Package, Shield, TrendingUp, Container, 
  Mail, MapPin, Linkedin, Instagram, Menu, X,
  Headphones, FileCheck, Truck, Info
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Tooltip Component
interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

function Tooltip({ text, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="inline-flex items-center justify-center w-5 h-5 ml-1 rounded-full border border-zinc-600 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Info className="w-3 h-3" />
      </button>
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 text-zinc-100 text-xs rounded-lg whitespace-nowrap border border-zinc-700 shadow-lg">
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
          ? 'bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800' 
          : 'bg-zinc-900/60 backdrop-blur-md border-b border-zinc-800/50'
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
              <span className="font-semibold text-white text-sm leading-tight">Prime Gate</span>
              <span className="text-[10px] text-zinc-400 leading-tight">Imports</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/produtos" className="text-sm text-zinc-300 hover:text-white transition-colors">Produtos</a>
            <a href="/como-funciona" className="text-sm text-zinc-300 hover:text-white transition-colors">Como Funciona</a>
            <a href="/precos" className="text-sm text-zinc-300 hover:text-white transition-colors">Preços</a>
            <a href="/faq" className="text-sm text-zinc-300 hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={onLogin}
              className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
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
            className="md:hidden p-2 text-zinc-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <nav className="flex flex-col gap-4">
              <a href="/produtos" className="text-sm text-zinc-300">Produtos</a>
              <a href="/como-funciona" className="text-sm text-zinc-300">Como Funciona</a>
              <a href="/precos" className="text-sm text-zinc-300">Preços</a>
              <a href="/faq" className="text-sm text-zinc-300">FAQ</a>
              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <button 
                  onClick={onLogin}
                  className="flex-1 px-4 py-2 text-sm text-zinc-300 border border-zinc-700 rounded-full hover:border-zinc-500"
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
    <div className="group relative bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1">
      {/* Product Image */}
      <div className="aspect-square bg-zinc-800 p-8 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="text-xs text-zinc-500 uppercase tracking-wide">{product.category}</span>
        <h3 className="text-lg font-semibold text-zinc-100 mt-1 mb-2">{product.name}</h3>
        <p className="text-sm text-zinc-400 line-clamp-2">{product.description}</p>

        {/* Locked Price */}
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Faça login para ver preços e margens</span>
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
          ? 'bg-zinc-800 border-orange-600/50 shadow-lg shadow-orange-600/10' 
          : 'bg-zinc-800 border-zinc-700 hover:border-zinc-600'
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
        <h3 className="text-xl font-semibold text-zinc-100">{tier.name}</h3>
        <p className="text-sm text-zinc-400">{tier.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {price === 0 ? (
          <span className="text-3xl font-bold text-zinc-100">Grátis</span>
        ) : (
          <>
            <span className="text-3xl font-bold text-zinc-100">
              R$ {price.toLocaleString('pt-BR')}
            </span>
            <span className="text-zinc-400 ml-1">{period}</span>
          </>
        )}
        {isAnnual && price > 0 && (
          <p className="text-xs text-emerald-400 mt-1">Economize 20%</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, i) => {
          // Add tooltips for Black and Platinum specific features
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
              <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-zinc-300">{feature}</span>
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
            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700'
        }`}
      >
        {tier.cta}
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [view, setView] = useState<'home' | 'login' | 'dashboard'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle login success
  const handleLoginSuccess = () => {
    setView('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setView('home');
  };

  // Render login view
  if (view === 'login') {
    return (
      <LoginView 
        onLoginSuccess={handleLoginSuccess}
        onBack={() => setView('home')}
      />
    );
  }

  // Render dashboard
  if (view === 'dashboard') {
    return <Portal onLogout={handleLogout} />;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP Scroll Animations
    const ctx = gsap.context(() => {
      // Animate sections on scroll
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
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <Header scrolled={scrolled} onLogin={() => setView('login')} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center pt-24 pb-24 overflow-hidden bg-zinc-900">
        {/* Subtle decorative orbs on dark bg */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-zinc-700/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow */}
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-10 animate-fade-in">
              Clube de Importação Premium
            </p>

            {/* Split-Flap Board */}
            <SplitFlapAudioProvider>
              <div className="flex flex-col items-center gap-0 animate-slide-up">
                <SplitFlapText text="PRIME GATE" className="justify-center" />
                <div className="mt-8 text-3xl md:text-4xl tracking-[0.5em] font-light text-zinc-200 uppercase letter-spacing">
                  IMPORTS
                </div>
                <SplitFlapMuteToggle className="mt-4" />
              </div>
            </SplitFlapAudioProvider>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-200 font-medium mb-6 mt-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              O que o varejo tradicional ainda não descobriu, nós já embarcamos.
            </p>

            {/* Subheadline */}
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Acesso exclusivo a produtos premium da China. Preços de atacado, logística simplificada, margens reais.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={() => setView('login')}
                className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-full border border-zinc-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setView('login')}
                className="px-8 py-4 bg-transparent text-zinc-300 font-medium rounded-full border border-zinc-700 hover:border-zinc-500 hover:text-white transition-all hover:-translate-y-0.5"
              >
                Ver Produtos
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-zinc-500">Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">30%</p>
                <p className="text-sm text-zinc-500">Economia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">200+</p>
                <p className="text-sm text-zinc-500">Membros</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - The 4 Pillars */}
      <section className="py-24 lg:py-32 bg-zinc-950 animate-section">
        {/* Layered Gray Wrapper */}
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
                Os 4 Pilares
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                O que diferencia a Prime Gate da importação tradicional.
              </p>
            </div>

            {/* 4 Pillar Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Curadoria Implacável', 
                  desc: 'Esqueça o mar de itens genéricos de sites chineses. Nosso acervo tem apenas exclusividades que ninguém traz para o Brasil.',
                  icon: Shield
                },
                { 
                  title: 'Compra Direta', 
                  desc: 'Sem cotações. Viu, gostou, comprou. Preço final na tela e mínimo de 1m³.',
                  icon: TrendingUp
                },
                { 
                  title: 'Economia na Fonte', 
                  desc: 'Compre com preço de fábrica para revender ou equipar sua empresa. Transparência total.',
                  icon: Package
                },
                { 
                  title: 'Sem Custos Escondidos', 
                  desc: 'Entregamos na sua porta. Cuidamos de 100% da alfândega e frete sem surpresas.',
                  icon: Truck
                },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1 animate-item"
                >
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-3">{item.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locked Product Showcase */}
      <section id="produtos" className="py-24 lg:py-32 bg-zinc-950 animate-section">
        {/* Layered Gray Wrapper */}
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
                Catálogo Exclusivo
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Produtos premium selecionados para o mercado brasileiro. 
                Faça login para desbloquear preços e margens.
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div key={product.id} className="animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <LockedProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Login CTA */}
            <div className="mt-12 text-center animate-item">
              <p className="text-zinc-400 mb-4">Quer ver todos os produtos e preços?</p>
              <button 
                onClick={() => setView('login')}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <Unlock className="w-5 h-5" />
                Criar Conta Gratuita
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-24 lg:py-32 bg-zinc-950 animate-section">
        {/* Layered Gray Wrapper */}
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
                Como Funciona
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Quatro passos simples do pedido à entrega.
              </p>
            </div>

            {/* Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Escolha', desc: 'Selecione seus produtos e volumes desejados no nosso catálogo exclusivo.', icon: Package },
                { step: '02', title: 'Cotação', desc: 'Receba preços transparentes e detalhados em até 24 horas.', icon: FileCheck },
                { step: '03', title: 'Consolidação', desc: 'Seus produtos são agrupados no container compartilhado.', icon: Container },
                { step: '04', title: 'Entrega', desc: 'Receba tudo de uma vez, rastreado e com seguro incluído.', icon: Truck },
              ].map((item, i) => (
                <div key={i} className="relative animate-item">
                  {/* Connector Line */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-zinc-800" />
                  )}
                  
                  <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-4xl font-bold text-zinc-700">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-100 mb-3">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Container Radar Section */}
      <section className="py-24 lg:py-32 bg-zinc-950 animate-section">
        {/* Layered Gray Wrapper */}
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
                Radar de Containers
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Navegue entre os containers em tempo real. Escolha sua rota, seu timing.
              </p>
            </div>

            {/* Container Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { 
                  route: 'Shenzhen > Santos', 
                  occupancy: 85, 
                  status: 'Fechando em 48h',
                  color: 'from-blue-600 to-blue-400'
                },
                { 
                  route: 'Shanghai > Rio', 
                  occupancy: 62, 
                  status: 'Zarpou',
                  color: 'from-orange-600 to-orange-400'
                },
                { 
                  route: 'Guangzhou > SP', 
                  occupancy: 71, 
                  status: 'Aguardando Receita',
                  color: 'from-emerald-600 to-emerald-400'
                },
                { 
                  route: 'Ningbo > Santos', 
                  occupancy: 44, 
                  status: 'Planejando Rota',
                  color: 'from-purple-600 to-purple-400'
                },
              ].map((container, i) => (
                <div 
                  key={i}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 hover:border-zinc-600 transition-all duration-500 hover:-translate-y-1 animate-item"
                >
                  {/* Container Visual */}
                  <div className={`h-20 rounded-lg bg-gradient-to-r ${container.color} flex items-center justify-center mb-4 border border-white/10`}>
                    <Container className="w-10 h-10 text-white/80" />
                  </div>
                  
                  {/* Route */}
                  <p className="text-sm font-medium text-zinc-300 mb-3">{container.route}</p>
                  
                  {/* Occupancy */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-500">Ocupação</span>
                      <span className="text-xs font-semibold text-zinc-300">{container.occupancy}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${container.color} rounded-full`}
                        style={{ width: `${container.occupancy}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="pt-3 border-t border-zinc-800">
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                      {container.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: 'Até 30%', label: 'Economia', sublabel: 'vs. importação tradicional' },
                { value: '24/7', label: 'Rastreamento', sublabel: 'Acompanhamento em tempo real' },
                { value: '100%', label: 'Seguro', sublabel: 'Cobertura total da carga' },
              ].map((stat, i) => (
                <div key={i} className="text-center animate-item">
                  <p className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2">{stat.value}</p>
                  <p className="text-zinc-300 font-medium mb-1">{stat.label}</p>
                  <p className="text-zinc-500 text-sm">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-24 lg:py-32 bg-zinc-950 animate-section">
        {/* Layered Gray Wrapper */}
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
                Escolha seu Plano
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                Planos flexíveis para cada estágio do seu negócio.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-12 animate-item">
              <div className="bg-zinc-900 border border-zinc-800 rounded-full p-1 flex items-center">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !isAnnual 
                      ? 'bg-orange-600 text-white' 
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    isAnnual 
                      ? 'bg-orange-600 text-white' 
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  Anual
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] rounded-full">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier, i) => (
                <div key={tier.name} className="animate-item" style={{ animationDelay: `${i * 0.1}s` }}>
                  <PricingCard tier={tier} isAnnual={isAnnual} />
                </div>
              ))}
            </div>

            {/* Enterprise CTA */}
            <div className="mt-12 text-center animate-item">
              <p className="text-zinc-400 mb-4">
                Precisa de um plano customizado para sua empresa?
              </p>
              <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium rounded-full transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 lg:py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PG</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-sm">Prime Gate</span>
                    <span className="text-[10px] text-white/50">Imports</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mb-6">
                  O que o varejo tradicional ainda não descobriu, nós já embarcamos.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Linkedin className="w-5 h-5 text-zinc-300" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Instagram className="w-5 h-5 text-zinc-300" />
                  </a>
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Produto</h4>
                <ul className="space-y-3">
                  {['Catálogo', 'Como Funciona', 'Preços', 'FAQ'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Empresa</h4>
                <ul className="space-y-3">
                  {['Sobre Nós', 'Carreiras', 'Blog', 'Contato'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-semibold mb-4">Contato</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span className="text-zinc-400 text-sm">contato@primegateimports.com.br</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span className="text-zinc-400 text-sm">São Paulo / SP</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-zinc-600 text-sm">
                © 2026 Prime Gate Imports. Todos os direitos reservados.
              </p>
              <div className="flex gap-6">
                {['Termos', 'Privacidade', 'Cookies'].map((item) => (
                  <a key={item} href="#" className="text-zinc-600 hover:text-zinc-300 text-sm transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
