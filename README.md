# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Built with Vite, React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Component Library**: Uses shadcn/ui for consistent, accessible UI components
- **Performance Optimized**: Fast loading with modern build tools
- **3D Effects**: Interactive visual elements and smooth scroll animations

## Getting Started

### Prerequisites

- Node.js (18.x or higher)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd glowing-code-halo
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
```

4. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod validation

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HeroSection.tsx # Landing section
│   ├── AboutSection.tsx# About information
│   └── ...             # Other portfolio sections
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Images and static files
```

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload the built files to an S3 bucket with static hosting

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` directory.
