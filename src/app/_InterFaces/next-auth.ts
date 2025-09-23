

import { DefaultSession } from "next-auth";

export interface CustomSession extends DefaultSession {
  user: {
    id: string;
  } & DefaultSession["user"];
  accessToken?: string;
}

export interface CustomUser {
  id: string;
  accessToken?: string;
}

export interface CustomJWT {
  id: string;
  accessToken?: string;
}

export interface ApiResponse {
  message: string;
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}
