
import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative ml-auto h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Carrinho de Compras</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">O teu carrinho está vazio</p>
                <p className="text-sm text-gray-400 mt-2">Adiciona produtos para começar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">{item.vendor.bancaName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {(item.product.price * item.quantity).toFixed(2)} MT
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.product.price} MT/{item.product.unit}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{total.toFixed(2)} MT</span>
              </div>
              <Button 
                className="w-full bg-market-green hover:bg-market-green/90"
                onClick={handleCheckout}
              >
                Finalizar Pedido
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
