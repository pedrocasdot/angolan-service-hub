
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
            <h2 className="mb-4 text-3xl font-bold">Popular Service Categories</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Browse our most popular service categories and find the help you need
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
              <Button variant="outline">View All Categories</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Featured Services in Angola</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover top-rated services from trusted providers across Angola
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
              <Button>Explore All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">How ServiAngola Works</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Find and book services in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded-full bg-angola-primary text-white">1</div>
              <h3 className="mb-3 text-xl font-semibold">Choose a Service</h3>
              <p className="text-gray-600">Browse through various service categories and select the one you need.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded-full bg-angola-primary text-white">2</div>
              <h3 className="mb-3 text-xl font-semibold">Select a Provider</h3>
              <p className="text-gray-600">Compare providers based on ratings, reviews, and pricing.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-2xl font-bold rounded-full bg-angola-primary text-white">3</div>
              <h3 className="mb-3 text-xl font-semibold">Book & Enjoy</h3>
              <p className="text-gray-600">Schedule a time and enjoy quality service from trusted professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-angola-dark text-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">What Our Customers Say</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              Read testimonials from satisfied customers across Angola
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
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have found reliable service providers in Angola
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link to="/services">
              <Button size="lg" variant="secondary" className="bg-angola-secondary text-angola-dark hover:bg-angola-secondary/90">
                Find a Service
              </Button>
            </Link>
            <Link to="/become-provider">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-angola-primary">
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
