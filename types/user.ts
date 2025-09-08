export type User = {
  id: string; // Supabase UUID (same as Clerk user_id if synced)
  clerk_id: string; // Clerk User ID
  email: string;
  username: string;
  full_name?: string;
  image_url?: string;
  phone_number?: string;

  address?: string; // default shipping address
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;

  created_at: string;
};
