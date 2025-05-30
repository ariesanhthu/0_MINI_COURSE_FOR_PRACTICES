import React from 'react';
import { useParams } from 'react-router-dom';
import { mockArtists, mockTracks } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { formatTime } from '../utils/formatters';
import { Play, Pause } from 'lucide-react';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentTrack, currentTrack, isPlaying, togglePlayPause } = useAppContext();
  
  const artist = mockArtists.find(a => a.id === id);
  
  if (!artist) {
    return <div className="p-8">Artist not found</div>;
  }

  // Filter tracks by this artist (in a real app this would be more sophisticated)
  const artistTracks = mockTracks.filter(track => 
    track.artist.toLowerCase().includes(artist.name.toLowerCase())
  );

  const isCurrentArtist = currentTrack && artistTracks.some(track => track.id === currentTrack.id);

  return (
    <div className="pb-8">
      <div className="relative h-64 mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800/10 to-zinc-900"></div>
        <div className="absolute bottom-0 left-0 p-8 flex items-end gap-6">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src={artist.image} 
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-2">{artist.name}</h1>
            <p className="text-lg">Artist</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4 ml-8">
        <button 
          className={`rounded-full p-3.5 text-black ${isCurrentArtist && isPlaying ? 'bg-emerald-400' : 'bg-emerald-500 hover:bg-emerald-400'} transition-colors`}
          onClick={() => {
            if (isCurrentArtist) {
              togglePlayPause();
            } else if (artistTracks.length > 0) {
              setCurrentTrack(artistTracks[0]);
            }
          }}
        >
          {isCurrentArtist && isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      <section className="mt-12 px-8">
        <h2 className="text-2xl font-bold mb-6">Popular Tracks</h2>
        <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <tbody>
              {artistTracks.map((track, index) => (
                <tr 
                  key={track.id}
                  className={`hover:bg-zinc-700/50 cursor-pointer transition-colors ${currentTrack?.id === track.id ? 'bg-zinc-700/75 text-emerald-400' : ''}`}
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
                  <td className="py-3 px-4 text-zinc-400">{formatTime(track.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 px-8">
        <h2 className="text-2xl font-bold mb-6">About</h2>
        <div className="bg-zinc-800/50 p-6 rounded-lg">
          <p className="text-zinc-300 leading-relaxed">{artist.bio}</p>
        </div>
      </section>
    </div>
  );
};

export default ArtistView;