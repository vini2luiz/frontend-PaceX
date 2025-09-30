import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Settings, 
  Download,
  BarChart3,
  Dumbbell,
  Trophy,
  Target
} from 'lucide-react';

export function NewProfilePage() {
  const userStats = {
    workouts: 160,
    followers: 12,
    following: 12
  };

  const weeklyData = [
    { day: 'Seg', planned: true, completed: false },
    { day: 'Ter', planned: true, completed: true },
    { day: 'Qua', planned: true, completed: false },
    { day: 'Qui', planned: true, completed: true },
    { day: 'Sex', planned: true, completed: false },
    { day: 'Sáb', planned: true, completed: false },
    { day: 'Dom', planned: false, completed: false }
  ];

  const volumeData = [
    { month: 'Jan', volume: 12000 },
    { month: 'Fev', volume: 14500 },
    { month: 'Mar', volume: 16800 },
    { month: 'Abr', volume: 15600 },
    { month: 'Mai', volume: 18200 },
    { month: 'Jun', volume: 17900 }
  ];

  const repetitionData = [
    { exercise: 'Supino', reps: 2840 },
    { exercise: 'Agachamento', reps: 2156 },
    { exercise: 'Deadlift', reps: 1890 },
    { exercise: 'Desenvolvimento', reps: 1654 },
    { exercise: 'Remada', reps: 1432 }
  ];

  const muscleGroupData = [
    { name: 'Peito', value: 28, color: '#3b82f6' },
    { name: 'Costas', value: 24, color: '#10b981' },
    { name: 'Pernas', value: 32, color: '#f59e0b' },
    { name: 'Ombros', value: 16, color: '#ef4444' }
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-800 min-h-screen">
      {/* Profile Header */}
      <Card className="bg-slate-900 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                RS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">Rodrigo Shodl Sumioshi</h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{userStats.workouts}</div>
                  <div className="text-slate-400">Treinamentos</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{userStats.followers}</div>
                  <div className="text-slate-400">Seguidores</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{userStats.following}</div>
                  <div className="text-slate-400">Seguindo</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Settings className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="bg-slate-900 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">0 horas essa semana</h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Últimos 3 meses</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-slate-400 mb-2">{day.day}</div>
                <div className={`w-full h-16 rounded-lg border-2 ${
                  day.completed 
                    ? 'bg-green-600 border-green-600' 
                    : day.planned 
                      ? 'border-slate-600 border-dashed' 
                      : 'border-slate-700'
                }`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="volume" className="data-[state=active]:bg-blue-600">
            Volume
          </TabsTrigger>
          <TabsTrigger value="repetitions" className="data-[state=active]:bg-blue-600">
            Repetições
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Volume Chart */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <h3 className="text-white font-medium">Volume Mensal</h3>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volumeData}>
                      <XAxis dataKey="month" className="text-slate-400" />
                      <YAxis className="text-slate-400" />
                      <Line 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Muscle Group Distribution */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <h3 className="text-white font-medium">Distribuição por Grupo Muscular</h3>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={muscleGroupData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {muscleGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">127</div>
                <div className="text-sm text-slate-400">Recordes Pessoais</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Dumbbell className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-sm text-slate-400">Exercícios Únicos</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-slate-400">Consistência</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-slate-400">Sequência Atual</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="volume" className="space-y-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <h3 className="text-white font-medium">Progressão de Volume</h3>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <XAxis dataKey="month" className="text-slate-400" />
                    <YAxis className="text-slate-400" />
                    <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repetitions" className="space-y-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <h3 className="text-white font-medium">Repetições por Exercício</h3>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={repetitionData} layout="horizontal">
                    <XAxis type="number" className="text-slate-400" />
                    <YAxis dataKey="exercise" type="category" className="text-slate-400" />
                    <Bar dataKey="reps" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Panel Section */}
      <div>
        <h2 className="text-white font-medium mb-4">Painel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-900 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-medium mb-2">Estatísticas</h3>
              <p className="text-slate-400 text-sm">Análises detalhadas dos seus treinos</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
            <CardContent className="p-6 text-center">
              <Dumbbell className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-medium mb-2">Exercícios</h3>
              <p className="text-slate-400 text-sm">Biblioteca de exercícios favoritos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}