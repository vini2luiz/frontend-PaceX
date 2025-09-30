import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Heart, MessageCircle, Share2, Users, Calendar, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function HomePage() {
  const posts = [
    {
      id: 1,
      user: 'Carlos Silva',
      avatar: 'CS',
      time: '2h atrás',
      workout: 'Push Day - Peito e Tríceps',
      duration: '1h 15min',
      exercises: ['Supino reto', 'Inclinado com halteres', 'Tríceps pulley'],
      likes: 24,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1711006366881-5076ba350008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwcGVyc29ufGVufDF8fHx8MTc1ODEyNjM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      user: 'Ana Rodrigues',
      avatar: 'AR',
      time: '4h atrás',
      workout: 'Leg Day Intenso',
      duration: '1h 30min',
      exercises: ['Agachamento livre', 'Leg press', 'Stiff', 'Panturrilha'],
      likes: 42,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1687521278757-aed659b751e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNjbGUlMjBzdHJlbmd0aCUyMHRyYWluaW5nfGVufDF8fHx8MTc1ODEyNjM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const groups = [
    { name: 'Team Hipertrofia', members: 128, activity: 'high' },
    { name: 'Iniciantes', members: 84, activity: 'medium' },
    { name: 'Powerlifting BR', members: 156, activity: 'high' }
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Frequência Semanal</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-right">
                <div className="text-lg font-medium">4/6</div>
                <div className="text-xs text-muted-foreground">dias</div>
              </div>
              <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`flex-1 h-2 rounded-full ${
                  day <= 4 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Groups Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2>Meus Grupos</h2>
          <Button variant="ghost" size="sm">Ver todos</Button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {groups.map((group, index) => (
            <Card key={index} className="min-w-[140px]">
              <CardContent className="p-3">
                <div className="flex items-center gap-1 mb-1">
                  <Users className="h-3 w-3" />
                  <span className="text-xs text-muted-foreground">{group.members}</span>
                </div>
                <div className="text-sm font-medium mb-2">{group.name}</div>
                <Badge 
                  variant={group.activity === 'high' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {group.activity === 'high' ? 'Muito ativo' : 'Ativo'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feed Posts */}
      <div>
        <h2 className="mb-3">Feed de Treinos</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{post.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{post.user}</div>
                    <div className="text-xs text-muted-foreground">{post.time}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-1">{post.workout}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>⏱️ {post.duration}</span>
                      <span>💪 {post.exercises.length} exercícios</span>
                    </div>
                  </div>
                  
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.workout}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Exercícios:</span> {post.exercises.join(', ')}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-muted-foreground hover:text-red-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="h-auto p-1 text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Post Button */}
      <div className="fixed bottom-20 right-4">
        <Button className="rounded-full h-12 w-12 shadow-lg">
          <span className="text-lg">+</span>
        </Button>
      </div>
    </div>
  );
}