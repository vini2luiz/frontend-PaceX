import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Progress } from '../ui/progress';
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
  Activity,
  Weight,
  Timer,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DashboardPageProps {
  onStartWorkout: () => void;
}

export function DashboardPage({ onStartWorkout }: DashboardPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const stats = [
    {
      title: 'Treinos esta semana',
      value: '0',
      subtitle: 'de 4 planejados',
      icon: Target,
      color: 'text-blue-400'
    },
    {
      title: 'Volume Total',
      value: '14.116 kg',
      subtitle: 'últimos 7 dias',
      icon: Weight,
      color: 'text-green-400'
    },
    {
      title: 'Tempo de Treino',
      value: '3h 26min',
      subtitle: 'média semanal',
      icon: Timer,
      color: 'text-purple-400'
    },
    {
      title: 'Recordes',
      value: '7',
      subtitle: 'este mês',
      icon: Trophy,
      color: 'text-yellow-400'
    }
  ];

  const allWorkouts = [
    {
      id: 1,
      type: 'Push',
      name: 'Treino Push Day A',
      date: 'Terça-feira, Aug 26, 2025',
      dateValue: '2025-08-26',
      duration: '1h 49min',
      volume: '6.551,5 kg',
      records: 3,
      exercises: [
        '4 sets Supino Reto',
        '3 sets Desenvolvimento Ombros',
        '4 sets Tríceps Pulley'
      ]
    },
    {
      id: 2,
      type: 'Pull',
      name: 'Treino Pull Day B',
      date: 'Segunda-feira, Aug 25, 2025',
      dateValue: '2025-08-25',
      duration: '1h 32min',
      volume: '5.240 kg',
      records: 2,
      exercises: [
        '4 sets Puxada Alta',
        '3 sets Remada Curvada',
        '4 sets Rosca Bíceps'
      ]
    },
    {
      id: 3,
      type: 'Legs',
      name: 'Treino Leg Day Intenso',
      date: 'Domingo, Aug 24, 2025',
      dateValue: '2025-08-24',
      duration: '2h 15min',
      volume: '8.750 kg',
      records: 5,
      exercises: [
        '5 sets Agachamento Livre',
        '4 sets Leg Press',
        '3 sets Stiff'
      ]
    },
    {
      id: 4,
      type: 'Upper',
      name: 'Treino Upper Body',
      date: 'Sábado, Aug 23, 2025',
      dateValue: '2025-08-23',
      duration: '1h 45min',
      volume: '6.200 kg',
      records: 1,
      exercises: [
        '3 sets Supino Inclinado',
        '3 sets Puxada Frontal',
        '3 sets Desenvolvimento'
      ]
    },
    {
      id: 5,
      type: 'Fullbody',
      name: 'Treino Full Body',
      date: 'Sexta-feira, Aug 22, 2025',
      dateValue: '2025-08-22',
      duration: '1h 20min',
      volume: '4.800 kg',
      records: 2,
      exercises: [
        '3 sets Agachamento',
        '3 sets Supino',
        '3 sets Remada'
      ]
    }
  ];

  // Filtrar treinos baseado nos critérios
  const filteredWorkouts = allWorkouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || workout.type.toLowerCase() === selectedType.toLowerCase();
    
    let matchesDate = true;
    if (selectedDate !== 'all') {
      const workoutDate = new Date(workout.dateValue);
      const today = new Date();
      const diffTime = today.getTime() - workoutDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (selectedDate) {
        case 'today':
          matchesDate = diffDays <= 1;
          break;
        case 'week':
          matchesDate = diffDays <= 7;
          break;
        case 'month':
          matchesDate = diffDays <= 30;
          break;
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  const weekData = [
    { day: 'Seg', value: 0, planned: 1 },
    { day: 'Ter', value: 1, planned: 1 },
    { day: 'Qua', value: 0, planned: 1 },
    { day: 'Qui', value: 1, planned: 1 },
    { day: 'Sex', value: 0, planned: 1 },
    { day: 'Sáb', value: 0, planned: 1 },
    { day: 'Dom', value: 0, planned: 0 }
  ];

  return (
    <div className="space-y-4 lg:space-y-6 bg-slate-800 min-h-screen pb-20 lg:pb-6">
      {/* Quick Start */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="text-white flex-1">
              <h3 className="text-lg lg:text-xl font-medium mb-2">Início Rápido</h3>
              <p className="text-blue-100 mb-4 text-sm lg:text-base">Comece um treino vazio ou escolha uma rotina</p>
              <Button 
                onClick={onStartWorkout}
                className="bg-white text-blue-600 hover:bg-blue-50 w-full lg:w-auto"
              >
                <Play className="h-4 w-4 mr-2" />
                Iniciar Treinamento Vazio
              </Button>
            </div>
            <Zap className="h-12 w-12 lg:h-16 lg:w-16 text-white opacity-20 self-end lg:self-center" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-900 border-slate-700">
            <CardContent className="p-3 lg:p-6">
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <stat.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${stat.color}`} />
                <MoreHorizontal className="h-3 w-3 lg:h-4 lg:w-4 text-slate-400" />
              </div>
              <div className="space-y-1">
                <div className="text-lg lg:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs lg:text-sm text-slate-400">{stat.subtitle}</div>
                <div className="text-xs text-slate-500 hidden lg:block">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Workouts */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h3 className="text-lg font-medium text-white">Treinos Recentes</h3>
            <Button variant="ghost" size="sm" className="text-slate-400 lg:self-end">
              Ver todos
            </Button>
          </div>
          
          {/* Filtros */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {/* Pesquisar por título */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Pesquisar treino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white pl-10"
              />
            </div>
            
            {/* Filtrar por tipo */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Tipo de treino" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="pull">Pull</SelectItem>
                <SelectItem value="legs">Legs</SelectItem>
                <SelectItem value="upper">Upper Body</SelectItem>
                <SelectItem value="fullbody">Full Body</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Filtrar por data */}
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Indicador de resultados */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
            <div className="text-sm text-slate-400">
              {filteredWorkouts.length === allWorkouts.length 
                ? `Mostrando todos os ${allWorkouts.length} treinos`
                : `Mostrando ${filteredWorkouts.length} de ${allWorkouts.length} treinos`
              }
            </div>
            {(searchTerm || selectedType !== 'all' || selectedDate !== 'all') && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-white"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedDate('all');
                }}
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredWorkouts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-400 mb-2">Nenhum treino encontrado</div>
                <div className="text-sm text-slate-500">
                  Tente ajustar os filtros para encontrar seus treinos
                </div>
              </div>
            ) : (
              filteredWorkouts.map((workout) => (
              <div key={workout.id} className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {workout.type}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white font-medium">{workout.name}</div>
                      <div className="text-sm text-slate-400">{workout.date}</div>
                      <Badge variant="outline" className="mt-1 text-xs border-slate-600 text-slate-300">
                        {workout.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400">
                      <Star className="h-3 w-3 mr-1" />
                      {workout.records}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4 text-xs lg:text-sm">
                  <div>
                    <div className="text-slate-400">Tempo</div>
                    <div className="text-white font-medium">{workout.duration}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Volume</div>
                    <div className="text-white font-medium">{workout.volume}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Recordes</div>
                    <div className="text-white font-medium">
                      <Star className="h-3 w-3 inline mr-1 text-yellow-400" />
                      {workout.records}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {exercise}
                    </div>
                  ))}
                </div>
              </div>
            ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <h3 className="text-lg font-medium text-white">Progresso Semanal</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Meta: 4 treinos</span>
                <span className="text-white">2/4 completos</span>
              </div>
              <Progress value={50} className="h-2" />
              <div className="grid grid-cols-7 gap-1 mt-4">
                {weekData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-slate-400 mb-2">{day.day}</div>
                    <div className={`w-8 h-8 rounded-full border-2 mx-auto flex items-center justify-center ${
                      day.value > 0 
                        ? 'bg-green-500 border-green-500' 
                        : day.planned 
                          ? 'border-slate-600 border-dashed' 
                          : 'border-slate-700'
                    }`}>
                      {day.value > 0 && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <h3 className="text-lg font-medium text-white">Tendência de Volume</h3>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { week: 'Sem 1', volume: 12000 },
                  { week: 'Sem 2', volume: 13500 },
                  { week: 'Sem 3', volume: 14116 },
                  { week: 'Sem 4', volume: 15200 }
                ]}>
                  <XAxis dataKey="week" className="text-slate-400" />
                  <YAxis className="text-slate-400" />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}