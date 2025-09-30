import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Play, 
  Plus, 
  Search, 
  Filter,
  Clock,
  Target,
  TrendingUp,
  Zap,
  MoreHorizontal,
  Bookmark,
  Star,
  Users
} from 'lucide-react';

export function NewWorkoutPage() {
  const [activeTab, setActiveTab] = useState('routines');
  const [searchTerm, setSearchTerm] = useState('');

  const routines = [
    {
      id: 1,
      name: 'Push Day A',
      type: 'Peito e Tríceps',
      exercises: 6,
      duration: '60-75 min',
      difficulty: 'Intermediário',
      lastPerformed: '2 dias atrás',
      popularity: 4.8,
      isBookmarked: true
    },
    {
      id: 2,
      name: 'Pull Day A',
      type: 'Costas e Bíceps',
      exercises: 7,
      duration: '70-85 min',
      difficulty: 'Intermediário',
      lastPerformed: '4 dias atrás',
      popularity: 4.6,
      isBookmarked: false
    },
    {
      id: 3,
      name: 'Leg Day Intenso',
      type: 'Pernas Completo',
      exercises: 8,
      duration: '80-90 min',
      difficulty: 'Avançado',
      lastPerformed: '1 semana atrás',
      popularity: 4.9,
      isBookmarked: true
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Push-Pull-Legs',
      author: 'PaceX Team',
      rating: 4.9,
      users: 15420,
      description: 'Rotina clássica de 6 dias focada em hipertrofia',
      exercises: 18,
      weeks: 12
    },
    {
      id: 2,
      name: 'Upper/Lower Split',
      author: 'Dr. Mike Israetel',
      rating: 4.7,
      users: 8930,
      description: 'Programa de 4 dias para força e massa muscular',
      exercises: 12,
      weeks: 8
    },
    {
      id: 3,
      name: '5/3/1 for Beginners',
      author: 'Jim Wendler',
      rating: 4.8,
      users: 12340,
      description: 'Programa focado em força para iniciantes',
      exercises: 15,
      weeks: 16
    }
  ];

  const recentWorkouts = [
    {
      id: 1,
      name: 'Push Day A',
      date: 'Hoje',
      duration: '1h 25min',
      volume: '6.551 kg',
      completed: true,
      exercises: [
        { name: 'Supino Reto', sets: 4, best: '90kg x 8' },
        { name: 'Inclinado Halteres', sets: 3, best: '35kg x 10' },
        { name: 'Desenvolvimento', sets: 4, best: '60kg x 6' }
      ]
    },
    {
      id: 2,
      name: 'Pull Day A',
      date: 'Ontem',
      duration: '1h 15min',
      volume: '5.240 kg',
      completed: true,
      exercises: [
        { name: 'Barra Fixa', sets: 4, best: 'Peso corporal x 12' },
        { name: 'Remada Curvada', sets: 4, best: '80kg x 8' },
        { name: 'Rosca Direta', sets: 3, best: '25kg x 10' }
      ]
    }
  ];

  const quickStats = [
    { label: 'Treinos esta semana', value: '3/5', trend: 'up' },
    { label: 'Volume médio', value: '8.2 ton', trend: 'up' },
    { label: 'Frequência mensal', value: '87%', trend: 'stable' },
    { label: 'Recordes este mês', value: '12', trend: 'up' }
  ];

  return (
    <div className="space-y-4 lg:space-y-6 bg-slate-800 min-h-screen pb-20 lg:pb-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-slate-900 border-slate-700">
            <CardContent className="p-3 lg:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg lg:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-slate-400">{stat.label}</div>
                </div>
                <TrendingUp className={`h-4 w-4 lg:h-5 lg:w-5 ${
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar treinos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 text-white"
          />
        </div>
        <div className="flex gap-2 lg:gap-3">
          <Button variant="outline" className="flex-1 lg:flex-none border-slate-600 text-slate-300">
            <Filter className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">Filtros</span>
          </Button>
          <Button className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline">Novo Treino</span>
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-900">
          <TabsTrigger value="routines" className="data-[state=active]:bg-blue-600 text-xs lg:text-sm">
            <span className="hidden lg:inline">Minhas Rotinas</span>
            <span className="lg:hidden">Rotinas</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-blue-600 text-xs lg:text-sm">
            Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-blue-600 text-xs lg:text-sm">
            Histórico
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 text-xs lg:text-sm">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routines" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {routines.map((routine) => (
              <Card key={routine.id} className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">{routine.name}</h3>
                      <p className="text-sm text-slate-400">{routine.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        {routine.isBookmarked ? (
                          <Bookmark className="h-4 w-4 fill-current text-yellow-400" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Exercícios</div>
                      <div className="text-white font-medium">{routine.exercises}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Duração</div>
                      <div className="text-white font-medium">{routine.duration}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Dificuldade</div>
                      <Badge variant={routine.difficulty === 'Avançado' ? 'default' : 'secondary'}>
                        {routine.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-slate-400">Popularidade</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{routine.popularity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-400">
                    Último treino: {routine.lastPerformed}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar
                    </Button>
                    <Button variant="outline" className="border-slate-600">
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="bg-slate-900 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium mb-1">{template.name}</h3>
                      <p className="text-sm text-slate-400">por {template.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Users className="h-3 w-3" />
                        {template.users.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-4">{template.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-slate-400">Exercícios</div>
                      <div className="text-white">{template.exercises}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Duração</div>
                      <div className="text-white">{template.weeks} semanas</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-slate-600">
                      Preview
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Usar Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {recentWorkouts.map((workout) => (
            <Card key={workout.id} className="bg-slate-900 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-medium">{workout.name}</h3>
                    <p className="text-sm text-slate-400">{workout.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{workout.duration}</div>
                    <div className="text-sm text-slate-400">{workout.volume}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                      <div>
                        <div className="text-white text-sm">{exercise.name}</div>
                        <div className="text-xs text-slate-400">{exercise.sets} sets</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-sm font-medium">{exercise.best}</div>
                        <div className="text-xs text-slate-400">melhor série</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="border-slate-600">
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600">
                    Repetir Treino
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="text-slate-400 mb-4">
                <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Analytics Detalhados</h3>
                <p>Visualize gráficos avançados de progresso, volume, frequência e muito mais.</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Ver Analytics Completo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}