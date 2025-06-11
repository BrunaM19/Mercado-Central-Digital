
export interface User {
  id: string;
  name: string;
  phone: string;
  password: string;
  userType: 'buyer' | 'seller' | 'transporter';
  bairro?: string;
}

export interface Vendor {
  id: string;
  userId: string;
  bancaName: string;
  location: string;
  photo?: string;
  productTypes: string[];
  workingHours: string;
  rating: number;
  totalSales: number;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  photo?: string;
  quantity: number;
  available: boolean;
  category: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  vendor: Vendor;
}

export interface Order {
  id: string;
  buyerId: string;
  vendorId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  deliveryType: 'pickup' | 'delivery';
  transporterId?: string;
  paymentMethod: 'mpesa' | 'emola' | 'cash';
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
}

export interface Transporter {
  id: string;
  userId: string;
  transportType: 'foot' | 'bicycle' | 'motorcycle' | 'car';
  capacity: number;
  coverageAreas: string[];
  workingHours: string;
  rating: number;
  earnings: number;
}

export interface Delivery {
  id: string;
  orderId: string;
  transporterId: string;
  status: 'assigned' | 'picked_up' | 'delivering' | 'delivered';
  estimatedTime: number;
}
