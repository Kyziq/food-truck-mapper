# Food Truck Mapper

Welcome to the Food Truck Mapper project, a comprehensive solution for mapping food trucks using a Flutter-based frontend, a Fastify-powered backend, and a PostgreSQL database managed with DrizzleORM. This project leverages Bun for an efficient JavaScript runtime and package management, and Turborepo for optimized build processes.

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

3. **Environment Setup:**

   Navigate to `/apps/database` for the README.md regarding database

## Project Structure

- `/apps/frontend`: A Flutter app for the user interface.
- `/apps/backend`: A Fastify app for the server-side logic.
- `/apps/database`: A PostgreSQL database managed with DrizzleORM for data persistence.

## Remote Caching with Turborepo

To enhance team collaboration and CI/CD efficiency, enable [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) with Turborepo by linking your project to a Vercel account:

```sh
bunx turbo login
bunx turbo link
```

## License

This project is licensed under the MIT License
