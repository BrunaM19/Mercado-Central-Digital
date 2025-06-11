
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  return (
    <section className="market-gradient py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Bem-vindo ao<br />
            <span className="text-yellow-200">Mercado Central</span> Digital
          </h1>
          <p className="text-xl lg:text-2xl mb-8 opacity-90">
            Conectando compradores, vendedores e transportadores no coração de Maputo
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="O que procuras hoje? (ex: banana, tomate, peixe...)"
                className="pl-12 pr-4 h-14 text-lg border-0 shadow-lg"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-2 bg-market-green hover:bg-market-green/90 text-white"
              >
                Pesquisar
              </Button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["🍌 Frutas", "🥕 Vegetais", "🐟 Peixe", "🍖 Carne", "🌶️ Especiarias", "🥖 Pão"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <p className="text-lg opacity-75">
            Mais de <span className="font-bold">500 bancas</span> • Entrega em <span className="font-bold">30 bairros</span> • Disponível <span className="font-bold">7 dias</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
