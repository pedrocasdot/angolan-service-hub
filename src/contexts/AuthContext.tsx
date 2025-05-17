
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
}

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  role: 'client' | 'provider' | 'admin' | null;
}

interface ProviderDetails {
  id: string;
  business_name: string;
  bio: string | null;
  expertise: string | null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  providerDetails: ProviderDetails | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isProvider: () => boolean;
  isAdmin: () => boolean;
  isClient: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  providerDetails: null,
  loading: true,
  signOut: async () => {},
  isProvider: () => false,
  isAdmin: () => false,
  isClient: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [providerDetails, setProviderDetails] = useState<ProviderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const isProvider = () => profile?.role === 'provider';
  const isAdmin = () => profile?.role === 'admin';
  const isClient = () => profile?.role === 'client';

  const fetchProviderDetails = async (userId: string) => {
    if (!isProvider()) return null;
    
    try {
      const { data } = await supabase
        .from('provider_details')
        .select('*')
        .eq('id', userId)
        .single();

      setProviderDetails(data);
    } catch (error) {
      console.error("Error fetching provider details:", error);
    }
  };

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          
          if (currentSession.user) {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();
            
            setProfile(data);
            
            // Defer provider details fetching to prevent potential deadlocks
            if (data?.role === 'provider') {
              setTimeout(() => {
                fetchProviderDetails(currentSession.user.id);
              }, 0);
            }
          } else {
            setProfile(null);
            setProviderDetails(null);
          }
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
          setProviderDetails(null);
        }
        
        setLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setUser(session.user ?? null);
        
        if (session.user) {
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data }) => {
              setProfile(data);
              
              // Fetch provider details if needed
              if (data?.role === 'provider') {
                fetchProviderDetails(session.user.id);
              }
              
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      profile, 
      providerDetails,
      loading, 
      signOut, 
      isProvider, 
      isAdmin, 
      isClient 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
