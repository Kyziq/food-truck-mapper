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

1. Before proceeding, make sure to set up your environment variables. Copy the example environment file and rename it to `.env`, then update its content with your actual database credentials.

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and update the `DB_URL` variable with your PostgreSQL connection string.

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

## API Endpoints

### Swagger

You can explore the API endpoints and their documentation using Swagger. To access the Swagger UI, start your server and navigate to:

```plaintext
/swagger
```

This will display the Swagger UI, where you can interact with the API and see detailed information about each endpoint.

### Food Trucks

- **GET** `/foodtrucks`: Retrieve all food trucks.
- **GET** `/foodtrucks/:id`: Retrieve a food truck by ID.
- **POST** `/foodtrucks`: Create a new food truck.
- **PUT** `/foodtrucks/:id`: Update a food truck by ID.
- **DELETE** `/foodtrucks/:id`: Delete a food truck by ID.

### Menu Items

- **GET** `/menuitems`: Retrieve all menu items.
- **GET** `/foodtrucks/:id/menuitems`: Retrieve all menu items for a food truck.
- **POST** `/menuitems`: Create a new menu item.
- **PUT** `/menuitems/:id`: Update a menu item by ID.
- **DELETE** `/menuitems/:id`: Delete a menu item by ID.
