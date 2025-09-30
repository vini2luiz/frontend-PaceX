import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Brain, Mic, Camera, Zap } from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: 'Olá! Sou seu treinador pessoal virtual 💪 Como posso te ajudar hoje? Posso analisar sua forma, sugerir treinos, dar dicas de nutrição ou responder qualquer dúvida sobre musculação!',
      timestamp: '10:30'
    },
    {
      id: 2,
      type: 'user',
      message: 'Qual a melhor forma de executar o supino reto?',
      timestamp: '10:32'
    },
    {
      id: 3,
      type: 'ai',
      message: 'Excelente pergunta! Para executar o supino reto corretamente:\n\n🔸 **Posicionamento**: Deite no banco com os pés firmes no chão\n🔸 **Pegada**: Mãos um pouco mais largas que os ombros\n🔸 **Movimento**: Desça a barra controladamente até o peito, depois empurre para cima\n🔸 **Respiração**: Inspire na descida, expire na subida\n\n📹 Quer que eu analise um vídeo seu executando o movimento?',
      timestamp: '10:32'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const quickActions = [
    { label: 'Analisar forma', icon: Camera, action: 'analyze-form' },
    { label: 'Sugerir treino', icon: Zap, action: 'suggest-workout' },
    { label: 'Dúvida técnica', icon: Brain, action: 'technical-question' },
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

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          message: getAIResponse(newMessage),
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = [
      'Ótima pergunta! Com base nos seus dados de treino, recomendo focar em...',
      'Analisando seu histórico de treinos, sugiro aumentar a intensidade gradualmente...',
      'Para otimizar seus resultados, considere incluir exercícios compostos como...',
      'Baseado na sua frequência semanal, seria interessante ajustar o volume de treino...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'analyze-form':
        message = 'Gostaria de analisar a forma de um exercício';
        break;
      case 'suggest-workout':
        message = 'Pode sugerir um treino para hoje?';
        break;
      case 'technical-question':
        message = 'Tenho uma dúvida técnica sobre execução';
        break;
    }
    setNewMessage(message);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Brain className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Treinador IA</div>
            <div className="text-sm text-muted-foreground">Especialista em musculação • Online</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border">
        <div className="text-sm text-muted-foreground mb-2">Ações rápidas:</div>
        <div className="flex gap-2 overflow-x-auto">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className="whitespace-nowrap"
            >
              <action.icon className="h-4 w-4 mr-1" />
              {action.label}
            </Button>
          ))}
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
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      <Brain className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Treinador IA</span>
                </div>
              )}
              <Card className={message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}>
                <CardContent className="p-3">
                  <div className="text-sm whitespace-pre-line">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0">
            <Mic className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Digite sua pergunta sobre treino..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          IA pode cometer erros. Consulte sempre um profissional.
        </div>
      </div>
    </div>
  );
}