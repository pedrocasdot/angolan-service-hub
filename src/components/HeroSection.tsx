
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-angola-dark">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container relative z-10 px-4 py-20 mx-auto md:py-32">
        <div className="max-w-lg md:max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Find the best services in Angola
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">
            From haircuts to house cleaning, connect with skilled local professionals for all your needs.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link to="/services">
              <Button size="lg" className="w-full sm:w-auto">Explore Services</Button>
            </Link>
            <Link to="/become-provider">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent text-white hover:bg-angola-primary hover:text-white border-white hover:border-angola-primary"
              >
                Become a Provider
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
