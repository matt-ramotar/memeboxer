import axios, { AxiosResponse } from "axios";
import { User } from "../types";
import { VALIDATE_TOKEN } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export interface ValidateTokenSuccess {
  user: User;
  token: string;
}

export default async function validateToken(token: string): Promise<ValidateTokenSuccess> {
  const response: AxiosResponse = await axios.post(API_URL + VALIDATE_TOKEN, {
    token,
  });

  return response.data;
}
