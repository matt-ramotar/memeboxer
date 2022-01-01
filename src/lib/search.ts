import axios, { AxiosResponse } from "axios";
import { User } from "../types";
import { API_URL } from "../util/secrets";

export async function searchForUsers(input: string): Promise<User[]> {
    const response: AxiosResponse = await axios.post(`${API_URL}/v1/search/users`, { input });
    return response.data;
}
