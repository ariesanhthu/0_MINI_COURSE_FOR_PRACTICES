import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Player from './Player';
import ArtistView from '../views/ArtistView';
import PlaylistView from '../views/PlaylistView';
import HomeView from '../views/HomeView';
import SearchView from '../views/SearchView';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/playlist/:id" element={<PlaylistView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
            <Route path="/search" element={<SearchView />} />
          </Routes>
        </main>
      </div>
      <Player />
    </div>
  );
};

export default Layout;