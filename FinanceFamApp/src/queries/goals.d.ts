export interface Goal {
    goalID: string;
    userID: string;
    targetAmount: number;
    progress: string;
    category: string;
    deadline: string;
}
export declare function getGoalsByUserId(userID: string): Promise<Goal[]>;
export declare function createGoal(goal: Goal): Promise<boolean>;
