
import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BecomeProvider = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  // Form states
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [address, setAddress] = useState(profile?.address || "");
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");

  // Redirect to auth if not logged in
  if (!user) {
    return (
      <Layout>
        <div className="container max-w-4xl py-12">
          <Card>
            <CardHeader>
              <CardTitle>Torne-se um Prestador</CardTitle>
              <CardDescription>
                Por favor, faça login ou registre-se para continuar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/auth")}>Ir para Login</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, we would update the profile and create a provider record
      // For now, we'll simulate success with the mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API request

      if (step === 1) {
        setStep(2);
        setIsSubmitting(false);
        return;
      }

      // Final submission - update profile with business info
      await supabase
        .from("profiles")
        .update({
          phone,
          address,
        })
        .eq("id", user.id);
      
      toast({
        title: "Registro concluído!",
        description: "Seu perfil de prestador foi criado com sucesso.",
      });
      
      navigate("/my-services");
    } catch (error) {
      toast({
        title: "Erro ao registrar",
        description: "Ocorreu um erro ao processar seu registro. Por favor tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-12">
        <Card>
          <CardHeader>
            <CardTitle>Torne-se um Prestador de Serviços</CardTitle>
            <CardDescription>
              Preencha os detalhes abaixo para começar a oferecer seus serviços na plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-angola-primary text-white' : 'bg-gray-200'}`}>
                    {step > 1 ? <Check size={20} /> : 1}
                  </div>
                  <div className={`w-16 h-1 ${step >= 2 ? 'bg-angola-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-angola-primary text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nome do Negócio</Label>
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Nome do seu negócio ou serviço"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+244 923 456 789"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Seu endereço comercial"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Próximo"
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre Você</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Conte um pouco sobre você e sua experiência"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expertise">Áreas de Especialização</Label>
                    <Textarea
                      id="expertise"
                      value={expertise}
                      onChange={(e) => setExpertise(e.target.value)}
                      placeholder="Liste suas áreas de especialização"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(1)} 
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Voltar
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Concluir Registro"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BecomeProvider;
