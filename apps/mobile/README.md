# Mobile App Setup

Welcome to the mobile part of the Food Truck Mapper project. This React Native app serves as the user interface for interacting with the food truck data. Built using [expo](https://docs.expo.dev/).

## Environment Configuration

Before running the app, you need to set up your environment variables.

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your Google Maps API key, API base URL, and server port. You can find your local IPv4 address by running `ipconfig` on Windows or `ifconfig` on Mac/Linux:
   ```env
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
    REACT_APP_API_BASE_URL=http://your_api_base_url_here:your_server_port
   ```

## Running the App

To start the app in development mode, use the following command:

```bash
bun dev
```

This will start the Metro bundler and allow you to run the app on an emulator or physical device.
