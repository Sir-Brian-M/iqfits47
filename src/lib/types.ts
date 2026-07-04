export type Category = "sneakers" | "apparel" | "accessories";

export interface ProductVariant {
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  images: string[];
  colorway: string;
  sizes: ProductVariant[];
  tags: string[];
  isNewDrop?: boolean;
  dropNumber?: string; // e.g. "DROP 014" — ties into the ticket motif
  rating: number;
  reviewCount: number;
  fitRating?: "True to size" | "Runs small" | "Runs large";
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

export type OrderStatus =
  | "payment_pending"
  | "paid"
  | "processing"
  | "dispatched"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderTimelineEntry {
  status: OrderStatus;
  label: string;
  timestamp: string;
  note?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email?: string;
  county: string;
  town: string;
  addressLine: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  delivery: DeliveryDetails;
  status: OrderStatus;
  timeline: OrderTimelineEntry[];
  paymentMethod: "mpesa";
  mpesaReceipt?: string;
  transactionReference?: string;
  createdAt: string;
  updatedAt: string;
}
