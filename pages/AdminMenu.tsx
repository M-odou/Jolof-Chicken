
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, XCircle, Upload, X, Utensils, Camera } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getDishes, saveDishes } from '../services/storageService';
import { Dish, MenuCategory } from '../types';

const AdminMenu: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateImageRef = useRef<HTMLInputElement>(null);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: '',
    description: '',
    price: 0,
    active: true,
    category: 'Jolof Chicken',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80'
  });

  useEffect(() => {
    setDishes(getDishes());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDish(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingDishId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = dishes.map(d => 
          d.id === editingDishId ? { ...d, image: reader.result as string } : d
        );
        setDishes(updated);
        saveDishes(updated);
        setEditingDishId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpdateImage = (id: string) => {
    setEditingDishId(id);
    updateImageRef.current?.click();
  };

  const handleAdd = () => {
    if (!newDish.name || !newDish.price || !newDish.category) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const dishToAdd: Dish = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDish.name as string,
      description: newDish.description || '',
      price: Number(newDish.price),
      active: true,
      category: newDish.category as MenuCategory,
      image: newDish.image || 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80'
    };
    const updated = [...dishes, dishToAdd];
    setDishes(updated);
    saveDishes(updated);
    setIsAdding(false);
    setNewDish({ 
      name: '', 
      description: '', 
      price: 0, 
      active: true, 
      category: 'Jolof Chicken',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80' 
    });
  };

  const toggleActive = (id: string) => {
    const updated = dishes.map(d => d.id === id ? { ...d, active: !d.active } : d);
    setDishes(updated);
    saveDishes(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('🚨 Attention : Voulez-vous vraiment supprimer ce plat définitivement ?')) {
      const updated = dishes.filter(d => d.id !== id);
      setDishes(updated);
      saveDishes(updated);
    }
  };

  const categories: MenuCategory[] = ['Jolof Chicken', 'Menus combos', 'Accompagnements', 'Surplus'];

  return (
    <AdminLayout>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">Carte & Plats</h1>
          <p className="text-stone-500">Gérez vos produits en un clic</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> Ajouter un plat
        </button>
      </header>

      {/* Hidden input for image update */}
      <input type="file" ref={updateImageRef} className="hidden" accept="image/*" onChange={handleUpdateImage} />

      {isAdding && (
        <div className="bg-white border-2 border-red-100 rounded-[2.5rem] p-8 mb-12 shadow-2xl animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black">Nouveau produit</h3>
            <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
               <X size={24} className="text-stone-400" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="space-y-4">
              <label className="block text-sm font-black text-stone-400 uppercase tracking-widest">Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative h-64 bg-stone-50 rounded-[2rem] border-4 border-dashed border-stone-200 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-100 transition-all overflow-hidden group"
              >
                {newDish.image ? (
                  <>
                    <img src={newDish.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <Upload className="text-white" size={32} />
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon size={48} className="text-stone-300 mb-2" />
                    <p className="text-stone-400 font-bold">Uploader</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-stone-400 uppercase tracking-widest mb-2">Nom du plat</label>
                  <input 
                    type="text" 
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20 text-lg font-medium"
                    value={newDish.name}
                    onChange={e => setNewDish({...newDish, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-stone-400 uppercase tracking-widest mb-2">Catégorie</label>
                  <select 
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20 text-lg font-medium"
                    value={newDish.category}
                    onChange={e => setNewDish({...newDish, category: e.target.value as MenuCategory})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-black text-stone-400 uppercase tracking-widest mb-2">Prix (F)</label>
                  <input 
                    type="number" 
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20 text-lg font-black text-red-600"
                    value={newDish.price}
                    onChange={e => setNewDish({...newDish, price: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="space-y-6 flex flex-col">
                <div className="flex-1">
                  <label className="block text-sm font-black text-stone-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-stone-50 border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20 text-lg font-medium resize-none"
                    value={newDish.description}
                    onChange={e => setNewDish({...newDish, description: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setIsAdding(false)} className="flex-1 py-4 bg-stone-100 text-stone-600 rounded-2xl font-bold">Annuler</button>
                  <button onClick={handleAdd} className="flex-[2] bg-stone-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl">Valider l'Ajout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dishes.map((dish) => (
          <div key={dish.id} className={`bg-white group rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${!dish.active && 'opacity-60'}`}>
            <div 
              className="relative h-56 overflow-hidden cursor-pointer group/image"
              onClick={() => triggerUpdateImage(dish.id)}
            >
              <img src={dish.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2">
                 <Camera className="text-white" size={32} />
                 <span className="text-white text-xs font-black uppercase tracking-widest">Changer l'image</span>
              </div>
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${dish.active ? 'bg-green-500 text-white' : 'bg-stone-500 text-white'}`}>
                  {dish.active ? 'En Stock' : 'Épuisé'}
                </span>
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-stone-900/80 text-white backdrop-blur-md shadow-lg">
                  {dish.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black text-stone-900">{dish.name}</h3>
                <span className="text-xl font-black text-red-600">{dish.price.toLocaleString()} F</span>
              </div>
              <p className="text-stone-500 text-sm mb-8 line-clamp-2 leading-relaxed">{dish.description}</p>
              
              <div className="flex items-center gap-3 mt-auto">
                <button 
                  onClick={() => toggleActive(dish.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all ${
                    dish.active ? 'bg-stone-100 text-stone-600 hover:bg-stone-200' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {dish.active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                  {dish.active ? 'Retirer' : 'Activer'}
                </button>
                <button 
                  onClick={() => handleDelete(dish.id)}
                  className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform hover:rotate-6 active:scale-90"
                  title="Supprimer définitivement"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {dishes.length === 0 && (
          <div className="col-span-full py-20 text-center bg-stone-50 rounded-[3rem] border-4 border-dashed border-stone-100">
             <Utensils size={48} className="mx-auto text-stone-200 mb-4" />
             <p className="text-stone-400 font-bold">Votre menu est vide.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;
