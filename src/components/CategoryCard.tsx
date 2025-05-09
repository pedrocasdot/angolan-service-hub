
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  href: string;
}

const CategoryCard = ({ title, icon: Icon, description, href }: CategoryCardProps) => {
  return (
    <Link to={href}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-white rounded-full bg-angola-primary">
            <Icon size={24} />
          </div>
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
