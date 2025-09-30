import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Home, Dumbbell, MessageCircle, User, Search, Bell } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'workout', icon: Dumbbell, label: 'Treino' },
    { id: 'chat', icon: MessageCircle, label: 'IA Chat' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-50">
        <h1 className="text-xl font-medium">
          {currentPage === 'home' && 'FitAI'}
          {currentPage === 'workout' && 'Meus Treinos'}
          {currentPage === 'chat' && 'Treinador IA'}
          {currentPage === 'profile' && 'Meu Perfil'}
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around p-2 border-t border-border bg-background">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(item.id)}
            className="flex-1 flex flex-col items-center gap-1 h-auto py-2"
          >
            <item.icon className="h-4 w-4" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </nav>
    </div>
  );
}