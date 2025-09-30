import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  X, 
  Brain, 
  CheckCircle, 
  Star, 
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutData: {
    name: string;
    duration: string;
    exercises: number;
    volume: string;
  };
}

export function QuizModal({ isOpen, onClose, workoutData }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'difficulty',
      title: 'Como você avalia a dificuldade do treino?',
      type: 'rating',
      options: [
        { value: '1', label: '1 - Muito Fácil' },
        { value: '2', label: '2 - Fácil' },
        { value: '3', label: '3 - Moderado' },
        { value: '4', label: '4 - Difícil' },
        { value: '5', label: '5 - Muito Difícil' }
      ]
    },
    {
      id: 'energy',
      title: 'Como estava seu nível de energia hoje?',
      type: 'rating',
      options: [
        { value: '1', label: '1 - Muito Baixo' },
        { value: '2', label: '2 - Baixo' },
        { value: '3', label: '3 - Normal' },
        { value: '4', label: '4 - Alto' },
        { value: '5', label: '5 - Muito Alto' }
      ]
    },
    {
      id: 'form',
      title: 'Como você avalia sua execução dos exercícios?',
      type: 'rating',
      options: [
        { value: '1', label: '1 - Ruim' },
        { value: '2', label: '2 - Abaixo da média' },
        { value: '3', label: '3 - Boa' },
        { value: '4', label: '4 - Muito boa' },
        { value: '5', label: '5 - Perfeita' }
      ]
    },
    {
      id: 'satisfaction',
      title: 'Quão satisfeito você está com o treino?',
      type: 'thumbs',
      options: [
        { value: 'up', label: 'Satisfeito', icon: ThumbsUp },
        { value: 'down', label: 'Insatisfeito', icon: ThumbsDown }
      ]
    },
    {
      id: 'pain',
      title: 'Sentiu algum desconforto ou dor?',
      type: 'boolean',
      options: [
        { value: 'yes', label: 'Sim' },
        { value: 'no', label: 'Não' }
      ]
    },
    {
      id: 'notes',
      title: 'Observações adicionais (opcional)',
      type: 'text',
      placeholder: 'Descreva como foi o treino, alguma dificuldade específica, etc.'
    }
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateResults = () => {
    setShowResults(true);
  };

  const getAIInsights = () => {
    const difficulty = parseInt(answers.difficulty || '3');
    const energy = parseInt(answers.energy || '3');
    const form = parseInt(answers.form || '3');
    const hasPain = answers.pain === 'yes';
    const satisfaction = answers.satisfaction;

    const insights = [];

    if (difficulty >= 4 && energy <= 2) {
      insights.push({
        type: 'warning',
        title: 'Possível Sobrecarga',
        message: 'Treino foi difícil com baixa energia. Considere reduzir intensidade na próxima sessão.',
        icon: AlertTriangle,
        color: 'text-yellow-400'
      });
    }

    if (form >= 4 && difficulty <= 3) {
      insights.push({
        type: 'positive',
        title: 'Excelente Execução',
        message: 'Sua técnica está ótima! Pode considerar aumentar a carga gradualmente.',
        icon: CheckCircle,
        color: 'text-green-400'
      });
    }

    if (hasPain) {
      insights.push({
        type: 'alert',
        title: 'Atenção à Dor',
        message: 'Monitore a região com desconforto. Se persistir, considere consultar um profissional.',
        icon: AlertTriangle,
        color: 'text-red-400'
      });
    }

    if (satisfaction === 'up' && difficulty >= 3) {
      insights.push({
        type: 'motivational',
        title: 'Ótimo Progresso!',
        message: 'Você está se desafiando adequadamente. Continue assim!',
        icon: TrendingUp,
        color: 'text-blue-400'
      });
    }

    return insights.length > 0 ? insights : [{
      type: 'default',
      title: 'Treino Concluído',
      message: 'Dados registrados! Continue mantendo a consistência nos treinos.',
      icon: Star,
      color: 'text-purple-400'
    }];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-medium text-white">
                {showResults ? 'Análise IA' : 'Quiz Pós-Treino'}
              </h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {!showResults && (
            <div>
              <Progress 
                value={((currentStep + 1) / questions.length) * 100} 
                className="h-2 mt-3"
              />
              <div className="text-sm text-slate-400 mt-2">
                Pergunta {currentStep + 1} de {questions.length}
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {!showResults ? (
            <div className="space-y-6">
              {/* Workout Summary */}
              {currentStep === 0 && (
                <div className="bg-slate-800 rounded-lg p-4 mb-6">
                  <h3 className="text-white font-medium mb-3">Treino Concluído</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Nome</div>
                      <div className="text-white">{workoutData.name}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Duração</div>
                      <div className="text-white">{workoutData.duration}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Exercícios</div>
                      <div className="text-white">{workoutData.exercises}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Volume</div>
                      <div className="text-white">{workoutData.volume}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Question */}
              <div>
                <h3 className="text-white font-medium mb-4">
                  {questions[currentStep].title}
                </h3>

                {questions[currentStep].type === 'rating' && (
                  <RadioGroup 
                    value={answers[questions[currentStep].id]} 
                    onValueChange={(value) => handleAnswer(questions[currentStep].id, value)}
                  >
                    <div className="space-y-3">
                      {questions[currentStep].options?.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="text-slate-300 cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {questions[currentStep].type === 'thumbs' && (
                  <div className="flex gap-4">
                    {questions[currentStep].options?.map((option) => (
                      <Button
                        key={option.value}
                        variant={answers[questions[currentStep].id] === option.value ? 'default' : 'outline'}
                        onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                        className="flex-1 h-16 flex-col gap-2"
                      >
                        <option.icon className="h-6 w-6" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}

                {questions[currentStep].type === 'boolean' && (
                  <div className="flex gap-4">
                    {questions[currentStep].options?.map((option) => (
                      <Button
                        key={option.value}
                        variant={answers[questions[currentStep].id] === option.value ? 'default' : 'outline'}
                        onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                        className="flex-1"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                )}

                {questions[currentStep].type === 'text' && (
                  <Textarea
                    placeholder={questions[currentStep].placeholder}
                    value={answers[questions[currentStep].id] || ''}
                    onChange={(e) => handleAnswer(questions[currentStep].id, e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white"
                    rows={4}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="border-slate-600 text-slate-300"
                >
                  Anterior
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={
                    questions[currentStep].type !== 'text' && 
                    !answers[questions[currentStep].id]
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep === questions.length - 1 ? 'Finalizar' : 'Próximo'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* AI Analysis Results */}
              <div>
                <h3 className="text-white font-medium mb-4">Análise Personalizada</h3>
                <div className="space-y-4">
                  {getAIInsights().map((insight, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                        <div>
                          <div className="text-white font-medium mb-1">{insight.title}</div>
                          <div className="text-slate-300 text-sm">{insight.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Over Time */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    <h4 className="text-white font-medium">Progressão dos Últimos Treinos</h4>
                  </div>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { name: 'Seg', dificuldade: 3, energia: 4 },
                        { name: 'Ter', dificuldade: 2, energia: 3 },
                        { name: 'Qua', dificuldade: 4, energia: 4 },
                        { name: 'Qui', dificuldade: 3, energia: 5 },
                        { name: 'Sex', dificuldade: parseInt(answers.difficulty || '3'), energia: parseInt(answers.energy || '4') }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" domain={[1, 5]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="dificuldade" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          name="Dificuldade"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="energia" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          name="Energia"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Muscle Groups Trained */}
                <div className="bg-slate-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-green-400" />
                    <h4 className="text-white font-medium">Músculos Treinados</h4>
                  </div>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Peito', volume: 85, color: '#3B82F6' },
                        { name: 'Tríceps', volume: 70, color: '#10B981' },
                        { name: 'Ombros', volume: 60, color: '#F59E0B' },
                        { name: 'Core', volume: 45, color: '#EF4444' }
                      ]} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis type="category" dataKey="name" stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Bar dataKey="volume" name="Volume (%)">
                          {[
                            { name: 'Peito', volume: 85, color: '#3B82F6' },
                            { name: 'Tríceps', volume: 70, color: '#10B981' },
                            { name: 'Ombros', volume: 60, color: '#F59E0B' },
                            { name: 'Core', volume: 45, color: '#EF4444' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Weekly Summary */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Resumo da Semana</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">5</div>
                    <div className="text-sm text-slate-400">Treinos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">4.2</div>
                    <div className="text-sm text-slate-400">Média Energia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">3.8</div>
                    <div className="text-sm text-slate-400">Média Execução</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">92%</div>
                    <div className="text-sm text-slate-400">Satisfação</div>
                  </div>
                </div>
              </div>

              {/* Session Summary */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Resumo da Sessão Atual</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Dificuldade</div>
                    <div className="text-white">{answers.difficulty || 'N/A'}/5</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Energia</div>
                    <div className="text-white">{answers.energy || 'N/A'}/5</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Execução</div>
                    <div className="text-white">{answers.form || 'N/A'}/5</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Satisfação</div>
                    <div className="text-white">
                      {answers.satisfaction === 'up' ? '👍' : answers.satisfaction === 'down' ? '👎' : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={onClose}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Concluir
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}