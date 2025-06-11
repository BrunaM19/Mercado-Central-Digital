
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="market-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Mercado Central Digital</h3>
                <p className="text-gray-400 text-sm">Maputo, Moçambique</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A primeira plataforma digital que conecta toda a comunidade do Mercado Central de Maputo. 
              Compradores, vendedores e transportadores unidos numa só app.
            </p>
            <p className="text-sm text-gray-400">
              📱 WhatsApp: +258 84 123 4567<br />
              📧 Email: info@mercadocentral.mz
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-market-orange transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-market-orange transition-colors">Registar Banca</a></li>
              <li><a href="#" className="hover:text-market-orange transition-colors">Ser Transportador</a></li>
              <li><a href="#" className="hover:text-market-orange transition-colors">Ajuda</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Apoio</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-market-orange transition-colors">Centro de Ajuda</a></li>
              <li><a href="#" className="hover:text-market-orange transition-colors">Tutoriais em Vídeo</a></li>
              <li><a href="#" className="hover:text-market-orange transition-colors">Contactar Suporte</a></li>
              <li><a href="#" className="hover:text-market-orange transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Mercado Central Digital. Feito com ❤️ em Maputo, Moçambique.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
