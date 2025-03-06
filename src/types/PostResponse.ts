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
  author: string;
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

export type {Post};
