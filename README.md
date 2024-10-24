## Setup Nx Monorepo (Portal + Backend)

1. Clone the mono repository:

   ```bash
   git clone https://github.com/Mohanrau/zurich.git
   cd zurich
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` by copying `.env.example` and rename it from the project root and this are available environment variables:

   ```
   # Web Developer Assignment (PORTAL)
   PORT=3000
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=

   #Nest JS backend test (BACKEND)
   BACKEND_PORT=3001
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=password
   DATABASE_NAME=MOTOR_INSURANCE_WEBSITE
   JWT_SECRET=12345678
   ```

4. Run the project with Docker Compose:

   ### Development

   Start developement related containers e.g: Database

   ```bash
   docker build . -t zuric-base-image:nx-base

   docker compose -f .\development.yml up --build -d
   ```

   ### Production

   ```bash
   docker compose -f .\deployment.yml up -d
   ```

   Portal URL = https://localhost:8081

   Backen URL = https://localhost:8081/backend/api

5. Available Script Options

   ```bash
      "start-all": "npx nx run-many --targets=dev,serve",
      "dev:portal": "npx nx run portal:dev",
      "dev:backend": "npx nx run backend:serve",
      "test": "npx nx run-many --target=test --all",
      "test:cov": "npx nx run-many --target=test --coverage --all",
      "test:backend": "npx nx run backend:test",
      "test:cov:backend": "npx nx run backend:test --coverage",
      "test:portal": "npx nx run backend:test",
      "test:cov:portal": "npx nx run backend:test --coverage"
   ```

   `npm run {option}`

6. The API will be available at `http://localhost:3000`. You can access the Swagger UI at `http://localhost:3000/api`.

## Testing

1. To run the unit tests:

   ```bash
   npm run test
   ```

2. Ensure that the code coverage. You can check the coverage by running:
   ```bash
   npm run test:cov
   ```

---

# Web Developer Assignment (Portal)

Zurich is building a customer portal for users to manage their insurance accounts. This assignment outlines the development of the frontend part using Next.js, Redux for state management, and Google OAuth2 for authentication.

## Requirements

1. **Authentication**

   - Implement Google OAuth2 for user authentication.
   - Redirect authenticated users to the users list screen.
   - Show an error page for unauthorized access to protected pages.

2. **Users List Screen**

   - Contains three components: header, footer, and content.
   - Make an API call to `https://reqres.in/api/users`.
   - Filter records where the first name starts with "G" or the last name starts with "W".
   - Mask email addresses by default and reveal them when a button is clicked.
   - Traverse all API response pages to fetch all records.

3. **Code Criteria**
   - Ensure code is clear, complete, and organized.
   - Must be secure, testable, and reusable.
   - Meet the business logic and security requirements.

## Technologies Used

- **Next.js**: For frontend development.
- **Redux**: For managing application state.
- **Google OAuth2**: For user authentication.

## Testing

- Implement unit tests to ensure that the application remains stable with frequent updates.
- Ensure business logic is protected from the browser.

---

# Zurich Motor Insurance Pricing API (Backend)

This project is a backend API for Zurich Malaysia's new motor insurance website. The API allows users to retrieve insurance premiums based on product type and location and provides administrative functionalities to manage products and prices.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Testing](#testing)

## Features

- JWT Token based authorization
- Retrieve insurance premium based on product code and location.
- Administrative operations to add, update, and delete products.
- Swagger integration for API documentation and testing.
- Role-based access control using middleware to verify user roles from token metadata.
- Deployed with Docker and PostgreSQL.
- Includes unit tests with 80%+ code coverage.

## Technologies Used

- **NestJS** - Framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM** - For database interaction with PostgreSQL.
- **PostgreSQL** - Database to store motor insurance product information.
- **Swagger** - API documentation.
- **Docker** - For containerized deployment.
- **JWT** - For authorization.

## API Endpoints

`Authorization` Token can be genarate here: http://jwtbuilder.jamiekurtz.com/ use `JWT_SECRET` env.

- **GET /product**

  - Parameters: `productCode`, `location`
  - Retrieves the premium for a product based on product code and location.
  - Accessible by all users.

- **POST /product**

  - Body: `productCode`, `location`, `price`
  - Creates a new product entry. Admin access only.

- **PUT /product**

  - Query parameter: `productCode`
  - Body: `location`, `price`
  - Updates the price for a product at a specific location. Admin access only.

- **DELETE /product**
  - Query parameter: `productCode`
  - Deletes a product. Admin access only.

## Database

- **Database Name**: `MOTOR_INSURANCE_WEBSITE`
- **Table**: `PRODUCT`
  - `id` (Primary Key)
  - `productCode` (VARCHAR)
  - `location` (VARCHAR)
  - `price` (FLOAT)
