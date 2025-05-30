export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  duration: number; // in seconds
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  coverImage: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  tracks: Track[];
  releaseYear: number;
}