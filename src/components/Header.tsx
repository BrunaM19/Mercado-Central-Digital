
import { Search, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="market-gradient w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-market-red">Mercado Central</h1>
              <p className="text-xs text-gray-600">Maputo Digital</p>
            </div>
          </div>

          {/* Quick Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="O que procuras hoje?"
                className="pl-10 pr-4 h-10 border-2 border-gray-200 focus:border-market-orange transition-colors"
                onFocus={() => !isAuthenticated && navigate('/register')}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </Button>
            <Button 
              className="bg-market-red hover:bg-market-red/90"
              onClick={handleAuthAction}
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {isAuthenticated ? 'Dashboard' : 'Entrar'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
