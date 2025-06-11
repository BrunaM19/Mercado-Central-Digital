
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserTypeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  buttonText: string;
  color: "orange" | "green" | "red";
  className?: string;
}

const UserTypeCard = ({ 
  title, 
  description, 
  icon: Icon, 
  features, 
  buttonText, 
  color,
  className = ""
}: UserTypeCardProps) => {
  const navigate = useNavigate();
  
  const colorClasses = {
    orange: "bg-market-orange hover:bg-market-orange/90",
    green: "bg-market-green hover:bg-market-green/90", 
    red: "bg-market-red hover:bg-market-red/90"
  };

  const iconColorClasses = {
    orange: "text-market-orange",
    green: "text-market-green",
    red: "text-market-red"
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <Card className={`hover-lift border-2 hover:border-gray-300 ${className}`}>
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit">
          <Icon className={`h-8 w-8 ${iconColorClasses[color]}`} />
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full text-white ${colorClasses[color]}`}
          size="lg"
          onClick={handleGetStarted}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserTypeCard;
