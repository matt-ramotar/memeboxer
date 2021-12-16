import axios, { AxiosResponse } from "axios";
import { User } from "../types";
import { CONTINUE_WITH_GOOGLE } from "../util/endpoints";
import { API_URL } from "../util/secrets";

interface ContinueWithGoogleSuccess {
  user: User;
  token: string;
}

export default async function continueWithGoogle(email: string, username: string, name: string, googleId: string, picture: string): Promise<ContinueWithGoogleSuccess> {
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
