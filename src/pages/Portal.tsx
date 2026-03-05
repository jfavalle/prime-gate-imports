import { useState } from 'react';
import { Menu, X, Search, Bell, LogOut, Home, Package, Radar, Headphones, ChevronRight } from 'lucide-react';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Cadeira Executiva Premium',
    image: '/placeholder.svg?height=300&width=300',
    moq: '10 un',
    volume: '2.5m³',
    suggestedPrice: 8900,
    memberPrice: 3200,
  },
  {
    id: 2,
    name: 'Poltrona de Couro Importado',
    image: '/placeholder.svg?height=300&width=300',
    moq: '8 un',
    volume: '1.8m³',
    suggestedPrice: 7500,
    memberPrice: 2850,
  },
  {
    id: 3,
    name: 'Mesa de Vidro Temperado',
    image: '/placeholder.svg?height=300&width=300',
    moq: '15 un',
    volume: '3.2m³',
    suggestedPrice: 6200,
    memberPrice: 2100,
  },
  {
    id: 4,
    name: 'Estante Modular Minimalista',
    image: '/placeholder.svg?height=300&width=300',
    moq: '12 un',
    volume: '2.1m³',
    suggestedPrice: 5400,
    memberPrice: 1950,
  },
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
            <span className="text-xs text-zinc-500">Varejo BR:</span>
            <span className="text-xs line-through text-zinc-500">R$ {product.suggestedPrice.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-orange-400">Preço Membro:</span>
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
  const menuItems = [
    { icon: Package, label: 'Acervo Premium', active: true },
    { icon: Radar, label: 'Radar de Containers' },
    { icon: Home, label: 'Minhas Compras' },
    { icon: Headphones, label: 'Suporte VIP' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800 p-6 z-40 transform transition-transform md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
            <span className="text-white font-bold">PG</span>
          </div>
          <div>
            <p className="text-white font-semibold">Prime Gate</p>
            <p className="text-xs text-zinc-400">Portal</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-orange-600/20 text-orange-500 border border-orange-600/30'
                  : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-600/10 transition-all border border-transparent hover:border-red-600/30"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </aside>
    </>
  );
}

// Dashboard Component
interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Navbar */}
        <header className="sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
          <div className="h-16 px-6 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-zinc-400 hover:text-zinc-300"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-semibold text-zinc-100">Acervo Exclusivo</h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden sm:flex relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-600/50"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-zinc-400 hover:text-zinc-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-orange-600 rounded-full" />
              </button>

              {/* Cashback Widget */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600/20 to-zinc-900 border border-orange-600/30 rounded-lg">
                <span className="text-xs text-zinc-400">Cashback:</span>
                <span className="text-sm font-bold text-orange-500">R$ 2.450</span>
              </div>

              {/* Profile */}
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <span className="text-sm font-semibold text-zinc-300">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <section className="relative px-6 py-12 bg-gradient-to-r from-orange-600/20 via-zinc-900 to-zinc-950 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
              Nova Coleção de Estética Avançada
            </h2>
            <p className="text-zinc-400 mb-6">
              Lotes disponíveis para embarque imediato. Preços exclusivos para membros platinum e black.
            </p>
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-all hover:-translate-y-0.5 flex items-center gap-2">
              Explorar Coleção
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-xl font-semibold text-zinc-100 mb-6">Produtos em Destaque</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Portal Main Component
interface PortalProps {
  onLogout: () => void;
}

export function Portal({ onLogout }: PortalProps) {
  return <Dashboard onLogout={onLogout} />;
}
