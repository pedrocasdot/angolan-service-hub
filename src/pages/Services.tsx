
import { useState } from "react";
import Layout from "@/components/Layout";
import ServiceCard from "@/components/ServiceCard";
import { featuredServices, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter services based on category and search query
  const filteredServices = featuredServices.filter((service) => {
    const matchesCategory = selectedCategory === "all" || service.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="bg-angola-dark text-white py-12">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Explorar Serviços em Angola</h1>
          <p className="max-w-2xl mx-auto">
            Encontre e reserve os serviços que você precisa de prestadores locais confiáveis
          </p>
        </div>
      </div>
      
      <div className="container px-4 mx-auto py-8">
        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-1">Pesquisar</label>
              <Input
                type="text"
                placeholder="Pesquisar serviços ou prestadores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoria</label>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as Categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ordenar Por</label>
              <Select defaultValue="recommended">
                <SelectTrigger>
                  <SelectValue placeholder="Recomendados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recomendados</SelectItem>
                  <SelectItem value="price-low">Preço (Menor para Maior)</SelectItem>
                  <SelectItem value="price-high">Preço (Maior para Menor)</SelectItem>
                  <SelectItem value="rating">Melhor Avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
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
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Nenhum serviço encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar seus filtros ou termo de pesquisa</p>
            <Button 
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Redefinir Filtros
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Services;
