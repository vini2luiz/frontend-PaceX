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

export function FeedPage() {
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
    },
    {
      id: 3,
      user: {
        name: 'Heavy',
        avatar: 'H',
        followers: '1 day'
      },
      workout: {
        name: 'Push Day Intenso',
        duration: '2h 15min',
        volume: '9.800 kg',
        records: 6,
        exercises: [
          '5 sets Supino Inclinado',
          '4 sets Desenvolvimento Ombros',
          '4 sets Tríceps Pulley',
          '3 sets Elevação Lateral'
        ]
      },
      likes: 25,
      comments: 12,
      isLiked: false,
      timestamp: '1d'
    }
  ]);

  const [newPost, setNewPost] = useState({
    workout: '',
    notes: '',
    duration: '',
    exercises: []
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
    // Implementar funcionalidade de compartilhamento conforme diagrama
    const shareData = {
      title: `Treino: ${post.workout.name}`,
      text: `Confira este treino incrível!\nDuração: ${post.workout.duration}\nVolume: ${post.workout.volume}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        // Fallback para cópia do link
        navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
        alert('Treino copiado para a área de transferência!');
      });
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
      alert('Treino copiado para a área de transferência!');
    }
  };

  const handleComment = (postId: number) => {
    // Implementar sistema de comentários conforme diagrama
    const post = posts.find(p => p.id === postId);
    if (post) {
      const comment = prompt(`Comentar no treino "${post.workout.name}":`);
      if (comment && comment.trim()) {
        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, comments: p.comments + 1 }
            : p
        ));
        alert('Comentário adicionado com sucesso!');
      }
    }
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
          duration: newPost.duration || '1h 15min',
          volume: '4.200 kg',
          records: Math.floor(Math.random() * 3) + 1,
          exercises: newPost.exercises.length > 0 ? newPost.exercises : ['Exercícios do treino...']
        },
        likes: 0,
        comments: 0,
        isLiked: false,
        timestamp: 'agora'
      };
      
      setPosts(prev => [post, ...prev]);
      setNewPost({ workout: '', notes: '', duration: '', exercises: [] });
      setShowNewPost(false);
    }
  };

  const loadMorePosts = () => {
    // Simular carregamento de mais dados do feed conforme diagrama
    const morePosts = [
      {
        id: Date.now() + Math.random(),
        user: {
          name: 'carlosstrong',
          avatar: 'C',
          followers: '3 days'
        },
        workout: {
          name: 'Leg Day Beast',
          duration: '1h 45min',
          volume: '6.750 kg',
          records: 3,
          exercises: [
            '5 sets Agachamento Livre',
            '4 sets Leg Press',
            '3 sets Stiff'
          ]
        },
        likes: 8,
        comments: 2,
        isLiked: false,
        timestamp: '3d'
      }
    ];
    
    setPosts(prev => [...prev, ...morePosts]);
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

      {/* Postar Treino no Feed - conforme diagrama */}
      {!showNewPost ? (
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="p-4">
            <Button 
              onClick={() => setShowNewPost(true)}
              className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Postar treino no feed...
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <h3 className="text-white font-medium">Postar Treino no Feed</h3>
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
              <label className="text-slate-400 text-sm">Duração</label>
              <Input
                value={newPost.duration}
                onChange={(e) => setNewPost(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Ex: 1h 30min"
                className="bg-slate-800 border-slate-600 text-white mt-1"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm">Observações</label>
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
                Publicar no Feed
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visualizar Feed de Treinos - conforme diagrama */}
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

      {/* Posts Feed - Para cada Post: Like, Comentar, Compartilhar */}
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

              {/* Interaction Bar - Like, Comentar, Compartilhar conforme diagrama */}
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
                    Curtir ({post.likes})
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleComment(post.id)}
                    className="h-auto p-2 text-slate-400 hover:text-blue-400"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comentar ({post.comments})
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare(post)}
                  className="h-auto p-2 text-slate-400 hover:text-green-400"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Carregar Dados do Feed - conforme diagrama */}
      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-slate-600 text-slate-400"
          onClick={loadMorePosts}
        >
          Carregar mais posts do feed
        </Button>
      </div>
    </div>
  );
}