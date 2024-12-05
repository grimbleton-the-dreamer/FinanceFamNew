// stores/useAuthStore.ts
import { defineStore } from 'pinia';
import { users } from './mockdata'; // Import your mock data
import { getUsers } from '../queries/users';
import axios from 'axios';
export const useAuthStore = defineStore('auth', {
    state: () => ({
        currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
        error: null,
    }),
    actions: {
        login(username, password) {
            // Find the user in the mock data
            axios.get("http://localhost:3000/api/users")
                .then(response => {
                console.log("USERS: ", response.data);
            });
            const user = users.find(u => u.name === username && u.password === password);
            if (user) {
                this.currentUser = user;
                this.error = null;
                localStorage.setItem('currentUser', JSON.stringify(user)); // Save to localStorage
            }
            else {
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
