import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export function LoginView({ onLoginSuccess, onBack }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-white/50 pointer-events-none" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-2xl p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">Portal do Membro</h1>
            <p className="text-zinc-600">Acesso exclusivo ao acervo premium</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-10 pr-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full bg-zinc-50 border border-zinc-300 rounded-lg pl-10 pr-4 py-3 text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/30 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/80 text-zinc-600">Novo por aqui?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-zinc-600 text-sm mb-6">
            Não tem uma conta?{' '}
            <button className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
              Cadastre-se agora
            </button>
          </p>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-full py-2 border border-zinc-200 text-zinc-600 hover:text-zinc-900 rounded-lg transition-colors text-sm font-medium"
          >
            Voltar
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-zinc-200/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
