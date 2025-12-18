
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, ChevronLeft, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { loginAdmin } from '../services/storageService';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative z-10 border border-stone-100"
      >
        <div className="text-center mb-10">
          <Logo size="md" />
          <h1 className="text-2xl font-black mt-6 text-stone-900">Accès Administrateur</h1>
          <p className="text-stone-400 text-sm mt-1">Gérez votre restaurant en toute sécurité</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100"
          >
            <AlertCircle size={18} /> Identifiants incorrects
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-stone-400 uppercase tracking-widest ml-1">Utilisateur</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={20} />
              <input 
                type="text" 
                required
                className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 ring-red-600/20 text-lg font-medium outline-none transition-all"
                placeholder="Votre identifiant"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-stone-400 uppercase tracking-widest ml-1">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={20} />
              <input 
                type="password" 
                required
                className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 ring-red-600/20 text-lg font-medium outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all mt-8"
          >
            <LogIn size={22} /> Se connecter
          </button>
        </form>

        <button 
          onClick={() => navigate('/')}
          className="w-full mt-8 text-stone-400 font-bold flex items-center justify-center gap-2 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft size={18} /> Retour au site
        </button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
