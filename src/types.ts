export interface Meme {}

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
