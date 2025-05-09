
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { featuredServices } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Calendar as CalendarIcon, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const found = featuredServices.find(s => s.id === id);
      setService(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="animate-pulse flex flex-col w-full max-w-4xl">
            <div className="h-64 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-10 bg-gray-300 rounded-lg mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded-lg mb-8 w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-64 bg-gray-300 rounded-lg col-span-2"></div>
              <div className="h-64 bg-gray-300 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/services">Browse All Services</a>
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
                src={service.image} 
                alt={service.title} 
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.floor(service.rating) ? "fill-angola-secondary text-angola-secondary" : "text-gray-300"} 
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{service.rating.toFixed(1)}</span>
                <span className="ml-1 text-sm text-gray-500">({service.reviewCount} reviews)</span>
              </div>
              <Separator orientation="vertical" className="mx-4 h-4" />
              <div className="flex items-center">
                <MapPin size={16} className="mr-1 text-angola-primary" />
                <span className="text-sm">Luanda, Angola</span>
              </div>
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4">
                <h2 className="text-xl font-semibold mb-4">About this service</h2>
                <p className="mb-4 text-gray-600">
                  {service.category === "Haircuts" ? 
                    "Our professional stylists provide premium haircuts tailored to your unique style. This service includes consultation, washing, cutting, styling, and finishing touches for a complete look. We use only high-quality products and follow the latest trends and techniques." : 
                    "This premium service is provided by experienced professionals using high-quality equipment and supplies. We ensure customer satisfaction with every booking and provide excellent value for your money. The service includes all necessary preparations and finishing touches."}
                </p>
                <p className="mb-4 text-gray-600">
                  {service.category === "Cleaning" ? 
                    "Our professional cleaning team handles everything from floor cleaning and dusting to bathroom and kitchen sanitization. We use eco-friendly cleaning products for a thorough, safe clean. Perfect for regular maintenance or one-time deep cleaning." : 
                    "Our services are designed to meet your specific needs with attention to detail and professional execution. We take pride in delivering consistent quality and reliable results every time."}
                </p>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">What's included:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Professional service", "Quality materials", "Satisfaction guaranteed", "Clean and safe process"].map((item, i) => (
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
                    <h3 className="font-semibold mb-3">Service Details</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clock size={16} className="mr-2 text-angola-primary" />
                        <span className="text-sm">Duration: {service.category === "Haircuts" ? "1 hour" : service.category === "Cleaning" ? "3 hours" : "2 hours"}</span>
                      </li>
                      <li className="flex items-center">
                        <MapPin size={16} className="mr-2 text-angola-primary" />
                        <span className="text-sm">Location: {service.category === "Haircuts" ? "At provider's location" : "At your location"}</span>
                      </li>
                      <li className="flex items-center">
                        <Calendar size={16} className="mr-2 text-angola-primary" />
                        <span className="text-sm">Availability: Monday - Saturday, 8AM - 6PM</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Provider Information</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User size={24} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{service.provider}</p>
                        <p className="text-sm text-gray-500">Member since 2022</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <MessageCircle size={16} className="mr-2" />
                      Contact Provider
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-4">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="mb-6 pb-6 border-b last:border-b-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <User size={16} className="text-gray-500" />
                        </div>
                        <span className="font-medium">Customer {i + 1}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star 
                            key={j} 
                            size={14} 
                            className={j < 5 - i ? "fill-angola-secondary text-angola-secondary" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {i === 0 
                        ? "Great service! Very professional and the results were amazing. Would definitely recommend and use again." 
                        : i === 1 
                        ? "Good value for the price. The provider was punctual and did a thorough job." 
                        : "Satisfied with the service. Communication was good and the provider was skilled."}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Posted {i === 0 ? "2 days ago" : i === 1 ? "1 week ago" : "3 weeks ago"}
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="mt-2">View All Reviews</Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking & Price */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white border rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">
                  {service.price.toLocaleString('pt-AO')} Kz
                </h3>
                <p className="text-sm text-gray-500">{service.category === "Haircuts" ? "Per session" : service.category === "Cleaning" ? "Per service" : "Base price"}</p>
              </div>

              <Separator className="my-4" />
              
              <div className="mb-6">
                <h4 className="font-medium mb-3">Select a date</h4>
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
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Select a time</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["9:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map((time) => (
                    <Button 
                      key={time} 
                      variant="outline" 
                      size="sm"
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <Button className="w-full mb-3">Book Now</Button>
              <Button variant="outline" className="w-full">Contact Provider</Button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">Secure payment via trusted providers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
