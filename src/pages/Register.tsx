
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    bairro: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As palavras-passe não coincidem",
        variant: "destructive"
      });
      return;
    }

    if (!formData.userType) {
      toast({
        title: "Erro",
        description: "Por favor, seleciona o tipo de utilizador",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const userData: Omit<User, 'id'> = {
        name: formData.name,
        phone: formData.phone,
        password: formData.password,
        userType: formData.userType as User['userType'],
        bairro: formData.bairro
      };

      const success = await register(userData);
      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Mercado Central Digital"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro no registo",
          description: "Este número de telefone já está registado",
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

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 market-gradient w-16 h-16 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <CardTitle className="text-2xl">Criar Conta</CardTitle>
          <CardDescription>
            Junta-te à comunidade do Mercado Central Digital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="O teu nome completo"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone (WhatsApp)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+258 84 123 4567"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Utilizador</Label>
              <Select onValueChange={(value) => updateFormData('userType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleciona o teu tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Comprador</SelectItem>
                  <SelectItem value="seller">Vendedor</SelectItem>
                  <SelectItem value="transporter">Transportador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                placeholder="O teu bairro"
                value={formData.bairro}
                onChange={(e) => updateFormData('bairro', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Palavra-passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Cria uma palavra-passe"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Palavra-passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirma a palavra-passe"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-market-red hover:bg-market-red/90"
              disabled={loading}
            >
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tens conta?{' '}
              <Link to="/login" className="text-market-red hover:underline">
                Entrar agora
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
