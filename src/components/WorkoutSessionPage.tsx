import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Check, 
  Timer,
  Weight,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  sets: {
    reps: number;
    weight: number;
    completed: boolean;
    rest: number;
  }[];
  muscleGroup: string;
}

interface WorkoutSessionPageProps {
  onComplete: (workoutData: any) => void;
  onBack: () => void;
}

export function WorkoutSessionPage({ onComplete, onBack }: WorkoutSessionPageProps) {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: 'Supino Reto',
      muscleGroup: 'Peito',
      sets: [
        { reps: 12, weight: 80, completed: false, rest: 90 },
        { reps: 10, weight: 85, completed: false, rest: 90 },
        { reps: 8, weight: 90, completed: false, rest: 120 }
      ]
    },
    {
      id: 2,
      name: 'Inclinado com Halteres',
      muscleGroup: 'Peito',
      sets: [
        { reps: 12, weight: 30, completed: false, rest: 90 },
        { reps: 10, weight: 32, completed: false, rest: 90 },
        { reps: 8, weight: 35, completed: false, rest: 90 }
      ]
    },
    {
      id: 3,
      name: 'Desenvolvimento Militar',
      muscleGroup: 'Ombros',
      sets: [
        { reps: 12, weight: 50, completed: false, rest: 90 },
        { reps: 10, weight: 55, completed: false, rest: 90 },
        { reps: 8, weight: 60, completed: false, rest: 90 }
      ]
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const startWorkout = () => {
    setIsActive(true);
    setStartTime(new Date());
  };

  const pauseWorkout = () => {
    setIsActive(false);
  };

  const finishWorkout = () => {
    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    const completedSets = exercises.reduce((acc, ex) => 
      acc + ex.sets.filter(set => set.completed).length, 0
    );
    
    const totalVolume = exercises.reduce((acc, ex) => 
      acc + ex.sets.reduce((setAcc, set) => 
        set.completed ? setAcc + (set.weight * set.reps) : setAcc, 0
      ), 0
    );

    const workoutData = {
      name: 'Push Day A',
      duration: formatTime(elapsedTime),
      exercises: exercises.length,
      volume: `${totalVolume.toLocaleString()} kg`,
      completedSets,
      totalSets,
      startTime,
      endTime: new Date()
    };

    onComplete(workoutData);
  };

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    setExercises(prev => {
      const updated = [...prev];
      updated[exerciseIndex].sets[setIndex].completed = true;
      return updated;
    });

    // Start rest timer
    const restTime = exercises[exerciseIndex].sets[setIndex].rest;
    setRestTimer(restTime);
    setIsResting(true);
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
    setExercises(prev => {
      const updated = [...prev];
      updated[exerciseIndex].sets[setIndex][field] = value;
      return updated;
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
    }
    return `${minutes}min ${remainingSeconds.toString().padStart(2, '0')}s`;
  };

  const currentExercise = exercises[currentExerciseIndex];
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = exercises.reduce((acc, ex) => 
    acc + ex.sets.filter(set => set.completed).length, 0
  );
  const progress = (completedSets / totalSets) * 100;

  return (
    <div className="p-6 space-y-6 bg-slate-800 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-slate-400">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="text-center">
          <h1 className="text-xl font-medium text-white">Push Day A</h1>
          <p className="text-slate-400">Treino de Peito e Ombros</p>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Timer and Controls */}
      <Card className="bg-slate-900 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatTime(elapsedTime)}</div>
                <div className="text-sm text-slate-400">Tempo decorrido</div>
              </div>
              {isResting && (
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-400">{formatTime(restTimer)}</div>
                  <div className="text-sm text-slate-400">Descanso</div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isActive ? (
                <Button onClick={startWorkout} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  {startTime ? 'Continuar' : 'Iniciar'}
                </Button>
              ) : (
                <Button onClick={pauseWorkout} variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pausar
                </Button>
              )}
              <Button onClick={finishWorkout} variant="destructive">
                <Square className="h-4 w-4 mr-2" />
                Finalizar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progresso</span>
              <span className="text-white">{completedSets}/{totalSets} sets</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Exercise Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
          disabled={currentExerciseIndex === 0}
          className="border-slate-600"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <div className="text-center">
          <div className="text-white font-medium">{currentExercise.name}</div>
          <Badge variant="secondary" className="mt-1">
            {currentExercise.muscleGroup}
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setCurrentExerciseIndex(Math.min(exercises.length - 1, currentExerciseIndex + 1))}
          disabled={currentExerciseIndex === exercises.length - 1}
          className="border-slate-600"
        >
          Próximo
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Current Exercise */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">{currentExercise.name}</h3>
            <Button variant="ghost" size="sm" className="text-slate-400">
              Ver execução
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentExercise.sets.map((set, setIndex) => (
              <div 
                key={setIndex} 
                className={`border rounded-lg p-4 ${
                  set.completed 
                    ? 'border-green-600 bg-green-600/10' 
                    : 'border-slate-600 bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={set.completed ? 'default' : 'secondary'}>
                      Set {setIndex + 1}
                    </Badge>
                    {set.completed && <Check className="h-4 w-4 text-green-400" />}
                  </div>
                  <div className="text-sm text-slate-400">
                    Descanso: {set.rest}s
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label className="text-slate-400 text-xs">Repetições</Label>
                    <Input
                      type="number"
                      value={set.reps}
                      onChange={(e) => updateSet(currentExerciseIndex, setIndex, 'reps', parseInt(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      disabled={set.completed}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 text-xs">Peso (kg)</Label>
                    <Input
                      type="number"
                      value={set.weight}
                      onChange={(e) => updateSet(currentExerciseIndex, setIndex, 'weight', parseFloat(e.target.value) || 0)}
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                      disabled={set.completed}
                    />
                  </div>
                  <div className="flex items-end">
                    {!set.completed ? (
                      <Button 
                        onClick={() => completeSet(currentExerciseIndex, setIndex)}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={!set.reps || !set.weight}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Concluir
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        className="w-full border-green-600 text-green-400"
                        disabled
                      >
                        Concluído
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <h3 className="text-lg font-medium text-white">Todos os Exercícios</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exercises.map((exercise, index) => {
              const completedSets = exercise.sets.filter(set => set.completed).length;
              const totalSets = exercise.sets.length;
              
              return (
                <div 
                  key={exercise.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    index === currentExerciseIndex 
                      ? 'border-blue-600 bg-blue-600/10' 
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => setCurrentExerciseIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{exercise.name}</div>
                      <div className="text-sm text-slate-400">{exercise.muscleGroup}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm">{completedSets}/{totalSets}</div>
                      <div className="text-xs text-slate-400">sets</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}