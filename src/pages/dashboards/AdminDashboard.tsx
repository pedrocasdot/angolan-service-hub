
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, DollarSign, BookOpen, ShoppingBag, 
  BarChart2, PieChart, Calendar, Search 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  totalServices: number;
  totalBookings: number;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProviders: 0,
    totalServices: 0,
    totalBookings: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In a real app, these would be separate authorized admin API calls
        // For the mock version, we'll simulate with the data we have

        // Get users count
        const { count: usersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact" });
        
        // Get providers count
        const { count: providersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .eq("role", "provider");
        
        // Get services count
        const { count: servicesCount } = await supabase
          .from("services")
          .select("*", { count: "exact" });
        
        // Get bookings count
        const { count: bookingsCount } = await supabase
          .from("bookings")
          .select("*", { count: "exact" });
        
        // Get recent users
        const { data: recentUsersData } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        setStats({
          totalUsers: usersCount || 0,
          totalProviders: providersCount || 0,
          totalServices: servicesCount || 0,
          totalBookings: bookingsCount || 0,
        });

        setRecentUsers(recentUsersData || []);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAdminData();
    }
  }, [user]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'provider':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Pesquisar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Usuários</p>
                  <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prestadores</p>
                  <h3 className="text-2xl font-bold">{stats.totalProviders}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Serviços</p>
                  <h3 className="text-2xl font-bold">{stats.totalServices}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-500 text-white p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reservas</p>
                  <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral do Sistema</CardTitle>
                <CardDescription>Estatísticas e métricas da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-24 w-24 mx-auto text-angola-primary opacity-50" />
                  <p className="mt-4 text-gray-500">
                    Gráficos de análise serão exibidos aqui
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Recentes</CardTitle>
                <CardDescription>Novos usuários na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-angola-primary" />
                  </div>
                ) : recentUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum usuário encontrado</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex justify-between items-center p-2 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                          <div>
                            <p className="font-medium">{user.first_name} {user.last_name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getRoleColor(user.role)}>
                          {user.role === 'admin' ? 'Admin' : 
                           user.role === 'provider' ? 'Prestador' : 'Cliente'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Ver Todos os Usuários
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Gerenciar a plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Gerenciar Usuários</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <ShoppingBag className="h-6 w-6 mb-2" />
                  <span>Gerenciar Serviços</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span>Gerenciar Reservas</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex flex-col">
                  <BarChart2 className="h-6 w-6 mb-2" />
                  <span>Relatórios</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
