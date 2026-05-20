# Medic Queue

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://medic-queue.vercel.app)
[![Next.js](https://img.shields.io/badge/Framework-Next.js-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/Library-React-blue)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-skyblue)](https://tailwindcss.com)

> **Medic Queue** is a polished doctor appointment booking platform built with modern Next.js and React technologies. It enables patients to explore doctors, reserve appointments, and manage bookings in a responsive, user-first interface.

## 🌐 Live Demo

Visit the live application:

- https://medic-queue.vercel.app

## ✨ Key Features

- Secure authentication flow with email login and social login support
- Browse a curated doctor directory with specialty, availability, and booking options
- Patient appointment management and booking workflows
- Personalized dashboard showing assigned appointments and user-specific details
- Modern responsive UI with Tailwind CSS and HeroUI components
- Production-ready deployment on Vercel

## 🧭 Pages Included

- `Home` — landing page with hero content and service highlights
- `Doctors` — searchable doctor list and detail views
- `Appointments` — patient appointment overview and status
- `Dashboard` — authenticated user dashboard for appointment tracking
- `Login` / `Signup` — secure entry points for users

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Better Auth for authentication
- MongoDB adapter for session persistence
- React Toastify for notifications
- HeroUI for polished form and layout components

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
npm start
```

## 🧩 Project Structure

- `src/app` — application routes and page layouts
- `src/components` — reusable UI components and client-side modules
- `src/lib` — authentication and data service helpers
- `src/public` — static assets

## ✅ Deployment

This project is deployed on Vercel. Use the following command to create a new deploy if needed:

```bash
vercel --prod
```

## 📌 Notes

- Ensure environment variables are configured for authentication and database access
- The app is built with responsiveness and mobile-first design in mind
- The `login` route preserves the destination route so users return to the page they requested after authentication

## 💬 Feedback

If you want to improve this project further, feel free to submit enhancements or open an issue.

---

Created with a focus on modern healthcare UX and appointment management workflows.