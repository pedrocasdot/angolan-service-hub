

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container px-4 py-24 mx-auto text-center">
        <h1 className="mb-4 text-6xl font-bold text-angola-primary">404</h1>
        <h2 className="mb-8 text-3xl font-semibold">Página Não Encontrada</h2>
        <p className="mb-8 text-lg text-gray-600">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/">
          <Button size="lg">Voltar para a Página Inicial</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;

