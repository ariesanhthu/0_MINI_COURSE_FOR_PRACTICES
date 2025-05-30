import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatTime } from '../utils/formatters';

const Player: React.FC = () => {
  const { currentTrack, isPlaying, togglePlayPause, nextTrack, previousTrack } = useAppContext();

  if (!currentTrack) return null;

  return (
    <div className="bg-zinc-800 border-t border-zinc-700 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3 w-1/4">
        <img
          src={currentTrack.albumCover}
          alt={`${currentTrack.title} cover`}
          className="w-14 h-14 object-cover rounded-md"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-xs text-zinc-400 truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center gap-4">
          <button 
            className="text-zinc-400 hover:text-white transition-colors"
            onClick={previousTrack}
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            className="text-zinc-400 hover:text-white transition-colors"
            onClick={nextTrack}
          >
            <SkipForward size={20} />
          </button>
        </div>
        <div className="w-full mt-2 flex items-center gap-2">
          <span className="text-xs text-zinc-400">0:00</span>
          <div className="h-1 flex-1 bg-zinc-600 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-emerald-500 rounded-full"></div>
          </div>
          <span className="text-xs text-zinc-400">{formatTime(currentTrack.duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Volume2 size={18} className="text-zinc-400" />
        <div className="w-24 h-1 bg-zinc-600 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-zinc-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Player;