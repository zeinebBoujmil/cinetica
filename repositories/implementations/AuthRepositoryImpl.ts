import { AuthRepository } from "../interfaces/AuthRepository";

const API_BASE_URL = "/api/auth";

export class AuthRepositoryImpl implements AuthRepository {
  async login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || "Login failed" };
      }

      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, error: "Unexpected error occurred" };
    }
  }
}
