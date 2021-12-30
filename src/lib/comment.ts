import axios from "axios";
import { GodComment } from "../types";
import { API_URL } from "../util/secrets";

export async function fetchGodComment(commentId: string): Promise<GodComment | null> {
  const response = await axios.get(`${API_URL}/v1/comments/${commentId}/god`);
  return response.data;
}
