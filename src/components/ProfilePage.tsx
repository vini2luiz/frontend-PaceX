import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { 
  Settings, 
  Download, 
  Users, 
  Trophy, 
  Calendar as CalendarIcon, 
  BarChart3, 
  Target,
  Flame,
  Clock,
  Dumbbell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

export function ProfilePage() {
  const userStats = {
    workouts: 156,
    followers: 324,
    following: 89,
    streak: 12
  };

  const workoutData = [
    { month: 'Jan', workouts: 18 },
    { month: 'Fev', workouts: 22 },
    { month: 'Mar', workouts: 25 },
    { month: 'Abr', workouts: 28 },
    { month: 'Mai', workouts: 24 },
    { month: 'Jun', workouts: 30 }
  ];

  const muscleGroupData = [
    { name: 'Peito', value: 45, color: '#3b82f6' },
    { name: 'Costas', value: 38, color: '#ef4444' },
    { name: 'Pernas', value: 52, color: '#10b981' },
    { name: 'Ombros', value: 28, color: '#f59e0b' },
    { name: 'Braços', value: 34, color: '#8b5cf6' }
  ];

  const achievements = [
    { title: 'Sequência de 30 dias', icon: Flame, earned: true },
    { title: '100 treinos completos', icon: Trophy, earned: true },
    { title: 'Madrugador', icon: Clock, earned: false },
    { title: 'Powerlifter', icon: Dumbbell, earned: false }
  ];

  const savedExercises = [
    'Supino Reto',
    'Agachamento Livre',
    'Deadlift',
    'Desenvolvimento Militar',
    'Remada Curvada'
  ];

  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4 p-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-medium">João Silva</h2>
              <p className="text-sm text-muted-foreground">Membro desde Janeiro 2024</p>
              <div className="flex items-center gap-1 mt-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">{userStats.streak} dias consecutivos</span>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-medium">{userStats.workouts}</div>
              <div className="text-sm text-muted-foreground">Treinos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium">{userStats.followers}</div>
              <div className="text-sm text-muted-foreground">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium">{userStats.following}</div>
              <div className="text-sm text-muted-foreground">Seguindo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="stats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="saved">Salvos</TabsTrigger>
          <TabsTrigger value="settings">Config</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <h3>Progresso Mensal</h3>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={workoutData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line 
                      type="monotone" 
                      dataKey="workouts" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Muscle Groups */}
          <Card>
            <CardHeader>
              <h3>Grupos Musculares (Sets este mês)</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {muscleGroupData.map((group) => (
                  <div key={group.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{group.name}</span>
                      <span>{group.value} sets</span>
                    </div>
                    <Progress value={(group.value / 60) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <h3>Conquistas</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                        : 'bg-muted/50 border-muted'
                    }`}
                  >
                    <achievement.icon 
                      className={`h-6 w-6 ${
                        achievement.earned ? 'text-green-600' : 'text-muted-foreground'
                      }`} 
                    />
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        achievement.earned ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        ✓
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <h3>Calendário de Treinos</h3>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Treino completo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Treino parcial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Treino perdido</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequency Stats */}
          <Card>
            <CardHeader>
              <h3>Frequência Semanal</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Meta semanal</span>
                  <span>5/6 dias</span>
                </div>
                <Progress value={83} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  Você está 83% do caminho para sua meta!
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <h3>Exercícios Favoritos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedExercises.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm">{exercise}</span>
                    <Button variant="ghost" size="sm">
                      Ver detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3>Relatórios Personalizados</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Relatório Mensal de Progresso
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Análise de Metas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <h3>Configurações do Perfil</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Privacidade e Segurança
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Metas e Objetivos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Preferências de Análise
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Backup e Exportação
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3>Sobre o App</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                FitAI v2.1.0
              </div>
              <div className="text-sm text-muted-foreground">
                Seu assistente pessoal de treino com IA
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}