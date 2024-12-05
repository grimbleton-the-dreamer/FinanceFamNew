# FinanceFam Developer Guide and User Manual

Note: We reccomend using the live demo at https://financefam.asecrettoeveryone.com instead of compiling yourself for easy grading. Compiling yourself will take 1-2 hours.
FinanceFam is a financial management application designed for efficiency and ease of use. This guide provides detailed instructions for installing dependencies and running the application.

---
# Developer Guide
## **Prerequisites**

Before running the application, ensure you have Docker installed on your system.

### **Install Docker**

#### **Windows and Mac**
- Install Docker Desktop using the links below:
  - [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
  - [Docker Desktop for Mac](https://docs.docker.com/desktop/setup/install/mac-install/)

#### **Linux**
- Install Docker Engine (Docker CE) using the link below:
  - [Docker Engine for Linux](https://docs.docker.com/engine/install/)

---

## **Run the Application**

Follow these steps to set up and run the FinanceFam application:

**Navigate to the Project Directory:**
   Open a terminal and navigate to the `FinanceFamNew` folder:
   ```bash
   cd /path/to/FinanceFamNew
   docker compose up -d
   ```
If the first set of commands doesn't work, try these:
  ```bash
  cd /path/to/FinanceFamNew
  docker-compose up -d
  ```
After running these commands open your browser and navigate to: **http://localhost:80**

## Admin Login
**Username:** mkovach
**Password:** password123

## Regular User Login
**Username:** yongjianfu
**Password:** password123

# **FinanceFam User Manual**

Welcome to FinanceFam! This application helps you manage your finances effectively by tracking income, expenses, budgets, savings goals, and more. Follow this guide to get started.

## **Live Website Demo**
https://financefam.asecrettoeveryone.com

---

## **Getting Started**

1. **Login:**
   - Enter your username and password on the login page.
   - Admin users have access to multiple user accounts' financial data by default.

---

## **Navigation**

- Use the **sidebar on the left** to navigate between pages:
  - **Dashboard:** View your financial summary and charts.
  - **Income vs Expenses:** Track your monthly financial trends.
  - **Budgets:** Manage your budgets and savings goals.
  - **Assets & Depreciation:** Monitor your asset values over time.
  - **Recurring Expenses:** Review and adjust recurring costs.

---

## **Submitting Data**

- At the bottom of each page, you’ll find **data entry forms** to:
  - Add income or expenses.
  - Update budgets or savings goals.
  - Record changes to assets or recurring expenses.
- Submit the form, and the data will automatically update your charts and insights.

---

## **Interactive Features**

- As you interact with the site, **charts will dynamically update** to reflect your changes, providing real-time feedback on your financial health.

---

## **Notifications**

- Keep track of important updates and reminders:
  - Notifications about budgets, expenses, savings goals, and asset depreciation are available in the **upper-right corner**.

---

Manage your finances with ease and take control of your financial future. If you have any questions, feel free to reach out to our support team. Enjoy using FinanceFam!

##
