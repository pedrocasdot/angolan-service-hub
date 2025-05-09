
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-angola-primary">Servi</span>
            <span className="text-2xl font-bold text-angola-tertiary">Angola</span>
          </Link>
        </div>

        <div className="hidden w-full max-w-xs mx-auto md:block">
          <Input
            type="search"
            placeholder="Search for services..."
            className="h-9"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/services">
            <Button variant="ghost" size="sm">
              Services
            </Button>
          </Link>
          <Link to="/providers">
            <Button variant="ghost" size="sm">
              Providers
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-angola-primary rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
