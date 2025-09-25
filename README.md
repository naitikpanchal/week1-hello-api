
# Hello API (Express + TypeScript)

A simple REST API built with **Express** and **TypeScript** as part of a backend skill-up plan.  
It implements a health check endpoint and a full CRUD system for managing tasks, including validation and tests.

---

## 🚀 Features

- Express + TypeScript setup  
- Environment variables with `dotenv`  
- Logging middleware  
- Health check endpoint (`/health`)  
- CRUD endpoints for tasks (`/tasks`)  
- JSON file persistence for tasks (no DB needed yet)  
- Input validation with `zod`  
- Integration tests with Vitest + Supertest  

---

## 🛠️ Prerequisites

- Node.js 18+  
- npm or yarn  

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/naitikpanchal/week1-hello-api.git
cd week1-hello-api
npm install
```

Create a `.env` file:

```env
PORT=3000
```

---

## 🏃 Running the Server (Development)

```bash
npm run dev
```

This starts the server with `ts-node-dev` (or your chosen dev runner).  
By default it runs at [http://localhost:3000](http://localhost:3000).

---

## 🧪 Running Tests

We use [Vitest](https://vitest.dev/) + [Supertest](https://github.com/visionmedia/supertest) for integration testing.

```bash
npm test
```

You should see something like:

```text
 ✓ src/__tests__/health.test.ts (1 test)
 ✓ src/__tests__/tasks.test.ts (2 tests)

 Test Files  2 passed (2)
      Tests  3 passed (3)
```

---

## 📝 API Endpoints

### Health Check

`GET /health`

Response:

```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2025-09-21T10:15:30.000Z"
}
```

---

### Tasks CRUD

#### List all tasks

`GET /tasks`

Response:

```json
[
  { "id": 1, "title": "Sample Task", "completed": false }
]
```

#### List task by ID

`GET /tasks/:id`

Response:

```json
{ "id": 1, "title": "Sample Task", "completed": false }
```

#### Create Task

`POST /tasks`

Body:

```json
{ "title": "Write tests" }
```

Response:

```json
{ "id": 2, "title": "Write tests", "completed": false }
```

Invalid body returns `400`:

```json
{ "error": [ ...validation errors... ] }
```

#### Update Task

`PUT /tasks/:id`

Body (partial allowed):

```json
{ "completed": true }
```

Response:

```json
{ "id": 2, "title": "Write tests", "completed": true }
```

#### Delete Task

`DELETE /tasks/:id`

Response:

```json
{ "message": "Task deleted" }
```

---

## 📂 Project Structure

```text
src/
  controllers/
    taskController.ts
  models/
    task.ts
  routes/
    taskRoutes.ts
  utils/
    fileHandler.ts
  server.ts
  __tests__/
    health.test.ts
    tasks.test.ts
data/
  tasks.json
README.md
```

---

## 📝 Development Workflow

We use a lightweight git flow:

```bash
git checkout -b feat/some-feature
# make changes
git add .
git commit -m "feat: describe feature"
git push -u origin feat/some-feature
# open Pull Request on GitHub → merge into main
```

---

## 📚 Next Steps

- Add a database (PostgreSQL or MongoDB)  
- Add authentication & authorization  
- Deploy to AWS or another cloud provider  

---

## 🛠️ Tech Stack Badges

![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![CI](https://github.com/naitikpanchal/week1-hello-api/actions/workflows/ci.yml/badge.svg)
![Version](https://img.shields.io/github/v/tag/naitikpanchal/week1-hello-api?label=version)

---
