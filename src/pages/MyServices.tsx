
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PencilIcon, Trash2Icon, PlusCircle } from "lucide-react";
import { categories } from "@/data/mockData";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  category_id: string;
  location: string;
  duration: number;
  image_url: string | null;
}

// Mock user services
const mockUserServices: Service[] = [
  {
    id: "user-service-1",
    title: "Corte de Cabelo Moderno",
    description: "Corte moderno para homens com técnicas atuais e produtos de qualidade.",
    price: 4500,
    category_id: "haircuts",
    location: "Luanda, Angola",
    duration: 1,
    image_url: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "user-service-2",
    title: "Limpeza Residencial Completa",
    description: "Serviço completo de limpeza para residências de até 3 quartos, incluindo produtos.",
    price: 9000,
    category_id: "cleaning",
    location: "Luanda, Angola",
    duration: 4,
    image_url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
  }
];

export default function MyServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>(mockUserServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setLocation("Luanda, Angola");
    setDuration("2");
    setCurrentService(null);
    setIsEditing(false);
  };
  
  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    setTitle(service.title);
    setDescription(service.description);
    setPrice(String(service.price));
    setCategoryId(service.category_id);
    setLocation(service.location || "Luanda, Angola");
    setDuration(String(service.duration || 2));
    setIsEditing(true);
    setIsDialogOpen(true);
  };
  
  const handleSubmit = async () => {
    if (!title || !description || !price || !categoryId) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setSubmitting(true);
      const serviceData = {
        title,
        description,
        price: Number(price),
        category_id: categoryId,
        location,
        duration: Number(duration),
        updated_at: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isEditing && currentService) {
        // Update existing service
        setServices(services.map(s => 
          s.id === currentService.id ? { ...s, ...serviceData } : s
        ));
        
        toast({
          title: "Serviço atualizado",
          description: "Seu serviço foi atualizado com sucesso",
        });
      } else {
        // Create new service with mock ID
        const newService = {
          ...serviceData,
          id: `user-service-${Date.now()}`,
          provider_id: "user-123", // Mock user ID
          image_url: null,
          created_at: new Date().toISOString()
        } as Service;
        
        // Update local state
        setServices([...services, newService]);
        
        toast({
          title: "Serviço criado",
          description: "Seu serviço foi criado com sucesso",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o serviço",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  const deleteService = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.")) {
      return;
    }
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setServices(services.filter(s => s.id !== id));
      
      toast({
        title: "Serviço excluído",
        description: "Seu serviço foi excluído com sucesso",
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o serviço",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meus Serviços</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Atualize as informações do seu serviço" 
                    : "Preencha os detalhes do novo serviço que você deseja oferecer"}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Serviço*</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Corte de Cabelo Profissional"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria*</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição*</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva seu serviço em detalhes"
                    className="h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (Kz)*</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="5000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (horas)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="2"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    placeholder="Luanda, Angola"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}>
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} disabled={submitting}>
                  {submitting && <span className="mr-2">⏳</span>}
                  {isEditing ? "Atualizar" : "Criar"} Serviço
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id}>
                <div className="aspect-video w-full relative">
                  <img 
                    src={service.image_url || "https://via.placeholder.com/800x450?text=Imagem+do+serviço"} 
                    alt={service.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2">
                    {categories.find(c => c.id === service.category_id)?.title || service.category_id}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <p className="font-bold text-lg">
                    {service.price.toLocaleString('pt-AO')} Kz
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => openEditDialog(service)}
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2Icon className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-medium mb-2">Você ainda não oferece serviços</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Comece a oferecer seus serviços para que os clientes possam encontrá-los e fazer reservas
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Criar Meu Primeiro Serviço
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        )}
      </div>
    </Layout>
  );
}
