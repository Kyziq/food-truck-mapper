# Food Truck Mapper

Welcome to the Food Truck Mapper project, a comprehensive solution for mapping food trucks using a Flutter-based frontend, a Bun-powered backend, and a PostgreSQL database managed with DrizzleORM. This project leverages Bun for an efficient JavaScript runtime and package management.

## Quick Start

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Kyziq/food-truck-mapper
   ```

2. **Install dependencies:**

   Navigate to the project root and run:

   ```sh
   bun install
   ```

3. **Environment setup:**

   Navigate to `/apps/database` for the README.md regarding database setup.

4. **Run the development environment:**

   To start the development environment for both frontend and backend, navigate to the project root and run:

   ```sh
   bun dev
   ```

   This command uses Turborepo to run the dev scripts in both the frontend and backend workspaces.

## Project Structure

- `/apps/mobile`: A Flutter app for the user interface.
- `/apps/backend`: A PostgreSQL database managed with DrizzleORM for data persistence and server logic using `Bun.serve`.

## Remote Caching with Turborepo

To enhance team collaboration and CI/CD efficiency, enable [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) with Turborepo by linking your project to a Vercel account:

```sh
bunx turbo login
bunx turbo link
```

## License

This project is licensed under the MIT License
