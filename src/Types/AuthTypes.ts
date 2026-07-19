export interface RegisterData {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User extends RegisterData {
  token: string;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface AuthState {
  user: User;
  status: Status;
}
