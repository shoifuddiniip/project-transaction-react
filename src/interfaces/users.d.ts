interface User {
  id: number;
  role_id: number;
  username: string;
  email: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

interface LoginPayload {
  user: User;
  token: string;
}

interface LoginForm {
  email: string;
  password: string;
}