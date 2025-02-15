export interface LoginResponse {
    success: boolean;
    token: string;
  }
  
  export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  