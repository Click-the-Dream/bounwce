import { FiShoppingCart } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { AiOutlineBarChart } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";

export const UNIVERSITIES = [
  {
    label: "Olabisi Onabanjo University",
    value: "Olabisi Onabanjo University",
  },
  { label: "University of Ibadan", value: "University of Ibadan" },
  { label: "Obafemi Awolowo University", value: "Obafemi Awolowo University" },
  { label: "University of Lagos", value: "University of Lagos" },
  {
    label: "University of Nigeria, Nsukka",
    value: "University of Nigeria, Nsukka",
  },
  { label: "Ahmadu Bello University", value: "Ahmadu Bello University" },
  { label: "Covenant University", value: "Covenant University" },
  { label: "Lagos State University", value: "Lagos State University" },
  { label: "University of Benin", value: "University of Benin" },
  {
    label: "Federal University of Technology, Akure",
    value: "Federal University of Technology, Akure",
  },
  { label: "University of Ilorin", value: "University of Ilorin" },
  { label: "University of Jos", value: "University of Jos" },
  {
    label: "University of Port Harcourt",
    value: "University of Port Harcourt",
  },
  { label: "Nnamdi Azikiwe University", value: "Nnamdi Azikiwe University" },
  {
    label: "Federal University of Technology, Owerri",
    value: "Federal University of Technology, Owerri",
  },
  { label: "Ekiti State University", value: "Ekiti State University" },
  { label: "Adekunle Ajasin University", value: "Adekunle Ajasin University" },
  { label: "Bowen University", value: "Bowen University" },
  { label: "Babcock University", value: "Babcock University" },
  { label: "Redeemer’s University", value: "Redeemer’s University" },
  {
    label: "Ladoke Akintola University of Technology",
    value: "Ladoke Akintola University of Technology",
  },
  { label: "University of Calabar", value: "University of Calabar" },
  { label: "Delta State University", value: "Delta State University" },
  { label: "Kwara State University", value: "Kwara State University" },
  {
    label: "Joseph Ayo Babalola University",
    value: "Joseph Ayo Babalola University",
  },
  { label: "Pan-Atlantic University", value: "Pan-Atlantic University" },
  { label: "Rivers State University", value: "Rivers State University" },
  {
    label: "Federal University, Oye-Ekiti",
    value: "Federal University, Oye-Ekiti",
  },
  { label: "Osun State University", value: "Osun State University" },
  { label: "Nile University of Nigeria", value: "Nile University of Nigeria" },
];

export const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports" },
  { value: "books", label: "Books" },
];

export const availabilityOptions = [
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "pre-order", label: "Pre-Order" },
];

export // dummy data to display the vendor data cards
const vendorData = [
  {
    label: "Total Revenue",
    amount: `₦ ${"20,000"}`,
    icon: TbCurrencyNaira,
    analysis: "12.5% from last month",
    trendStatus: "up",
  },
  {
    label: "Total Orders",
    amount: "89",
    icon: FiShoppingCart,
    analysis: "8.2% from last month",
    trendStatus: "up",
  },
  {
    label: "Total Customers",
    amount: "76",
    icon: GoPeople,
    analysis: "15.3% from last month",
    trendStatus: "up",
  },
  {
    label: "Total Revenue",
    amount: "5,000",
    icon: AiOutlineBarChart,
    analysis: "2.5 % from last month",
    trendStatus: "down",
  },
];
export const orders = [
  {
    id: "#ORD-002",
    status: "Processing",
    tag: "Needs Review", // pink tag like screenshot
    customer: "Jane Doe",
    item: "Blue Cotton Jean",
    date: "Oct 27, 2025 • 11:55AM",
    action: { primary: "Review Products" },

    placedDate: "October 27, 2025",
    customerInfo: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },

    items: [
      {
        id: 1,
        name: "Leather Blue Jean",
        qty: 2,
        price: "₦3,000",
        total: "₦6,000",
        image:
          "https://images.pexels.com/photos/3756341/pexels-photo-3756341.jpeg",
      },
      {
        id: 2,
        name: "Red Polo Shirt",
        qty: 2,
        price: "₦2,000",
        total: "₦4,000",
        image:
          "https://images.pexels.com/photos/532588/pexels-photo-532588.jpeg",
      },
    ],

    summary: {
      subtotal: "₦10,000",
      shipping: "(Free)",
      total: "₦10,000",
    },

    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
        completed: true,
      },
    ],
  },

  {
    id: "#ORD-002",
    status: "Processing",
    customer: "Jane Doe",
    item: "Blue Cotton Jean (3)",
    date: "Oct 27, 2025 • 11:55AM",
    action: { decline: true, primary: "Accept" },

    placedDate: "October 27, 2025",
    customerInfo: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },

    items: [
      {
        id: 1,
        name: "Leather Blue Jean",
        qty: 2,
        price: "₦3,000",
        total: "₦6,000",
        image:
          "https://images.pexels.com/photos/3756341/pexels-photo-3756341.jpeg",
      },
      {
        id: 2,
        name: "Red Polo Shirt",
        qty: 1,
        price: "₦2,000",
        total: "₦2,000",
        image:
          "https://images.pexels.com/photos/532588/pexels-photo-532588.jpeg",
      },
    ],

    summary: {
      subtotal: "₦8,000",
      shipping: "(Free)",
      total: "₦8,000",
    },

    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
        completed: true,
      },
    ],
  },

  {
    id: "#ORD-002",
    status: "Shipped",
    customer: "Jane Doe",
    item: "Blue Cotton Jean (3)",
    date: "Oct 27, 2025 • 11:55AM",
    waiting: "Waiting for buyer’s confirmation",

    placedDate: "October 27, 2025",
    customerInfo: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },

    items: [
      {
        id: 1,
        name: "Blue Cotton Jean",
        qty: 3,
        price: "₦5,000",
        total: "₦15,000",
        image:
          "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
    ],

    summary: {
      subtotal: "₦15,000",
      shipping: "(Free)",
      total: "₦15,000",
    },

    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
        completed: true,
      },
      {
        id: 2,
        label: "Order Shipped",
        date: "Oct 28, 2025 • 09:20AM",
        completed: true,
      },
    ],
  },

  {
    id: "#ORD-002",
    status: "Completed",
    customer: "Jane Doe",
    item: "Blue Cotton Jean",
    date: "Oct 27, 2025 • 11:55AM",
    confirmed: true,

    placedDate: "October 27, 2025",
    customerInfo: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },

    items: [
      {
        id: 1,
        name: "Blue Cotton Jean",
        qty: 1,
        price: "₦5,000",
        total: "₦5,000",
        image:
          "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
    ],

    summary: {
      subtotal: "₦5,000",
      shipping: "(Free)",
      total: "₦5,000",
    },

    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
        completed: true,
      },
      {
        id: 2,
        label: "Order Shipped",
        date: "Oct 28, 2025 • 09:20AM",
        completed: true,
      },
      {
        id: 3,
        label: "Delivered & Completed",
        date: "Oct 30, 2025 • 02:15PM",
        completed: true,
      },
    ],
  },
  {
    id: "#ORD-002",
    status: "Ready for Shipment",
    customer: "Jane Doe",
    item: "Blue Cotton Jean (3)",
    date: "Oct 27, 2025 • 11:55AM",
    action: { primary: "Mark as Shipped" },

    placedDate: "October 27, 2025",
    customerInfo: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },

    items: [
      {
        id: 1,
        name: "Blue Cotton Jean",
        qty: 3,
        price: "₦5,000",
        total: "₦15,000",
        image:
          "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
    ],

    summary: {
      subtotal: "₦15,000",
      shipping: "(Free)",
      total: "₦15,000",
    },

    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
        completed: true,
      },
      {
        id: 2,
        label: "Packed & Ready for Shipment",
        date: "Oct 28, 2025 • 01:10PM",
        completed: true,
      },
    ],
  },
  {
    id: "#ORD-002",
    status: "Processing",
    customer: "Jane Doe",
    item: "Blue Cotton Jean",
    date: "Oct 27, 2025 • 11:55AM",
    action: { decline: true, primary: "Accept" },

    placedDate: "October 27, 2025",
    customerInfo: {
      name: "Jane Doe",
      phone: "08152161484",
      address: "Pepsi",
    },

    items: [
      {
        id: 1,
        name: "Blue Cotton Jean",
        qty: 1,
        price: "₦5,000",
        total: "₦5,000",
        image:
          "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
    ],

    summary: {
      subtotal: "₦5,000",
      shipping: "(Free)",
      total: "₦5,000",
    },

    timeline: [
      {
        id: 1,
        label: "Order Placed - Payment Verified",
        date: "Oct 27, 2025 • 11:55AM",
        completed: true,
      },
    ],
  },
];

export const cartItems = [
  {
    name: "Campus Books",
    items: [
      {
        id: 1,
        name: "Fictional Novel",
        price: 8500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
      },
    ],
  },
  {
    name: "Fashion Hub",
    items: [
      {
        id: 2,
        name: "Leather Backpack",
        price: 12500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593032465171-8f55c8a1c3c3",
      },
    ],
  },
  {
    name: "Tech Gadgets",
    items: [
      {
        id: 3,
        name: "Premium Wireless Earbuds",
        price: 15000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1606220838315-056192d5e927",
      },
    ],
  },
  {
    name: "Eco Store",
    items: [
      {
        id: 4,
        name: "Stainless Steel Water Bottle",
        price: 3500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      },
    ],
  },
];

export const products = [
  {
    id: 1,
    name: "Blue Cotton Shirt",
    category: "Clothing",
    price: 12500,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 2,
    name: "Leather Handbag",
    category: "Accessories",
    price: 28500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
  },
  {
    id: 3,
    name: "Running Sneakers",
    category: "Footwear",
    price: 32000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 45000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  },
  {
    id: 5,
    name: "Slim Fit Jeans",
    category: "Clothing",
    price: 18000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37",
  },
  {
    id: 6,
    name: "Sports Watch",
    category: "Accessories",
    price: 22000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 7,
    name: "Headphones",
    category: "Accessories",
    price: 15000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 8,
    name: "Smartphone",
    category: "Electronics",
    price: 85000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 9,
    name: "Formal Leather Shoes",
    category: "Footwear",
    price: 40000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1573253803478-d7146d61d09e?auto=format&fit=crop&w=500&q=80", // formal leather shoe
  },
  {
    id: 10,
    name: "Cotton Polo Shirt",
    category: "Clothing",
    price: 9500,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1593032465171-4b5062bc6bbd?auto=format&fit=crop&w=500&q=80", // polo‑style shirt
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 30000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 12,
    name: "Running Shorts",
    category: "Clothing",
    price: 7000,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1594737625785-d6f0d7beef26?auto=format&fit=crop&w=500&q=80", // running shorts style
  },
];
