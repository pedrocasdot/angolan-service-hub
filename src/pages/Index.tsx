
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ServiceCard from "@/components/ServiceCard";
import { categories, featuredServices, testimonials } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <Layout>
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Categorias Populares de Serviços</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore nossas categorias de serviços mais populares e encontre a ajuda que você precisa
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                icon={category.icon}
                description={category.description}
                href={category.href}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <Button variant="outline">Ver Todas as Categorias</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Serviços em Destaque em Angola</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Descubra serviços de alta qualidade de prestadores confiáveis em toda Angola
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredServices.slice(0, 8).map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                provider={service.provider}
                image={service.image}
                price={service.price}
                rating={service.rating}
                reviewCount={service.reviewCount}
                category={service.category}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <Button>Explorar Todos os Serviços</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Como o ServiAngola Funciona</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Encontre e reserve serviços em apenas alguns passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded-full bg-angola-primary text-white">1</div>
              <h3 className="mb-3 text-xl font-semibold">Escolha um Serviço</h3>
              <p className="text-gray-600">Navegue pelas diversas categorias de serviços e selecione o que você precisa.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded-full bg-angola-primary text-white">2</div>
              <h3 className="mb-3 text-xl font-semibold">Selecione um Prestador</h3>
              <p className="text-gray-600">Compare prestadores com base em avaliações, comentários e preços.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded-full bg-angola-primary text-white">3</div>
              <h3 className="mb-3 text-xl font-semibold">Reserve e Aproveite</h3>
              <p className="text-gray-600">Agende um horário e desfrute de um serviço de qualidade de profissionais confiáveis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-angola-dark text-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">O que Nossos Clientes Dizem</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Leia depoimentos de clientes satisfeitos em toda Angola
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-angola-dark border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < testimonial.rating ? "fill-angola-secondary text-angola-secondary" : "text-gray-600"} 
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic text-gray-300">"{testimonial.content}"</p>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.location} • {testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-angola-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Pronto para Começar?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Junte-se a milhares de clientes satisfeitos que encontraram prestadores de serviços confiáveis em Angola
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link to="/services">
              <Button size="lg" variant="secondary" className="bg-angola-secondary text-angola-dark hover:bg-angola-secondary/90">
                Encontrar um Serviço
              </Button>
            </Link>
            <Link to="/become-provider">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-angola-primary">
                Tornar-se Prestador
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
