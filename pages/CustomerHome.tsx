
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Clock, Truck, ChevronRight, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const CustomerHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Logo size="sm" />
          <div className="hidden lg:flex gap-8 font-medium">
            <Link to="/menu" className="hover:text-red-600 transition-colors">Notre concept</Link>
            <Link to="/menu" className="hover:text-red-600 transition-colors">Menu</Link>
            <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/menu" 
            className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
          >
            Commander
          </Link>
          <Link 
            to="/admin" 
            className="hidden sm:flex items-center gap-2 bg-stone-100 text-stone-600 px-4 py-2.5 rounded-full font-bold hover:bg-stone-900 hover:text-white transition-all text-sm"
          >
            <ShieldCheck size={18} /> Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-stone-50"></div>
        
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-red-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              <Flame size={16} fill="currentColor" /> Savoureux • Authentique • Rapide
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1]">
              Le goût Jolof,<br />
              <span className="text-red-600 font-accent italic">version Chicken.</span>
            </h1>
            <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Découvrez l'alliance parfaite entre le riz rouge traditionnel et un poulet braisé aux épices secrètes. Une explosion de saveurs africaines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/menu" className="group flex items-center gap-3 bg-red-600 text-white px-8 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all hover:scale-105 active:scale-95">
                👉 Commander maintenant
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute -bottom-10 md:bottom-10 right-0 md:right-20 animate-float pointer-events-none hidden lg:block">
           <div className="relative">
             <div className="bg-yellow-400 w-64 h-64 rounded-full flex items-center justify-center text-9xl">🍗</div>
             <div className="absolute -top-4 -right-4 bg-red-600 text-white p-4 rounded-full font-accent text-2xl shadow-xl -rotate-12">BEST SELLER</div>
           </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-stone-50 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <Flame size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Qualité Braise</h3>
            <p className="text-stone-500">Poulet mariné 24h et cuit à la flamme vive pour un goût fumé incomparable.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-rotate-12 transition-transform">
              <Clock size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Express</h3>
            <p className="text-stone-500">Prêt en moins de 15 minutes. Parce que le goût n'attend pas.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform">
              <Truck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Livraison Wave</h3>
            <p className="text-stone-500">Payez en toute sécurité via vos moyens locaux préférés.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Logo size="md" />
            <p className="mt-6 text-stone-400 max-w-sm">
              Jolof Chicken redéfinit la street food africaine avec passion et authenticité. Rejoignez la révolution du goût.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Liens rapides</h4>
            <ul className="space-y-4 text-stone-400">
              <li><Link to="/menu" className="hover:text-red-500 transition-colors">Commander en ligne</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact & Localisation</Link></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-stone-400">
              <li>+221 33 800 10 10</li>
              <li>Dakar, Plateau, Rue 12</li>
              <li>hello@jolofchicken.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-stone-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-sm">
          <p>&copy; 2025 Jolof Chicken. Tous droits réservés.</p>
          <p className="font-medium">Développé par <span className="text-stone-300">Modou & Saliou</span></p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerHome;
