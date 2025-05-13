
// Mock data imports
import { mockUsers, mockProfiles, mockServices, mockBookings } from "@/data/mockData";

interface SupabaseClientMock {
  auth: {
    getSession: () => Promise<{ data: { session: null | { user: any } } }>;
    onAuthStateChange: (callback: (event: string, session: any) => void) => { 
      data: { subscription: { unsubscribe: () => void } } 
    };
    signUp: (data: any) => Promise<{ data: any; error: null | any }>;
    signInWithPassword: (data: any) => Promise<{ data: any; error: null | any }>;
    signOut: () => Promise<{ error: null | any }>;
  };
  from: (table: string) => {
    select: (columns?: string) => {
      eq: (column: string, value: any) => {
        single: () => Promise<{ data: any; error: null | any }>;
        order: (column: string, options?: { ascending: boolean }) => {
          eq?: (column: string, value: any) => Promise<{ data: any; error: null | any }>;
          limit?: (number: number) => Promise<{ data: any; error: null | any }>;
        } & Promise<{ data: any; error: null | any }>;
      };
      order: (column: string, options?: { ascending: boolean }) => {
        eq?: (column: string, value: any) => Promise<{ data: any; error: null | any }>;
        limit?: (number: number) => Promise<{ data: any; error: null | any }>;
      } & Promise<{ data: any; error: null | any }>;
      limit: (number: number) => Promise<{ data: any; error: null | any }>;
    };
    insert: (data: any) => Promise<{ data: any; error: null | any }>;
    update: (data: any) => {
      eq: (column: string, value: any) => Promise<{ data: any; error: null | any }>;
    };
  };
}

// Mock session data
const mockSession = {
  user: {
    id: 'mock-user-id',
    email: 'user@example.com',
  }
};

// Create a mock client that returns predefined mock data
export const supabase: SupabaseClientMock = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: mockSession } }),
    onAuthStateChange: (callback) => {
      // Simulate an immediate auth state change with the mock session
      setTimeout(() => {
        callback('SIGNED_IN', mockSession);
      }, 0);
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    signUp: (data) => {
      return Promise.resolve({ 
        data: { user: { ...mockSession.user, ...data.options?.data } }, 
        error: null 
      });
    },
    signInWithPassword: (data) => {
      return Promise.resolve({ 
        data: { user: mockSession.user, session: mockSession }, 
        error: null 
      });
    },
    signOut: () => Promise.resolve({ error: null })
  },
  from: (table) => {
    // Return different mock data based on the table being queried
    const getMockData = () => {
      switch (table) {
        case 'profiles':
          return mockProfiles;
        case 'services':
          return mockServices;
        case 'bookings':
          return mockBookings;
        default:
          return [];
      }
    };

    return {
      select: (columns = '*') => {
        const queryBuilder = {
          eq: (column, value) => {
            const filteredData = getMockData().filter(item => item[column] === value);
            
            const singleMethod = () => Promise.resolve({ 
              data: filteredData.length > 0 ? filteredData[0] : null, 
              error: null 
            });

            const orderMethod = (orderColumn, options = { ascending: true }) => {
              const orderPromise = Promise.resolve({ 
                data: filteredData, 
                error: null 
              });
              
              // Add chaining methods to the promise
              (orderPromise as any).eq = (innerColumn: string, innerValue: any) => {
                const innerFilteredData = filteredData.filter(item => item[innerColumn] === innerValue);
                return Promise.resolve({ data: innerFilteredData, error: null });
              };
              
              (orderPromise as any).limit = (limit: number) => {
                return Promise.resolve({ data: filteredData.slice(0, limit), error: null });
              };
              
              return orderPromise as any;
            };

            return {
              single: singleMethod,
              order: orderMethod
            };
          },
          order: (column, options = { ascending: true }) => {
            const orderPromise = Promise.resolve({ 
              data: getMockData(), 
              error: null 
            });
            
            // Add chaining methods to the promise
            (orderPromise as any).eq = (innerColumn: string, innerValue: any) => {
              const innerFilteredData = getMockData().filter(item => item[innerColumn] === innerValue);
              return Promise.resolve({ data: innerFilteredData, error: null });
            };
            
            (orderPromise as any).limit = (limit: number) => {
              return Promise.resolve({ data: getMockData().slice(0, limit), error: null });
            };
            
            return orderPromise as any;
          },
          limit: (number) => Promise.resolve({ 
            data: getMockData().slice(0, number), 
            error: null 
          })
        };
        
        return queryBuilder;
      },
      insert: (data) => {
        return Promise.resolve({ 
          data, 
          error: null 
        });
      },
      update: (data) => {
        return {
          eq: (column, value) => Promise.resolve({ 
            data, 
            error: null 
          })
        };
      }
    };
  }
};
