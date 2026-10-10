🛒 Bajar Dor

Bajar Dor is a modern, full-stack web application designed to track and compare daily market prices of essential commodities and groceries across various markets and divisions in Bangladesh.

✨ Features

Secure Authentication: Complete authentication system built with Better Auth, supporting Email/Password sign-up/sign-in along with social logins (Google & GitHub).

Instant Auto-Login on Registration: Users are automatically logged in and redirected to the home page right after a successful sign-up.

Protected Routes: Product details and price comparison pages are secure; unauthorized users are automatically redirected to the sign-in page.

Real-time Market Prices: View minimum, maximum, and average prices of essential goods categorized neatly (e.g., Rice, Lentils, Oil, Vegetables, Fish, Meat, etc.).

Responsive Dashboard: Clean, modern, and mobile-friendly UI built with Tailwind CSS.

🛠️ Tech Stack

Frontend & Backend: Next.js (App Router)

Styling: Tailwind CSS

Authentication: Better Auth (MongoDB Adapter)

Database: MongoDB

Deployment: Vercel

🚀 Getting Started Locally

Follow these steps to run the project on your local machine:

1. Clone the Repository

git clone https://github.com/Solimullah10/bajar-dor.git
cd bajar-dor

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add the following environment variables:

BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

4. Run the Development Server

npm run dev

Open http://localhost:3000 in your browser to view the application.

📂 Project Structure

bajar-dor/
├── app/
│ ├── api/ # Next.js API Routes & Auth Endpoints
│ ├── product/ # Protected Product Details Page
│ ├── signin/ # Sign In Page
│ ├── signup/ # Sign Up Page
│ ├── layout.tsx # Root Layout
│ └── page.tsx # Home Page
├── lib/
│ ├── auth.ts # Server-side Better Auth configuration
│ └── auth-client.ts# Client-side Better Auth hooks
├── public/ # Static assets and images
└── .env # Environment variables

🌐 Deployment (Vercel)

Push your code to your GitHub repository.

Import the project into Vercel.

Add all production Environment Variables (BETTER_AUTH_SECRET, BETTER_AUTH_URL, MONGODB_URL, OAuth keys, etc.) in the Vercel Project Settings. (Note: Set BETTER_AUTH_URL to your Vercel live domain).

Deploy!

Github Link: https://github.com/Solimullah10/bajar-dor.git

Live Server Link: https://bajar-dor-ten.vercel.app
