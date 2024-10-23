# Personal Expense Tracker API

This is a **Personal Expense Tracker API** built with SQLite. It helps users manage and track their expenses with ease, offering various features to support daily financial management.

## Features

- **User Registration & Login**: Secure authentication for users to manage their personal expenses.
- **Expense Tracking**: Create, view, update, and delete expenses with details like amount, category, and date.
- **UUID-Based Identifiers**: Utilizes UUIDs for unique and scalable identification of records.
- **Categorization of Expenses**: Expenses can be categorized to provide better insights into spending habits.
- **Data Persistence**: SQLite is used to store and manage user and expense data efficiently.

## Technology Stack

- **Backend**: Node.js
- **Database**: SQLite
- **UUID for Identifiers**: To ensure globally unique expense records
- **Authentication**: Secure authentication to ensure privacy of user data

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kranthikata/personal-expense-tracker.git
   ```
2. Navigate into the project directory
  ```bash
   cd personal-expense-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   nodemon server.js
   ```

## API Endpoints

### User Authentication

- `POST api/v1/auth/register`: Register a new user.
- `POST api/v1/auth/login`: Authenticate user and get a token.

### Expense Management

- `POST api/v1/transactions`: Create a new transaction.
- `GET api/v1/transactions`: Fetch all transactions for the authenticated user.
- `GET api/v1/transactions/:id`: Fetch a specific transaction.
- `PUT api/v1/transactions/:id`: Update an existing transaction.
- `DELETE api/v1/transactions/:id`: Delete an transaction.
- `GET api/v1/summary/`: Get the summary of transactions.

## Usage

1. Register or log in to your account.
2. Use the provided API endpoints to manage your expenses.
3. Monitor your spending by categorizing expenses and reviewing summaries.
