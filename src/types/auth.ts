export interface User {
  id: number;
  nombre: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface AuthData {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
