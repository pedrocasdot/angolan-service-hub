
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-angola-dark text-white">
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-angola-primary">Servi</span>
              <span className="text-angola-tertiary">Angola</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Connecting you with the best service providers in Angola.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-angola-secondary">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-angola-secondary">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-angola-secondary">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services/haircuts" className="hover:text-angola-secondary">Haircuts</Link></li>
              <li><Link to="/services/cleaning" className="hover:text-angola-secondary">House Cleaning</Link></li>
              <li><Link to="/services/plumbing" className="hover:text-angola-secondary">Plumbing</Link></li>
              <li><Link to="/services/electrical" className="hover:text-angola-secondary">Electrical</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-angola-secondary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-angola-secondary">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-angola-secondary">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-angola-secondary">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/terms" className="hover:text-angola-secondary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-angola-secondary">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-angola-secondary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} ServiAngola. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
