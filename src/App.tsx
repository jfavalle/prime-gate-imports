import { useEffect, useState, useRef } from 'react';
import SolariBoard from './SolariBoard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Lock, Unlock, Check, ArrowRight, 
  Package, Shield, TrendingUp, Container, 
  Mail, MapPin, Linkedin, Instagram, Menu, X,
  Headphones, FileCheck, Truck
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

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
    name: "Prata",
    subtitle: "Para começar",
    monthlyPrice: 99,
    annualPrice: 950,
    features: [
      "Matching básico de fornecedores",
      "Suporte por email",
      "Cotações em até 48h",
      "Newsletter mensal",
      "Acesso ao catálogo"
    ],
    cta: "Começar",
    color: "#C0C0C0"
  },
  {
    name: "Ouro",
    subtitle: "Mais popular",
    monthlyPrice: 249,
    annualPrice: 2390,
    features: [
      "Matching prioritário",
      "Suporte por chat",
      "Cotações em 24h",
      "Container compartilhado",
      "Dashboard de rastreamento",
      "Relatórios mensais"
    ],
    highlighted: true,
    cta: "Escolher Ouro",
    color: "#D4AF37"
  },
  {
    name: "Platina",
    subtitle: "Para escalar",
    monthlyPrice: 599,
    annualPrice: 5750,
    features: [
      "Agente dedicado",
      "Suporte 24/7",
      "Cotações instantâneas",
      "Prioridade de container",
      "Revisões mensais",
      "Relatórios customizados",
      "Descontos em volume"
    ],
    cta: "Escolher Platina",
    color: "#E5E4E2"
  },
  {
    name: "Black",
    subtitle: "Enterprise",
    monthlyPrice: 999,
    annualPrice: 9590,
    features: [
      "Linhas privadas de fornecedores",
      "Serviço white-glove",
      "Contratos customizados",
      "Descontos corporativos",
      "Planejamento estratégico",
      "Acesso antecipado a produtos"
    ],
    cta: "Falar com Vendas",
    color: "#1D1D1F"
  }
];

// Header Component
function Header({ scrolled }: { scrolled: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-apple border-b border-black/5 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
              <span className="text-white font-bold text-sm">PG</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[#1D1D1F] text-sm leading-tight">Prime Gate</span>
              <span className="text-[10px] text-[#86868B] leading-tight">Imports</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#produtos" className="text-sm text-[#1D1D1F] hover:text-[#0071E3] transition-colors">Produtos</a>
            <a href="#como-funciona" className="text-sm text-[#1D1D1F] hover:text-[#0071E3] transition-colors">Como Funciona</a>
            <a href="#precos" className="text-sm text-[#1D1D1F] hover:text-[#0071E3] transition-colors">Preços</a>
            <a href="#faq" className="text-sm text-[#1D1D1F] hover:text-[#0071E3] transition-colors">FAQ</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
              Login
            </button>
            <button className="px-5 py-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium rounded-full transition-all hover:-translate-y-0.5">
              Cadastrar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/5">
            <nav className="flex flex-col gap-4">
              <a href="#produtos" className="text-sm text-[#1D1D1F]">Produtos</a>
              <a href="#como-funciona" className="text-sm text-[#1D1D1F]">Como Funciona</a>
              <a href="#precos" className="text-sm text-[#1D1D1F]">Preços</a>
              <a href="#faq" className="text-sm text-[#1D1D1F]">FAQ</a>
              <div className="flex gap-3 pt-4 border-t border-black/5">
                <button className="flex-1 px-4 py-2 text-sm text-[#1D1D1F] border border-black/10 rounded-full">
                  Login
                </button>
                <button className="flex-1 px-4 py-2 bg-[#0071E3] text-white text-sm font-medium rounded-full">
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

// Sticky VIP Card Component
function StickyVIPCard({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 lg:right-8 z-40 animate-slide-up">
      <div className="bg-vip-gradient rounded-2xl p-4 w-[260px] shadow-apple-elevated border border-white/10">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
              <span className="text-white font-bold text-xs">PG</span>
            </div>
            <span className="text-white/90 text-sm font-medium">Prime Gate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
            <span className="text-[#34C759] text-[10px]">Online</span>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">Status</span>
            <span className="text-[#D4AF37] text-xs font-medium">Membro Premium</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">Volume</span>
            <span className="text-white text-xs font-medium">1m³</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">Próximo Envio</span>
            <span className="text-white text-xs font-medium">Mar 2026</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-[10px]">Container 20ft</span>
            <span className="text-[#0071E3] text-[10px] font-medium">85% cheio</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-[#0071E3] to-[#42A5F5] rounded-full" />
          </div>
          <p className="text-white/40 text-[10px] mt-2">Apenas 5m³ disponíveis</p>
        </div>
      </div>
    </div>
  );
}

// Locked Product Card Component
function LockedProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-apple-card hover:shadow-apple-hover transition-all duration-500 hover:-translate-y-1">
      {/* Product Image */}
      <div className="aspect-square bg-[#F5F5F7] p-8 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <span className="text-xs text-[#86868B] uppercase tracking-wide">{product.category}</span>
        <h3 className="text-lg font-semibold text-[#1D1D1F] mt-1 mb-2">{product.name}</h3>
        <p className="text-sm text-[#86868B] line-clamp-2">{product.description}</p>

        {/* Locked Price */}
        <div className="mt-4 pt-4 border-t border-[#F5F5F7]">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-[#86868B]" />
            <span className="text-sm text-[#86868B]">Faça login para ver preços e margens</span>
          </div>
          <button className="w-full py-3 bg-[#F5F5F7] hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
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
      className={`relative rounded-3xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1 ${
        tier.highlighted 
          ? 'bg-white shadow-apple-elevated border-2 border-[#0071E3]' 
          : 'bg-white shadow-apple-card hover:shadow-apple-hover'
      }`}
    >
      {/* Popular Badge */}
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0071E3] rounded-full">
          <span className="text-white text-xs font-medium">Mais Popular</span>
        </div>
      )}

      {/* Tier Header */}
      <div className="mb-6">
        <div 
          className="w-3 h-3 rounded-full mb-3"
          style={{ backgroundColor: tier.color }}
        />
        <h3 className="text-xl font-semibold text-[#1D1D1F]">{tier.name}</h3>
        <p className="text-sm text-[#86868B]">{tier.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl font-bold text-[#1D1D1F]">
          R$ {price.toLocaleString('pt-BR')}
        </span>
        <span className="text-[#86868B]">{period}</span>
        {isAnnual && (
          <p className="text-xs text-[#34C759] mt-1">Economize 20%</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-[#1D1D1F]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button 
        className={`w-full py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 ${
          tier.highlighted 
            ? 'bg-[#0071E3] hover:bg-[#0077ED] text-white' 
            : 'bg-[#F5F5F7] hover:bg-[#1D1D1F] text-[#1D1D1F] hover:text-white'
        }`}
      >
        {tier.cta}
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showVIPCard, setShowVIPCard] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowVIPCard(scrollY > 400);
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
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <Header scrolled={scrolled} />

      {/* Sticky VIP Card */}
      <StickyVIPCard visible={showVIPCard} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F7] to-[#FAFAFA]" />
        
        {/* Decorative Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0071E3]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#34C759]/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full px-6 lg:px-12 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <p className="text-xs uppercase tracking-[0.2em] text-[#86868B] mb-6 animate-fade-in">
              Clube de Importação Premium
            </p>

            {/* Headline — Solari Board */}
            <div className="mb-6 animate-slide-up flex justify-center">
              <SolariBoard />
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#1D1D1F] font-medium mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              O que o varejo tradicional ainda não descobriu, nós já embarcamos.
            </p>

            {/* Subheadline */}
            <p className="text-lg text-[#86868B] max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Acesso exclusivo a produtos premium da China. Preços de atacado, logística simplificada, margens reais.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <button className="px-8 py-4 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium rounded-full transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white text-[#1D1D1F] font-medium rounded-full border border-[#D2D2D7] hover:border-[#0071E3] hover:text-[#0071E3] transition-all hover:-translate-y-0.5">
                Ver Produtos
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1D1D1F]">500+</p>
                <p className="text-sm text-[#86868B]">Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1D1D1F]">30%</p>
                <p className="text-sm text-[#86868B]">Economia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1D1D1F]">200+</p>
                <p className="text-sm text-[#86868B]">Membros</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 lg:py-32 animate-section">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] text-apple-headline mb-4">
                Por que importadores escolhem a Prime Gate
              </h2>
              <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
                Elimine a complexidade. Mantenha as margens.
              </p>
            </div>

            {/* Value Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Shield, 
                  title: 'Fornecedores Verificados', 
                  desc: 'Fábricas auditadas, compliance garantido. Cada parceiro passa por rigoroso processo de verificação.' 
                },
                { 
                  icon: TrendingUp, 
                  title: 'Preços Transparentes', 
                  desc: 'Sem taxas ocultas. Custo itemizado em cada etapa. Você sabe exatamente onde cada centavo vai.' 
                },
                { 
                  icon: Package, 
                  title: 'Logística Integrada', 
                  desc: 'Do fornecedor à sua porta, rastreado e segurado. Acompanhe cada etapa em tempo real.' 
                },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-3xl p-8 shadow-apple-card hover:shadow-apple-hover transition-all duration-500 hover:-translate-y-1 animate-item"
                >
                  <div className="w-14 h-14 bg-[#F5F5F7] rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-[#0071E3]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">{item.title}</h3>
                  <p className="text-[#86868B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locked Product Showcase */}
      <section id="produtos" className="py-24 lg:py-32 bg-[#F5F5F7] animate-section">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] text-apple-headline mb-4">
                Catálogo Exclusivo
              </h2>
              <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
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
              <p className="text-[#86868B] mb-4">Quer ver todos os produtos e preços?</p>
              <button className="px-8 py-4 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium rounded-full transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
                <Unlock className="w-5 h-5" />
                Criar Conta Gratuita
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-24 lg:py-32 animate-section">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] text-apple-headline mb-4">
                Como Funciona
              </h2>
              <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
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
                    <div className="hidden lg:block absolute top-8 left-full w-full h-[2px] bg-[#F5F5F7]" />
                  )}
                  
                  <div className="bg-white rounded-3xl p-8 shadow-apple-card hover:shadow-apple-hover transition-all duration-500 hover:-translate-y-1 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-[#0071E3] rounded-2xl flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-4xl font-bold text-[#F5F5F7]">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">{item.title}</h3>
                    <p className="text-[#86868B] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Container Progress Section */}
      <section className="py-24 lg:py-32 bg-[#1D1D1F] animate-section">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-apple-headline mb-4">
                Container Compartilhado
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Pague apenas pelo espaço que usar. Acompanhe em tempo real.
              </p>
            </div>

            {/* Progress Bars */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* 20ft Container */}
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10 animate-item">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Container 20ft</h3>
                    <p className="text-sm text-white/50">33m³ capacidade · Entrega mais rápida</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#0071E3]">85%</p>
                    <p className="text-xs text-white/50">cheio</p>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                  <div className="h-full w-[85%] bg-gradient-to-r from-[#0071E3] to-[#42A5F5] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Envio: Março 2026</span>
                  <span className="text-[#FF9500]">Apenas 5m³ disponíveis</span>
                </div>
              </div>

              {/* 40ft Container */}
              <div className="bg-white/5 rounded-3xl p-8 border border-white/10 animate-item">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Container 40ft</h3>
                    <p className="text-sm text-white/50">67m³ capacidade · Custo por m³ menor</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#34C759]">42%</p>
                    <p className="text-xs text-white/50">cheio</p>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                  <div className="h-full w-[42%] bg-gradient-to-r from-[#34C759] to-[#30D158] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Envio: Abril 2026</span>
                  <span className="text-[#34C759]">39m³ disponíveis</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: 'Até 30%', label: 'Economia', sublabel: 'vs. importação tradicional' },
                { value: '24/7', label: 'Rastreamento', sublabel: 'Acompanhamento em tempo real' },
                { value: '100%', label: 'Seguro', sublabel: 'Cobertura total da carga' },
              ].map((stat, i) => (
                <div key={i} className="text-center animate-item">
                  <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-white font-medium mb-1">{stat.label}</p>
                  <p className="text-white/50 text-sm">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-24 lg:py-32 animate-section">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 animate-item">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D1D1F] text-apple-headline mb-4">
                Escolha seu Plano
              </h2>
              <p className="text-lg text-[#86868B] max-w-2xl mx-auto">
                Planos flexíveis para cada estágio do seu negócio.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-12 animate-item">
              <div className="bg-[#F5F5F7] rounded-full p-1 flex items-center">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !isAnnual 
                      ? 'bg-white text-[#1D1D1F] shadow-sm' 
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    isAnnual 
                      ? 'bg-white text-[#1D1D1F] shadow-sm' 
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
                  }`}
                >
                  Anual
                  <span className="px-2 py-0.5 bg-[#34C759] text-white text-[10px] rounded-full">
                    Economize 20%
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
              <p className="text-[#86868B] mb-4">
                Precisa de um plano customizado para sua empresa?
              </p>
              <button className="px-8 py-4 bg-[#1D1D1F] hover:bg-black text-white font-medium rounded-full transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D1D1F] py-16 lg:py-20">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                    <span className="text-[#1D1D1F] font-bold text-sm">PG</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-sm">Prime Gate</span>
                    <span className="text-[10px] text-white/50">Imports</span>
                  </div>
                </div>
                <p className="text-white/50 text-sm mb-6">
                  O que o varejo tradicional ainda não descobriu, nós já embarcamos.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#0071E3] transition-colors">
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#0071E3] transition-colors">
                    <Instagram className="w-5 h-5 text-white" />
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
                    <Mail className="w-5 h-5 text-[#0071E3]" />
                    <span className="text-white/50 text-sm">contato@primegateimports.com.br</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#0071E3]" />
                    <span className="text-white/50 text-sm">São Paulo / SP</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                © 2026 Prime Gate Imports. Todos os direitos reservados.
              </p>
              <div className="flex gap-6">
                {['Termos', 'Privacidade', 'Cookies'].map((item) => (
                  <a key={item} href="#" className="text-white/40 hover:text-white text-sm transition-colors">
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
