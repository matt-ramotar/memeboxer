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
  created: Date;
  memeViewIds?: string[];
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
  created: Date;
  memeViews?: MemeView[];
}
export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  googleId: string;
  picture: string;
  usersFollowingIds?: string[];
  usersFollowedByIds?: string[];
  templateIds?: string[];
  memeIds?: string[];
  memeUpvoteIds?: string[];
  commentUpvoteIds?: string[];
  memeReactionIds?: string[];
  commentReactionIds?: string[];
  commentIds?: string[];
  actionIds?: string[];
  notificationIds?: string[];
  memeViewIds?: string[];
  feed?: string[];
}

export interface Template {
  id: string;
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
  id: string;
  userId: string;
  parentCommentId?: string;
  childrenCommentIds?: string[];
  body: string;
  commentUpvoteIds?: string[];
  commentReactionIds?: string[];
  memeId?: string;
  created: Date;
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
  created: Date;
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

export interface MemeReaction {
  id: string;
  memeId: string;
  reactionId: string;
  userId: string;
}

export interface Reaction {
  id: string;
  native?: string;
  name: string;
  colons?: string;
  skin?: number;
  isCustom: boolean;
  imageUrl: string;
}

export interface MemeView {
  id: string;
  memeId: string;
  userId: string;
  datetime: Date;
}
