// Mock Data for Users, Assets, Expenses, and Goals
// Users
const users = [
    { userID: '1', name: 'Admin One', password: 'password123', role: 'admin', yearlySalary: 120000, bankAmount: 50000, adminID: null },
    { userID: '2', name: 'Admin Two', password: 'password456', role: 'admin', yearlySalary: 100000, bankAmount: 70000, adminID: null },
    { userID: '3', name: 'User Three', password: 'password789', role: 'user', yearlySalary: 80000, bankAmount: 30000, adminID: 1 },
    { userID: '4', name: 'User Four', password: 'password321', role: 'user', yearlySalary: 75000, bankAmount: 20000, adminID: 1 },
    { userID: '5', name: 'User Five', password: 'password654', role: 'user', yearlySalary: 65000, bankAmount: 15000, adminID: 1 },
    { userID: '6', name: 'User Six', password: 'password987', role: 'user', yearlySalary: 70000, bankAmount: 25000, adminID: 1 },
    { userID: '7', name: 'User Seven', password: 'password1234', role: 'user', yearlySalary: 90000, bankAmount: 40000, adminID: 2 },
    { userID: '8', name: 'User Eight', password: 'password4321', role: 'user', yearlySalary: 85000, bankAmount: 35000, adminID: 2 },
    { userID: '9', name: 'User Nine', password: 'password5678', role: 'user', yearlySalary: 60000, bankAmount: 10000, adminID: 2 },
    { userID: '10', name: 'User Ten', password: 'password8765', role: 'user', yearlySalary: 95000, bankAmount: 45000, adminID: 2 },
];
// Assets
const assets = [
    { assetID: '1', userID: '1', name: 'Car', initialPurchaseDate: new Date('2019-01-01'), purchasePrice: 25000, desiredLifeSpan: 5 },
    { assetID: '2', userID: '2', name: 'House', initialPurchaseDate: new Date('2015-06-01'), purchasePrice: 300000, desiredLifeSpan: 30 },
    { assetID: '3', userID: '3', name: 'Laptop', initialPurchaseDate: new Date('2023-09-15'), purchasePrice: 1500, desiredLifeSpan: 3 },
    { assetID: '11', userID: '3', name: 'Laptop2', initialPurchaseDate: new Date('2023-09-15'), purchasePrice: 1500, desiredLifeSpan: 10 },
    { assetID: '4', userID: '4', name: 'Bike', initialPurchaseDate: new Date('2020-08-10'), purchasePrice: 800, desiredLifeSpan: 10 },
    { assetID: '5', userID: '5', name: 'Smartphone', initialPurchaseDate: new Date('2022-02-20'), purchasePrice: 1000, desiredLifeSpan: 2 },
    { assetID: '6', userID: '6', name: 'Tablet', initialPurchaseDate: new Date('2023-01-25'), purchasePrice: 600, desiredLifeSpan: 3 },
    { assetID: '7', userID: '7', name: 'Gaming Console', initialPurchaseDate: new Date('2018-12-05'), purchasePrice: 500, desiredLifeSpan: 5 },
    { assetID: '8', userID: '8', name: 'Fridge', initialPurchaseDate: new Date('2016-03-10'), purchasePrice: 1200, desiredLifeSpan: 15 },
    { assetID: '9', userID: '9', name: 'Washing Machine', initialPurchaseDate: new Date('2017-04-15'), purchasePrice: 700, desiredLifeSpan: 10 },
    { assetID: '10', userID: '10', name: 'TV', initialPurchaseDate: new Date('2019-11-20'), purchasePrice: 900, desiredLifeSpan: 8 },
];
// Expenses
const expenses = [
    { expenseID: '1', userID: '1', category: 'Utilities', amount: 200, dueDate: new Date('2023-11-10'), recurring: true, isPaid: false },
    { expenseID: '2', userID: '2', category: 'Rent', amount: 1200, dueDate: new Date('2023-11-01'), recurring: true, isPaid: false },
    { expenseID: '3', userID: '3', category: 'Groceries', amount: 300, dueDate: new Date('2023-11-07'), recurring: true, isPaid: false },
    { expenseID: '4', userID: '4', category: 'Entertainment', amount: 150, dueDate: new Date('2023-11-12'), recurring: false, isPaid: false },
    { expenseID: '5', userID: '5', category: 'Car Insurance', amount: 100, dueDate: new Date('2023-12-10'), recurring: true, isPaid: false },
    { expenseID: '6', userID: '6', category: 'Health Insurance', amount: 250, dueDate: new Date('2023-11-15'), recurring: true, isPaid: false },
    { expenseID: '7', userID: '7', category: 'Internet', amount: 70, dueDate: new Date('2023-11-05'), recurring: true, isPaid: false },
    { expenseID: '8', userID: '8', category: 'Gym', amount: 50, dueDate: new Date('2023-11-20'), recurring: true, isPaid: false },
    { expenseID: '9', userID: '9', category: 'Utilities', amount: 180, dueDate: new Date('2023-11-10'), recurring: true, isPaid: false },
    { expenseID: '10', userID: '10', category: 'Streaming Service', amount: 15, dueDate: new Date('2023-11-25'), recurring: true, isPaid: false },
];
// Goals
const goals = [
    { goalID: '1', userID: '1', targetAmount: 20000, progress: '50%', category: 'savings', deadline: new Date('2024-06-01') },
    { goalID: '2', userID: '2', targetAmount: 15000, progress: '30%', category: 'savings', deadline: new Date('2024-12-01') },
    { goalID: '3', userID: '3', targetAmount: 10000, progress: '70%', category: 'spending', deadline: new Date('2024-12-12') },
    { goalID: '4', userID: '4', targetAmount: 5000, progress: '20%', category: 'savings', deadline: new Date('2024-08-15') },
    { goalID: '5', userID: '5', targetAmount: 12000, progress: '40%', category: 'savings', deadline: new Date('2024-12-01') },
    { goalID: '6', userID: '6', targetAmount: 8000, progress: '60%', category: 'spending', deadline: new Date('2024-05-01') },
    { goalID: '7', userID: '7', targetAmount: 7000, progress: '10%', category: 'savings', deadline: new Date('2024-07-01') },
    { goalID: '8', userID: '8', targetAmount: 6000, progress: '80%', category: 'spending', deadline: new Date('2024-04-01') },
    { goalID: '9', userID: '9', targetAmount: 4000, progress: '25%', category: 'savings', deadline: new Date('2024-10-01') },
    { goalID: '10', userID: '10', targetAmount: 9000, progress: '45%', category: 'savings', deadline: new Date('2024-11-01') },
];
// Export the mock data
export { users, assets, expenses, goals };
