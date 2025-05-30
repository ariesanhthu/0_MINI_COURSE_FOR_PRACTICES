import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-zinc-800 p-4 flex items-center justify-between shadow-md">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <Music size={32} className="text-emerald-400" />
        <h1 className="text-xl font-bold">Harmony</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:text-emerald-400 transition-colors">
          Premium
        </button>
        <button className="hover:text-emerald-400 transition-colors">
          Support
        </button>
        <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-full transition-colors">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;