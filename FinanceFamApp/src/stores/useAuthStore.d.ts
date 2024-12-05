import type { User } from './types';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", {
    currentUser: User | null;
    error: string | null;
}, {}, {
    login(username: string, password: string): void;
    logout(): void;
}>;
