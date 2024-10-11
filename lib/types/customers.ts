export type Customer = {
  customer_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  contact: Contact;
  image_url: string;
  order_history: string[];
};

export type Contact = {
  phone_primary: string;
  phone_secondary?: string;
  email_primary?: string;
  email_secondary?: string;
};
