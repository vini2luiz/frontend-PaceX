import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleDemoLogin = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Left side - Logo */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Pace<span className="text-blue-400">X</span>
          </h1>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Bem-vindo</h2>
            <p className="text-slate-400">Entre em sua conta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 h-12"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-600 text-white h-12 text-lg font-medium"
            >
              Entrar
            </Button>
          </form>

          <div className="text-center space-y-4">
            <Button
              onClick={handleDemoLogin}
              variant="ghost"
              className="text-blue-400 hover:text-blue-300 hover:bg-slate-800"
            >
              Entrar como Demo
            </Button>

            <div>
              <Button
                variant="link"
                className="text-slate-400 hover:text-slate-300"
              >
                Esqueceu sua senha?
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Question mark in bottom right */}
      <div className="absolute bottom-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          ?
        </Button>
      </div>
    </div>
  );
}