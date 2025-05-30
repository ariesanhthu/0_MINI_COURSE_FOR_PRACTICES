import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Home, Library, PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SearchInput from './SearchInput';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playlists } = useAppContext();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-zinc-800 flex flex-col h-full border-r border-zinc-700">
      <div className="p-4 flex flex-col gap-6">
        <div>
          <button 
            className={`flex items-center gap-3 w-full p-2 rounded-md transition-colors ${
              isActive('/') ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => navigate('/')}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button 
            className={`flex items-center gap-3 w-full p-2 rounded-md transition-colors ${
              isActive('/search') ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => navigate('/search')}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>

        <div className="mt-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-zinc-400 p-2">
              <Library size={20} />
              <span>Your Library</span>
            </div>
            <button className="text-zinc-400 hover:text-white p-1 rounded-full transition-colors">
              <PlusCircle size={18} />
            </button>
          </div>
          
          {location.pathname === '/search' && (
            <div className="mb-3">
              <SearchInput />
            </div>
          )}

          <div className="mt-2 space-y-1 overflow-y-auto max-h-[calc(100vh-300px)]">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                className="flex items-center gap-3 w-full p-2 rounded-md text-zinc-400 hover:text-white transition-colors hover:bg-zinc-700"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.name} 
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="text-left overflow-hidden">
                  <p className="truncate">{playlist.name}</p>
                  <p className="text-xs text-zinc-500">
                    Playlist • {playlist.tracks.length} songs
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;