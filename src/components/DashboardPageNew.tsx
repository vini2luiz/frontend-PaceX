import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Zap, 
  Target, 
  Clock, 
  Trophy, 
  Play,
  MoreHorizontal,
  Search,
  Filter,
  Calendar,
  Bell,
  Settings,
  Home,
  Dumbbell,
  Users,
  MessageCircle,
  User,
  BarChart3,
  Activity
} from 'lucide-react';

export function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">PaceX</span>
        </div>

        {/* User Profile */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-500 text-white">RS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Rodrigo Shodl</h3>
              <p className="text-slate-400 text-sm">Sumioshi</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            <p>Treinos • Seguidores •</p>
            <p>Seguindo</p>
            <div className="flex gap-4 text-white font-medium mt-1">
              <span>160</span>
              <span>12</span>
              <span>12</span>
            </div>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="mb-8 p-4 bg-slate-700 rounded-lg">
          <h4 className="text-2xl font-bold mb-1">0 horas</h4>
          <p className="text-slate-400 text-sm">essa semana</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <div className="space-y-2">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="h-4 w-4 mr-3" />
              Início
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <Dumbbell className="h-4 w-4 mr-3" />
              Treino
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <Users className="h-4 w-4 mr-3" />
              Feed
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <MessageCircle className="h-4 w-4 mr-3" />
              Chat IA
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
              <User className="h-4 w-4 mr-3" />
              Perfil
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-4">Painel</p>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <BarChart3 className="h-4 w-4 mr-3" />
                Estatísticas
              </Button>
              <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700">
                <Activity className="h-4 w-4 mr-3" />
                Exercícios
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
            <p className="text-slate-400">Acompanhe seu progresso e estatísticas</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Buscar..."
                className="w-64 pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Start Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 border-none">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Início Rápido</h2>
                <p className="text-blue-100 mb-4">Comece um treino vazio ou escolha uma rotina</p>
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="h-4 w-4 mr-2" />
                  Iniciar Treinamento Vazio
                </Button>
              </div>
              <div className="text-white/20">
                <Zap className="h-24 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="h-5 w-5 text-blue-400" />
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-bold text-white mb-1">0</div>
              <div className="text-slate-400 text-sm mb-1">de 4 planejados</div>
              <div className="text-slate-500 text-xs">Treinos esta semana</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-green-400" />
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-bold text-white mb-1">14.116 kg</div>
              <div className="text-slate-400 text-sm mb-1">últimos 7 dias</div>
              <div className="text-slate-500 text-xs">Volume Total</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-bold text-white mb-1">3h 26min</div>
              <div className="text-slate-400 text-sm mb-1">média semanal</div>
              <div className="text-slate-500 text-xs">Tempo de Treino</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-bold text-white mb-1">7</div>
              <div className="text-slate-400 text-sm mb-1">este mês</div>
              <div className="text-slate-500 text-xs">Recordes</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Treinos Recentes</h3>
              <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                Ver todos
              </Button>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Pesquisar treino..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="strength">Força</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-periods">
                <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Todos os períodos" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all-periods">Todos os períodos</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-slate-400 text-center py-8">
              <p>Mostrando todos os 5 treinos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}