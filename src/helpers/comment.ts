import { Comment, GodComment } from "../types";

export function godCommentToComment(godComment: GodComment): Comment {
  return {
    id: godComment.id,
    userId: godComment.user.id,
    memeId: godComment.meme.id,
    parentCommentId: godComment.parentComment?.id,
    body: godComment.body,
    created: godComment.created,
    isDirect: godComment.isDirect,
  };
}
