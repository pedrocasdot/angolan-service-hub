
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, PlusCircle, Users, DollarSign, ClipboardList, BarChart2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  booking_date: string;
  booking_time: string;
  status: string;
  user_id: string;
  service: {
    title: string;
    price: number;
  };
  client: {
    first_name: string;
    last_name: string;
  };
}

interface Service {
  id: string;
  title: string;
  price: number;
  image_url: string;
  category_id: string;
  bookings_count: number;
}

const ProviderDashboard = () => {
  const { user, profile, providerDetails } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings
        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("*")
          .order("booking_date", { ascending: true });
        
        // Filter bookings for the current provider
        const providerBookings = bookingsData?.filter(booking => booking.provider_id === user?.id) || [];
        setBookings(providerBookings);
        
        // Fetch services
        const { data: servicesData } = await supabase
          .from("services")
          .select("*");
          
        // Filter services for the current provider
        const providerServices = servicesData?.filter(service => service.provider_id === user?.id) || [];
        setServices(providerServices);

        // Calculate stats
        if (providerBookings.length > 0) {
          const confirmed = providerBookings.filter(b => b.status === 'confirmed').length;
          const pending = providerBookings.filter(b => b.status === 'pending').length;
          const revenue = providerBookings
            .filter(b => b.status === 'confirmed')
            .reduce((sum, booking) => sum + (booking.service?.price || 0), 0);

          setStats({
            totalBookings: providerBookings.length,
            confirmedBookings: confirmed,
            pendingBookings: pending,
            totalRevenue: revenue
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Painel do Prestador</h1>
            <p className="text-gray-500">{providerDetails?.business_name || 'Seu Negócio'}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/my-services/new">
                <PlusCircle className="w-4 h-4 mr-2" />
                Novo Serviço
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total de Reservas</p>
                  <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Confirmadas</p>
                  <h3 className="text-2xl font-bold">{stats.confirmedBookings}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pendentes</p>
                  <h3 className="text-2xl font-bold">{stats.pendingBookings}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receita Total</p>
                  <h3 className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('pt-AO')} AOA</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Reservas</CardTitle>
                <CardDescription>Gerenciar reservas de serviços</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-angola-primary" />
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Você ainda não tem reservas</p>
                    <Button asChild>
                      <Link to="/my-services/new">Adicionar um novo serviço</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{booking.service?.title}</h4>
                            <p className="text-gray-500">
                              {booking.client?.first_name} {booking.client?.last_name}
                            </p>
                          </div>
                          <Badge variant="outline" className={statusColors[booking.status]}>
                            {booking.status === "confirmed"
                              ? "Confirmado"
                              : booking.status === "pending"
                              ? "Pendente"
                              : "Cancelado"}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="mr-3">{booking.booking_date}</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{booking.booking_time}</span>
                        </div>
                        {booking.status === "pending" && (
                          <div className="flex space-x-2 mt-3">
                            <Button 
                              size="sm" 
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            >
                              Confirmar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            >
                              Rejeitar
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {bookings.length > 5 && (
                      <div className="text-center mt-4">
                        <Button variant="outline" asChild>
                          <Link to="/bookings">Ver todas as reservas</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Meus Serviços</CardTitle>
                <CardDescription>Serviços que você oferece</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-angola-primary" />
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-2">Nenhum serviço cadastrado</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.slice(0, 4).map((service) => (
                      <div key={service.id} className="flex justify-between items-center p-2 border rounded-lg">
                        <div>
                          <p className="font-medium">{service.title}</p>
                          <p className="text-sm text-gray-500">
                            {service.price.toLocaleString('pt-AO')} AOA
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <ClipboardList className="w-4 h-4 inline mr-1" />
                          {service.bookings_count || 0} reservas
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/my-services">Gerenciar Serviços</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Perfil de Negócio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Nome do Negócio</p>
                    <p className="text-gray-700">{providerDetails?.business_name || 'Não definido'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-gray-700">{profile?.phone || 'Não definido'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Endereço</p>
                    <p className="text-gray-700">{profile?.address || 'Não definido'}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/account">Editar Perfil</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDashboard;
