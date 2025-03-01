export interface FormData {
  name: string;
  phone: string;
  city: string;
  email?: string;
  lead_type: string;
  product_type: 'lights';
  light_types?: string[];
  comments?: string;
}

export interface LeadFormProps {
  slugs: string[];
  onSubmit: (data: FormData) => void;
}

export interface FormStep {
  id: string;
  title: string;
}