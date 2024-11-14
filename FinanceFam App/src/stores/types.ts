export interface User {
    userID: string; // Unique identifier for each user
    name: string; // Full name of each user
    password: string; // Encrypted password for account security
    role: string; // User's role (admin or not)
    yearlySalary?: number; // Optional: salary earned over the course of a year
    bankAmount?: number; // Optional: current bank balance
    adminID: number | null;
}

export interface Asset {
    assetID: string; // Unique identifier for each asset
    userID: string; // Foreign key, links asset to user
    name: string; // Name of the asset
    initialPurchaseDate: Date; // Date the asset was purchased
    purchasePrice: number; // Purchase price of the asset
    desiredLifeSpan: number; // Desired life span of the asset in years
}

export interface Expense {
    expenseID: string; // Unique identifier for each expense
    userID: string; // Foreign key, links expense to user
    category: string; // Category of the expense (e.g., grocery, utilities, entertainment)
    amount: number; // Dollar amount of the expense
    dueDate: Date; // Date when the expense is due
    description?: string; // Optional: additional context about the expense
    recurring: boolean; // True if the expense is recurring, false if one-time
    isPaid: boolean;
}

export interface Goal {
    goalID: string; // Unique identifier for each goal
    userID: string; // Foreign key, links goal to user
    targetAmount: number; // The monetary amount associated with the goal
    progress?: string; // Optional: progress updates towards the goal
    category: string; // Category of the goal (savings or spending)
    deadline: Date; // Date by which the goal should be completed
}