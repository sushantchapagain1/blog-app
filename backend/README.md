# Backend Project README

Welcome to the "blog-app-sushant" project! This README file provides an overview of the project structure, key dependencies, scripts, and instructions to get started.

## Project Overview

The "blog-app-sushant" project serves as the backend component of a web application. It is responsible for handling server-side logic, APIs, and data management. The project utilizes modern backend technologies to ensure smooth operation and security.

## Project Structure

The project follows a common structure for a Node.js backend application:

- **dist**: Contains the compiled TypeScript files after the build process.
- **src**: This directory holds the source code of the backend application.
  - **controllers**: Logic to handle incoming requests and generate responses.
  - **middlewares**: Custom middleware for request processing.
  - **models**: Data models and schemas.
  - **routes**: API route definitions.
  - **utils**: Utility functions and helper scripts.
  - **index.ts**: The entry point of the application.
- **package.json**: Configuration file for Node.js dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.

## Dependencies

The project relies on various third-party dependencies to enable specific functionalities and enhance backend development. Key dependencies include:

- **@prisma/client**: Prisma client for database access and management.
- **bcryptjs**: Library for hashing passwords securely.
- **cloudinary**: Library for working with the Cloudinary service for image and video management.
- **cookie-parser**: Middleware for parsing cookies from incoming requests.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Fast and minimalist web framework for Node.js.
- **express-rate-limit**: Middleware for rate limiting incoming requests.
- **helmet**: Middleware for enhancing API security by setting various HTTP headers.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT).
- **zod**: TypeScript-first schema validation library.

## Development Dependencies

These dependencies are used during development and build processes:

- **@types**: Type definitions for various packages, improving TypeScript development.
- **concurrently**: Run multiple commands concurrently.
- **nodemon**: Monitor for changes in the source and restart the server automatically.
- **prisma**: Prisma CLI for database migrations and operations.
- **typescript**: TypeScript language compiler.

## Scripts

The following scripts are available to facilitate development, build, and execution processes:

- **build**: Compile TypeScript files using the TypeScript compiler.
- **start**: Start the backend server after it's been built.
- **dev**: Run TypeScript compilation in watch mode and start the server using Nodemon concurrently.

## Getting Started

1. Clone the repository to your local machine.
2. Install the project dependencies using `npm install or yarn`.
3. Set up your environment variables by creating a `.env` file in the root directory(see env example).
   You need to have postgresql installed on your machine cz this app uses postgresql as Db.
4. Run the development server using `npm run dev or yarn dev`.
5. Access the backend APIs at the specified address.

## Contribution

If you're interested in contributing to this project, please follow the guidelines provided in the CONTRIBUTING.md file.

## License

This project is licensed under the sushant License. See the LICENSE.md file for details.
