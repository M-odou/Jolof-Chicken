
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Plus, Minus, ShoppingCart, X, Check, 
  MapPin, Clock, Truck, CreditCard, UtensilsCrossed, ArrowRight, Flame, Undo2, CheckSquare, Square, Search
} from 'lucide-react';
import Logo from '../components/Logo';
import { getDishes, getExtras, saveOrder } from '../services/storageService';
import { Dish, Extra, OrderItem, Order, MenuCategory, LocationZone } from '../types';
import { LOCATIONS } from '../constants';

const CustomerMenu: React.FC = () => {
  const navigate = useNavigate();
  
  // States
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [allExtras, setAllExtras] = useState<Extra[]>([]);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Jolof Chicken');
  const [selectedLocation, setSelectedLocation] = useState<LocationZone | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Customization States
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [customExtras, setCustomExtras] = useState<Extra[]>([]);
  const [customQuantity, setCustomQuantity] = useState(1);

  // Checkout States
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', mode: 'Livraison' as Order['mode'], payment: 'Wave' as Order['paymentMethod'] });
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  useEffect(() => {
    setDishes(getDishes().filter(d => d.active));
    setAllExtras(getExtras().filter(e => e.active));
  }, []);

  const categories: MenuCategory[] = ['Jolof Chicken', 'Menus combos', 'Accompagnements', 'Surplus'];

  const filteredDishes = useMemo(() => 
    dishes.filter(d => d.category === activeCategory), 
  [dishes, activeCategory]);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = (customerInfo.mode === 'Livraison' && selectedLocation) ? selectedLocation.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  // Handlers
  const handleOpenCustomization = (dish: Dish) => {
    setCustomizingDish(dish);
    setCustomExtras([]);
    setCustomQuantity(1);
  };

  const toggleExtra = (extra: Extra) => {
    setCustomExtras(prev => 
      prev.find(e => e.id === extra.id) ? prev.filter(e => e.id !== extra.id) : [...prev, extra]
    );
  };

  const addToCart = () => {
    if (!customizingDish) return;
    const extrasTotal = customExtras.reduce((s, e) => s + e.price, 0);
    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      dish: customizingDish,
      extras: [...customExtras],
      quantity: customQuantity,
      totalPrice: (customizingDish.price + extrasTotal) * customQuantity
    };
    setCart([...cart, newItem]);
    setCustomizingDish(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(i => i.id !== itemId));
  };

  const handleFinalOrder = () => {
    if (!customerInfo.name || !customerInfo.phone) return;
    const orderId = Math.random().toString(36).substr(2, 4).toUpperCase();
    const newOrder: Order = {
      id: orderId,
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      mode: customerInfo.mode,
      location: selectedLocation || undefined,
      paymentMethod: customerInfo.payment,
      items: cart,
      subtotal,
      deliveryFee,
      totalAmount: total,
      status: 'Reçue',
      createdAt: new Date().toISOString()
    };
    saveOrder(newOrder);
    setOrderComplete(orderId);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border border-stone-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={48} strokeWidth={3} />
          </div>
          <h2 className="text-4xl font-black mb-2">Miam ! Commande reçue.</h2>
          <p className="text-stone-400 font-bold mb-6">Référence : <span className="text-red-600 font-mono tracking-tighter">#{orderComplete}</span></p>
          <p className="text-stone-500 text-lg mb-8 leading-relaxed">
            Ta commande est en route. Notre chef s'occupe de tout. 🔥
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate(`/track/${orderComplete}`)} className="w-full bg-stone-900 text-white py-5 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3">
              <Search size={22} /> Suivre ma commande
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-stone-100 text-stone-600 py-4 rounded-3xl font-bold hover:bg-stone-200 transition-all">
              Retour à l'accueil
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Location Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin size={32} />
                </div>
                <h2 className="text-2xl font-black">Où te livres-tu ?</h2>
                <p className="text-stone-500">Choisis ta zone pour voir le prix de livraison</p>
              </div>
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {LOCATIONS.map(loc => (
                  <button key={loc.id} onClick={() => { setSelectedLocation(loc); setShowLocationModal(false); }} className="w-full p-4 rounded-2xl border-2 border-stone-100 hover:border-red-600 hover:bg-red-50 text-left transition-all group flex justify-between items-center">
                    <span className="font-bold text-stone-700 group-hover:text-red-700">{loc.name}</span>
                    <span className="text-sm bg-stone-100 px-3 py-1 rounded-full text-stone-500 font-bold">+{loc.deliveryFee} F</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <button onClick={() => { setCustomerInfo({...customerInfo, mode: 'À emporter'}); setShowLocationModal(false); }} className="w-full py-4 bg-stone-100 rounded-2xl text-stone-900 font-bold hover:bg-stone-200 transition-colors">
                  Je viendrai chercher ma commande
                </button>
                <button onClick={() => navigate('/')} className="w-full py-4 text-stone-400 font-bold flex items-center justify-center gap-2 hover:text-stone-900 transition-colors">
                  <Undo2 size={18} /> Retour à l'accueil
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-stone-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-stone-100 rounded-full flex items-center gap-2 font-bold text-stone-600">
            <ChevronLeft size={24} /> <span className="hidden md:inline">Retour</span>
          </button>
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/track" className="hidden sm:flex items-center gap-2 bg-stone-100 text-stone-500 px-4 py-2.5 rounded-full font-bold hover:bg-stone-200 transition-all text-sm">
            <Search size={16} /> Suivre ma commande
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="relative bg-stone-900 text-white p-3 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">{cart.length}</span>}
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-2">Compose ton Jolof Chicken</h1>
          <p className="text-stone-500 text-lg flex items-center justify-center md:justify-start gap-2 italic">
            <Flame size={20} className="text-red-600 animate-pulse" fill="currentColor" /> Choisis, ajoute, savoure.
          </p>
        </header>

        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar sticky top-20 z-30 bg-stone-50/80 backdrop-blur-md -mx-6 px-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${activeCategory === cat ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white text-stone-400 hover:text-stone-600 shadow-sm'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {filteredDishes.map(dish => (
            <motion.div layout key={dish.id} className="bg-white group rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img src={dish.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl font-black text-red-600 shadow-lg">
                  {dish.price.toLocaleString()} F
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black mb-2">{dish.name}</h3>
                <p className="text-stone-500 text-sm mb-6 line-clamp-2 leading-relaxed">{dish.description}</p>
                <button onClick={() => handleOpenCustomization(dish)} className="w-full bg-stone-100 text-stone-900 py-4 rounded-2xl font-bold group-hover:bg-red-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                  <Plus size={18} /> Personnaliser
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Customization Modal */}
      <AnimatePresence>
        {customizingDish && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4 bg-stone-900/60 backdrop-blur-sm">
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="bg-white w-full max-w-4xl rounded-t-[3rem] md:rounded-[3rem] p-8 md:p-10 shadow-2xl max-h-[95vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                   <button onClick={() => setCustomizingDish(null)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 flex items-center gap-2 font-bold px-4">
                     <ChevronLeft size={20} /> <span className="text-sm">Retour</span>
                   </button>
                   <div>
                     <h2 className="text-3xl font-black">{customizingDish.name}</h2>
                     <p className="text-stone-500">Base : {customizingDish.price.toLocaleString()} FCFA</p>
                   </div>
                </div>
                <button onClick={() => setCustomizingDish(null)} className="p-2 bg-stone-100 rounded-full hover:bg-red-50 hover:text-red-600"><X /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <img src={customizingDish.image} className="w-full h-80 object-cover rounded-[2.5rem] shadow-2xl" />
                  <div className="bg-stone-50 p-8 rounded-[2.5rem]">
                    <div className="flex items-center justify-between mb-2">
                       <h4 className="font-bold flex items-center gap-2 text-stone-400 uppercase text-xs tracking-widest"><Clock size={16} /> Prêt en 15min</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black">Quantité</span>
                      <div className="flex items-center gap-8 bg-white border border-stone-200 rounded-[1.5rem] px-6 py-3 shadow-sm">
                        <button onClick={() => setCustomQuantity(Math.max(1, customQuantity - 1))} className="p-1 hover:text-red-600"><Minus size={22} /></button>
                        <span className="text-2xl font-black w-8 text-center">{customQuantity}</span>
                        <button onClick={() => setCustomQuantity(customQuantity + 1)} className="p-1 hover:text-red-600"><Plus size={22} /></button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-black text-2xl mb-6">Ajoute tes surplus 😋</h4>
                  <div className="space-y-2 bg-stone-50 p-6 rounded-[2rem] max-h-[400px] overflow-y-auto">
                    {allExtras.map(extra => {
                      const selected = customExtras.some(e => e.id === extra.id);
                      return (
                        <button 
                          key={extra.id} 
                          onClick={() => toggleExtra(extra)} 
                          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${selected ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
                        >
                          <div className="flex items-center gap-4">
                            {selected ? <CheckSquare size={24} /> : <Square size={24} />}
                            <span className="font-bold text-lg">{extra.name}</span>
                          </div>
                          <span className={`font-black ${selected ? 'text-white' : 'text-red-600'}`}>+{extra.price} F</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center gap-6">
                 <div className="flex-1 text-center md:text-left">
                   <p className="text-stone-400 text-sm font-bold uppercase tracking-widest">Total pour ce plat</p>
                   <p className="text-4xl font-black text-red-600">
                    {((customizingDish.price + customExtras.reduce((s, e) => s + e.price, 0)) * customQuantity).toLocaleString()} F
                   </p>
                 </div>
                 <button onClick={addToCart} className="w-full md:w-auto px-16 py-6 bg-stone-900 text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                   🍽️ Ajouter au panier
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 z-[120] bg-stone-900/60 backdrop-blur-sm" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 h-full w-full max-w-lg z-[130] bg-white shadow-2xl flex flex-col">
              <div className="p-8 border-b border-stone-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isCheckingOut && (
                    <button onClick={() => setIsCheckingOut(false)} className="p-2 bg-stone-100 rounded-full hover:bg-stone-200">
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h2 className="text-3xl font-black flex items-center gap-3"><ShoppingCart className="text-red-600" /> {isCheckingOut ? 'Validation' : 'Ton Panier'}</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-200">
                      <UtensilsCrossed size={48} />
                    </div>
                    <p className="text-stone-400 font-bold">Ton panier est encore vide...</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-red-600 font-black">Aller commander !</button>
                  </div>
                ) : (
                  <>
                    {!isCheckingOut ? (
                      cart.map(item => (
                        <div key={item.id} className="bg-stone-50 p-6 rounded-[2rem] flex gap-4 group hover:bg-stone-100/50 transition-colors">
                          <img src={item.dish.image} className="w-20 h-20 object-cover rounded-2xl shadow-sm" />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between mb-1">
                              <h4 className="font-black text-stone-900 truncate">{item.quantity}x {item.dish.name}</h4>
                              <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-600 transition-colors">
                                <Trash2Icon size={18} />
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.extras.length > 0 ? item.extras.map(e => (
                                <span key={e.id} className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-stone-200 text-stone-500 font-bold">+{e.name}</span>
                              )) : <span className="text-xs text-stone-400 italic">Sans surplus</span>}
                            </div>
                            <p className="font-black text-red-600">{item.totalPrice.toLocaleString()} FCFA</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-8 animate-in slide-in-from-right-4">
                        <div className="space-y-4">
                          <h3 className="text-xl font-black mb-4 flex items-center gap-2">Tes Coordonnées</h3>
                          <div className="space-y-4">
                            <input type="text" placeholder="Ton nom complet" className="w-full bg-stone-100 border-none rounded-2xl py-5 px-6 focus:ring-2 ring-red-600/20 text-lg font-medium" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
                            <input type="tel" placeholder="Ton numéro de téléphone" className="w-full bg-stone-100 border-none rounded-2xl py-5 px-6 focus:ring-2 ring-red-600/20 text-lg font-medium" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xl font-black mb-4 flex items-center gap-2">Mode & Paiement</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {(['Livraison', 'À emporter'] as Order['mode'][]).map(m => (
                              <button key={m} onClick={() => setCustomerInfo({...customerInfo, mode: m})} className={`py-4 rounded-2xl font-bold border-2 transition-all ${customerInfo.mode === m ? 'border-red-600 bg-red-50 text-red-600' : 'border-stone-100 text-stone-400 hover:border-stone-200'}`}>{m}</button>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {(['Wave', 'Espèces'] as Order['paymentMethod'][]).map(p => (
                              <button key={p} onClick={() => setCustomerInfo({...customerInfo, payment: p})} className={`py-4 rounded-2xl font-bold border-2 transition-all ${customerInfo.payment === p ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100 text-stone-400 hover:border-stone-200'}`}>{p}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-stone-50 rounded-t-[3rem] shadow-inner border-t border-stone-100">
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-stone-500 font-bold">
                      <span>Sous-total</span>
                      <span>{subtotal.toLocaleString()} F</span>
                    </div>
                    {customerInfo.mode === 'Livraison' && (
                      <div className="flex justify-between text-stone-500 font-bold">
                        <span>Livraison ({selectedLocation?.name || 'Non sélectionné'})</span>
                        <span className="text-red-600">{deliveryFee.toLocaleString()} F</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                      <span className="text-lg text-stone-400 font-black uppercase tracking-widest">Total</span>
                      <span className="text-3xl font-black text-stone-900">{total.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  {!isCheckingOut ? (
                    <button onClick={() => setIsCheckingOut(true)} className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-red-600/20 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                      Suivant <ArrowRight size={22} />
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <button onClick={() => setIsCheckingOut(false)} className="px-8 py-6 bg-stone-200 text-stone-600 rounded-[2rem] font-black hover:bg-stone-300 transition-colors">
                        Retour
                      </button>
                      <button onClick={handleFinalOrder} disabled={!customerInfo.name || !customerInfo.phone} className="flex-1 bg-stone-900 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100">
                        Confirmer 🍽️
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="bg-white border-t border-stone-100 py-10 px-6">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center gap-8 text-center text-stone-500 font-bold">
           <div className="flex flex-col items-center gap-2">
             <Clock className="text-red-600" />
             <span>Prêt en 15-20 mins</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Truck className="text-red-600" />
             <span>Livraison dans tout Dakar</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <CreditCard className="text-red-600" />
             <span>Wave, Orange Money & Cash</span>
           </div>
         </div>
      </div>
    </div>
  );
};

const Trash2Icon = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6m4-11v6" />
  </svg>
);

export default CustomerMenu;
