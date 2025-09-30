import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Play, Plus, Brain, AlertTriangle, CheckCircle, Clock, BarChart3, Zap } from 'lucide-react';

export function WorkoutPage() {
  const workoutRoutines = [
    {
      id: 1,
      name: 'Push Day A',
      exercises: 6,
      duration: '60-75 min',
      difficulty: 'Intermediário',
      lastPerformed: '2 dias atrás',
      muscles: ['Peito', 'Ombros', 'Tríceps']
    },
    {
      id: 2,
      name: 'Pull Day A',
      exercises: 7,
      duration: '70-85 min',
      difficulty: 'Intermediário',
      lastPerformed: '4 dias atrás',
      muscles: ['Costas', 'Bíceps', 'Posteriores']
    },
    {
      id: 3,
      name: 'Leg Day A',
      exercises: 8,
      duration: '80-90 min',
      difficulty: 'Avançado',
      lastPerformed: '1 semana atrás',
      muscles: ['Quadríceps', 'Posterior', 'Glúteos', 'Panturrilha']
    }
  ];

  const aiInsights = [
    {
      type: 'analysis',
      title: 'Análise do Último Treino',
      message: 'Seu desempenho no Push Day foi 15% superior à média. Considere aumentar a carga no supino.',
      icon: BarChart3,
      color: 'text-blue-500'
    },
    {
      type: 'alert',
      title: 'Alerta de Prevenção',
      message: 'Detectamos sobrecarga nos ombros. Recomendamos 48h de descanso antes do próximo push.',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    {
      type: 'tip',
      title: 'Dica de Treino',
      message: 'Para maximizar hipertrofia, foque em 3-4 séries de 8-12 repetições hoje.',
      icon: Brain,
      color: 'text-purple-500'
    }
  ];

  const weekProgress = [
    { day: 'Seg', completed: true, planned: true },
    { day: 'Ter', completed: true, planned: true },
    { day: 'Qua', completed: false, planned: true },
    { day: 'Qui', completed: true, planned: true },
    { day: 'Sex', completed: false, planned: true },
    { day: 'Sab', completed: false, planned: true },
    { day: 'Dom', completed: false, planned: false },
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Weekly Progress */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3>Progresso Semanal</h3>
            <Badge variant="secondary">3/5 treinos</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            {weekProgress.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1">
                <div className="text-xs text-muted-foreground">{day.day}</div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  day.completed 
                    ? 'bg-green-500 border-green-500' 
                    : day.planned 
                      ? 'border-muted-foreground border-dashed' 
                      : 'border-muted'
                }`}>
                  {day.completed && <CheckCircle className="h-4 w-4 text-white" />}
                </div>
              </div>
            ))}
          </div>
          <Progress value={60} className="h-2" />
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <h3>Insights da IA</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">{insight.title}</div>
                  <div className="text-sm text-muted-foreground">{insight.message}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Tabs */}
      <Tabs defaultValue="routines" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="routines">Rotinas</TabsTrigger>
          <TabsTrigger value="explore">Explorar</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="routines" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3>Minhas Rotinas</h3>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Nova Rotina
            </Button>
          </div>
          
          {workoutRoutines.map((routine) => (
            <Card key={routine.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{routine.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>🏋️ {routine.exercises} exercícios</span>
                      <span>⏱️ {routine.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {routine.muscles.map((muscle) => (
                        <Badge key={muscle} variant="secondary" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Último treino: {routine.lastPerformed}
                    </div>
                  </div>
                  <Badge variant={routine.difficulty === 'Avançado' ? 'default' : 'secondary'}>
                    {routine.difficulty}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar Treino
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="explore" className="space-y-3">
          <div className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="font-medium">Treino Detectado</div>
                    <div className="text-sm text-muted-foreground">Upper Body Blast - 45 min</div>
                  </div>
                </div>
                <Button size="sm" className="w-full">Adicionar às Rotinas</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center py-8">
                  <h4 className="font-medium mb-2">Explorar Novos Treinos</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Descubra rotinas personalizadas baseadas nos seus objetivos
                  </p>
                  <Button variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    Gerar com IA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-3">
          <div className="space-y-3">
            {[
              { date: 'Hoje', workout: 'Push Day A', duration: '1h 15min', status: 'Concluído' },
              { date: 'Ontem', workout: 'Cardio HIIT', duration: '30min', status: 'Concluído' },
              { date: '2 dias atrás', workout: 'Pull Day A', duration: '1h 20min', status: 'Concluído' },
            ].map((session, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{session.workout}</div>
                      <div className="text-sm text-muted-foreground">{session.date} • {session.duration}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{session.status}</Badge>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}