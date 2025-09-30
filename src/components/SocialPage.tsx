import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Star,
  MoreHorizontal,
  Plus,
  Filter,
  TrendingUp,
  Timer,
  Weight
} from 'lucide-react';

export function SocialPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'gomeespablo',
        avatar: 'G',
        followers: '5 hours'
      },
      workout: {
        name: 'Lower 1 / Terça',
        duration: '1h 37min',
        volume: '7.535 kg',
        records: 4,
        exercises: [
          '4 sets Mesa Flexora (Máquina)',
          '4 sets Agachamento Hack (Máquina)',
          '3 sets Adutor Na Polia'
        ]
      },
      likes: 12,
      comments: 3,
      isLiked: false,
      timestamp: '5h'
    },
    {
      id: 2,
      user: {
        name: 'mariafit',
        avatar: 'M',
        followers: '2 days'
      },
      workout: {
        name: 'Upper Body Power',
        duration: '1h 25min',
        volume: '5.240 kg',
        records: 2,
        exercises: [
          '4 sets Supino Reto',
          '3 sets Remada Curvada',
          '4 sets Desenvolvimento Militar'
        ]
      },
      likes: 18,
      comments: 7,
      isLiked: true,
      timestamp: '2d'
    }
  ]);

  const [newPost, setNewPost] = useState({
    workout: '',
    notes: ''
  });

  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleShare = (post: any) => {
    // Simular compartilhamento
    alert(`Compartilhando treino: ${post.workout.name}`);
  };

  const handleComment = (postId: number) => {
    // Navegar para comentários
    console.log(`Abrir comentários do post ${postId}`);
  };

  const createPost = () => {
    if (newPost.workout) {
      const post = {
        id: Date.now(),
        user: {
          name: 'rodrigo_shodl',
          avatar: 'R',
          followers: 'now'
        },
        workout: {
          name: newPost.workout,
          duration: '1h 15min',
          volume: '4.200 kg',
          records: 1,
          exercises: ['Exercícios do treino...']
        },
        likes: 0,
        comments: 0,
        isLiked: false,
        timestamp: 'agora'
      };
      
      setPosts(prev => [post, ...prev]);
      setNewPost({ workout: '', notes: '' });
      setShowNewPost(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-800 min-h-screen">
      {/* Header with monthly report notification */}
      <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">O teu relatório mensal de Agosto está pronto!</h3>
              <p className="text-slate-300 text-sm">
                Recebe uma visão geral dos dados, das conquistas e das melhores que fizeste nos teus treinos no último mês.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                Descartar
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Ver relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Post */}
      {!showNewPost ? (
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-4">
            <Button 
              onClick={() => setShowNewPost(true)}
              className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Compartilhar um treino...
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <h3 className="text-white font-medium">Compartilhar Treino</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm">Nome do treino</label>
              <Input
                value={newPost.workout}
                onChange={(e) => setNewPost(prev => ({ ...prev, workout: e.target.value }))}
                placeholder="Ex: Push Day A"
                className="bg-slate-800 border-slate-600 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm">Observações (opcional)</label>
              <Textarea
                value={newPost.notes}
                onChange={(e) => setNewPost(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Como foi o treino hoje..."
                className="bg-slate-800 border-slate-600 text-white mt-1"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowNewPost(false)}
                className="border-slate-600 text-slate-300"
              >
                Cancelar
              </Button>
              <Button 
                onClick={createPost}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!newPost.workout}
              >
                Publicar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-white">Feed de Treinos</h2>
          <Badge variant="secondary">
            {posts.length} posts hoje
          </Badge>
        </div>
        <Button variant="outline" size="sm" className="border-slate-600 text-slate-400">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {post.user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-medium">{post.user.name}</div>
                    <div className="text-sm text-slate-400">{post.timestamp}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Workout Info */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{post.workout.name}</h3>
                  {post.workout.records > 0 && (
                    <Badge className="bg-yellow-600/20 text-yellow-400">
                      <Star className="h-3 w-3 mr-1" />
                      {post.workout.records}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400">Tempo</div>
                      <div className="text-white font-medium">{post.workout.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400">Volume</div>
                      <div className="text-white font-medium">{post.workout.volume}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400">Recordes</div>
                      <div className="text-white font-medium">
                        <Star className="h-3 w-3 inline mr-1 text-yellow-400" />
                        {post.workout.records}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {post.workout.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {exercise}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleLike(post.id)}
                    className={`h-auto p-2 ${
                      post.isLiked 
                        ? 'text-red-500 hover:text-red-400' 
                        : 'text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleComment(post.id)}
                    className="h-auto p-2 text-slate-400 hover:text-blue-400"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments}
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare(post)}
                  className="h-auto p-2 text-slate-400 hover:text-green-400"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="border-slate-600 text-slate-400">
          Carregar mais posts
        </Button>
      </div>
    </div>
  );
}