export interface UserPayload {
  id: string;
  name: string;
  username: string;
  email: string;
  photo?: string;
  password: string;
  role?: string;
  password_change_token?: string;
  is_active?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
