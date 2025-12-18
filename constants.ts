
import { Dish, Extra, LocationZone } from './types';

export const LOCATIONS: LocationZone[] = [
  { id: 'l1', name: 'Plateau', deliveryFee: 1000 },
  { id: 'l2', name: 'Almadies / Ngor', deliveryFee: 2000 },
  { id: 'l3', name: 'Ouakam / Mermoz', deliveryFee: 1500 },
  { id: 'l4', name: 'Dakar Plateau', deliveryFee: 1000 },
  { id: 'l5', name: 'Guédiawaye / Pikine', deliveryFee: 2500 },
  { id: 'l6', name: 'Parcelles Assainies', deliveryFee: 2000 },
];

export const INITIAL_DISHES: Dish[] = [
  {
    id: '1',
    name: 'Jolof Chicken Classique',
    description: 'Le riz jolof signature avec un poulet braisé tendre et savoureux.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80',
    active: true,
    category: 'Jolof Chicken'
  },
  {
    id: '2',
    name: 'Jolof Chicken Spicy',
    description: 'Pour les amateurs de sensations fortes, pimenté à souhait !',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80',
    active: true,
    category: 'Jolof Chicken'
  },
  {
    id: '4',
    name: 'Combo Familial 4 Pers.',
    description: '4 portions de riz Jolof, 1 poulet entier braisé, frites et boissons.',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80',
    active: true,
    category: 'Menus combos'
  },
  {
    id: '5',
    name: 'Braisé Solo',
    description: 'Demi-poulet braisé uniquement, servi avec oignons et piment.',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80',
    active: true,
    category: 'Accompagnements'
  },
  {
    id: '6',
    name: 'Alloco Maison',
    description: 'Bananes plantains frites, dorées et fondantes.',
    price: 700,
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80',
    active: true,
    category: 'Accompagnements'
  }
];

export const INITIAL_EXTRAS: Extra[] = [
  { id: 'e1', name: 'Poulet extra', price: 1000, active: true, image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&q=80' },
  { id: 'e2', name: 'Œuf', price: 300, active: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80' },
  { id: 'e3', name: 'Alloco', price: 700, active: true, image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80' },
  { id: 'e4', name: 'Frites', price: 500, active: true, image: 'https://images.unsplash.com/photo-1630384066252-198c3d706560?auto=format&fit=crop&q=80' },
  { id: 'e5', name: 'Sauce spéciale', price: 300, active: true, image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&q=80' },
  { id: 'e6', name: 'Piment 🔥', price: 200, active: true, image: 'https://images.unsplash.com/photo-1596450514735-373361f1c7e9?auto=format&fit=crop&q=80' },
];

export const COLORS = {
  primary: '#D32F2F', // Red
  secondary: '#FBC02D', // Yellow
  dark: '#1C1917', // Dark Stone
};
