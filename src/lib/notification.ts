import axios, { AxiosResponse } from "axios";
import { API_URL } from "../util/secrets";

export async function markAllNotificationsRead(userId: string): Promise<boolean> {
  const response: AxiosResponse = await axios.put(`${API_URL}/v1/users/${userId}/notifications/read`);
  return response.data;
}
