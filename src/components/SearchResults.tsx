
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product, Vendor } from '@/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onBack }) => {
  const [vendors, setVendors] = useState<(Vendor & { products: Product[] })[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate search results - in real app, this would be an API call
    const mockVendors = [
      {
        id: '1',
        userId: '1',
        bancaName: 'Banca do João',
        location: 'Seção A, Banca 15',
        rating: 4.8,
        totalSales: 120,
        workingHours: '6:00 - 16:00',
        productTypes: ['frutas'],
        products: [
          {
            id: '1',
            vendorId: '1',
            name: 'Banana',
            price: 50,
            quantity: 100,
            available: true,
            category: 'frutas',
            unit: 'kg'
          },
          {
            id: '2',
            vendorId: '1',
            name: 'Maçã',
            price: 80,
            quantity: 50,
            available: true,
            category: 'frutas',
            unit: 'kg'
          }
        ]
      },
      {
        id: '2',
        userId: '2',
        bancaName: 'Banca da Maria',
        location: 'Seção B, Banca 8',
        rating: 4.6,
        totalSales: 95,
        workingHours: '5:30 - 15:30',
        productTypes: ['vegetais'],
        products: [
          {
            id: '3',
            vendorId: '2',
            name: 'Tomate',
            price: 45,
            quantity: 80,
            available: true,
            category: 'vegetais',
            unit: 'kg'
          },
          {
            id: '4',
            vendorId: '2',
            name: 'Cebola',
            price: 35,
            quantity: 60,
            available: true,
            category: 'vegetais',
            unit: 'kg'
          }
        ]
      }
    ];

    // Filter vendors based on query
    const filteredVendors = mockVendors.filter(vendor =>
      vendor.products.some(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );

    setVendors(filteredVendors);
  }, [query]);

  const handleAddToCart = (product: Product, vendor: Vendor) => {
    addToCart(product, vendor, 1);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho`
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Resultados para "{query}"</h2>
          <p className="text-gray-600">{vendors.length} bancas encontradas</p>
        </div>
      </div>

      <div className="space-y-6">
        {vendors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 mb-4">Nenhum produto encontrado para "{query}"</p>
              <p className="text-sm text-gray-400">Tenta pesquisar por outro termo</p>
            </CardContent>
          </Card>
        ) : (
          vendors.map(vendor => (
            <Card key={vendor.id} className="hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{vendor.bancaName}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {vendor.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{vendor.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{vendor.totalSales} vendas</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendor.products
                    .filter(product => 
                      product.name.toLowerCase().includes(query.toLowerCase()) && 
                      product.available
                    )
                    .map(product => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{product.name}</h4>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                        <p className="text-lg font-bold text-market-green mb-2">
                          {product.price} MT/{product.unit}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          Disponível: {product.quantity} {product.unit}
                        </p>
                        <Button
                          size="sm"
                          className="w-full bg-market-orange hover:bg-market-orange/90"
                          onClick={() => handleAddToCart(product, vendor)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
