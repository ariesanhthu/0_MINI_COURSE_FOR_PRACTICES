import React, { createContext, useContext, useState } from 'react';
import { Track, Playlist } from '../types';
import { mockPlaylists, mockTracks } from '../data/mockData';

type AppContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlists: Playlist[];
  searchQuery: string;
  setCurrentTrack: (track: Track) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setSearchQuery: (query: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(mockPlaylists);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    setCurrentTrack(mockTracks[nextIndex]);
  };

  const previousTrack = () => {
    if (!currentTrack) return;
    
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
    const previousIndex = (currentIndex - 1 + mockTracks.length) % mockTracks.length;
    setCurrentTrack(mockTracks[previousIndex]);
  };

  const value = {
    currentTrack,
    isPlaying,
    playlists,
    searchQuery,
    setCurrentTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;