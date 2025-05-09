import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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
import { Loader2, PencilIcon, Trash2Icon, PlusCircle } from "lucide-react";

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

interface Category {
  id: string;
  title: string;
}

export default function MyServices() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
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
  
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth?redirect=/my-services");
      return;
    }
    
    async function fetchData() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, title');
          
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
        
        // Fetch user services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('provider_id', user.id);
          
        if (servicesError) throw servicesError;
        setServices(servicesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os serviços",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [user, authLoading, navigate]);
  
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
    if (!user) return;
    
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
        provider_id: user.id,
        location,
        duration: Number(duration),
        updated_at: new Date().toISOString()
      };
      
      if (isEditing && currentService) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', currentService.id)
          .eq('provider_id', user.id);
          
        if (error) throw error;
        
        // Update local state
        setServices(services.map(s => 
          s.id === currentService.id ? { ...s, ...serviceData } : s
        ));
        
        toast({
          title: "Serviço atualizado",
          description: "Seu serviço foi atualizado com sucesso",
        });
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert(serviceData)
          .select();
          
        if (error) throw error;
        
        // Update local state
        setServices([...services, data[0]]);
        
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
    if (!user) return;
    
    if (!confirm("Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
        .eq('provider_id', user.id);
        
      if (error) throw error;
      
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

  if (authLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

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
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? "Atualizar" : "Criar"} Serviço
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : services.length > 0 ? (
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
              {/* Dialog content is already defined above */}
            </Dialog>
          </div>
        )}
      </div>
    </Layout>
  );
}
