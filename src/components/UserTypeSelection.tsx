
import { User, Truck, Search } from "lucide-react";
import UserTypeCard from "./UserTypeCard";

const UserTypeSelection = () => {
  const userTypes = [
    {
      title: "Comprador",
      description: "Encontra os melhores produtos do mercado",
      icon: Search,
      features: [
        "Pesquisa produtos por categoria",
        "Compara preços entre bancas",
        "Escolhe entrega ou recolha",
        "Paga com M-Pesa, e-Mola ou dinheiro",
        "Avalia vendedores e transportadores"
      ],
      buttonText: "Começar a Comprar",
      color: "orange" as const
    },
    {
      title: "Vendedor",
      description: "Vende os teus produtos online",
      icon: User,
      features: [
        "Regista a tua banca no mercado",
        "Adiciona produtos com fotos e preços",
        "Gere pedidos em tempo real",
        "Escolhe transportadores parceiros",
        "Acompanha vendas e estatísticas"
      ],
      buttonText: "Registar Banca",
      color: "green" as const
    },
    {
      title: "Transportador",
      description: "Entrega produtos e ganha dinheiro",
      icon: Truck,
      features: [
        "Aceita entregas na tua área",
        "Define o teu tipo de transporte",
        "Ganha por cada entrega",
        "Horário flexível",
        "Recebe avaliações e dicas"
      ],
      buttonText: "Começar a Entregar",
      color: "red" as const
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Como queres usar a plataforma?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolhe o teu perfil e começa a fazer parte da comunidade digital do Mercado Central
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userTypes.map((userType, index) => (
            <UserTypeCard
              key={index}
              {...userType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypeSelection;
