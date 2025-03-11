
# Modern Web Application

A full-stack web application built with React, Express, TypeScript, and Tailwind CSS using Shadcn UI components.

## Features

- **Frontend**: React with TypeScript and Tailwind CSS styling
- **Backend**: Express.js API with TypeScript
- **UI Components**: Shadcn UI components (Radix UI primitives)
- **API Integration**: OpenAI integration available
- **Database Ready**: Configured with Drizzle ORM

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

This will start the server at port 5000.

### Build

To build the application for production:

```bash
npm run build
```

### Production

To run the application in production mode:

```bash
npm run start
```

## Project Structure

- `/client`: React frontend application
  - `/src/components`: UI components including Shadcn UI
- `/server`: Express.js backend
  - `/index.ts`: Main server entry point
  - `/routes.ts`: API routes
  - `/openai.ts`: OpenAI integration
  - `/storage.ts`: Data storage utilities
- `/shared`: Code shared between frontend and backend
  - `/schema.ts`: Data schemas

## Technologies Used

- **React**: Frontend library
- **TypeScript**: Static typing for JavaScript
- **Express**: Backend web framework
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: UI component library built on Radix UI
- **Drizzle ORM**: Database ORM
- **Vite**: Build tool

## Deployment

This application is configured for deployment on Replit with Cloud Run.

## License

MIT License
