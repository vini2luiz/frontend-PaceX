import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Home, 
  Dumbbell, 
  Users, 
  MessageCircle, 
  User, 
  BarChart3, 
  Calendar,
  Settings,
  Zap,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ currentPage, onPageChange, onLogout }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'workout', icon: Dumbbell, label: 'Treino' },
    { id: 'feed', icon: Users, label: 'Feed' },
    { id: 'chat', icon: MessageCircle, label: 'Chat IA' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  const panelItems = [
    { id: 'stats', icon: BarChart3, label: 'Estatísticas' },
    { id: 'exercises', icon: Dumbbell, label: 'Exercícios' },
    { id: 'measures', icon: Settings, label: 'Medições' },
    { id: 'calendar', icon: Calendar, label: 'Calendário' },
  ];

  const userStats = {
    workouts: 160,
    followers: 12,
    following: 12
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">PaceX</h1>
        </div>

        {/* User Profile */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-600 text-white">RS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Rodrigo Shodl Sumioshi</div>
              <div className="text-sm text-slate-400">Treinos • Seguidores • Seguindo</div>
              <div className="flex gap-4 text-sm">
                <span>{userStats.workouts}</span>
                <span>{userStats.followers}</span>
                <span>{userStats.following}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-3">
            <div className="text-2xl font-bold mb-1">0 horas</div>
            <div className="text-sm text-slate-400">essa semana</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              onClick={() => onPageChange(item.id)}
              className={`w-full justify-start gap-3 ${
                currentPage === item.id 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Panel Section */}
        <div>
          <div className="text-sm text-slate-400 mb-3 px-3">Painel</div>
          <nav className="space-y-1">
            {panelItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onPageChange(item.id)}
                className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* History */}
        <div>
          <Button
            variant="ghost"
            onClick={() => onPageChange('history')}
            className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Calendar className="h-4 w-4" />
            Histórico de Treinos
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}