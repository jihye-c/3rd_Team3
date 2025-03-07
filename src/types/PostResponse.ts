interface Channel {
  authRequired: boolean;
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  _id: string;
  image: string;
  imagePublicId: string;
  title: string;
  channel: Channel;
  author: Author;
  createdAt: string;
  updatedAt: string;
  likes: Like[];
  comments: Comment[];
}

interface Like {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string;
  comment: string;
  author: string;
  post: string;
  createdAt: string;
  updatedAt: string;
}

interface Author {
  _id: string;
  fullName: string;
  email: string;
  image: string | null;
  emailVerified: boolean;
  username: string | null;
  role: 'Regular' | 'Admin' | 'SuperAdmin';
  isOnline: boolean;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
  followers: string[];
  following: string[];
  likes: string[];
  comments: string[];
  messages: string[];
  notifications: string[];
  posts: string[];
  __v: number;
}

export type {Post, Author};
