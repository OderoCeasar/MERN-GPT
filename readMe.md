## MERN-GPT: AI Chatbot Platform

## 🌟 Overview

    MERN-GPT is a secure, full-stack AI chatbot platform powered by the MERN stack (MongoDB, Express.js, React.js, Node.js) integrated with OpenAI. It allows users to:

    Sign up / Log in with secure authentication

    Chat with an AI assistant

    View chat history

    Delete all chats

    Get syntax-highlighted code snippets

## 🌐 Live URL 

    https://mern-gpt-delta.vercel.app/

## 🚀 Features

    ✅ User Authentication (Signup, Login, Logout)

    🫠 AI Chat Interface

    🖊️ Markdown and Code Highlighting

    🔎 View and Manage Chat History

    ❌ Clear All Chats

    ✨ Responsive UI with Framer Motion animations

## 🛌 Tech Stack

    Frontend
    React.js (with JSX)
    React Router
    React Hot Toast
    Framer Motion
    React Markdown + Highlight.js
    CSS Modules

    Backend
    Node.js + Express.js
    MongoDB (via Mongoose)
    JWT for authentication
    Express-validator
    Cookie-based auth (httpOnly, signed)

## 🚪 Project Structure

    ├── client
    │   ├── components
    │   ├── context
    │   ├── pages
    │   ├── helpers
    │   └── App.jsx
    │
    ├── server
    │   ├── routes
    │   ├── controllers
    │   ├── middleware
    │   ├── models
    │   └── index.js

## 🔧 Installation

Prerequisites:

    Node.js

    pnpm (or npm)

    MongoDB Atlas Account

    OpenAI API Key

    Setup

# Backend
cd server
pnpm install

# Frontend
cd ../client
pnpm install

Run

# Start backend (PORT=5001)
cd server
pnpm dev

# Start frontend (Vite server on PORT=5173)
cd ../client
pnpm dev

## 🔐 Environment Variables

Create .env file in server/:

PORT=5001
MONGO_USER=yourMongoUser
MONGO_PASSWORD=yourMongoPass
JWT_SECRET=yourJWTSecret
COOKIE_SECRET=yourCookieSecret
OPENAI_API_KEY=yourOpenAIKey

## ✨ Future Improvements

User-specific chat tagging & categories

Admin dashboard for analytics

Rate limiting & abuse protection

Theme switcher (dark/light mode)

