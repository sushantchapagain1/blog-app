# Frontend Project README

This is the README file for the blog app sushant project. Below, you'll find information about the project's structure, dependencies, scripts, and other important details to help you understand and manage the project effectively.

## Project Overview

The "frontend" project is a private web application built using modern front-end technologies. It is designed to work as a module and utilizes various libraries and tools to enhance development and build processes.

## Project Structure

The project's main structure follows the conventions of a modern web application:

- **src**: This directory contains the source code of the application.
  - **components**: React components used throughout the application.
  - **styles**: Stylesheets and styling-related files.
  - **utils**: Utility functions and helper scripts.
  - **App.tsx**: The entry point of the application.
- **public**: Publicly accessible assets like HTML files, images, etc.
- **tsconfig.json**: TypeScript configuration file.
- **vite.config.js**: Vite configuration file.

## Dependencies

The project relies on various third-party dependencies to enable specific functionalities and enhance development. Here are some key dependencies used:

- **axios**: Promise-based HTTP client for making API requests.
- **dompurify**: Library for sanitizing HTML content to prevent cross-site scripting (XSS) attacks.
- **dotenv**: Loads environment variables from a `.env` file.
- **moment**: Library for handling dates and times.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: React package for working with the DOM.
- **react-hook-form**: Library for managing form state and validation in React.
- **react-query**: Data fetching and caching library for React applications.
- **react-quill**: React wrapper for the Quill rich text editor.
- **react-router-dom**: Declarative routing library for React.

## Development Dependencies

These dependencies are used during development and build processes:

- **@types**: Type definitions for various packages, improving TypeScript development.
- **@typescript-eslint/eslint-plugin**: TypeScript-specific ESLint rules.
- **@typescript-eslint/parser**: Parser for TypeScript ESLint.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: JavaScript and TypeScript linter.
- **eslint-plugin-react-hooks**: ESLint plugin for enforcing React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Fast Refresh rules.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: TypeScript language compiler.
- **vite**: Build tool and development server.

## Scripts

The following scripts are available to facilitate development, build, testing, and linting processes:

- **dev**: Start the development server using Vite.
- **build**: Build the production-ready application using TypeScript and Vite.
- **test**: Run tests using Jest.
- **lint**: Run ESLint to analyze and identify code quality issues.
- **preview**: Preview the built application using Vite.

## Getting Started

1. Clone the repository to your local machine.
2. Install the project dependencies using `npm install` or `yarn`.
3. Set up your environment variables by creating a `.env` file in the root directory (see env example).
4. Start the development server with `npm run dev` or `yarn dev`.
5. Run tests using `npm run test` or `yarn test`.
6. Access the application in your browser at the specified address.
7. See API docs after running the backend at [http://localhost:8000/api-docs](http://localhost:8000/api-docs).

## Contribution

If you're interested in contributing to this project, please follow the guidelines provided in the CONTRIBUTING.md file.

## License

This project is licensed under the Blog App Sushant License. See the LICENSE.md file for details.
