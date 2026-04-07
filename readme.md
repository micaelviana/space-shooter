<h1 align="center">Space Shooter</h1>

<div align="center">
   <img src="screenshots/jogo.png" alt="Home Screen" width="800">
</div>

<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Handlebars.js-f0ad4e?style=for-the-badge&logo=handlebars.js&logoColor=white" alt="Handlebars.js" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="Sass" />
</p>

<h2 align="center">🚀 Space Shooter Web App Game</h2>

## About

A browser-based Space Shooter game built as a full-stack web application.
This project combines a classic arcade gameplay loop with authentication, score persistence, and ranking.

## Tech Stack

- Backend: Node.js, Express 5, TypeScript
- Frontend: Handlebars templates, vanilla JavaScript, SCSS/CSS, Bootstrap 5
- Database: MySQL + Prisma ORM
- Auth & session: bcryptjs, express-session, cookies
- Tooling: Nodemon, Sass CLI

## Main Features

- Arcade Space Shooter gameplay in the browser
- User registration and login
- Session-based authentication
- Score saving and ranking page
- CRUD pages for users and majors

## Project Structure

```text
src/                # Express app, controllers, routes, services, types
public/js/          # Game logic (ship, enemies, shots, HUD, space)
public/scss/        # SCSS source
public/css/         # Compiled CSS
prisma/             # Prisma schema and migrations
screenshots/        # README screenshots
```

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm
- Docker (for MySQL and phpMyAdmin)

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=6566
NODE_ENV=DEVELOPMENT
LOGS_PATH=logs
DATABASE_URL="mysql://root:senhasegura@127.0.0.1:3307/game"
SECRET_SESSION=your_secret_here
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Docker network (first time only):

```bash
docker network create game-app-network
```

3. Start MySQL container:

```bash
docker run -d \
  --name mysql-game-app \
  --network game-app-network \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=senhasegura \
  -e MYSQL_DATABASE=game \
  -v mysql-game:/var/lib/mysql \
  mysql:latest
```

4. Start phpMyAdmin container (optional):

```bash
docker run -d \
  --name phpmyadmin-game-app \
  --network game-app-network \
  -e PMA_HOST=mysql-game-app \
  -e PMA_PORT=3306 \
  -e PMA_USER=root \
  -e PMA_PASSWORD=senhasegura \
  -p 8081:80 \
  phpmyadmin/phpmyadmin
```

5. Run Prisma migrations:

```bash
npx prisma migrate dev
```

## Running the App

Start DB containers (if already created):

```bash
docker start mysql-game-app phpmyadmin-game-app
```

In one terminal, compile SCSS in watch mode:

```bash
npm run sass
```

In another terminal, start the server:

```bash
npm start
```

App URL: `http://localhost:6566`  
phpMyAdmin URL: `http://localhost:8081`

## How to Play

1. Create an account or log in.
2. Open the `Jogar` page.
3. Press `Space` to start.
4. Controls:
- `ArrowLeft`: move left
- `ArrowRight`: move right
- `Space`: shoot
- `P`: pause/resume
5. Avoid enemies and destroy targets to increase score.
6. Your best score is saved and shown in `Ranking`.

## Useful Scripts

```bash
npm start       # Run app with nodemon (TypeScript)
npm run sass    # Watch and compile SCSS -> CSS
npm run deploy  # Compile TypeScript to /build
npm run start:prod
```

## Screenshots

### Gameplay:

![Gameplay](./screenshots/jogo.png)

### About:

![About](./screenshots/sobre.png)

### Ranking:

![Ranking](./screenshots/ranking.png)

### Login:

![Login](./screenshots/login.png)

### Sign Up:

![Sign Up](./screenshots/cadastro.png)

### Update User:

![Update User](./screenshots/update%20de%20usu%C3%A1rio.png)
