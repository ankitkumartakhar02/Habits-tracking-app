
import { User } from '../types';

const USER_STORAGE_KEY = 'dhabits-user';

// Mock a user database or API call
const mockUser: User = {
  id: '12345-abcde',
  name: 'Alex Discipline',
  avatarUrl: `https://api.dicebear.com/8.x/initials/svg?seed=Alex%20Discipline`,
};

class AuthService {
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson);
  }

  loginWithGoogle(): User {
    // In a real app, this would involve a popup and communication with Google's OAuth service.
    // For this demo, we'll just simulate a successful login.
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  }

  logout(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export const authService = new AuthService();
