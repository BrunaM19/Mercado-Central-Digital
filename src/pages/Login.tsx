
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(phone, password);
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao Mercado Central Digital"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro no login",
          description: "Telefone ou palavra-passe incorretos",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tenta novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 market-gradient w-16 h-16 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <CardTitle className="text-2xl">Entrar na Conta</CardTitle>
          <CardDescription>
            Acede à tua conta do Mercado Central Digital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+258 84 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Palavra-passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="A tua palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-market-red hover:bg-market-red/90"
              disabled={loading}
            >
              {loading ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tens conta?{' '}
              <Link to="/register" className="text-market-red hover:underline">
                Registar agora
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
