import { useState } from 'react';
import { Menu, X, Search, Bell, LogOut, Home, Package, Radar, Headphones, ChevronRight } from 'lucide-react';
import { SplitFlapText, SplitFlapAudioProvider } from '../components/ui/split-flap-text';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Cadeira Executiva Premium',
    image: '/placeholder.svg?height=300&width=300',
    moq: '10 un',
    volume: '2.5m³',
    suggestedPrice: 5000,
    memberPrice: 1850,
  },
  {
    id: 2,
    name: 'Poltrona de Couro Importado',
    image: '/placeholder.svg?height=300&width=300',
    moq: '8 un',
    volume: '1.8m³',
    suggestedPrice: 4200,
    memberPrice: 1650,
  },
  {
    id: 3,
    name: 'Mesa de Vidro Temperado',
    image: '/placeholder.svg?height=300&width=300',
    moq: '15 un',
    volume: '3.2m³',
    suggestedPrice: 3500,
    memberPrice: 1200,
  },
  {
    id: 4,
    name: 'Estante Modular Minimalista',
    image: '/placeholder.svg?height=300&width=300',
    moq: '12 un',
    volume: '2.1m³',
    suggestedPrice: 2800,
    memberPrice: 950,
  },
];

const categories = [
  { name: 'Hospitalidade', icon: '🏨' },
  { name: 'Estética', icon: '✨' },
  { name: 'Smart Home', icon: '📱' },
  { name: 'Solar', icon: '☀️' },
];

// Product Card Component
function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="aspect-square bg-zinc-700 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">{product.name}</h3>

        {/* MOQ & Volume */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>MOQ: {product.moq}</span>
          <span>Vol: {product.volume}</span>
        </div>

        {/* Pricing */}
        <div className="space-y-1 py-2 border-t border-zinc-700">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Sugerido:</span>
            <span className="text-xs line-through text-zinc-500">R$ {product.suggestedPrice.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-orange-400">Membro:</span>
            <span className="text-lg font-bold text-orange-500">R$ {product.memberPrice.toLocaleString('pt-BR')}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors">
          Reservar m³
        </button>
      </div>
    </div>
  );
}

// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

function Sidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const sidebarItems = [
    { icon: Package, label: 'Acervo Exclusivo', href: '#' },
    { icon: Home, label: 'Meus Embarques', href: '#' },
    { icon: Radar, label: 'Radar de Containers', href: '#' },
    { icon: Headphones, label: 'Suporte Concierge', href: '#' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static left-0 top-0 h-screen bg-zinc-950 border-r border-zinc-800 w-64 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PG</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-100">Prime Gate</p>
              <p className="text-xs text-zinc-500">Portal Membro</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 ml-auto text-zinc-600" />
            </a>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-400 hover:bg-zinc-900 hover:text-red-400 transition-colors border border-zinc-800"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// Header Component
interface HeaderProps {
  memberName: string;
  cashbackValue: number;
  onMenuClick: () => void;
}

function Header({ memberName, cashbackValue, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Menu Toggle Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Procurar produtos..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-4">
          {/* Cashback Widget */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
            <span className="text-xs text-zinc-400">Cashback:</span>
            <span className="text-sm font-bold text-orange-400">R$ {cashbackValue.toLocaleString('pt-BR')}</span>
          </div>

          {/* Notifications */}
          <button className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
            <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold text-white">
              {memberName.charAt(0)}
            </div>
            <span className="text-sm text-zinc-300 hidden sm:inline">{memberName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Login Screen Component
interface LoginScreenProps {
  onLogin: () => void;
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-zinc-700/20 rounded-full blur-3xl" />

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-zinc-800/40 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">PG</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">Portal do Membro</h1>
            <p className="text-zinc-400 text-sm">Prime Gate Imports</p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors mb-4"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Help Text */}
          <p className="text-center text-xs text-zinc-500">
            Entre com suas credenciais de membro Prime Gate
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Portal Component
export function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header 
          memberName="João Silva"
          cashbackValue={2450}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Hero Banner */}
          <section className="bg-gradient-to-r from-orange-600 to-orange-700 px-4 md:px-6 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-2">Novo Embarque</p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
                    Mobiliário Corporativo de Luxo
                  </h2>
                  <p className="text-orange-50 text-lg mb-6">
                    Embarque em Abril • MOQ a partir de 10 unidades
                  </p>
                  <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors">
                    Explorar Coleção
                  </button>
                </div>
                <div className="w-full md:w-64 h-64 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🛋️</div>
                    <p className="text-white text-sm">Luxo & Elegância</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Navigation */}
          <section className="border-b border-zinc-800 px-4 md:px-6 py-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Categorias</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-orange-500 hover:bg-zinc-700 transition-colors text-sm font-medium text-zinc-300"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="px-4 md:px-6 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-zinc-100">Produtos em Destaque</h3>
                <a href="#" className="text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center gap-1">
                  Ver Todos <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* Live Terminal Widget */}
          <section className="px-4 md:px-6 py-12 border-t border-zinc-800">
            <div className="max-w-6xl mx-auto">
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 md:p-8">
                <h4 className="text-lg font-semibold text-zinc-100 mb-4">Terminal Ao Vivo</h4>
                <p className="text-zinc-400 text-sm mb-6">Atualizações em tempo real do seu portal:</p>
                
                <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                  <SplitFlapAudioProvider>
                    <div className="flex justify-center">
                      <SplitFlapText text="SISTEMA ONLINE" />
                    </div>
                  </SplitFlapAudioProvider>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-zinc-800 px-4 md:px-6 py-8 bg-zinc-950">
            <div className="max-w-6xl mx-auto text-center text-xs text-zinc-600">
              <p>© 2026 Prime Gate Imports. Portal do Membro Protegido.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
