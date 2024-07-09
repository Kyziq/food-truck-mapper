# Food Truck Mapper

This is a Turborepo project that includes a Flutter frontend, a Fastify backend, and a PostgreSQL database managed with DrizzleORM. The project uses Bun as the JavaScript runtime and package manager.

## Using this Turborepo

To get started, clone this repository and install the dependencies:

```sh
bun install
```

### Develop

To develop all apps and packages, run the following command:

```sh
bun run dev
```

### Build

To build all apps and packages, use:

```sh
bun run build
```

### Remote Caching

Turborepo can use [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines. This is useful for sharing build caches with your team and CI/CD pipelines.

By default, Turborepo caches locally. To enable Remote Caching, you need an account with Vercel. If you don't have an account, you can [create one](https://vercel.com/signup). Then, authenticate the Turborepo CLI with your Vercel account and link your Turborepo to your Remote Cache by running:

```sh
npx turbo login
npx turbo link
```

## Apps and Packages

- `frontend`: A Flutter app for the user interface.
- `backend`: A Fastify app for the server-side logic.
- `database`: A PostgreSQL database managed with DrizzleORM for data persistence.

Each part of the project is set up to be developed and built using Bun, ensuring fast and efficient workflows.

## Utilities

This Turborepo is equipped with:

- [Bun](https://bun.sh) for fast JavaScript runtime and package management.
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
