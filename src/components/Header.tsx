
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, User, LogOut, Menu, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Header = () => {
  const { user, signOut, profile, isProvider, isAdmin } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            placeholder="Pesquisar serviços..."
            className="h-9"
          />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="px-2 py-1 text-lg font-medium">Início</Link>
                <Link to="/services" className="px-2 py-1 text-lg font-medium">Serviços</Link>
                <Link to="/providers" className="px-2 py-1 text-lg font-medium">Prestadores</Link>
                {user ? (
                  <>
                    <Link to="/dashboard" className="px-2 py-1 text-lg font-medium">Painel</Link>
                    <Link to="/bookings" className="px-2 py-1 text-lg font-medium">Minhas Reservas</Link>
                    <Link to="/account" className="px-2 py-1 text-lg font-medium">Minha Conta</Link>
                    <Button variant="destructive" onClick={signOut} className="mt-4">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button className="w-full">Entrar</Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden items-center space-x-4 md:flex">
          <Link to="/services">
            <Button variant="ghost" size="sm">
              Serviços
            </Button>
          </Link>
          <Link to="/providers">
            <Button variant="ghost" size="sm">
              Prestadores
            </Button>
          </Link>
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Painel
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {isAdmin() ? 'Administrador' : isProvider() ? 'Prestador' : 'Cliente'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account">Minha Conta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings">Minhas Reservas</Link>
                  </DropdownMenuItem>
                  {isProvider() && (
                    <DropdownMenuItem asChild>
                      <Link to="/my-services">Meus Serviços</Link>
                    </DropdownMenuItem>
                  )}
                  {!isProvider() && (
                    <DropdownMenuItem asChild>
                      <Link to="/become-provider">Tornar-se um Prestador</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
