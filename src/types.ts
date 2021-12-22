export interface Meme {}

export interface GodMeme {
  id: string;
  template: Template;
  user: User;
  caption?: string;
  location?: string;
  upvotes?: MemeUpvote[];
  comments?: Comment[];
  reactions?: MemeReaction[];
}
export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  googleId: string;
  picture: string;
}

export interface FakeMeme {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
}

export interface Template {
  _id: string;
}

export interface MemeUpvote {}

export interface Comment {}

export interface MemeReaction {}
