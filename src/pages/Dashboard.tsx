
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import ClientDashboard from "./dashboards/ClientDashboard";
import ProviderDashboard from "./dashboards/ProviderDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import Layout from "@/components/Layout";

const Dashboard = () => {
  const { user, profile, loading, isClient, isProvider, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth?redirect=/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-angola-primary" />
        </div>
      </Layout>
    );
  }

  if (!user || !profile) {
    return null; // Redirect happens in useEffect
  }

  return (
    <>
      {isAdmin() && <AdminDashboard />}
      {isProvider() && <ProviderDashboard />}
      {isClient() && <ClientDashboard />}
    </>
  );
};

export default Dashboard;
