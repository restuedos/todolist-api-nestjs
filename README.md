# To-Do List API

This API allows users to easily manage to-do lists and checklist items. It supports user authentication, creation, updating, and deletion of checklists and their items.

## Features

- **User Authentication**
  - Register new users.
  - Login to get Bearer token for secure access.
- **Checklist Management**
  - Create, get, and delete checklists.
- **Checklist Item Management**
  - Add, update, rename, and delete checklist items.
  - Change the status of checklist items (completed/uncompleted).

## Installation

1. Clone the repository:
```bash
git clone https://github.com/restuedos/todolist-api-nestjs.git
cd todolist-api-nestjs
```

2. Install dependencies:
```bash
npm install
```

3. Setup your `.env` file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm run start:dev
```

4. Your application running at:
```bash
http://localhost:3000/
```

## API Documentation

Swagger API documentation is available at: `{base_url}/api`

---
