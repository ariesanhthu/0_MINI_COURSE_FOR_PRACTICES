import React from 'react';
import { useParams } from 'react-router-dom';
import { mockPlaylists } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { formatTime } from '../utils/formatters';
import { Play, Pause, Clock3 } from 'lucide-react';

const PlaylistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setCurrentTrack, currentTrack, isPlaying, togglePlayPause } = useAppContext();
  
  const playlist = mockPlaylists.find(p => p.id === id);
  
  if (!playlist) {
    return <div className="p-8">Playlist not found</div>;
  }

  const isCurrentPlaylist = currentTrack && playlist.tracks.some(track => track.id === currentTrack.id);

  return (
    <div className="pb-8">
      <div className="flex items-end gap-6 mb-8">
        <img 
          src={playlist.coverImage} 
          alt={playlist.name}
          className="w-48 h-48 object-cover shadow-lg rounded-md"
        />
        <div>
          <p className="text-sm uppercase mb-1">Playlist</p>
          <h1 className="text-5xl font-bold mb-4">{playlist.name}</h1>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>{playlist.tracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <button 
          className={`rounded-full p-3.5 text-black ${isCurrentPlaylist && isPlaying ? 'bg-emerald-400' : 'bg-emerald-500 hover:bg-emerald-400'} transition-colors`}
          onClick={() => {
            if (isCurrentPlaylist) {
              togglePlayPause();
            } else if (playlist.tracks.length > 0) {
              setCurrentTrack(playlist.tracks[0]);
            }
          }}
        >
          {isCurrentPlaylist && isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-700">
            <tr>
              <th className="py-3 px-4 font-medium">#</th>
              <th className="py-3 px-4 font-medium">Title</th>
              <th className="py-3 px-4 font-medium">Artist</th>
              <th className="py-3 px-4 font-medium">
                <Clock3 size={16} />
              </th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.map((track, index) => (
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
                <td className="py-3 px-4 text-zinc-400">{track.artist}</td>
                <td className="py-3 px-4 text-zinc-400">{formatTime(track.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaylistView;