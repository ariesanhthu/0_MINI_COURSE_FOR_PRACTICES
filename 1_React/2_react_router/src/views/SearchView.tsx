import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { mockTracks, mockArtists, mockPlaylists } from '../data/mockData';
import { formatTime } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';

const SearchView: React.FC = () => {
  const { searchQuery, setCurrentTrack } = useAppContext();
  const navigate = useNavigate();
  
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        tracks: [],
        artists: [],
        playlists: []
      };
    }
    
    const query = searchQuery.toLowerCase();
    
    return {
      tracks: mockTracks.filter(track => 
        track.title.toLowerCase().includes(query) || 
        track.artist.toLowerCase().includes(query)
      ),
      artists: mockArtists.filter(artist =>
        artist.name.toLowerCase().includes(query)
      ),
      playlists: mockPlaylists.filter(playlist =>
        playlist.name.toLowerCase().includes(query)
      )
    };
  }, [searchQuery]);
  
  const hasResults = filteredResults.tracks.length > 0 || 
                    filteredResults.artists.length > 0 || 
                    filteredResults.playlists.length > 0;
  
  return (
    <div className="pb-8">
      <div className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <SearchInput />
      </div>
      
      {!searchQuery.trim() ? (
        <div className="text-center py-12 text-zinc-400">
          <p>Search for songs, artists, or playlists</p>
        </div>
      ) : !hasResults ? (
        <div className="text-center py-12 text-zinc-400">
          <p>No results found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredResults.tracks.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Songs</h2>
              <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <tbody>
                    {filteredResults.tracks.map((track, index) => (
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
          )}
          
          {filteredResults.artists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredResults.artists.map(artist => (
                  <div 
                    key={artist.id}
                    className="text-center cursor-pointer"
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    <div className="mb-3 relative mx-auto w-32 h-32 overflow-hidden rounded-full">
                      <img 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium">{artist.name}</h3>
                    <p className="text-sm text-zinc-400">Artist</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {filteredResults.playlists.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredResults.playlists.map(playlist => (
                  <div 
                    key={playlist.id}
                    className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer"
                    onClick={() => navigate(`/playlist/${playlist.id}`)}
                  >
                    <div className="mb-4">
                      <img 
                        src={playlist.coverImage} 
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-md shadow-md"
                      />
                    </div>
                    <h3 className="font-semibold">{playlist.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{playlist.tracks.length} songs</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchView;