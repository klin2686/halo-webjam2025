# Halo Frontend

React + TypeScript frontend for the Halo food allergy management application.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Setup

1. **Navigate to the frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Note: On Windows, use `copy` instead of `cp`*

   Update the values in `.env`:
   - `VITE_API_URL` - Backend API URL (default: `http://localhost:5001/api`)
   - `VITE_GOOGLE_CLIENT_ID` - Your Google OAuth Client ID

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Build

Create a production build:

```bash
npm run build
```

Output will be in the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compilation + Vite bundling)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/      # React components
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── assets/          # Static assets
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Notes

- Uses Vite's environment variable prefix (`VITE_`) for runtime access
- TypeScript strict mode enabled
- ESLint configured for React best practices
- Tailwind CSS v4 with Vite plugin
