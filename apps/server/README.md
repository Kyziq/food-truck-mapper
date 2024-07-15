# Server Setup

## Prerequisites

- **Bun**: Install Bun from [bun.sh](https://bun.sh/).

## Installation

Install dependencies with Bun:

```bash
bun install
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
