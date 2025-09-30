import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Bell, Settings, Sun, Menu, Zap } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export function Header({ currentPage, title, subtitle, rightContent }: HeaderProps) {
  const getPageInfo = () => {
    switch (currentPage) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Acompanhe seu progresso e estatísticas'
        };
      case 'workout':
        return {
          title: 'Meus Treinos',
          subtitle: 'Gerencie suas rotinas e sessões'
        };
      case 'social':
        return {
          title: 'Social',
          subtitle: 'Conecte-se com outros atletas'
        };
      case 'chat':
        return {
          title: 'Chat IA',
          subtitle: 'Seu treinador pessoal virtual'
        };
      case 'profile':
        return {
          title: 'Perfil',
          subtitle: 'Suas informações e conquistas'
        };
      default:
        return { title, subtitle };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Logo & Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 p-1.5 rounded-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">PaceX</h1>
          </div>
        </div>

        {/* Desktop Title */}
        <div className="hidden lg:block flex-1">
          <h1 className="text-xl font-medium text-white">{pageInfo.title}</h1>
          {pageInfo.subtitle && (
            <p className="text-sm text-slate-400 mt-1">{pageInfo.subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Search - Hidden on mobile */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar..."
              className="pl-10 w-64 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-400 hover:text-white">
            <Search className="h-4 w-4" />
          </Button>

          {/* Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            <Button variant="ghost" size="icon" className="hidden lg:flex text-slate-400 hover:text-white">
              <Sun className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="icon" className="hidden lg:flex text-slate-400 hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Custom right content */}
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
}