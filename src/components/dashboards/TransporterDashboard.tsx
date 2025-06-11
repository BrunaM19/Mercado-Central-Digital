
import React, { useState } from 'react';
import { Truck, MapPin, Clock, DollarSign, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

const TransporterDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('available');

  const mockStats = {
    totalEarnings: 3250,
    todayEarnings: 180,
    totalDeliveries: 67,
    todayDeliveries: 3,
    rating: 4.7,
    pendingDeliveries: 1
  };

  const mockDeliveries = [
    {
      id: '1',
      from: 'Banca do João',
      to: 'Bairro Central',
      distance: '2.5 km',
      payment: 45,
      status: 'available',
      items: 'Banana (2kg), Maçã (1kg)'
    },
    {
      id: '2',
      from: 'Banca da Maria',
      to: 'Polana',
      distance: '4.1 km',
      payment: 70,
      status: 'available',
      items: 'Tomate (3kg), Cebola (2kg)'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="market-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-market-red">Painel do Transportador</h1>
                <p className="text-xs text-gray-600">Olá, {user?.name}</p>
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
            >
              <User className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ganhos Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-market-green">
                {mockStats.totalEarnings} MT
              </div>
              <p className="text-sm text-gray-500">+15% este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-market-orange">
                {mockStats.todayEarnings} MT
              </div>
              <p className="text-sm text-gray-500">{mockStats.todayDeliveries} entregas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Entregas Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.totalDeliveries}
              </div>
              <p className="text-sm text-gray-500">{mockStats.pendingDeliveries} pendente</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avaliação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-2xl font-bold">{mockStats.rating}</span>
              </div>
              <p className="text-sm text-gray-500">Baseado em {mockStats.totalDeliveries} entregas</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'available' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('available')}
            className={activeTab === 'available' ? 'bg-market-red' : ''}
          >
            <Truck className="h-4 w-4 mr-2" />
            Entregas Disponíveis
          </Button>
          <Button
            variant={activeTab === 'active' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('active')}
            className={activeTab === 'active' ? 'bg-market-red' : ''}
          >
            <Clock className="h-4 w-4 mr-2" />
            Entregas Ativas
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('history')}
            className={activeTab === 'history' ? 'bg-market-red' : ''}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Histórico
          </Button>
        </div>

        {/* Available Deliveries Tab */}
        {activeTab === 'available' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Entregas Disponíveis</h2>
            <div className="space-y-4">
              {mockDeliveries.map(delivery => (
                <Card key={delivery.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="font-medium">{delivery.from}</span>
                          <span className="mx-2">→</span>
                          <span className="font-medium">{delivery.to}</span>
                        </div>
                        <p className="text-gray-600 mb-2">{delivery.items}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{delivery.distance}</span>
                          <Badge variant="secondary">Disponível</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-market-green mb-2">
                          {delivery.payment} MT
                        </div>
                        <Button className="bg-market-red hover:bg-market-red/90">
                          Aceitar Entrega
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Active Deliveries Tab */}
        {activeTab === 'active' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Entregas Ativas</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Nenhuma entrega ativa no momento.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Aceita uma entrega para começar a trabalhar.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Histórico de Entregas</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Nenhuma entrega concluída ainda.</p>
                <p className="text-sm text-gray-400 mt-2">
                  O histórico das tuas entregas aparecerá aqui.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransporterDashboard;
