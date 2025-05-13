
// This file maintains the API structure but doesn't actually connect to Supabase
// It's kept to avoid breaking imports in the codebase

interface SupabaseClientMock {
  auth: {
    getSession: () => Promise<{ data: { session: null } }>;
  };
}

// Create a mock client that just returns empty data
export const supabase: SupabaseClientMock = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } })
  }
};
