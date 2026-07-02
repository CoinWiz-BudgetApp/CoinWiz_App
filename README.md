# Overview
CoinWiz is a mobile expense-tracking application built with React Native (Expo). It allows users to create accounts, log expenses, set budgets, and view financial reports. The app uses Node as its backend for authentication and Supabase database storage. The architecture separates client-side UI, backend services, and database storage to ensure scalability and security.

# Tech Stack
- Frontend: React Native (Expo)
- Backend: Node.js
- Database/Auth: Supabase (PostgreSQL + Auth)
- API Integration: Plaid (for bank connections)

# Features
- User authentication (register, login, password recovery)
- Add and categorize expenses
- Budget tracking per category
- Financial reports and summaries
- Bank account integration via Plaid

# Prerequisites
- Node.js installed
- Visual Studio Code
- Expo CLI: npm install -g expo-cli
- iOS or Android emulator installed (if running on desktop)
- Expo Go app (if running on smartphone)

# Setup Instructions (in VS Code's terminal)
1. Clone the repository
- git clone https://github.com/CoinWiz-BudgetApp/CoinWiz_App.git
- cd CoinWiz
2. Install dependencies
- npm install
3. Start Plaid Sandbox-Server
- npm run plaid:sandbox-server
4. Run Prebuild
- npx expo prebuild
5. Run app on iOS or Android
- npx expo run:android (or ios)

# Notes
- Supabase handles authentication and database acces via API
- The frontend never stores sensitive keys (e.g. Plaid secret)
- All secure external API calls go through the Node backend
