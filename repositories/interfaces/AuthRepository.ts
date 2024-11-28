export interface AuthRepository {
    login(username: string, password: string): Promise<{ success: boolean; error?: string }>;
  }
  