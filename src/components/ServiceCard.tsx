
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  title: string;
  provider: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
}

const ServiceCard = ({
  id,
  title,
  provider,
  image,
  price,
  rating,
  reviewCount,
  category,
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        <Badge 
          className="absolute top-2 right-2 bg-angola-secondary text-angola-dark"
        >
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <Link to={`/service/${id}`}>
          <h3 className="text-lg font-medium hover:text-angola-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">by {provider}</p>
        <div className="flex items-center mt-2 space-x-1">
          <Star className="w-4 h-4 fill-angola-secondary text-angola-secondary" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-semibold">
          {price.toLocaleString('pt-AO')} Kz
        </p>
        <Button size="sm">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
