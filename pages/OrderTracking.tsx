
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Clock, Utensils, CheckCircle2, ChevronLeft, MapPin, Phone, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { getOrders } from '../services/storageService';
import { Order, OrderStatus } from '../types';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState(orderId || '');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (orderId) {
      const orders = getOrders();
      const match = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
      if (match) {
        setFoundOrder(match);
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [orderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/track/${searchId.trim().replace('#', '')}`);
    }
  };

  const statusSteps: { label: OrderStatus; icon: any; desc: string }[] = [
    { label: 'Reçue', icon: Package, desc: 'Nous avons bien reçu votre commande.' },
    { label: 'En préparation', icon: Utensils, desc: 'Le chef prépare votre Jolof Chicken.' },
    { label: 'Prête', icon: Clock, desc: 'Votre commande est prête et chaude.' },
    { label: 'Livrée', icon: CheckCircle2, desc: 'Bon appétit ! Profitez bien.' },
  ];

  const getStatusIndex = (status: OrderStatus) => {
    const idx = statusSteps.findIndex(s => s.label === status);
    return idx === -1 ? 0 : idx;
  };

  const currentIndex = foundOrder ? getStatusIndex(foundOrder.status) : -1;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar Minimaliste */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600">
            <ChevronLeft size={24} />
          </Link>
          <Logo size="sm" />
        </div>
        <Link to="/menu" className="font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all">Commander</Link>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Suivre ma commande</h1>
          <p className="text-stone-500 text-lg">Entrez votre numéro de commande pour savoir où elle en est.</p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400" size={24} />
            <input 
              type="text" 
              placeholder="Ex: #A4B7 (Identifiant de commande)"
              className="w-full bg-white border-4 border-white shadow-2xl rounded-[2.5rem] py-6 pl-16 pr-8 text-xl font-bold outline-none focus:ring-4 ring-red-600/10 transition-all uppercase"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-3.5 rounded-[1.8rem] font-black hover:bg-red-700 transition-all shadow-lg active:scale-95"
            >
              Suivre
            </button>
          </div>
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-600 font-bold mt-4 justify-center">
              <AlertCircle size={18} /> Commande introuvable. Vérifiez votre numéro.
            </motion.div>
          )}
        </form>

        <AnimatePresence mode="wait">
          {foundOrder ? (
            <motion.div 
              key={foundOrder.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Order Status Visual */}
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-stone-100">
                <div className="flex justify-between items-center mb-12 border-b border-stone-50 pb-8">
                   <div>
                     <p className="text-stone-400 text-xs font-black uppercase tracking-widest mb-1">Numéro de commande</p>
                     <h2 className="text-3xl font-black text-red-600">#{foundOrder.id}</h2>
                   </div>
                   <div className="text-right">
                     <p className="text-stone-400 text-xs font-black uppercase tracking-widest mb-1">Passée le</p>
                     <p className="font-bold">{new Date(foundOrder.createdAt).toLocaleDateString()} à {new Date(foundOrder.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                  {/* Background Progress Line */}
                  <div className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-1 bg-stone-100 -z-0">
                    <motion.div 
                      className="h-full bg-red-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>

                  {statusSteps.map((step, i) => {
                    const Icon = step.icon;
                    const isCompleted = i <= currentIndex;
                    const isCurrent = i === currentIndex;
                    const isCancelled = foundOrder.status === 'Annulée';

                    return (
                      <div key={step.label} className="flex flex-row md:flex-col items-center gap-4 md:gap-0 text-left md:text-center relative z-10">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                          isCancelled ? 'bg-red-50 text-red-400' :
                          isCompleted ? 'bg-red-600 text-white scale-110' : 'bg-stone-100 text-stone-300'
                        }`}>
                          <Icon size={24} />
                        </div>
                        <div className="md:mt-4">
                          <p className={`font-black text-sm uppercase tracking-wider ${isCurrent ? 'text-red-600' : isCompleted ? 'text-stone-900' : 'text-stone-300'}`}>
                            {isCancelled && isCurrent ? 'Annulée' : step.label}
                          </p>
                          <p className="text-[11px] text-stone-400 font-medium md:max-w-[120px] mx-auto mt-1 line-clamp-2">
                            {isCancelled && isCurrent ? 'Votre commande ne peut pas aboutir.' : step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Details Mini */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-lg">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Package className="text-red-600" /> Votre Panier</h3>
                  <div className="space-y-4">
                    {foundOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <span className="bg-stone-100 text-stone-600 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs">{item.quantity}x</span>
                          <div>
                            <p className="font-bold text-sm">{item.dish.name}</p>
                            <p className="text-[10px] text-stone-400 font-bold uppercase">{item.extras.map(e => e.name).join(', ') || 'Nature'}</p>
                          </div>
                        </div>
                        <span className="font-black text-stone-900">{item.totalPrice.toLocaleString()} F</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                      <span className="font-black text-stone-400 uppercase text-xs tracking-widest">Total Payé</span>
                      <span className="text-2xl font-black text-red-600">{foundOrder.totalAmount.toLocaleString()} F</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-lg">
                   <h3 className="text-xl font-black mb-6 flex items-center gap-2"><MapPin className="text-red-600" /> Livraison</h3>
                   <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-stone-50 rounded-2xl text-stone-400"><Phone size={20} /></div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Contact Client</p>
                          <p className="font-bold">{foundOrder.customerName}</p>
                          <p className="text-stone-500">{foundOrder.customerPhone}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-stone-50 rounded-2xl text-stone-400"><MapPin size={20} /></div>
                        <div>
                          <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Mode / Lieu</p>
                          <p className="font-bold">{foundOrder.mode}</p>
                          <p className="text-stone-500">{foundOrder.location?.name || 'Récupération sur place'}</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-20 text-center text-stone-400">
               <Package size={64} className="mx-auto mb-6 opacity-20" />
               <p className="text-lg italic">Entrez votre numéro pour afficher les détails.</p>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default OrderTracking;
