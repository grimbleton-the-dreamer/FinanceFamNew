<template>
    <div class="d-flex align-items-center justify-content-between home-page">
        <div class="d-flex flex-column">
            <!-- Charts Area -->
            <div class="d-flex flex-column area-small">
                <div class="d-flex bg-green area-head">
                    Charts
                </div>

                <!-- Chart canvases -->
                <div class="d-flex bg-blue chart-container">

                    <!-- Income vs. expenses chart -->
                    <div class="test2">
                        <p class="chart-title">Income vs Expenses</p>
                        <canvas ref="incomeExpensesChart" class="chart-canvas"></canvas>
                    </div>

                    <!-- Remaining monthly budget chart -->
                    <div class="test">
                        <p class="chart-title">Remaining Budget</p>
                        <canvas ref="remainingBudgetChart" class="chart-canvas circle-chart"></canvas>
                    </div>

                    <!-- Asset depreciation chart -->
                    <div class="test2">
                        <p class="chart-title">Asset Depreciation</p>
                        <canvas ref="assetDepreciationChart" class="chart-canvas"></canvas>
                    </div>

                    <!-- Monthly expenses chart -->
                    <div class="test2">
                        <p class="chart-title">Monthly Expenses</p>
                        <canvas ref="monthlyExpenseChart" class="chart-canvas"></canvas>
                    </div>

                    <!-- Goals progress chart -->
                    <div class="test2">
                        <div v-if="userGoals.length" class="goal-progress-container">
                            <div v-for="(goal, index) in userGoals" :key="goal.goalID" class="goal-chart">
                                <p class="chart-title">
                                    Goal: {{ goal.category }} (ID: {{ goal.goalID }})
                                </p>
                                <canvas :ref="el => (goalCharts[index] = el as HTMLCanvasElement)"
                                    class="goal-chart-canvas chart-canvas"></canvas>
                                <p>Target Amount: ${{ goal.targetAmount }}</p>
                                <p>Deadline: {{ formatDate(goal.deadline) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Expenses form -->
            <div class="d-flex flex-column area-small">
                <div class="d-flex bg-green area-head">
                    Add a Recurring Expense
                </div>
                <div class="d-flex flex-column bg-blue expense-form">
                    <form @submit.prevent="handleSubmit" class="d-flex flex-column">
                        <label for="category" class="form-label">Expense Category:</label>
                        <input type="text" id="category" v-model="newExpense.category" class="form-input"
                            placeholder="e.g., Rent" required />

                        <label for="amount" class="form-label">Amount:</label>
                        <input type="number" id="amount" v-model="newExpense.amount" class="form-input"
                            placeholder="e.g., 500" required />

                        <label for="dueDate" class="form-label">Due Date:</label>
                        <input type="date" id="dueDate" v-model="newExpense.dueDate" class="form-input" required />

                        <label for="isRecurring" class="form-label">Recurring:</label>
                        <select id="isRecurring" v-model="newExpense.recurring" class="form-input" required>
                            <option :value="true">Yes</option>
                            <option :value="false">No</option>
                        </select>

                        <button type="submit" class="submit-button">Add Expense</button>
                    </form>
                </div>
            </div>

        </div>

        <!-- Notifications Area -->
        <div class="d-flex flex-column bg-green area-large">
            <div class="d-flex bg-green area-head">
                Notifications
            </div>
            <div class="d-flex bg-blue notifications-container">
                <div v-for="notification in notifications" :key="notification.id" class="notification-item">
                    <p class="notification-title">{{ notification.title }}</p>
                    <p class="notification-message">{{ notification.message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { Chart } from 'chart.js/auto';
import { useAuthStore } from '../stores/useAuthStore';
import { users as Users, assets as Assets, expenses as Expenses, goals as Goals } from '../stores/mockdata';
import { User, Asset, Expense, Goal } from '../stores/types'; 

//Variables for storing user data
const users = ref<User[]>(Users); //This is an array, because admins will manage multiple users
const assets = ref<Asset[]>(Assets);
const expenses = ref<Expense[]>(Expenses);
const goals = ref<Goal[]>(Goals);

const authStore = useAuthStore();

// Reactive variable to hold expense form data 
const newExpense = ref({
    category: '',
    amount: 0,
    dueDate: '',
    recurring: true,
    isPaid: false,
});

// Submits the data in the expense form
const handleSubmit = async () => {
    console.log('New expense data:', newExpense.value);
    if (!(userID.value.length > 0)) return;

    //CHANGE THIS
    const expenseID = (expenses.value.length + 1).toString(); // Generate a new ID based on the array length CHANGE THIS

    const newExpenseData = {
        expenseID,
        userID: userID.value,
        category: newExpense.value.category,
        amount: newExpense.value.amount,
        dueDate: new Date(newExpense.value.dueDate),
        recurring: newExpense.value.recurring,
        isPaid: false,
    };

    expenses.value.push(newExpenseData); // Append the new expense to the mock data array
    console.log('New expense added:', newExpenseData);

    // Clear the form fields after submission
    newExpense.value = {
        category: '',
        amount: 0,
        dueDate: '',
        recurring: true,
        isPaid: false,
    };
    console.log(expenses.value);

    //Reload the charts to reflect new data 
    userGoals.value = goals.value.filter(goal => goal.userID === userID.value);
    await nextTick();
    setupIncomeExpensesChart();
    setupRemainingBudgetChart();
    setupAssetDepreciationChart();
    setupGoalProgressCharts();
    setupMonthlyExpenseChart();
};

const userID = ref<string>(authStore.currentUser?.userID ?? '');

// References to the charts
const incomeExpensesChart = ref<HTMLCanvasElement | null>(null);
const remainingBudgetChart = ref<HTMLCanvasElement | null>(null);
const assetDepreciationChart = ref<HTMLCanvasElement | null>(null);
const monthlyExpenseChart = ref<HTMLCanvasElement | null>(null);

const totalExpenses = ref(0);
const remainingBudget = ref(0);
const goalProgress = ref(0);

const goalCharts = ref<HTMLCanvasElement[]>([]);
const userGoals = ref<Goal[]>([]);

const notifications = ref<{ id: string; title: string; message: string }[]>([]);

const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
};

// Generate notifications for unpaid expenses and upcoming goals
const today = new Date();
expenses.value.forEach(expense => {
    if (expense.userID === userID.value && !expense.isPaid) {
        const isPastDue = expense.dueDate < today;
        notifications.value.push({
            id: `expense-${expense.expenseID}`,
            title: `Unpaid Expense: ${expense.category}`,
            message: isPastDue
                ? `Your ${expense.category} expense of $${expense.amount} is past due.`
                : `You have an unpaid ${expense.category} expense of $${expense.amount} due on ${expense.dueDate.toLocaleDateString()}.`
        });
    }
});

// Only add goals if the target amount is less than $10,000
goals.value.forEach(goal => {
    if (goal.userID === userID.value) {
        const deadline = new Date(goal.deadline);
        const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysRemaining <= 30) {
            const progressValue = parseFloat(goal.progress?.replace('%', '') || '0') / 100;
            const spentAmount = goal.targetAmount * progressValue;
            notifications.value.push({
                id: `goal-${goal.goalID}`,
                title: `Upcoming Goal: ${goal.category}`,
                message: goal.category === 'savings'
                    ? `Your goal of $${goal.targetAmount} in ${goal.category} is ${goal.progress} complete and has a deadline in ${daysRemaining} days.`
                    : `You have spent $${spentAmount} of your $${goal.targetAmount} goal. This goal period ends in ${daysRemaining} days.`
            });
        }
    }
});

// Income vs Expenses Chart
const setupIncomeExpensesChart = () => {
    if (incomeExpensesChart.value) {
        const user = users.value.find(user => user.userID === userID.value);
        new Chart(incomeExpensesChart.value, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [
                    {
                        label: 'Amount',
                        data: [
                            user?.yearlySalary || 0,
                            expenses.value
                                .filter(expense => expense.userID === userID.value)
                                .reduce((total, exp) => total + exp.amount, 0),
                        ],
                        backgroundColor: ['#4CAF50', '#FF5252'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                            },
                            color: 'black',
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 14,
                            },
                            color: 'black',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 14,
                            },
                            color: 'black',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                },
            },
        });
    }
};

// Remaining Budget Chart
const setupRemainingBudgetChart = () => {
    if (remainingBudgetChart.value) {
        const user = users.value.find(user => user.userID === userID.value);
        const userExpenses = expenses.value.filter(expense => expense.userID === userID.value);
        const totalSpent = userExpenses.reduce((total, expense) => {
            if (expense.isPaid) return total;
            if (expense.recurring) {
                const monthsElapsed = Math.floor(
                    (new Date().getTime() - new Date(expense.dueDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
                );
                return total + expense.amount * Math.max(1, monthsElapsed);
            } else {
                return total + expense.amount;
            }
        }, 0);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const recentAssets = assets.value.filter(
            asset => asset.userID === userID.value && new Date(asset.initialPurchaseDate) >= oneMonthAgo
        );

        const totalAssetCost = recentAssets.reduce((total, asset) => total + asset.purchasePrice, 0);

        const totalSpentIncludingAssets = totalSpent + totalAssetCost;
        const remaining = (user?.bankAmount || 0) - totalSpentIncludingAssets;

        new Chart(remainingBudgetChart.value, {
            type: 'doughnut',
            data: {
                labels: ['Remaining Budget', 'Spent'],
                datasets: [
                    {
                        label: 'Budget',
                        data: [remaining, totalSpentIncludingAssets],
                        backgroundColor: ['#4CAF50', '#FF5252'],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                            },
                            color: 'black',
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: $${context.parsed}`;
                            },
                        },
                    },
                },
            },
        });
    }
};

// Asset Depreciation Chart
const setupAssetDepreciationChart = () => {
    if (assetDepreciationChart.value) {
        const userAssets = assets.value.filter(asset => asset.userID === userID.value);

        const datasets = userAssets.map(asset => {
            const data = [];
            const depreciationRate = asset.purchasePrice / asset.desiredLifeSpan;

            for (let year = 0; year <= asset.desiredLifeSpan; year++) {
                const depreciatedValue = Math.max(
                    0,
                    asset.purchasePrice - depreciationRate * year
                );
                data.push(depreciatedValue);
            }

            return {
                label: asset.name,
                data,
                borderColor: getRandomColor(),
                backgroundColor: 'transparent',
                fill: false,
            };
        });

        new Chart(assetDepreciationChart.value, {
            type: 'line',
            data: {
                labels: Array.from(
                    { length: Math.max(...userAssets.map(a => a.desiredLifeSpan)) + 1 },
                    (_, i) => `Year ${i}`
                ),
                datasets,
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Depreciated Value ($)', color: 'black' },
                        ticks: {
                            font: {
                                size: 12,
                            },
                            color: 'black',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                    x: {
                        title: { display: true, text: 'Years Since Purchase', color: 'black' },
                        ticks: {
                            font: {
                                size: 12,
                            },
                            color: 'black',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 12,
                            },
                            color: 'black',
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
                            },
                        },
                    },
                },
            },
        });
    }
};

// Helper function to generate a random color for each asset line
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Goal Progress Charts (Pie Charts)
const setupGoalProgressCharts = () => {
    userGoals.value.forEach((goal, index) => {
        const progressValue = parseFloat(goal.progress?.replace('%', '') || '0');
        const ctx = goalCharts.value[index];

        if (ctx) {
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Progress', 'Remaining'],
                    datasets: [
                        {
                            data: [progressValue, 100 - progressValue],
                            backgroundColor: ['#4CAF50', '#E0E0E0'],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                },
                                color: 'black',
                            },
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `${context.label}: ${context.parsed}%`;
                                },
                            },
                        },
                    },
                },
            });
        }
    });
};

// Monthly Expense Chart
const setupMonthlyExpenseChart = () => {
    if (monthlyExpenseChart.value) {
        const monthlyExpenses = Array(12).fill(0);
        expenses.value
            .filter(expense => expense.userID === userID.value)
            .forEach(expense => {
                const month = new Date(expense.dueDate).getMonth();
                monthlyExpenses[month] += expense.amount;
            });
        new Chart(monthlyExpenseChart.value, {
            type: 'line',
            data: {
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                datasets: [
                    {
                        label: 'Expenses',
                        data: monthlyExpenses,
                        borderColor: '#FF5252',
                        backgroundColor: 'transparent',
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                            },
                            color: 'black',
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 12,
                            },
                            color: 'black',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 12,
                            },
                            color: 'black',
                        },
                        grid: {
                            color: 'black',
                        },
                    },
                },
            },
        });
    }
};

watch(userID, async () => {
    userGoals.value = goals.value.filter(goal => goal.userID === userID.value);
    await nextTick();
    goalCharts.value = [];
    setupIncomeExpensesChart();
    setupRemainingBudgetChart();
    setupAssetDepreciationChart();
    setupGoalProgressCharts();
    setupMonthlyExpenseChart();
});

//Load each chart 
onMounted(async () => {
    userGoals.value = goals.value.filter(goal => goal.userID === userID.value);
    await nextTick();
    setupIncomeExpensesChart();
    setupRemainingBudgetChart();
    setupAssetDepreciationChart();
    setupGoalProgressCharts();
    setupMonthlyExpenseChart();
});
</script>

<style scoped lang="less">
.expense-form {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.test {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.test2 {
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

.chart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: black;
}

.chart-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
}

.chart-canvas {
    flex: 1 1 100%;
    max-width: 100%;
    aspect-ratio: 2 / 1;
    margin: 10px 0;
}

.circle-chart {
    aspect-ratio: 1;
}

.goal-progress-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
}

.goal-chart {
    flex: 1 1 100%;
    max-width: 100%;
    text-align: center;
    margin: 10px 0;
}

.goal-chart-canvas {
    width: 100% !important;
    aspect-ratio: 1 / 1;
}

.bg-green {
    background-color: #78bd80;
}

.d-flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.bg-blue {
    background-color: #6a93c1;
}

.justify-content-between {
    justify-content: space-between;
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInUp 1s ease-out forwards;
    opacity: 0;
}

.home-page {
    justify-content: space-between;
    width: 80%;
    margin-left: 20rem;
    margin-right: 10rem;
    margin-top: 5rem;

    .home-wrapper {
        display: flex;
        margin-left: 20rem;
        flex-direction: column;
        border-top-left-radius: 5px;
        border-left: 1px solid white;
        border-top: 1px solid white;
        padding: 1rem;

        .welcome,
        .welcome-sub,
        .welcome-body {
            color: white;
            font-weight: 100;
            line-height: 12px;
        }

        .welcome {
            font-size: 48px;
            margin-bottom: 2rem;
        }

        .welcome-body {
            line-height: 24px;
        }
    }

    .dice-container {
        margin-left: 2rem;
    }
}

.area-small {
    height: auto;
    background-color: #6a93c1;
    width: 60vw;
    margin-bottom: 2vh;
}

.area-small,
.area-large {
    border-radius: 8px;
}

.area-head {
    font-family: 'Inter', sans-serif;
    color: white;
    font-size: 24px;
    font-weight: 700;
    font-style: italic;
    justify-content: center;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 0.25rem;
}

.area-large {
    height: 80vh;
    background-color: #6a93c1;
    width: 15vw;
}

.area-small .bg-blue {
    padding: 10px;
}

/* Notifications Styles */
.notifications-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    overflow-y: auto;
}

.notification-item {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 0.5s ease-out;
}

.notification-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.notification-message {
    font-size: 14px;
    color: #555;
}

.expense-form {
    padding: 20px;
    gap: 10px;
    border-radius: 8px;
}

.form-label {
    color: black;
    font-size: 14px;
    margin-bottom: 5px;
}

.form-input {
    padding: 10px;
    border: none;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;

}

.submit-button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #78bd80;
    color: white;
    font-size: 16px;
    cursor: pointer;
    align-self: center;
    width: 50%;
    text-align: center;
}

.submit-button:hover {
    background-color: #89ce91;
}
</style>
