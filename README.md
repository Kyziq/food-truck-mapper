<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Kyziq/food-truck-mapper">
    <img src="/packages/assets/logo.svg" alt="Logo" width="140" height="140">
  </a>

  <h3 align="center">Food Truck Mapper</h3>
  <p align="center">
    A way to find .........................
    <br />
    <a href="https://github.com/Kyziq/food-truck-mapper">View Demo</a>
    ·
    <a href="https://github.com/Kyziq/food-truck-mapper/issues">Report Bug</a>
    ·
    <a href="https://github.com/Kyziq/food-truck-mapper/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#motivation">Motivation</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#license">License</a></li>

  </ol>
</details>

## About the Project

[![Food Truck Mapper Screenshot][product-screenshot]](https://example.com)

asdasdasasdas

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Motivation

asdasdasasdas

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

| Category        | Tech                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Mobile          | [![React Native][ReactNative]][ReactNative-url] [![Expo][Expo]][Expo-url]                             |
| Admin-Web       | [![Vite][Vite]][Vite-url] [![React][React]][React-url] [![TailwindCSS][TailwindCSS]][TailwindCSS-url] |
| Server          | [![ElysiaJS][ElysiaJS]][ElysiaJS-url]                                                                 |
| Database        | [![DrizzleORM][Drizzle]][Drizzle-url] [![PostgreSQL][PostgreSQL]][PostgreSQL-url]                     |
| Package Manager | [![Bun][Bun]][Bun-url]                                                                                |

Additionally, this project is managed with [Turborepo](https://turborepo.org/), which helps to run scripts and manage dependencies across multiple packages efficiently.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

### Getting Started

To get a local copy up and running, follow these steps:

#### Prerequisites

- Ensure you have [Bun](https://bun.sh/) installed on your system.

#### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Kyziq/food-truck-mapper.git
   ```
2. Navigate to the project directory:
   ```sh
   cd food-truck-mapper
   ```
3. Install dependencies:
   ```sh
   bun install
   ```
4. Set up the environment:
   Before proceeding, make sure to set up your environment variables. Copy the example environment file and rename it to `.env`.
   ```bash
   cp .env.example .env
   ```
5. Edit the `.env` file and update the variables with to match your actual credentials..
   ```env
    DB_URL="postgres://your_username:your_password@0.0.0.0:5432/food_truck_mapper"
    GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"
    REACT_APP_API_BASE_URL="http://your_api_base_url_here:your_server_port"
   ```
6. Start the development environment:
   ```sh
   bun dev
   ```
   This command will concurrently start the development servers for admin-web, mobile, and server as defined in the Turborepo configuration.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT STRUCTURE -->

### Project Structure

```plaintext
root
├─ apps
│  ├─ admin-web
│  │  ├─ src
│  ├─ mobile
│  │  ├─ assets
│  │  ├─ src
│  └─ server
│     ├─ src
├─ packages
│  ├─ assets
│  ├─ database
├─ .env
├─ .env.example
├─ .gitignore
├─ LICENSE
├─ README.md
├─ bun.lockb
├─ package.json
└─ turbo.json
```

For detailed information on each application, please refer to their respective README files:

- **Server**: [`/apps/server/README.md`](/apps/backend/README.md)
- **Mobile**: [`/apps/mobile/README.md`](/apps/mobile/README.md)
- **Database**: [`/packages/database/README.md`](/packages/database/README.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

### License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://react.dev/
[ReactNative]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev/
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]: https://expo.dev/
[ElysiaJS]: https://img.shields.io/badge/elysiajs-7c7d7c.svg?style=for-the-badge&logoColor=white
[ElysiaJS-url]: https://elysiajs.com/
[Drizzle]: https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black
[Drizzle-url]: https://orm.drizzle.team/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Bun]: https://img.shields.io/badge/bun-282a36?style=for-the-badge&logo=bun&logoColor=fbf0df
[Bun-url]: https://bun.sh/
[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
