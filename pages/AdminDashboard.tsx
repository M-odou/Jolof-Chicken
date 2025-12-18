
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, DollarSign, Clock, CheckCircle, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AdminLayout from '../components/AdminLayout';
import { getOrders } from '../services/storageService';
import { Order } from '../types';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const todayOrders = orders.filter(o => {
    const today = new Date().toISOString().split('T')[0];
    return o.createdAt.split('T')[0] === today;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Simple stats calculation for charts
  const dishCounts: Record<string, number> = {};
  orders.forEach(o => {
    o.items.forEach(item => {
      dishCounts[item.dish.name] = (dishCounts[item.dish.name] || 0) + item.quantity;
    });
  });

  const chartData = Object.keys(dishCounts).map(name => ({
    name,
    count: dishCounts[name]
  })).slice(0, 5);

  const stats = [
    { title: "Commandes aujourd'hui", value: todayOrders.length, icon: ShoppingBag, color: 'bg-blue-500' },
    { title: "Chiffre d'affaires total", value: `${totalRevenue.toLocaleString()} FCFA`, icon: DollarSign, color: 'bg-green-500' },
    { title: "Plat le plus vendu", value: chartData[0]?.name || "N/A", icon: TrendingUp, color: 'bg-orange-500' },
    { title: "Commandes en attente", value: orders.filter(o => o.status === 'Reçue').length, icon: Clock, color: 'bg-red-500' },
  ];

  return (
    <AdminLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-black text-stone-900">Dashboard</h1>
        <p className="text-stone-500">Vue d'ensemble de Jolof Chicken</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm"
            >
              <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                <Icon size={24} />
              </div>
              <h3 className="text-stone-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-black mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Performance des Plats</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][index % 5]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders List Mini */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Dernières Activités</h3>
          <div className="space-y-6">
            {orders.slice(-4).reverse().map((order) => (
              <div key={order.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  order.status === 'Reçue' ? 'bg-blue-100 text-blue-600' : 
                  order.status === 'Livrée' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {order.status === 'Reçue' ? <Package size={18} /> : <CheckCircle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{order.customerName}</p>
                  <p className="text-xs text-stone-400">{new Date(order.createdAt).toLocaleTimeString()} • {order.totalAmount.toLocaleString()} F</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold self-start uppercase ${
                  order.status === 'Reçue' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
            {orders.length === 0 && <p className="text-stone-400 text-center py-10 italic">Aucune commande encore.</p>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
