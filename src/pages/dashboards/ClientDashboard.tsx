
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Search, BarChart2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: string;
  service: {
    title: string;
    price: number;
  };
  provider: {
    first_name: string;
    last_name: string;
  };
}

const ClientDashboard = () => {
  const { user, profile } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user?.id)
          .eq("status", "confirmed")
          .order("booking_date", { ascending: true });
        
        setUpcomingBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Olá, {profile?.first_name || 'Cliente'}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Calendário
            </Button>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Buscar Serviços
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
                <CardDescription>Visão geral da sua atividade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-600 text-sm font-medium">Agendamentos</p>
                    <h3 className="text-3xl font-bold">{upcomingBookings.length}</h3>
                    <p className="text-sm text-gray-500">Próximos</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-600 text-sm font-medium">Concluídos</p>
                    <h3 className="text-3xl font-bold">8</h3>
                    <p className="text-sm text-gray-500">Serviços</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg sm:col-span-1 col-span-2">
                    <p className="text-purple-600 text-sm font-medium">Favoritos</p>
                    <h3 className="text-3xl font-bold">3</h3>
                    <p className="text-sm text-gray-500">Prestadores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Próximos Agendamentos</CardTitle>
                <CardDescription>Seus serviços agendados</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-angola-primary" />
                  </div>
                ) : upcomingBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Você não tem agendamentos próximos</p>
                    <Button asChild>
                      <Link to="/services">Explorar Serviços</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 flex justify-between">
                        <div>
                          <h4 className="font-semibold">{booking.service.title}</h4>
                          <p className="text-gray-500">{booking.provider.first_name} {booking.provider.last_name}</p>
                          <div className="flex items-center mt-2 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="mr-3">{booking.date}</span>
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant="outline" className={statusColors[booking.status]}>
                            {booking.status === "confirmed"
                              ? "Confirmado"
                              : booking.status === "pending"
                              ? "Pendente"
                              : "Cancelado"}
                          </Badge>
                          <span className="mt-2 font-medium">
                            {booking.service.price.toLocaleString("pt-AO")} AOA
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-4">
                      <Button variant="outline" asChild>
                        <Link to="/bookings">Ver todos os agendamentos</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Categorias Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Limpeza Residencial
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Beleza & Estética
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Técnicos & Reparos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Educação & Aulas
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prestadores Recomendados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-2 border rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Maria Silva</p>
                      <p className="text-sm text-gray-500">Cabeleireira</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 border rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">João Santos</p>
                      <p className="text-sm text-gray-500">Eletricista</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 border rounded-lg">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-medium">Ana Sousa</p>
                      <p className="text-sm text-gray-500">Professora</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
