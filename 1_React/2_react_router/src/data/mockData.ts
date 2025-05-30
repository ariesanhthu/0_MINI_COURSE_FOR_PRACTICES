import { Track, Playlist, Artist, Album } from '../types';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    albumCover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 158
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumCover: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 200
  },
  {
    id: '3',
    title: 'Someone You Loved',
    artist: 'Lewis Capaldi',
    albumCover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 182
  },
  {
    id: '4',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    albumCover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 210
  },
  {
    id: '5',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    albumCover: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
    duration: 174
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    tracks: [mockTracks[0], mockTracks[2], mockTracks[4]],
    coverImage: 'https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    name: 'Workout Mix',
    tracks: [mockTracks[1], mockTracks[3]],
    coverImage: 'https://images.pexels.com/photos/1071882/pexels-photo-1071882.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    name: 'Drive Playlist',
    tracks: [mockTracks[0], mockTracks[1], mockTracks[3]],
    coverImage: 'https://images.pexels.com/photos/2078071/pexels-photo-2078071.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Post Malone',
    image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Austin Richard Post, known professionally as Post Malone, is an American rapper, singer, and songwriter.'
  },
  {
    id: '2',
    name: 'The Weeknd',
    image: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer.'
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'Hollywood\'s Bleeding',
    artist: 'Post Malone',
    coverImage: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=600',
    tracks: [mockTracks[0]],
    releaseYear: 2019
  },
  {
    id: '2',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverImage: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=600',
    tracks: [mockTracks[1]],
    releaseYear: 2020
  }
];