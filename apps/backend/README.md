# Backend Project Setup

## Prerequisites

- **PostgreSQL**: Ensure you have PostgreSQL installed and running.
- **Bun**: Install Bun from [bun.sh](https://bun.sh/).

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

## Database Setup

### Create the Database

Create the database in PostgreSQL before running migrations or generating artifacts:

```sql
CREATE DATABASE food_truck_mapper;
```

Execute the above command in psql or any PostgreSQL client.

### Generate Artifacts

Generate necessary ORM artifacts:

```bash
bun generate
```

### Migrate Database

Apply database migrations:

```bash
bun migrate
```

### Seed Database

Populate your database with initial data:

```bash
bun seed
```

### Launch Drizzle-kit Studio

Start Drizzle-kit Studio for database management:

```bash
bun studio
```

## Development

### Launch Bun HTTP Server

Start the Bun HTTP server:

```bash
bun dev
```
