
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Calendar as CalendarIcon, MapPin, MessageCircle, CheckCircle, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { featuredServices, testimonials } from "@/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";
import { pt } from "date-fns/locale";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  provider_id?: string;
  category_id?: string;
  location?: string;
  duration?: number;
  provider_name?: string;
  category_name?: string;
  rating?: number;
  review_count?: number;
  image?: string;
  provider?: string;
  category?: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    user_name: "João Silva",
    rating: 5,
    comment: "Excelente serviço, muito profissional e pontual!",
    created_at: "2024-04-15T10:30:00Z"
  },
  {
    id: "2",
    user_name: "Maria Oliveira",
    rating: 4,
    comment: "Bom atendimento, recomendo.",
    created_at: "2024-04-10T14:45:00Z"
  },
  {
    id: "3",
    user_name: "Pedro Santos",
    rating: 5,
    comment: "O serviço foi perfeito, super rápido e eficiente.",
    created_at: "2024-04-05T09:20:00Z"
  }
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch service details from mock data
  useEffect(() => {
    const fetchService = async () => {
      try {
        // Simulate API loading
        setIsLoading(true);
        
        // Find service in mock data
        const foundService = featuredServices.find(s => s.id === id);
        
        if (foundService) {
          // Convert to the Service interface format
          const serviceData: Service = {
            id: foundService.id,
            title: foundService.title,
            description: "Este é um serviço profissional de alta qualidade oferecido por prestadores experientes. Nossos especialistas garantem resultados excepcionais e satisfação total do cliente. Usamos materiais e equipamentos de primeira linha para garantir o melhor resultado possível.",
            price: foundService.price,
            image_url: foundService.image,
            provider_name: foundService.provider,
            category_name: foundService.category,
            location: "Luanda, Angola",
            duration: 2,
            rating: foundService.rating,
            review_count: foundService.reviewCount
          };
          
          setService(serviceData);
          
          // Simulate fetching reviews
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } else {
          // Service not found
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do serviço:", error);
        setIsLoading(false);
      }
    };
    
    fetchService();
  }, [id]);

  const handleBookService = () => {
    try {
      if (!date || !selectedTime || !service) {
        toast({
          title: "Informação incompleta",
          description: "Por favor, selecione uma data e hora para a reserva",
        });
        return;
      }
      
      // Mock booking
      toast({
        title: "Reserva realizada com sucesso!",
        description: `Sua reserva para ${service.title} foi agendada para ${format(date, 'dd/MM/yyyy', { locale: pt })} às ${selectedTime}.`,
      });
      
      // Redirect to bookings page
      navigate("/bookings");
    } catch (error) {
      console.error("Erro ao fazer reserva:", error);
      toast({
        title: "Erro ao fazer reserva",
        description: "Ocorreu um erro ao processar sua reserva. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const contactProvider = () => {
    if (!service) return;
    
    toast({
      title: "Recurso em desenvolvimento",
      description: "O sistema de mensagens estará disponível em breve.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-pulse flex flex-col w-full max-w-4xl">
            <Skeleton className="h-64 mb-8" />
            <Skeleton className="h-10 mb-4 w-3/4" />
            <Skeleton className="h-6 mb-8 w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <Skeleton className="h-64" />
              </div>
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Serviço Não Encontrado</h1>
          <p className="mb-6">O serviço que você procura não existe ou foi removido.</p>
          <Button asChild>
            <a href="/services">Explorar Serviços</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="md:col-span-2">
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img 
                src={service?.image_url || "https://via.placeholder.com/800x400?text=Imagem+do+serviço"} 
                alt={service?.title} 
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold mb-2">{service?.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.floor(service?.rating || 0) ? "fill-angola-secondary text-angola-secondary" : "text-gray-300"} 
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{(service?.rating || 0).toFixed(1)}</span>
                <span className="ml-1 text-sm text-gray-500">({service?.review_count} avaliações)</span>
              </div>
              <Separator orientation="vertical" className="mx-4 h-4" />
              <div className="flex items-center">
                <MapPin size={16} className="mr-1 text-angola-primary" />
                <span className="text-sm">{service?.location || "Luanda, Angola"}</span>
              </div>
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Descrição</TabsTrigger>
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4">
                <h2 className="text-xl font-semibold mb-4">Sobre este serviço</h2>
                <p className="mb-4 text-gray-600">
                  {service?.description}
                </p>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">O que está incluído:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Serviço profissional", "Materiais de qualidade", "Satisfação garantida", "Processo limpo e seguro"].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle size={16} className="mr-2 text-angola-tertiary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="details" className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Detalhes do Serviço</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clock size={16} className="mr-2 text-angola-primary" />
                        <span className="text-sm">Duração: {service?.duration || 2} horas</span>
                      </li>
                      <li className="flex items-center">
                        <MapPin size={16} className="mr-2 text-angola-primary" />
                        <span className="text-sm">Localização: {service?.location || "Luanda, Angola"}</span>
                      </li>
                      <li className="flex items-center">
                        <CalendarIcon size={16} className="mr-2 text-angola-primary" />
                        <span className="text-sm">Disponibilidade: Segunda - Sábado, 8h - 18h</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Informações do Prestador</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User size={24} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{service?.provider_name}</p>
                        <p className="text-sm text-gray-500">Membro desde 2022</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center" onClick={contactProvider}>
                      <MessageCircle size={16} className="mr-2" />
                      Contatar Prestador
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-4">
                <h3 className="text-xl font-semibold mb-4">Avaliações de Clientes</h3>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="mb-6 pb-6 border-b last:border-b-0">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <User size={16} className="text-gray-500" />
                          </div>
                          <span className="font-medium">{review.user_name}</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j} 
                              size={14} 
                              className={j < review.rating ? "fill-angola-secondary text-angola-secondary" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {review.comment}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(review.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhuma avaliação disponível para este serviço ainda.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white border rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">
                  {service?.price.toLocaleString('pt-AO')} Kz
                </h3>
                <p className="text-sm text-gray-500">Por serviço</p>
              </div>

              <Separator className="my-4" />
              
              <div className="mb-6">
                <h4 className="font-medium mb-3">Selecione uma data</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: pt }) : "Escolha uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={pt}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Selecione um horário</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((time) => (
                    <Button 
                      key={time} 
                      variant={selectedTime === time ? "default" : "outline"} 
                      size="sm"
                      className="text-sm"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <Button className="w-full mb-3" onClick={handleBookService}>Reservar Agora</Button>
              <Button variant="outline" className="w-full" onClick={contactProvider}>Contatar Prestador</Button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">Pagamento seguro via provedores confiáveis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
