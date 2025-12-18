import React, { useState, useEffect } from 'react';
import { Phone, Search, Filter, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getOrders, updateOrderStatus } from '../services/storageService';
import { Order, OrderStatus } from '../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setOrders(getOrders().reverse());
  }, []);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    setOrders(getOrders().reverse());
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Reçue': return 'bg-blue-100 text-blue-700';
      case 'En préparation': return 'bg-orange-100 text-orange-700';
      case 'Prête': return 'bg-purple-100 text-purple-700';
      case 'Livrée': return 'bg-green-100 text-green-700';
      case 'Annulée': return 'bg-red-100 text-red-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <AdminLayout>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-stone-900">Commandes</h1>
          <p className="text-stone-500 font-medium">
            {searchTerm 
              ? `${filteredOrders.length} résultat(s) pour "${searchTerm}"` 
              : `${orders.length} commandes au total`
            }
          </p>
        </div>
        <div className="flex gap-4 flex-1 max-w-2xl justify-end">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input 
              type="text" 
              placeholder="Chercher un nom ou un ID (#E12B...)" 
              className="w-full bg-white border-2 border-stone-200 rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-4 ring-red-600/10 focus:border-red-600 transition-all font-bold text-stone-700 shadow-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 rounded-2xl font-black text-stone-600 hover:bg-stone-50 transition-all shadow-sm">
            <Filter size={20} /> <span className="hidden sm:inline">Filtres</span>
          </button>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-stone-200 shadow-xl overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/80 text-stone-400 uppercase text-[11px] font-black tracking-[0.2em] border-b border-stone-100">
                <th className="px-8 py-5">Référence</th>
                <th className="px-8 py-5">Client</th>
                <th className="px-8 py-5">Panier</th>
                <th className="px-8 py-5">Montant</th>
                <th className="px-8 py-5">État</th>
                <th className="px-8 py-5">Gestion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-stone-50/50 transition-all">
                  <td className="px-8 py-8">
                    <span className="font-mono font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm tracking-tighter">#{order.id}</span>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-3 font-bold uppercase tracking-wider">
                       {/* Fix: use '2-digit' instead of '2h' for hour and minute options */}
                       <Clock size={12} /> {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <p className="font-black text-stone-900 text-lg">{order.customerName}</p>
                    <a href={`tel:${order.customerPhone}`} className="flex items-center gap-2 text-stone-400 hover:text-red-600 font-bold text-sm mt-1.5 transition-colors">
                      <div className="w-7 h-7 bg-stone-100 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <Phone size={14} className="group-hover:text-red-600" />
                      </div>
                      {order.customerPhone}
                    </a>
                  </td>
                  <td className="px-8 py-8 max-w-xs">
                    <div className="space-y-3">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="flex gap-3">
                           <div className="w-8 h-8 bg-stone-900 text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">
                             {item.quantity}
                           </div>
                           <div>
                             <p className="font-bold text-stone-800 text-sm leading-tight">{item.dish.name}</p>
                             <p className="text-[10px] text-stone-400 font-bold uppercase mt-0.5">
                               {item.extras.map(e => e.name).join(' • ') || 'Nature'}
                             </p>
                           </div>
                         </div>
                       ))}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <p className="font-black text-2xl text-stone-900">{order.totalAmount.toLocaleString()} F</p>
                    <div className="mt-2">
                       <span className="text-[10px] bg-stone-900 text-white px-3 py-1 rounded-full uppercase font-black tracking-widest">{order.mode}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-sm inline-block ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-8">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className="bg-stone-50 border-2 border-stone-100 rounded-xl text-xs font-black px-4 py-3 outline-none focus:ring-4 ring-red-600/10 focus:border-red-600 cursor-pointer transition-all hover:bg-white"
                    >
                      <option value="Reçue">Reçue</option>
                      <option value="En préparation">Préparation</option>
                      <option value="Prête">Prête</option>
                      <option value="Livrée">Livrée</option>
                      <option value="Annulée">Annulée</option>
                    </select>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-stone-200">
                        <AlertCircle size={48} />
                      </div>
                      <p className="text-stone-400 font-black text-xl italic">
                        Aucune commande trouvée pour "{searchTerm}"
                      </p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-red-600 font-bold hover:underline"
                      >
                        Effacer la recherche
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;