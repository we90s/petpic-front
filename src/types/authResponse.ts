export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  username: string;
}

export interface AuthStatusResponse {
  success: boolean;
  message?: string;
  email?: string;
}
