export interface Meme {
  _id: string;
  id?: string;
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
  text?: string[];
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
  tags?: Tag[];
  text?: string[];
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

export interface Tag {
  id: string;
  tag: string;
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

export interface SearchResults {
  memes: Meme[];
  tags: Tag[];
  users: User[];
  comments: Comment[];
  templates: Template[];
}

export interface Notification {
  id: string;
  userId: string;
  actionId: string;
  isRead: boolean;
  created: Date;
}

export interface GodAction {
  id: string;
  type: ActionType;
  datetime: Date;
  user?: GodUser;
  otherUser?: GodUser;
  template?: Template;
  meme?: Meme;
  tag?: Tag;
  comment?: Comment;
  otherComment?: Comment;
  memeReaction?: MemeReaction;
  commentReaction?: CommentReaction;
}

export interface Action {
  id: string;
  type: ActionType;
  datetime: Date;
  userId?: string;
  otherUserId?: string;
  templateId?: string;
  memeId?: string;
  tagId?: string;
  commentId?: string;
  otherCommentId?: string;
  memeReactionId?: string;
  commentReactionId?: string;
}

export enum ActionType {
  AddTagToMeme = "ADD TAG TO MEME",
  AddCommentToMeme = "ADD COMMENT TO MEME",
  AddCommentToComment = "ADD COMMENT TO COMMENT",
  CreateTemplate = "CREATE TEMPLATE",
  CreateMeme = "CREATE MEME",
  FollowUser = "FOLLOW USER",
  FollowTag = "FOLLOW TAG",
  ReactToComment = "REACT TO COMMENT",
  ReactToMeme = "REACT TO MEME",
  UpvoteComment = "UPVOTE COMMENT",
  UpvoteMeme = "UPVOTE MEME",
}

export interface GodUser {
  id: string;
  name: string;
  email: string;
  username: string;
  googleId: string;
  picture?: string;
  usersFollowing?: User[];
  usersFollowedBy?: User[];
  tagsFollowing?: Tag[];
  memes?: Meme[];
  memeUpvotes?: MemeUpvote[];
  memeReactions?: MemeReaction[];
  comments?: Comment[];
  commentUpvotes?: CommentUpvote[];
  commentReactions?: CommentReaction[];
  actions?: Action[];
}
