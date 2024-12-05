import { ref, onMounted, watch, nextTick, defineProps } from 'vue';
import { Chart } from 'chart.js/auto';
import { useAuthStore } from '../stores/useAuthStore';
import { users as Users, assets as Assets, expenses as Expenses, goals as Goals } from '../stores/mockdata';
import {} from '../stores/types';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    userId: {
        type: String,
        required: true
    }
});
// Reactive variables
const users = ref(Users);
const assets = ref(Assets);
const expenses = ref(Expenses);
const goals = ref(Goals);
const managedUsers = ref([]);
const authStore = useAuthStore();
const userID = ref(props.userId);
const isAdmin = ref(false);
const userGoals = ref([]);
const currentUser = ref(users.value.find(e => e.userID == userID.value));
// Chart instances
let incomeExpensesChartInstance = null;
let remainingBudgetChartInstance = null;
let assetDepreciationChartInstance = null;
let monthlyExpenseChartInstance = null;
let goalChartInstances = [];
// References to the chart canvases
const incomeExpensesChart = ref(null);
const remainingBudgetChart = ref(null);
const assetDepreciationChart = ref(null);
const monthlyExpenseChart = ref(null);
const goalCharts = ref([]);
// Reactive variable to hold expense form data 
const newExpense = ref({
    category: '',
    amount: 0,
    dueDate: '',
    recurring: true,
    isPaid: false,
});
// Function to handle expense form submission
const handleSubmit = async () => {
    console.log('New expense data:', newExpense.value);
    if (!(userID.value.length > 0))
        return;
    const expenseID = (expenses.value.length + 1).toString();
    const newExpenseData = {
        expenseID,
        userID: userID.value,
        category: newExpense.value.category,
        amount: newExpense.value.amount,
        dueDate: new Date(newExpense.value.dueDate),
        recurring: newExpense.value.recurring,
        isPaid: false,
    };
    expenses.value.push(newExpenseData);
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
    // Reload the charts to reflect new data 
    userGoals.value = goals.value.filter(goal => goal.userID === userID.value);
    await nextTick();
    goalCharts.value = [];
    setupIncomeExpensesChart();
    setupRemainingBudgetChart();
    setupAssetDepreciationChart();
    //setupGoalProgressCharts();
    setupMonthlyExpenseChart();
};
// Determine admin status and fetch managed users
function getManagedUsers() {
    const user = users.value.find(e => e.userID === authStore.currentUser?.userID);
    console.log("USER: ", user);
    if (user?.role === "admin") {
        isAdmin.value = true;
        managedUsers.value = users.value.filter(e => String(e.adminID) === userID.value);
        console.log("MANAGED USERS", managedUsers.value);
    }
    else {
        isAdmin.value = false;
        managedUsers.value = [];
    }
}
// Destroy an existing chart instance
function destroyChart(chartInstance) {
    if (chartInstance) {
        chartInstance.destroy();
    }
}
// Destroy all goal chart instances
function destroyGoalCharts() {
    goalChartInstances.forEach(chart => chart.destroy());
    goalChartInstances = [];
}
// Income vs Expenses Chart
const setupIncomeExpensesChart = () => {
    destroyChart(incomeExpensesChartInstance);
    if (incomeExpensesChart.value) {
        const user = users.value.find(user => user.userID === userID.value);
        incomeExpensesChartInstance = new Chart(incomeExpensesChart.value, {
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
    destroyChart(remainingBudgetChartInstance);
    if (remainingBudgetChart.value) {
        const user = users.value.find(user => user.userID === userID.value);
        const userExpenses = expenses.value.filter(expense => expense.userID === userID.value);
        const totalSpent = userExpenses.reduce((total, expense) => {
            if (expense.isPaid)
                return total;
            if (expense.recurring) {
                const monthsElapsed = Math.floor((new Date().getTime() - new Date(expense.dueDate).getTime()) / (1000 * 60 * 60 * 24 * 30));
                return total + expense.amount * Math.max(1, monthsElapsed);
            }
            else {
                return total + expense.amount;
            }
        }, 0);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const recentAssets = assets.value.filter(asset => asset.userID === userID.value && new Date(asset.initialPurchaseDate) >= oneMonthAgo);
        const totalAssetCost = recentAssets.reduce((total, asset) => total + asset.purchasePrice, 0);
        const totalSpentIncludingAssets = totalSpent + totalAssetCost;
        const remaining = (user?.bankAmount || 0) - totalSpentIncludingAssets;
        remainingBudgetChartInstance = new Chart(remainingBudgetChart.value, {
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
    destroyChart(assetDepreciationChartInstance);
    if (assetDepreciationChart.value) {
        const userAssets = assets.value.filter(asset => asset.userID === userID.value);
        const datasets = userAssets.map(asset => {
            const data = [];
            const depreciationRate = asset.purchasePrice / asset.desiredLifeSpan;
            for (let year = 0; year <= asset.desiredLifeSpan; year++) {
                const depreciatedValue = Math.max(0, asset.purchasePrice - depreciationRate * year);
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
        const maxYears = Math.max(...userAssets.map(a => a.desiredLifeSpan)) + 1;
        const labels = Array.from({ length: maxYears }, (_, i) => `Year ${i}`);
        assetDepreciationChartInstance = new Chart(assetDepreciationChart.value, {
            type: 'line',
            data: {
                labels,
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
    destroyGoalCharts();
    userGoals.value.forEach((goal, index) => {
        const progressValue = parseFloat(goal.progress?.replace('%', '') || '0');
        const ctx = goalCharts.value[index];
        if (ctx) {
            const chartInstance = new Chart(ctx, {
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
            goalChartInstances.push(chartInstance);
        }
    });
};
// Monthly Expense Chart
const setupMonthlyExpenseChart = () => {
    destroyChart(monthlyExpenseChartInstance);
    if (monthlyExpenseChart.value) {
        const monthlyExpenses = Array(12).fill(0);
        expenses.value
            .filter(expense => expense.userID === userID.value)
            .forEach(expense => {
            const month = new Date(expense.dueDate).getMonth();
            monthlyExpenses[month] += expense.amount;
        });
        monthlyExpenseChartInstance = new Chart(monthlyExpenseChart.value, {
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
// Format date function
const formatDate = (date) => {
    return date.toLocaleDateString();
};
// Notifications
const notifications = ref([]);
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
// Watch for changes in userID to update data and charts
watch(userID, async () => {
    getManagedUsers();
    userGoals.value = goals.value.filter(goal => goal.userID === userID.value);
    await nextTick();
    goalCharts.value = [];
    setupIncomeExpensesChart();
    setupRemainingBudgetChart();
    setupAssetDepreciationChart();
    setupGoalProgressCharts();
    setupMonthlyExpenseChart();
});
// Load each chart and get managed users on component mount
onMounted(async () => {
    getManagedUsers();
    userGoals.value = goals.value.filter(goal => goal.userID === userID.value);
    await nextTick();
    setupIncomeExpensesChart();
    setupRemainingBudgetChart();
    setupAssetDepreciationChart();
    setupGoalProgressCharts();
    setupMonthlyExpenseChart();
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        userId: {
            type: String,
            required: true
        }
    },
});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    __VLS_styleScopedClasses['welcome'];
    __VLS_styleScopedClasses['welcome-body'];
    __VLS_styleScopedClasses['area-small'];
    __VLS_styleScopedClasses['area-large'];
    __VLS_styleScopedClasses['area-small'];
    __VLS_styleScopedClasses['bg-blue'];
    __VLS_styleScopedClasses['expense-form'];
    __VLS_styleScopedClasses['submit-button'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex align-items-center justify-content-between home-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex flex-column") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex flex-column area-small") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex bg-green area-head") }, });
    (__VLS_ctx.currentUser?.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex bg-blue chart-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("test2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("chart-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("incomeExpensesChart"), ...{ class: ("chart-canvas") }, });
    // @ts-ignore navigation for `const incomeExpensesChart = ref()`
    __VLS_ctx.incomeExpensesChart;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("test") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("chart-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("remainingBudgetChart"), ...{ class: ("chart-canvas circle-chart") }, });
    // @ts-ignore navigation for `const remainingBudgetChart = ref()`
    __VLS_ctx.remainingBudgetChart;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("test2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("chart-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("assetDepreciationChart"), ...{ class: ("chart-canvas") }, });
    // @ts-ignore navigation for `const assetDepreciationChart = ref()`
    __VLS_ctx.assetDepreciationChart;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("test2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("chart-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("monthlyExpenseChart"), ...{ class: ("chart-canvas") }, });
    // @ts-ignore navigation for `const monthlyExpenseChart = ref()`
    __VLS_ctx.monthlyExpenseChart;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("test2") }, });
    if (__VLS_ctx.userGoals.length) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("goal-progress-container") }, });
        for (const [goal, index] of __VLS_getVForSourceType((__VLS_ctx.userGoals))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((goal.goalID)), ...{ class: ("goal-chart") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("chart-title") }, });
            (goal.category);
            (goal.goalID);
            __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ((el => (__VLS_ctx.goalCharts[index] = el))), ...{ class: ("goal-chart-canvas chart-canvas") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (goal.targetAmount);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.formatDate(goal.deadline));
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex flex-column area-small") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex bg-green area-head") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex flex-column bg-blue expense-form") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.handleSubmit) }, ...{ class: ("d-flex flex-column") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("category"), ...{ class: ("form-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("text"), id: ("category"), value: ((__VLS_ctx.newExpense.category)), ...{ class: ("form-input") }, placeholder: ("e.g., Rent"), required: (true), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("amount"), ...{ class: ("form-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("number"), id: ("amount"), ...{ class: ("form-input") }, placeholder: ("e.g., 500"), required: (true), });
    (__VLS_ctx.newExpense.amount);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("dueDate"), ...{ class: ("form-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("date"), id: ("dueDate"), ...{ class: ("form-input") }, required: (true), });
    (__VLS_ctx.newExpense.dueDate);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("isRecurring"), ...{ class: ("form-label") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ id: ("isRecurring"), value: ((__VLS_ctx.newExpense.recurring)), ...{ class: ("form-input") }, required: (true), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ((true)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ((false)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: ("submit-button") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex flex-column bg-green area-large") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex bg-green area-head") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex bg-blue notifications-container") }, });
    for (const [notification] of __VLS_getVForSourceType((__VLS_ctx.notifications))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((notification.id)), ...{ class: ("notification-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("notification-title") }, });
        (notification.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("notification-message") }, });
        (notification.message);
    }
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['align-items-center'];
    __VLS_styleScopedClasses['justify-content-between'];
    __VLS_styleScopedClasses['home-page'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['flex-column'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['flex-column'];
    __VLS_styleScopedClasses['area-small'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['bg-green'];
    __VLS_styleScopedClasses['area-head'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['bg-blue'];
    __VLS_styleScopedClasses['chart-container'];
    __VLS_styleScopedClasses['test2'];
    __VLS_styleScopedClasses['chart-title'];
    __VLS_styleScopedClasses['chart-canvas'];
    __VLS_styleScopedClasses['test'];
    __VLS_styleScopedClasses['chart-title'];
    __VLS_styleScopedClasses['chart-canvas'];
    __VLS_styleScopedClasses['circle-chart'];
    __VLS_styleScopedClasses['test2'];
    __VLS_styleScopedClasses['chart-title'];
    __VLS_styleScopedClasses['chart-canvas'];
    __VLS_styleScopedClasses['test2'];
    __VLS_styleScopedClasses['chart-title'];
    __VLS_styleScopedClasses['chart-canvas'];
    __VLS_styleScopedClasses['test2'];
    __VLS_styleScopedClasses['goal-progress-container'];
    __VLS_styleScopedClasses['goal-chart'];
    __VLS_styleScopedClasses['chart-title'];
    __VLS_styleScopedClasses['goal-chart-canvas'];
    __VLS_styleScopedClasses['chart-canvas'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['flex-column'];
    __VLS_styleScopedClasses['area-small'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['bg-green'];
    __VLS_styleScopedClasses['area-head'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['flex-column'];
    __VLS_styleScopedClasses['bg-blue'];
    __VLS_styleScopedClasses['expense-form'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['flex-column'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['form-input'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['form-input'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['form-input'];
    __VLS_styleScopedClasses['form-label'];
    __VLS_styleScopedClasses['form-input'];
    __VLS_styleScopedClasses['submit-button'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['flex-column'];
    __VLS_styleScopedClasses['bg-green'];
    __VLS_styleScopedClasses['area-large'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['bg-green'];
    __VLS_styleScopedClasses['area-head'];
    __VLS_styleScopedClasses['d-flex'];
    __VLS_styleScopedClasses['bg-blue'];
    __VLS_styleScopedClasses['notifications-container'];
    __VLS_styleScopedClasses['notification-item'];
    __VLS_styleScopedClasses['notification-title'];
    __VLS_styleScopedClasses['notification-message'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "incomeExpensesChart": __VLS_nativeElements['canvas'],
        "remainingBudgetChart": __VLS_nativeElements['canvas'],
        "assetDepreciationChart": __VLS_nativeElements['canvas'],
        "monthlyExpenseChart": __VLS_nativeElements['canvas'],
    };
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            userGoals: userGoals,
            currentUser: currentUser,
            incomeExpensesChart: incomeExpensesChart,
            remainingBudgetChart: remainingBudgetChart,
            assetDepreciationChart: assetDepreciationChart,
            monthlyExpenseChart: monthlyExpenseChart,
            goalCharts: goalCharts,
            newExpense: newExpense,
            handleSubmit: handleSubmit,
            formatDate: formatDate,
            notifications: notifications,
        };
    },
    props: {
        userId: {
            type: String,
            required: true
        }
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        userId: {
            type: String,
            required: true
        }
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
