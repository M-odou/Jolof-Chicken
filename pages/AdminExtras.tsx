
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, ListPlus, CheckCircle, XCircle, Package } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { getExtras, saveExtras } from '../services/storageService';
import { Extra } from '../types';

const AdminExtras: React.FC = () => {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newExtra, setNewExtra] = useState<Partial<Extra>>({
    name: '',
    price: 0,
    active: true,
    image: '' 
  });

  useEffect(() => {
    setExtras(getExtras());
  }, []);

  const handleAdd = () => {
    if (!newExtra.name || !newExtra.price) {
      alert("Veuillez remplir le nom et le prix.");
      return;
    }
    const extraToAdd: Extra = {
      id: 'e' + Math.random().toString(36).substr(2, 5),
      name: newExtra.name as string,
      price: Number(newExtra.price),
      active: true,
      image: '' 
    };
    const updated = [...extras, extraToAdd];
    setExtras(updated);
    saveExtras(updated);
    setIsAdding(false);
    setNewExtra({ name: '', price: 0, active: true, image: '' });
  };

  const toggleActive = (id: string) => {
    const updated = extras.map(e => e.id === id ? { ...e, active: !e.active } : e);
    setExtras(updated);
    saveExtras(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('🚨 Attention : Supprimer définitivement ce supplément ?')) {
      const updated = extras.filter(e => e.id !== id);
      setExtras(updated);
      saveExtras(updated);
    }
  };

  return (
    <AdminLayout>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-stone-900">Gestion des Surplus</h1>
          <p className="text-stone-500">Ajoutez des options gourmandes à vos plats</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} /> Nouveau Surplus
        </button>
      </header>

      {isAdding && (
        <div className="bg-white border-2 border-red-100 rounded-[2.5rem] p-8 mb-12 shadow-2xl animate-in slide-in-from-top-4 duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-stone-900 flex items-center gap-3">
              <ListPlus className="text-red-600" /> Ajouter un supplément
            </h3>
            <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><X className="text-stone-400" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-3 ml-1">Désignation du surplus</label>
              <input 
                type="text" 
                placeholder="ex: Portion d'Alloco"
                className="w-full bg-stone-50 border-none rounded-2xl py-5 px-6 focus:ring-2 ring-red-600/20 font-bold text-lg"
                value={newExtra.name}
                onChange={e => setNewExtra({...newExtra, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-3 ml-1">Prix de vente (F)</label>
              <input 
                type="number" 
                placeholder="500"
                className="w-full bg-stone-50 border-none rounded-2xl py-5 px-6 focus:ring-2 ring-red-600/20 font-black text-red-600 text-lg"
                value={newExtra.price}
                onChange={e => setNewExtra({...newExtra, price: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-10">
            <button onClick={() => setIsAdding(false)} className="flex-1 py-5 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200">Annuler</button>
            <button onClick={handleAdd} className="flex-[2] py-5 bg-stone-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-black">Enregistrer le surplus</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {extras.map((extra) => (
          <div key={extra.id} className={`bg-white group rounded-[2.5rem] border border-stone-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden ${!extra.active && 'opacity-60 bg-stone-50'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${extra.active ? 'bg-red-50 text-red-600' : 'bg-stone-200 text-stone-400'}`}>
                <Package size={24} />
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${extra.active ? 'bg-green-500 text-white' : 'bg-stone-500 text-white'}`}>
                {extra.active ? 'Disponible' : 'Épuisé'}
              </span>
            </div>

            <div className="mb-8">
              <h3 className={`text-2xl font-black mb-2 ${extra.active ? 'text-stone-900' : 'text-stone-400'}`}>{extra.name}</h3>
              <p className={`text-3xl font-black ${extra.active ? 'text-red-600' : 'text-stone-300'}`}>{extra.price.toLocaleString()} F</p>
            </div>
            
            <div className="flex items-center gap-3 mt-auto">
              <button 
                onClick={() => toggleActive(extra.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all ${
                  extra.active ? 'bg-stone-100 text-stone-600 hover:bg-stone-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {extra.active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                {extra.active ? 'Désactiver' : 'Réactiver'}
              </button>
              <button 
                onClick={() => handleDelete(extra.id)}
                className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform hover:rotate-6 active:scale-90"
                title="Supprimer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {extras.length === 0 && (
          <div className="col-span-full py-20 text-center bg-stone-50 rounded-[3rem] border-4 border-dashed border-stone-100">
             <ListPlus size={48} className="mx-auto text-stone-200 mb-4" />
             <p className="text-stone-400 font-bold">Aucun surplus pour le moment.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminExtras;
