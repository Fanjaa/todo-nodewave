// Mendefinisikan tipe untuk AuthContext
export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  fullName: string | null;
  role: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
