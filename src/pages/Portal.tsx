import { useState } from 'react';
import { Search, Bell, LogOut, ShoppingCart, ChevronDown } from 'lucide-react';

interface PortalProps {
  onLogout: () => void;
}

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Hub Inteligente Compatível com Alexa',
    image: '/placeholder.svg?height=300&width=300',
    moq: 10,
    volume: 0.45,
    suggestedPrice: 5900,
    memberPrice: 2150,
  },
  {
    id: 2,
    name: 'Lâmpada LED Inteligente RGB',
    image: '/placeholder.svg?height=300&width=300',
    moq: 25,
    volume: 0.18,
    suggestedPrice: 1200,
    memberPrice: 420,
  },
  {
    id: 3,
    name: 'Interruptor Inteligente Touch',
    image: '/placeholder.svg?height=300&width=300',
    moq: 15,
    volume: 0.25,
    suggestedPrice: 890,
    memberPrice: 310,
  },
  {
    id: 4,
    name: 'Câmera de Segurança HD WiFi',
    image: '/placeholder.svg?height=300&width=300',
    moq: 8,
    volume: 0.35,
    suggestedPrice: 1890,
    memberPrice: 695,
  },
  {
    id: 5,
    name: 'Termostato Programável Digital',
    image: '/placeholder.svg?height=300&width=300',
    moq: 12,
    volume: 0.22,
    suggestedPrice: 780,
    memberPrice: 285,
  },
  {
    id: 6,
    name: 'Sensor de Movimento PIR Inteligente',
    image: '/placeholder.svg?height=300&width=300',
    moq: 20,
    volume: 0.15,
    suggestedPrice: 520,
    memberPrice: 195,
  },
];

// Container data
const containers = [
  { route: 'Shenzhen > Santos', occupancy: 85, status: 'Saída em 48h', eta: '15 dias' },
  { route: 'Shanghai > Rio', occupancy: 62, status: 'Zarpou', eta: '18 dias' },
  { route: 'Guangzhou > SP', occupancy: 71, status: 'Aguardando Receita', eta: '12 dias' },
  { route: 'Ningbo > Santos', occupancy: 44, status: 'Planejando', eta: '25 dias' },
];

export function Portal({ onLogout }: PortalProps) {
  const [selectedCategory, setSelectedCategory] = useState('automacao');

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800">
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">PG</span>
              </div>
              <span className="font-semibold text-zinc-100 text-sm">Prime Gate</span>
            </div>

            {/* Search Bar - Center */}
            <div className="hidden md:flex flex-1 max-w-sm mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-600"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Cashback Widget */}
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700">
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Cashback</p>
                  <p className="text-sm font-bold text-orange-500">R$ 2.450</p>
                </div>
              </div>

              {/* Notifications */}
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-zinc-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Membro</p>
                  <p className="text-xs font-semibold text-orange-400">Black</p>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-300 hover:text-white"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categories Menu */}
          <div className="flex gap-6 pb-4 border-t border-zinc-800/50 pt-4 overflow-x-auto">
            {[
              { id: 'automacao', label: 'Automação Residencial' },
              { id: 'hospitalidade', label: 'Hospitalidade' },
              { id: 'estetica', label: 'Estética' },
              { id: 'solar', label: 'Smart Home Solar' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-6 lg:px-12 py-12">
        {/* Hero Banner */}
        <div className="mb-12 h-64 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 p-8 flex items-end justify-between overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'url(/placeholder.svg?height=256&width=1200)',
            backgroundSize: 'cover',
          }} />
          <div className="relative z-10">
            <p className="text-orange-100 text-sm mb-2">Coleção Limitada</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Automação Residencial
            </h1>
            <p className="text-orange-100 text-lg">Lotes Limitados - Aproveite Agora</p>
          </div>
          <div className="relative z-10 text-right">
            <p className="text-orange-100 text-sm">Economia</p>
            <p className="text-3xl font-bold text-white">Até 65%</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Product Image */}
              <div className="aspect-square bg-zinc-700 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2 h-10">
                  {product.name}
                </h3>

                {/* MOQ & Volume */}
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-700">
                  <span>MOQ: {product.moq} un</span>
                  <span>Vol: {product.volume}m³</span>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-zinc-500">Varejo BR:</span>
                    <span className="text-xs line-through text-zinc-500">
                      R$ {product.suggestedPrice.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-orange-500">
                      R$ {product.memberPrice.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-zinc-500">Preço Membro</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors mt-2">
                  Reservar Espaço
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Container Radar - Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-6 lg:px-12 py-4 z-30">
        <div className="max-w-full">
          <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Terminal de Embarque</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {containers.map((container, idx) => (
              <div key={idx} className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-xs">
                <p className="text-zinc-300 font-semibold mb-1">{container.route}</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
                      style={{ width: `${container.occupancy}%` }}
                    />
                  </div>
                  <span className="text-zinc-400">{container.occupancy}%</span>
                </div>
                <p className="text-zinc-500">{container.status}</p>
                <p className="text-zinc-600 text-[10px] mt-1">ETA: {container.eta}</p>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
