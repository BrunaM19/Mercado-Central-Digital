
import { Clock, Bell, User, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Entrega Rápida",
      description: "Recebe os teus produtos em casa em menos de 1 hora"
    },
    {
      icon: Bell,
      title: "Notificações SMS",
      description: "Acompanha o teu pedido por SMS e WhatsApp"
    },
    {
      icon: User,
      title: "Interface Simples",
      description: "App fácil de usar para todos os níveis de experiência"
    },
    {
      icon: Check,
      title: "Pagamento Flexível",
      description: "M-Pesa, e-Mola ou dinheiro na entrega"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Porquê escolher o Mercado Central Digital?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Criado especialmente para a comunidade de Maputo, com funcionalidades que fazem sentido para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover-lift">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-market-orange/10 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-market-orange" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
