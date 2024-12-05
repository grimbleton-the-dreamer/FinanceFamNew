export interface User {
    userID: string;
    name: string;
    password: string;
    role: string;
    yearlySalary?: number;
    bankAmount?: number;
    adminID: number | null;
}
export interface Asset {
    assetID: string;
    userID: string;
    name: string;
    initialPurchaseDate: Date;
    purchasePrice: number;
    desiredLifeSpan: number;
}
export interface Expense {
    expenseID: string;
    userID: string;
    category: string;
    amount: number;
    dueDate: Date;
    description?: string;
    recurring: boolean;
    isPaid: boolean;
}
export interface Goal {
    goalID: string;
    userID: string;
    targetAmount: number;
    progress?: string;
    category: string;
    deadline: Date;
}
