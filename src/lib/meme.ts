import axios, { AxiosResponse } from "axios";
import { GodMeme, MemeReaction, MemeView } from "../types";
import { API_URL } from "../util/secrets";

export interface CreateMemeInput {
  data: string;
  templateId: string;
  userId: string;
  caption?: string;
  tags?: string[];
  location?: string;
  text?: string[];
  memeTagInputs?: MemeTagInput[];
}

export interface MemeTagInput {
  userId: string;
  username: string;
  xOffset: number;
  yOffset: number;
}

export interface AddReactionInput {
  reactionId: string;
  userId: string;
}

export async function fetchGodMeme(memeId: string): Promise<GodMeme | null> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/memes/${memeId}`);
  return response.data;
}

export async function fetchMemes(): Promise<GodMeme[]> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/memes`);
  return response.data;
}

export async function createMemeView(memeId: string, userId: string): Promise<MemeView> {
  const response: AxiosResponse = await axios.post(`${API_URL}/v1/memeviews`, { memeId, userId });
  return response.data;
}

export async function createMeme(input: CreateMemeInput): Promise<GodMeme> {
  const response: AxiosResponse = await axios.post(`${API_URL}/v1/memes`, input);
  return response.data;
}

export async function addMemeReaction(memeId: string, body: AddReactionInput): Promise<MemeReaction> {
  const response: AxiosResponse = await axios.post(`${API_URL}/v1/memes/${memeId}/reactions`, body);
  return response.data;
}
