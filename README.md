# Task Flow

A feature-rich, user-friendly To-Do List application built with **Next.js**, **Hasura**, and **TypeScript**. This project includes user authentication, task management, categories, and optional AI-based task suggestions.

## Project Description

This To-Do List application allows users to manage their daily tasks effectively. Users can create, categorize, and manage tasks while receiving email notifications for completed tasks. Deleted tasks are moved to a trash folder, offering easy restoration.

## Project Overview Video : <a target="_blank" href="https://www.loom.com/share/c09ff03392714a2abe12862282e207d8?sid=1523e4a1-ad8b-4e94-879b-16f3ed2605b0">Click Here</a>

## Features

- **User Authentication**: Secure login and signup with email.
- **To-Do Task Management**: Create, update, delete, and restore tasks.
- **Task Categories**: Organize tasks by category.
- **Email Notifications**: Automatic email notifications upon task completion.
- **Trash Folder**: Deleted tasks are stored in a trash folder for easy recovery.
- **Filtering**: Tasks can be filtered based on status, category, or search keywords.
- **Optional AI Suggestions**: Generate task description using AI.

## Technologies Used

- **Next.js**: Server-side rendering and static site generation.
- **Hasura**: Real-time GraphQL engine for managing data and handling APIs.
- **TypeScript**: Type safety and enhanced development experience.
- **Apollo Client**: GraphQL client for managing remote data fetching.
- **PostgreSQL**: Database for storing tasks, users, and categories.
- **GraphQL**: API layer for querying and mutating data.
- **Tailwind CSS and Shadcn-UI**: Utility-first CSS framework for styling the application.
- **Nodemailer**: Email notification service.

## How to Run This Project Locally

Follow these steps to run the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/dev-faisal-ahmed/TaskFlow
cd TaskFlow
```

### 2. Install Dependencies

Make sure you have Node.js installed, then install the required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_HASURA_HTTP_URI="https://task-flow.hasura.app/v1/graphql"
NEXT_PUBLIC_HASURA_META_DATA_API="https://task-flow.hasura.app/v1/metadata"
NEXT_PUBLIC_HASURA_WS_LINK="wss://task-flow.hasura.app/v1/graphql"
NEXT_PUBLIC_HASURA_ADMIN_SECRET="FXbRWm8NZtPUgHcWVlcBYKqrrCoeNnqHMYNaZG6K5cphb2SPbmXW6VXrJNCVmgj6"
NEXT_PUBLIC_SALT="10"
NEXTAUTH_SECRET="my#secret#hi"
NEXTAUTH_URL="http://localhost:3000"
GMAIL_ID="faisa.lahmed.ost@gmail.com"
GMAIL_PASS="eqze fdoi jlua fzea"
API_KEY="AIzaSyCWh60Gs0GlqHN8rQqdKGVq2m-QEw9iJ60"

```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Future Enhancements

- **AI-based Task Suggestions**: Use AI to suggest tasks to users based on tittle he/she has written.
- **Mobile Optimization**: Improved UI/UX for mobile responsiveness.

## Live Site Link : <a href="https://ost-task-flow.vercel.app" target="\_blank">Click Here </a>

## Demo Account

- **UserEmail**: faisal.ahmed.20.35.197@gmail.com
- **Password**: 1234
