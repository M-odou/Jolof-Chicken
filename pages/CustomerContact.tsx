
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageSquare, Send, Instagram, Facebook, Share2, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';

const CustomerContact: React.FC = () => {
  const navigate = useNavigate();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4 flex justify-between items-center">
        <Logo size="sm" />
        <div className="hidden md:flex gap-8 font-medium">
          <button onClick={() => navigate('/')} className="hover:text-red-600 transition-colors">Accueil</button>
          <button onClick={() => navigate('/menu')} className="hover:text-red-600 transition-colors">Menu</button>
          <button onClick={() => navigate('/contact')} className="text-red-600 font-bold">Contact</button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/menu')} className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg">Commander</button>
          <button onClick={() => navigate('/admin')} className="hidden sm:block text-stone-400 hover:text-stone-900 font-bold text-sm">Admin</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-7xl font-black mb-6">On est là, parle-nous 😄</h1>
            <p className="text-xl text-stone-500 max-w-2xl mx-auto">Une question ? Une envie particulière ? Notre équipe est à ton écoute pour te servir le meilleur Jolof Chicken.</p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 px-6 -mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 text-center hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Appelle-nous</h3>
            <p className="text-stone-500 mb-6">+221 33 800 10 10</p>
            <a href="tel:+221338001010" className="text-red-600 font-bold hover:underline">Nous appeler maintenant</a>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 text-center hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
            <p className="text-stone-500 mb-6">Disponible 7j/7</p>
            <a href="https://wa.me/221770000000" className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold inline-block hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">Chatter sur WhatsApp</a>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 text-center hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Horaires</h3>
            <p className="text-stone-500">Lun - Dim : 11h - 23h</p>
            <p className="text-xs text-stone-300 mt-4 italic">Cuisine ouverte jusqu'à 22h30</p>
          </div>
        </div>
      </section>

      {/* Map & Form */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Map Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-red-600" />
              <h2 className="text-3xl font-black">Où nous trouver ?</h2>
            </div>
            <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.35645672323!2d-17.4474776!3d14.712163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzQzLjgiTiAxN8KwMjYnNTAuOSJX!5e0!3m2!1sfr!2ssn!4v1620000000000!5m2!1sfr!2ssn" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
              <div className="absolute bottom-8 left-8 right-8 bg-white p-6 rounded-3xl shadow-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-stone-900">Dakar Plateau, Rue 12</p>
                  <p className="text-sm text-stone-400">Près du Cinéma Plaza</p>
                </div>
                <a href="https://maps.google.com" className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-all">Itinéraire</a>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-stone-50 p-12 rounded-[3rem]">
            <h2 className="text-3xl font-black mb-8">Écris-nous directement ✉️</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Ton Nom</label>
                <input 
                  type="text" required
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Ton Téléphone</label>
                <input 
                  type="tel" required
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  rows={4} required
                  className="w-full bg-white border-none rounded-2xl py-4 px-6 focus:ring-2 ring-red-600/20"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`w-full py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all ${
                  formSent ? 'bg-green-600 text-white' : 'bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-600/20'
                }`}
              >
                {formSent ? <><CheckCircle2 /> Envoyé !</> : <><Send size={20} /> Envoyer le message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Socials & Trust */}
      <section className="py-20 bg-stone-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-3xl font-black mb-10">Suis-nous pour les promos 🔥</h3>
          <div className="flex justify-center gap-8 mb-16">
            <a href="#" className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-all hover:scale-110"><Instagram /></a>
            <a href="#" className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110"><Facebook /></a>
            <a href="#" className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-black transition-all hover:scale-110"><Share2 /></a>
          </div>
          <div className="italic text-stone-500 text-xl border-t border-white/10 pt-10">
            “Jolof Chicken — Le goût qui rassemble.”
          </div>
        </div>
      </section>

      {/* Mini Footer */}
      <footer className="bg-stone-950 text-stone-500 py-10 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 Jolof Chicken. Tous droits réservés.</p>
          <p className="font-medium">Développé par <span className="text-stone-300">Modou & Saliou</span></p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerContact;
