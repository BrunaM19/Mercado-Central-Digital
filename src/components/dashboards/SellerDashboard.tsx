
import React, { useState } from 'react';
import { Plus, Package, BarChart3, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const SellerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  const mockStats = {
    totalSales: 15420,
    todaySales: 850,
    totalOrders: 127,
    pendingOrders: 3,
    totalProducts: 24,
    outOfStock: 2
  };

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
                <h1 className="text-lg font-bold text-market-red">Painel do Vendedor</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Vendas Totais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-market-green">
                {mockStats.totalSales.toLocaleString()} MT
              </div>
              <p className="text-sm text-gray-500">+12% desde o mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Vendas Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-market-orange">
                {mockStats.todaySales} MT
              </div>
              <p className="text-sm text-gray-500">{mockStats.pendingOrders} pedidos pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.totalProducts}
              </div>
              <p className="text-sm text-red-500">{mockStats.outOfStock} sem stock</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'products' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('products')}
            className={activeTab === 'products' ? 'bg-market-green' : ''}
          >
            <Package className="h-4 w-4 mr-2" />
            Produtos
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('orders')}
            className={activeTab === 'orders' ? 'bg-market-green' : ''}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Pedidos
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className={activeTab === 'settings' ? 'bg-market-green' : ''}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Os Meus Produtos</h2>
              <Button className="bg-market-green hover:bg-market-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Nenhum produto registado</h3>
                  <p className="text-gray-500 mb-4">
                    Começa por adicionar os teus produtos para começar a vender online
                  </p>
                  <Button className="bg-market-green hover:bg-market-green/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Primeiro Produto
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Pedidos</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Nenhum pedido recebido ainda.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Os pedidos aparecerão aqui quando os clientes comprarem os teus produtos.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Configurações da Banca</h2>
            <Card>
              <CardHeader>
                <CardTitle>Informações da Banca</CardTitle>
                <CardDescription>
                  Configure as informações básicas da sua banca
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Banca</label>
                  <input 
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ex: Banca do João"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Localização</label>
                  <input 
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ex: Seção A, Banca 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Horário de Funcionamento</label>
                  <input 
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ex: 6:00 - 16:00"
                  />
                </div>
                <Button className="bg-market-green hover:bg-market-green/90">
                  Guardar Configurações
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
