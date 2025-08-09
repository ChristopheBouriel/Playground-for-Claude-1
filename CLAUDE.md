# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "SavoryGrid" - a React restaurant website built with Vite, featuring a single-page application with smooth scrolling navigation. The site includes sections for home, dishes, about, menu, reservations, and reviews.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (uses custom Vite build script)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with React-specific rules and maximum 0 warnings
- `npm run fix` - Run npm audit fix for security vulnerabilities

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom color scheme
- **Navigation**: react-scroll for smooth scrolling between sections
- **Icons**: react-icons (React Icons) and lucide-react
- **Build Tool**: Vite with React plugin
- **Deployment**: Configured for Vercel (see vercel.json)
- **Node Version**: 22.x (specified in package.json engines)

## Architecture

### Component Structure
- **Single Page Application**: All sections rendered in App.jsx with smooth scroll navigation
- **Components**: Located in `src/components/` (Navbar, Home, About, Menu, Dishes, Reservation, Review, Footer)
- **Layouts**: Reusable UI components in `src/layouts/` (Button, DishesCard, ReviewCard)
- **Navigation**: Fixed navbar with dropdown menu for dish categories and mobile hamburger menu

### Key Features
- **Smooth Scrolling Navigation**: Uses react-scroll with spy functionality
- **WhatsApp Integration**: Button component includes WhatsApp messaging functionality
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Firebase Integration**: Firebase is included as a dependency (likely for data/auth)
- **Email Integration**: Uses emailjs-com for contact functionality

### Custom Tailwind Colors
- `brightColor`: #ff0055 (primary accent color)
- `backgroundColor`: #ffffe6 (light background)
- `normalText`: #999999 (secondary text)
- `lightText`: #f8f8f8 (light text)

## File Organization

- **Static Assets**: Images stored in `public/assets/img/`
- **React Assets**: Component-specific assets in `src/assets/`
- **Build Output**: `dist/` directory (configured in Vite)
- **Styling**: Global styles in `src/index.css` and `src/App.css`

## Development Notes

- Uses ES modules (`"type": "module"` in package.json)
- ESLint configured for React with strict rules (max 0 warnings)
- PostCSS configured for Tailwind CSS processing
- Source maps disabled in production build
- Chunk size warning limit set to 1600kb