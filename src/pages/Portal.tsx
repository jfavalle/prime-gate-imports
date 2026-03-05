import { useState } from 'react';
import { Search, Bell, LogOut, ChevronDown } from 'lucide-react';

interface PortalProps {
  onLogout: () => void;
}

const mockProducts = [
  { id: 1, name: 'Hub Inteligente Compatível com Alexa', image: '/images/product_hub.jpg', moq: 10, volume: 0.45, suggestedPrice: 5900, memberPrice: 2150 },
  { id: 2, name: 'Lâmpada LED Inteligente RGB', image: '/images/product_lamp.jpg', moq: 25, volume: 0.18, suggestedPrice: 1200, memberPrice: 420 },
  { id: 3, name: 'Interruptor Inteligente Touch', image: '/images/product_switch.jpg', moq: 15, volume: 0.25, suggestedPrice: 890, memberPrice: 310 },
  { id: 4, name: 'Câmera de Segurança HD WiFi', image: '/images/product_camera.jpg', moq: 8, volume: 0.35, suggestedPrice: 1890, memberPrice: 695 },
  { id: 5, name: 'Termostato Programável Digital', image: '/images/product_thermostat.jpg', moq: 12, volume: 0.22, suggestedPrice: 780, memberPrice: 285 },
  { id: 6, name: 'Sensor de Movimento PIR Inteligente', image: '/images/product_sensor.jpg', moq: 20, volume: 0.15, suggestedPrice: 520, memberPrice: 195 }
];

const containers = [
  { route: 'Shenzhen > Santos', occupancy: 85, status: 'Saída em 48h', eta: '15 dias' },
  { route: 'Shanghai > Rio', occupancy: 62, status: 'Zarpou', eta: '18 dias' },
  { route: 'Guangzhou > SP', occupancy: 71, status: 'Aguardando Receita', eta: '12 dias' },
  { route: 'Ningbo > Santos', occupancy: 44, status: 'Planejando', eta: '25 dias' }
];

export function Portal({ onLogout }: PortalProps) {
  const [selectedCategory, setSelectedCategory] = useState('automacao');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="w-full px-6 lg:px-12 flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-xs">PG</div>
              <span className="font-semibold text-zinc-900 text-sm">Prime Gate</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Buscar produtos..." className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-300 rounded-lg text-sm" />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col text-right px-4 border-r border-zinc-200">
                  <p className="text-[10px] text-zinc-600 uppercase">Cashback</p>
                  <p className="text-sm font-bold text-orange-600">R$ 2.450</p>
              </div>
              <button className="p-2 relative">
                <Bell className="w-5 h-5 text-zinc-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer">
                  <div className="text-right leading-none">
                    <p className="text-[10px] text-zinc-600">Membro</p>
                    <p className="text-xs font-bold text-orange-600">Black</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-600" />
              </div>
              <button onClick={onLogout} className="p-2 text-zinc-600 hover:text-zinc-900" title="Sair">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
        </div>

        {/* Menu de Categorias - Usa a variável selectedCategory aqui */}
        <div className="w-full px-6 lg:px-12 flex gap-6 pb-4 border-t border-zinc-200/50 pt-4 overflow-x-auto">
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
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <main className="w-full px-6 lg:px-12 py-12">
        {/* Banner */}
        <div className="mb-12 h-64 rounded-xl bg-orange-600 p-8 flex items-end justify-between text-white overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-orange-100 text-sm mb-2">Coleção Limitada</p>
              <h1 className="text-4xl font-bold">Automação Residencial</h1>
              <p className="text-orange-100 text-lg">Lotes Limitados - Aproveite Agora</p>
            </div>
            <div className="relative z-10 text-right">
              <p className="text-orange-100 text-sm">Economia</p>
              <p className="text-3xl font-bold text-white">Até 65%</p>
            </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
          {mockProducts.map((p) => (
            <div key={p.id} className="bg-white border border-zinc-200 rounded-xl p-4 hover:shadow-lg transition-all group">
              <div className="aspect-square bg-zinc-50 mb-4 overflow-hidden rounded-lg">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-sm font-bold mb-2 h-10 line-clamp-2 text-zinc-900">{p.name}</h3>
              <div className="flex justify-between text-[10px] border-b border-zinc-100 pb-2 mb-2 text-zinc-500">
                <span>MOQ: {p.moq} un</span>
                <span>Vol: {p.volume}m³</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] text-zinc-400 line-through">R$ {p.suggestedPrice.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-orange-600">R$ {p.memberPrice.toLocaleString('pt-BR')}</span>
                  <span className="text-[10px] text-zinc-500 font-medium">Membro</span>
                </div>
              </div>
              <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm mt-4 font-bold transition-colors">
                Reservar Espaço
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Container Radar - Footer Fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-4 px-12 z-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {containers.map((c, i) => (
              <div key={i} className="text-[10px]">
                <div className="flex justify-between mb-1">
                  <p className="font-bold text-zinc-900">{c.route}</p>
                  <p className="font-bold text-zinc-700">{c.occupancy}%</p>
                </div>
                <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="bg-orange-600 h-full transition-all duration-1000" style={{ width: `${c.occupancy}%` }} />
                </div>
                <p className="text-zinc-500 mt-1">{c.status} • ETA: {c.eta}</p>
              </div>
            ))}
          </div>
      </footer>
    </div>
  );
}