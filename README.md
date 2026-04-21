# Overview
CoinWiz is a mobile expense-tracking application built with React Native (Expo). It allows users to create accounts, log expenses, set budgets, and view financial reports. The app uses Supabase as its backend for authentication and PostgreSQL database storage, while a Node.js server handles secure integrations such as Plaid. The architecture separates client-side UI, backend services, and database storage to ensure scalability and security.

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
- git clone https://github.com/JackBrunswik/Complex-Algorithm-Simulator.git
- cd CoinWiz
2. Install dependencies
- npm install
3. Start iOS or Android emulator
4. Run the app
- npm start
5. Press 'i' for iOS simulator, or 'a' for Android emulator
6. (Smartphone) - Scan QR code with Expo Go | (Desktop) - CoinWiz should start running on emulator

# Notes
- Supabase handles authentication and database acces via API
- The frontend never stores sensitive keys (e.g. Plaid secret)
- All secure external API calls go through the Node backend