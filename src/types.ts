export interface Meme {
  _id: string;
  templateId: string;
  userId: string;
  caption?: string;
  tagIds?: string[];
  location?: string;
  upvoteIds?: string[];
  commentIds?: string[];
  reactionIds?: string[];
}

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

export interface Template {
  _id: string;
  name: string;
  entityTag: string;
  memeIds?: string[];
  userId: string;
}

export interface GodTemplate {
  id: string;
  name: string;
  entityTag: string;
  memes?: Meme[];
  user: User;
}

export interface MemeUpvote {
  _id: string;
  memeId: string;
  userId: string;
}

export interface Comment {
  _id: string;
  userId: string;
  parentCommentId?: string;
  childrenCommentIds?: string[];
  body: string;
  commentUpvoteIds?: string[];
  commentReactionIds?: string[];
  memeId?: string;
}

export interface GodComment {
  id: string;
  user: User;
  parentComment?: Comment;
  childrenComments?: Comment[];
  body: string;
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  meme?: Meme;
}

export interface CommentUpvote {
  _id: string;
  commentId: string;
  userId: string;
}

export interface CommentReaction {
  _id: string;
  commentId: string;
  userId: string;
  reactionId: string;
}

export interface MemeReaction {}
