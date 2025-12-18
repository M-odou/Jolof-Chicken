
export type OrderStatus = 'Reçue' | 'En préparation' | 'Prête' | 'Livrée' | 'Annulée';
export type MenuCategory = 'Jolof Chicken' | 'Menus combos' | 'Accompagnements' | 'Surplus';

export interface LocationZone {
  id: string;
  name: string;
  deliveryFee: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  image: string;
  active: boolean;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  active: boolean;
  category: MenuCategory;
}

export interface OrderItem {
  id: string;
  dish: Dish;
  extras: Extra[];
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  mode: 'Sur place' | 'À emporter' | 'Livraison';
  location?: LocationZone;
  paymentMethod: 'Wave' | 'Orange Money' | 'Espèces';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}
