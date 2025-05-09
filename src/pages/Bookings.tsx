
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Booking {
  id: string;
  service_id: string;
  booking_date: string;
  booking_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  service: {
    title: string;
    price: number;
    image_url: string | null;
  };
  provider: {
    first_name: string | null;
    last_name: string | null;
  };
}

export default function Bookings() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth?redirect=/bookings");
      return;
    }
    
    async function fetchBookings() {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            service:services(*),
            provider:profiles!bookings_provider_id_fkey(first_name, last_name)
          `)
          .eq('user_id', user.id)
          .order('booking_date', { ascending: true });
          
        if (error) throw error;
        
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar suas reservas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchBookings();
  }, [user, authLoading, navigate]);
  
  const cancelBooking = async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      ));
      
      toast({
        title: "Reserva cancelada",
        description: "Sua reserva foi cancelada com sucesso",
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Erro",
        description: "Não foi possível cancelar a reserva",
        variant: "destructive",
      });
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };
  
  const upcomingBookings = bookings.filter(booking => 
    (booking.status === 'confirmed' || booking.status === 'pending') && 
    new Date(`${booking.booking_date}T${booking.booking_time}`) >= new Date()
  );
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || 
    (booking.status !== 'cancelled' && new Date(`${booking.booking_date}T${booking.booking_time}`) < new Date())
  );
  
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');
  
  if (authLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Carregando...</h1>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Minhas Reservas</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming" className="flex">
              Próximas
              {upcomingBookings.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {upcomingBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">Anteriores</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map(i => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingBookings.map(booking => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={booking.service.image_url || "https://via.placeholder.com/400x200?text=Serviço"} 
                        alt={booking.service.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-1">{booking.service.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {booking.provider.first_name || ''} {booking.provider.last_name || ''}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="mr-2 text-angola-primary" />
                          <span>{format(new Date(booking.booking_date), "dd/MM/yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="mr-2 text-angola-primary" />
                          <span>{booking.booking_time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin size={16} className="mr-2 text-angola-primary" />
                          <span>Luanda</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">
                          {booking.service.price.toLocaleString('pt-AO')} Kz
                        </span>
                        {booking.status !== 'cancelled' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => cancelBooking(booking.id)}
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Você não tem reservas futuras</h3>
                <p className="text-gray-600 mb-6">Explore nossos serviços e faça uma reserva</p>
                <Button asChild>
                  <a href="/services">Explorar Serviços</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map(i => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : pastBookings.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastBookings.map(booking => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={booking.service.image_url || "https://via.placeholder.com/400x200?text=Serviço"} 
                        alt={booking.service.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-1">{booking.service.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {booking.provider.first_name || ''} {booking.provider.last_name || ''}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="mr-2 text-angola-primary" />
                          <span>{format(new Date(booking.booking_date), "dd/MM/yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="mr-2 text-angola-primary" />
                          <span>{booking.booking_time}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Avaliar Serviço
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Você não tem reservas anteriores</h3>
                <p className="text-gray-600">Suas reservas concluídas aparecerão aqui</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map(i => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : cancelledBookings.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cancelledBookings.map(booking => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="relative h-40">
                      <img 
                        src={booking.service.image_url || "https://via.placeholder.com/400x200?text=Serviço"} 
                        alt={booking.service.title}
                        className="h-full w-full object-cover opacity-70"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-1">{booking.service.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {booking.provider.first_name || ''} {booking.provider.last_name || ''}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="mr-2 text-angola-primary" />
                          <span>{format(new Date(booking.booking_date), "dd/MM/yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="mr-2 text-angola-primary" />
                          <span>{booking.booking_time}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={`/service/${booking.service_id}`}>Reservar Novamente</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">Você não tem reservas canceladas</h3>
                <p className="text-gray-600">Suas reservas canceladas aparecerão aqui</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
