
import { Dish, Extra, Order } from '../types';
import { INITIAL_DISHES, INITIAL_EXTRAS } from '../constants';

const KEYS = {
  DISHES: 'jc_dishes',
  EXTRAS: 'jc_extras',
  ORDERS: 'jc_orders',
  AUTH: 'jc_admin_auth'
};

export const getDishes = (): Dish[] => {
  const data = localStorage.getItem(KEYS.DISHES);
  return data ? JSON.parse(data) : INITIAL_DISHES;
};

export const saveDishes = (dishes: Dish[]) => {
  localStorage.setItem(KEYS.DISHES, JSON.stringify(dishes));
};

export const getExtras = (): Extra[] => {
  const data = localStorage.getItem(KEYS.EXTRAS);
  return data ? JSON.parse(data) : INITIAL_EXTRAS;
};

export const saveExtras = (extras: Extra[]) => {
  localStorage.setItem(KEYS.EXTRAS, JSON.stringify(extras));
};

export const getOrders = (): Order[] => {
  const data = localStorage.getItem(KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  localStorage.setItem(KEYS.ORDERS, JSON.stringify([...orders, order]));
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getOrders();
  const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
};

// Auth Services
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(KEYS.AUTH) === 'true';
};

export const loginAdmin = (user: string, pass: string): boolean => {
  if (user === 'admin' && pass === 'admin123') {
    localStorage.setItem(KEYS.AUTH, 'true');
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(KEYS.AUTH);
};
