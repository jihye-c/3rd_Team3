// User
export interface UserFullName {
  name: string;
  nickname: string;
  scrapId ?: string;
  introduce ?: string;
}

export default interface User {
  _id: string;
  fullName: UserFullName | string;
  email: string;
  emailVerified: boolean;
  username: string | null;
  role: "Regular" | "Admin" | "SuperAdmin";
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