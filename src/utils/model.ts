export interface IArtist {
  id: string;
  name: string;
}

export interface IImage {
  url: string;
  width?: number;
  height?: number;
}

export interface IAlbum {
  id: string;
  name: string;
  images: Array<IImage>;
}

export interface ITrackItem {
  uri: string;
  name: string;
  album: IAlbum;
  artists: Array<IArtist>;
}

export interface ITrack {
  href: string;
  items: Array<ITrackItem>;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
