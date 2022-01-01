import axios from "axios";
import { GodComment } from "../types";
import { API_URL } from "../util/secrets";

export async function fetchGodComment(commentId: string): Promise<GodComment | null> {
  const response = await axios.get(`${API_URL}/v1/comments/${commentId}/god`);
  return response.data;
}

export async function createComment(userId: string, body: string, memeId: string, isDirect: boolean, parentCommentId?: string): Promise<GodComment> {
  const response = await axios.post(`${API_URL}/v1/comments`, { userId, body, parentCommentId, memeId, isDirect });
  return response.data;
}
