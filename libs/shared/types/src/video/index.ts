export interface Video {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  thumbnail?: string;
  duration: string;
  views?: number;
  uploadedAt: string;
  channel?: string;
  category?: string;
  creator: string;
  likes?: number;
  dislikes?: number;
  hashtags?: string[];
}

export interface VideoMeta {
  name: string;
  size: number;
  type: string;
  lastModifiedDate?: string;
  uploadedDate?: string;
  percent?: number;
  id?: string;
  status?: string;
  duration: number;
  videoWidth?: number;
  videoHeight?: number;
  fileUrl?: string;
  thumbnailUrl?: string;
  fullFrameUrl?: string;
  mpdPlaylistUrl?: string;
}

// export interface Channel {
//   id: string;
//   name: string;
//   description?: string;
//   thumbnail?: string;
//   subscribers?: number;
//   videos?: Video[];
//   likes?: number;
// }

// export interface Category {
//   id: string;
//   name: string;
//   description?: string;
//   thumbnail?: string;
//   videos?: Video[];
//   likes?: number;
// }

// export interface Creator {
//   id: string;
//   name: string;
//   avatarUrl: string;
// }
