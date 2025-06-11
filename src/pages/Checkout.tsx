
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [address, setAddress] = useState('');
  const [processing, setProcessing] = useState(false);

  const deliveryFee = deliveryType === 'delivery' ? 50 : 0;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = async () => {
    if (deliveryType === 'delivery' && !address.trim()) {
      toast({
        title: "Endereço necessário",
        description: "Por favor, insere o endereço de entrega",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Pedido realizado com sucesso!",
        description: "O vendedor irá confirmar o teu pedido em breve"
      });
      clearCart();
      navigate('/dashboard');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 mb-4">O teu carrinho está vazio</p>
            <Button onClick={() => navigate('/dashboard')}>
              Voltar às Compras
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Tipo de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1">
                      <div>
                        <p className="font-medium">Entrega ao Domicílio</p>
                        <p className="text-sm text-gray-500">Recebe em casa (Taxa: 50 MT)</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1">
                      <div>
                        <p className="font-medium">Recolha no Mercado</p>
                        <p className="text-sm text-gray-500">Vais buscar no mercado (Grátis)</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {deliveryType === 'delivery' && (
                  <div className="mt-4">
                    <Label htmlFor="address">Endereço de Entrega</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Método de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa">M-Pesa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emola" id="emola" />
                    <Label htmlFor="emola">e-Mola</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Dinheiro na Entrega</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.vendor.bancaName} • {item.quantity} {item.product.unit}
                    </p>
                  </div>
                  <p className="font-medium">
                    {(item.product.price * item.quantity).toFixed(2)} MT
                  </p>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{total.toFixed(2)} MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Entrega:</span>
                  <span>{deliveryFee} MT</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>{finalTotal.toFixed(2)} MT</span>
                </div>
              </div>

              <Button 
                className="w-full bg-market-green hover:bg-market-green/90 mt-6"
                onClick={handlePlaceOrder}
                disabled={processing}
              >
                {processing ? 'A processar...' : 'Confirmar Pedido'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
