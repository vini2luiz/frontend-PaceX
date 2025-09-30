import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  Send, 
  Brain, 
  Mic, 
  Camera, 
  Paperclip,
  Sparkles,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap
} from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
  suggestions?: string[];
}

export function NewChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: 'Olá! Sou seu treinador pessoal virtual da PaceX 💪\n\nComo posso te ajudar hoje? Posso:\n• Analisar sua forma em exercícios\n• Sugerir treinos personalizados\n• Dar dicas de nutrição\n• Responder dúvidas técnicas\n• Analisar seu progresso',
      timestamp: '10:30',
      suggestions: ['Analisar último treino', 'Sugerir treino para hoje', 'Dicas de nutrição']
    },
    {
      id: 2,
      type: 'user',
      message: 'Como posso melhorar meu supino reto? Estou estagnado em 80kg há 3 semanas.',
      timestamp: '10:32'
    },
    {
      id: 3,
      type: 'ai',
      message: 'Analisando seus dados de treino dos últimos 30 dias, vejo que você tem feito 4 séries de 8-10 repetições consistentemente. Para quebrar esse platô, recomendo:\n\n🔸 **Periodização**: Alterne entre semanas de força (3-5 reps) e hipertrofia (8-12 reps)\n🔸 **Técnicas avançadas**: Drop sets, rest-pause ou séries negativas\n🔸 **Variação de pegada**: Experimente pegada mais fechada ou mais aberta\n🔸 **Frequência**: Aumente para 2x por semana se possível\n\n📊 Baseado no seu histórico, sugiro começar com 85kg x 5 repetições esta semana.',
      timestamp: '10:32',
      suggestions: ['Criar plano de periodização', 'Ver exercícios auxiliares', 'Analisar técnica']
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    {
      icon: TrendingUp,
      title: 'Analisar Progresso',
      description: 'Revisar seus últimos treinos e identificar melhorias'
    },
    {
      icon: Target,
      title: 'Plano Personalizado',
      description: 'Criar um treino adaptado aos seus objetivos'
    },
    {
      icon: Brain,
      title: 'Dúvida Técnica',
      description: 'Esclarecer execução de exercícios ou metodologia'
    },
    {
      icon: Sparkles,
      title: 'Otimizar Treino',
      description: 'Sugestões para maximizar seus resultados'
    }
  ];

  const aiInsights = [
    {
      type: 'tip',
      icon: CheckCircle,
      title: 'Consistência Excelente',
      message: 'Você treinou 4x esta semana! Continue assim.',
      color: 'text-green-400'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Atenção ao Volume',
      message: 'Volume de treino 20% acima da média. Considere um deload.',
      color: 'text-yellow-400'
    },
    {
      type: 'suggestion',
      icon: TrendingUp,
      title: 'Oportunidade de Melhoria',
      message: 'Seus ombros poderiam se beneficiar de mais volume.',
      color: 'text-blue-400'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now(),
        type: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          message: getAIResponse(newMessage),
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          suggestions: getRandomSuggestions()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = [
      'Excelente pergunta! Baseado nos seus dados de treino, vou analisar e dar uma recomendação personalizada...',
      'Analisando seu histórico de performance e considerando seus objetivos atuais...',
      'Perfeito! Vou usar IA para criar uma estratégia específica para seu caso...',
      'Ótima questão! Deixe-me processar seus dados e gerar insights personalizados...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getRandomSuggestions = (): string[] => {
    const suggestions = [
      'Ver plano detalhado',
      'Agendar lembrete',
      'Salvar nos favoritos',
      'Compartilhar com amigos',
      'Mais informações',
      'Próximos passos'
    ];
    return suggestions.slice(0, 3);
  };

  const handleQuickPrompt = (prompt: any) => {
    setNewMessage(`Gostaria de ${prompt.description.toLowerCase()}`);
  };

  const handleSuggestion = (suggestion: string) => {
    // Handle suggestion click
    console.log('Suggestion clicked:', suggestion);
  };

  return (
    <div className="flex h-full bg-slate-800">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-slate-700 p-4 bg-slate-900">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Brain className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white font-medium">Treinador IA</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-400">Online • Especialista em Musculação</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                        <Brain className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-slate-400">Treinador IA</span>
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="h-2 w-2 mr-1" />
                      Powered by AI
                    </Badge>
                  </div>
                )}
                <Card className={`${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-slate-900 border-slate-700'
                }`}>
                  <CardContent className="p-4">
                    <div className="text-sm whitespace-pre-line">{message.message}</div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}>
                      {message.timestamp}
                    </div>
                  </CardContent>
                </Card>
                
                {/* AI Suggestions */}
                {message.type === 'ai' && message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestion(suggestion)}
                        className="text-xs border-slate-600 text-slate-300 hover:bg-slate-800"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      <Brain className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-slate-400">Treinador IA está digitando...</span>
                </div>
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700 p-4 bg-slate-900">
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="icon" className="border-slate-600 text-slate-400">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-slate-600 text-slate-400">
              <Camera className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-slate-600 text-slate-400">
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua pergunta sobre treino..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-slate-400 mt-2 text-center">
            IA pode cometer erros. Sempre consulte um profissional para orientações médicas.
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l border-slate-700 bg-slate-900 p-4 space-y-6">
        {/* Quick Prompts */}
        <div>
          <h3 className="text-white font-medium mb-3">Ações Rápidas</h3>
          <div className="space-y-2">
            {quickPrompts.map((prompt, index) => (
              <Card 
                key={index} 
                className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
                onClick={() => handleQuickPrompt(prompt)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <prompt.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{prompt.title}</div>
                      <div className="text-slate-400 text-xs">{prompt.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div>
          <h3 className="text-white font-medium mb-3">Insights IA</h3>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <insight.icon className={`h-4 w-4 mt-0.5 ${insight.color}`} />
                    <div>
                      <div className="text-white text-sm font-medium mb-1">{insight.title}</div>
                      <div className="text-slate-400 text-xs">{insight.message}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h3 className="text-white font-medium mb-3">Estatísticas Rápidas</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Conversas hoje</span>
              <span className="text-white">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dicas aplicadas</span>
              <span className="text-white">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Accuracy IA</span>
              <span className="text-green-400">94%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}