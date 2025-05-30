import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { mockArtists } from '../data/mockData';
import { formatTime } from '../utils/formatters';

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const { playlists, setCurrentTrack } = useAppContext();
  
  return (
    <div className="pb-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {playlists.map(playlist => (
            <div 
              key={playlist.id}
              className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer group"
              onClick={() => navigate(`/playlist/${playlist.id}`)}
            >
              <div className="mb-4 relative">
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-md shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <div className="bg-emerald-500 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold">{playlist.name}</h3>
              <p className="text-sm text-zinc-400 mt-1">{playlist.tracks.length} songs</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {mockArtists.map(artist => (
            <div 
              key={artist.id}
              className="text-center"
              onClick={() => navigate(`/artist/${artist.id}`)}
            >
              <div className="mb-3 relative mx-auto w-32 h-32 overflow-hidden rounded-full cursor-pointer group">
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium">{artist.name}</h3>
              <p className="text-sm text-zinc-400">Artist</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
        <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-700">
              <tr>
                <th className="py-3 px-4 font-medium">#</th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Artist</th>
                <th className="py-3 px-4 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody>
              {playlists[0]?.tracks.map((track, index) => (
                <tr 
                  key={track.id}
                  className="hover:bg-zinc-700/50 cursor-pointer transition-colors"
                  onClick={() => setCurrentTrack(track)}
                >
                  <td className="py-3 px-4 text-zinc-400">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={track.albumCover} 
                        alt={track.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{track.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-400">{track.artist}</td>
                  <td className="py-3 px-4 text-zinc-400">{formatTime(track.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HomeView;