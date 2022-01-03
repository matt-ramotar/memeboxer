import axios, { AxiosResponse } from "axios";
import { GodUser, User, UserActivity } from "../types";
import { API_URL } from "../util/secrets";

export async function getUser(userId: string): Promise<User | null> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/users/${userId}`);
  return response.data;
}

export async function getGodUser(userId: string): Promise<GodUser | null> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/users/${userId}/god`);
  return response.data;
}

export async function getUserActivity(userId: string): Promise<UserActivity> {
  const response: AxiosResponse = await axios.get(`${API_URL}/v1/users/${userId}/activity`);
  return response.data;
}

export async function followUser(userId: string, otherUserId: string): Promise<User> {
  const response = await axios.put(`${API_URL}/v1/users/${userId}/followers/${otherUserId}/follow`);
  return response.data;
}
