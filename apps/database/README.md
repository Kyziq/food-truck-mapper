# Database Project Setup

## Prerequisites

- PostgreSQL
- Bun

## Installation

Install dependencies with Bun:

```bash
bun install
```

## Environment Configuration

Before proceeding, make sure to set up your environment variables. Copy the example environment file and rename it to `.env`, then update its content with your actual database credentials.

```bash
cp .env.example .env
```

Edit the `.env` file and update the `DB_URL` variable with your PostgreSQL connection string.

```env
DB_URL=your_database_url_here
```

## Database Creation

Before running migrations or generating artifacts, create the database:

```sql
CREATE DATABASE food_truck_mapper;
```

Execute the above command in `psql`.

## Commands

Utilize the following scripts defined in `package.json` for database operations:

### Generate Artifacts

Generate necessary ORM artifacts:

```bash
bun run generate
```

### Migrate Database

Apply database migrations:

```bash
bun run migrate
```

### Seed Database

Populate your database with initial data:

```bash
bun run seed
```

### Launch Drizzle-kit Studio

Start Drizzle-kit Studio for database management:

```bash
bun run studio
```
