
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import SearchResults from '@/components/SearchResults';
import CartSidebar from '@/components/CartSidebar';

const BuyerDashboard = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearch(true);
    }
  };

  const popularCategories = [
    { name: "🍌 Frutas", count: 45 },
    { name: "🥕 Vegetais", count: 67 },
    { name: "🐟 Peixe", count: 23 },
    { name: "🍖 Carne", count: 18 },
    { name: "🌶️ Especiarias", count: 34 },
    { name: "🥖 Pão", count: 12 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="market-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-market-red">Mercado Central</h1>
                <p className="text-xs text-gray-600">Olá, {user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Carrinho
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-market-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
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
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {!showSearch ? (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">O que procuras hoje?</h2>
              <p className="text-gray-600">Encontra os melhores produtos do Mercado Central</p>
            </div>

            {/* Search Section */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Pesquisa produtos (ex: banana, tomate, peixe...)"
                  className="pl-12 pr-4 h-14 text-lg border-2 border-gray-200 focus:border-market-orange"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="absolute right-2 top-2 bg-market-green hover:bg-market-green/90"
                >
                  Pesquisar
                </Button>
              </div>
            </form>

            {/* Popular Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Categorias Populares</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularCategories.map((category, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover-lift"
                    onClick={() => {
                      setSearchQuery(category.name.split(' ')[1]);
                      setShowSearch(true);
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.name.split(' ')[0]}</div>
                      <div className="font-medium">{category.name.split(' ')[1]}</div>
                      <div className="text-sm text-gray-500">{category.count} bancas</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Pedidos Recentes</h3>
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Ainda não fizeste nenhum pedido.</p>
                  <p className="text-sm mt-2">Começa a explorar os produtos disponíveis!</p>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <SearchResults 
            query={searchQuery} 
            onBack={() => setShowSearch(false)}
          />
        )}
      </div>

      <CartSidebar 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />
    </div>
  );
};

export default BuyerDashboard;
