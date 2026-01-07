# Custom API for React Class

A production-style backend REST API built using **Node.js, Express, and
MongoDB**.

This project follows a clean **MVC architecture** and demonstrates
authentication, authorization, validation, CRUD operations, pagination,
and Swagger-based API documentation.

This repository is suitable for **interview discussion, academic
evaluation, and backend portfolio review**.

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose ODM
-   JWT (Authentication & Authorization)
-   JOI (Request Validation)
-   Swagger (API Documentation)

------------------------------------------------------------------------

## Key Features

### Authentication & Authorization

-   User registration and login
-   Password hashing with bcrypt
-   JWT-based authentication
-   Protected profile endpoint

### Student Management

-   Create student (JWT protected)
-   Fetch students with pagination and search
-   Update student (ownership-based access)
-   Delete student (ownership-based access)

### Validation & Security

-   Centralized JOI validation
-   JWT middleware protection
-   User-level data isolation (ownership check)

### API Documentation

-   Swagger UI integrated using **swagger-jsdoc**
-   Trainer-style Swagger setup
-   Interactive API testing via browser

------------------------------------------------------------------------

## Project Structure

    app/
     ├── controllers/     # Business logic
     ├── models/          # Mongoose schemas
     ├── routes/          # API routes with Swagger docs
     ├── middlewares/     # Auth & validation middleware
     ├── config/          # Database connection
    swagger/
     └── swagger.json     # Swagger base configuration
    app.js                # Express app setup
    server.js             # Server entry point

------------------------------------------------------------------------

## Local Setup & Installation

### 1. Install dependencies

``` bash
npm install
```

### 2. Environment configuration

Create a `.env` file using `.env.example`:

``` env
PORT=5500
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Run the application

``` bash
npm run dev
```

The server will start at:

    http://localhost:5500

------------------------------------------------------------------------

## API Documentation (Swagger)

Swagger UI is available at:

    http://localhost:5500/api-docs

All authentication and student APIs are fully documented and testable
from the browser.

------------------------------------------------------------------------

## Authentication Usage

Protected endpoints require a JWT token.

Pass the token in request headers:

    Authorization: Bearer <your_jwt_token>

------------------------------------------------------------------------

## Author
**Rounak Kantha**