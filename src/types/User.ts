// User
interface FullName {
  name: string;
  nickname: string;
}

export default interface User {
  _id: string;
  fullName: FullName;
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


