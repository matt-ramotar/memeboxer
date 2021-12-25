import axios, { AxiosResponse } from "axios";
import { MemeView } from "../types";
import { API_URL } from "../util/secrets";

export default async function createMemeView(memeId: string, userId: string): Promise<MemeView> {
  const response: AxiosResponse = await axios.post(`${API_URL}/v1/memeviews`, { memeId, userId });
  return response.data;
}
