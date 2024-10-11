import { Customer } from "@/lib/types/customers";

const customers: Customer[] = [
  {
    customer_id: "C-2024-001",
    first_name: "Luv",
    last_name: "Raghuavnshi",
    contact: {
      phone_primary: "+91 9876543219",
      email_primary: "luvraghuvanshi@gmail.com",
      email_secondary: "luvr03@gmail.com",
    },
    image_url: "/images/avatars/3.jpg",
    order_history: [
      "a7e578bcc55678",
      "789bffe578fca",
      "8abf99321efa",
      "6ef178cfad3",
    ],
  },
  {
    customer_id: "C-2024-002",
    first_name: "Meera",
    last_name: "Haria",
    contact: {
      phone_primary: "+91 1234567891",
      phone_secondary: "+91 9804238879",
    },
    image_url: "/images/avatars/1.jpg",
    order_history: [],
  },

  {
    customer_id: "C-2024-003",
    first_name: "Dishi",
    last_name: "Bagrecha",
    contact: {
      phone_primary: "+91 9876543219",
      email_primary: "dishibagrecha20@gmail.com",
    },
    image_url: "/images/avatars/2.jpg",
    order_history: ["a7e56fbsc55678", "7b65se5578fca"],
  },
];

export default customers;
