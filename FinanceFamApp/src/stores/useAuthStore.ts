// stores/useAuthStore.ts
import { defineStore } from 'pinia';
import { users } from './mockdata'; // Import your mock data
import type { User } from './types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null,
    error: null as string | null,
  }),
  actions: {
    login(username: string, password: string) {
      // Find the user in the mock data
      const user = users.find(u => u.name === username && u.password === password);

      if (user) {
        this.currentUser = user;
        this.error = null;
        localStorage.setItem('currentUser', JSON.stringify(user)); // Save to localStorage
      } else {
        this.currentUser = null;
        this.error = 'Invalid username or password';
        localStorage.removeItem('currentUser'); // Clear localStorage if login fails
      }
    },
    logout() {
      this.currentUser = null;
      this.error = null;
      localStorage.removeItem('currentUser'); // Remove from localStorage on logout
    },
  },
});
