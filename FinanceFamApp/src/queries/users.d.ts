export interface User {
    userID: string;
    name: string;
    password: string;
    role: string;
    yearlySalary: number;
    bankAmount: number;
    adminID: string | null;
}
export declare function getUsers(): Promise<User[]>;
export declare function getUserById(userID: string): Promise<User | null>;
export declare function createUser(user: User): Promise<boolean>;
