import axios, { AxiosResponse } from "axios";
import { GodUser, User } from "../types";
import { API_URL } from "../util/secrets";

export async function getUser(userId: string): Promise<User | null> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/users/${userId}`);
  return response.data;
}

export async function getGodUser(userId: string): Promise<GodUser | null> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/users/${userId}/god`);
  return response.data;
}
