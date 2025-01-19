export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    fullName: string;
  }
  
  export interface AuthResponse {
    token: string;
  }