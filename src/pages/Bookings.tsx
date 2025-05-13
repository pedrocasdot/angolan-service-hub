
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

interface Booking {
  id: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  service: {
    title: string;
    price: number;
    provider_id: string;
  };
  provider: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Status options
  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    const getBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })
          .eq("user_id", user.id);

        if (error) throw error;

        // In a real app, you'd fetch the related service and provider data
        // or use join statements in Supabase. For this mock, we'll assume
        // the data already contains the necessary information
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, [user]);

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId);

      if (error) throw error;

      // Update local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" as const }
            : booking
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-6 text-3xl font-bold">Minhas Reservas</h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p>Carregando reservas...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="mb-4 text-gray-600">Você ainda não tem reservas.</p>
              <Link to="/services">
                <Button>Explorar Serviços</Button>
              </Link>
            </div>
          ) : (
            <>
              <TabsContent value="all">
                {renderBookingsList(bookings)}
              </TabsContent>
              <TabsContent value="confirmed">
                {renderBookingsList(
                  bookings.filter((booking) => booking.status === "confirmed")
                )}
              </TabsContent>
              <TabsContent value="pending">
                {renderBookingsList(
                  bookings.filter((booking) => booking.status === "pending")
                )}
              </TabsContent>
              <TabsContent value="cancelled">
                {renderBookingsList(
                  bookings.filter((booking) => booking.status === "cancelled")
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );

  function renderBookingsList(filteredBookings: Booking[]) {
    return filteredBookings.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-600">Nenhuma reserva encontrada.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{booking.service.title}</CardTitle>
                <Badge
                  variant="outline"
                  className={statusColors[booking.status]}
                >
                  {booking.status === "confirmed"
                    ? "Confirmado"
                    : booking.status === "pending"
                    ? "Pendente"
                    : "Cancelado"}
                </Badge>
              </div>
              <CardDescription>
                {booking.provider.first_name} {booking.provider.last_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Luanda, Angola</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p className="font-semibold">
                {booking.service.price
                  ? `${booking.service.price.toLocaleString("pt-AO")} AOA`
                  : "Preço sob consulta"}
              </p>
              {booking.status !== "cancelled" && (
                <Button
                  onClick={() => cancelBooking(booking.id)}
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Cancelar
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
}
