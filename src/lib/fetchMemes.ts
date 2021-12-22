import axios, { AxiosResponse } from "axios";
import { GodMeme } from "../types";
import { API_URL } from "../util/secrets";

export default async function fetchMemes(): Promise<GodMeme[]> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/memes`);
  return response.data;
}
