# Expense Tracker

A simple and intuitive expense tracking application built using React.

## Introduction

Expense Tracker helps you record, manage, and analyze your daily income and expenses.  
The app focuses on clean UI, predictable state management, and practical features that reflect real-world usage.

All data is stored locally in the browser, making it fast and easy to use without any setup or accounts.

## Key Features

- Add and remove income or expense transactions
- Automatic calculation of balance, total income, and total expenses
- Date-based filtering to view transactions within a selected range
- Transactions grouped by date for better readability
- Persistent storage using browser localStorage
- Currency display support for INR and USD

<i>Note: This app does not perform currency conversion. Changing the currency only affects how amounts are displayed.</i>

## Tech & Concepts Used

- React (Functional Components)
- React Hooks (`useState`, `useEffect`, `useRef`)
- Derived state and lifted state patterns
- Controlled form inputs
- LocalStorage for data persistence
- CSS with variables for theming and responsiveness

## How to Run This App Locally

1. Clone the repository

<code>git clone https://github.com/Sakirahmed61/expense-tracker-react.git</code>

2. Navigate into the project directory

<code>cd expense-tracker-react</code>

3. Install dependencies

<code>npm install</code>

4. Start the development server

<code>npm start</code>

The app will run at http://localhost:3000.

## Future Improvements

- Edit existing transactions
- Better accessibility support
- Enhanced filtering and sorting options

## Acknowledgment

The UI layout and general flow of this application were inspired by expense-tracking examples from Codesistency’s JavaScript tutorials.  
The implementation, state management, and React architecture were independently designed and developed.