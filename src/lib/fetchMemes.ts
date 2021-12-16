import axios, { AxiosResponse } from "axios";
import { FakeMeme } from "../types";

export interface FakeMemeResponse {
  count: number;
  memes: FakeMeme[];
}

export default async function fetchMemes(number: number): Promise<FakeMemeResponse> {
  const response: AxiosResponse = await axios.get(`https://meme-api.herokuapp.com/gimme/ProgrammerHumor/${number}`);
  return response.data;
}
