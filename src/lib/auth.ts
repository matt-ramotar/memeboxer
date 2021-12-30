import axios, { AxiosResponse } from "axios";
import { User } from "../types";
import { CONTINUE_WITH_GOOGLE, VALIDATE_TOKEN } from "../util/endpoints";
import { API_URL } from "../util/secrets";

export interface ValidateTokenSuccess {
  user: User;
  token: string;
}

export interface ContinueWithGoogleSuccess {
  user: User;
  token: string;
}

export async function validateToken(token: string): Promise<ValidateTokenSuccess> {
  const response: AxiosResponse = await axios.post(API_URL + VALIDATE_TOKEN, {
    token,
  });

  return response.data;
}

export async function continueWithGoogle(email: string, username: string, name: string, googleId: string, picture: string): Promise<ContinueWithGoogleSuccess> {
  const response: AxiosResponse = await axios.post(API_URL + CONTINUE_WITH_GOOGLE, {
    email,
    username,
    name,
    googleId,
    picture,
  });

  const data: ContinueWithGoogleSuccess = response.data;

  return data;
}
