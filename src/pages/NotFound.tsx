
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container px-4 py-24 mx-auto text-center">
        <h1 className="mb-4 text-6xl font-bold text-angola-primary">404</h1>
        <h2 className="mb-8 text-3xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-lg text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">Return to Home</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
