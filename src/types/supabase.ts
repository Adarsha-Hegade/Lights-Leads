export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          city: string;
          email: string | null;
          url_slugs: string[] | null;
          created_at: string;
          lead_type: string | null;
          device_info: Record<string, any> | null;
          location_info: Record<string, any> | null;
          comments: string | null;
          product_type: 'fans' | 'lights' | null;
          light_types: string[] | null;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          city: string;
          email?: string | null;
          url_slugs?: string[] | null;
          created_at?: string;
          lead_type?: string | null;
          device_info?: Record<string, any> | null;
          location_info?: Record<string, any> | null;
          comments?: string | null;
          product_type?: 'fans' | 'lights' | null;
          light_types?: string[] | null;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          city?: string;
          email?: string | null;
          url_slugs?: string[] | null;
          created_at?: string;
          lead_type?: string | null;
          device_info?: Record<string, any> | null;
          location_info?: Record<string, any> | null;
          comments?: string | null;
          product_type?: 'fans' | 'lights' | null;
          light_types?: string[] | null;
        };
      };
    };
  };
}