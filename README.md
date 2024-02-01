# Shoes Management Backend

https://inventory-management-backend-ruby.vercel.app/

## Description

The Shoes Management Backend is a Node.js server application designed to handle authentication, CRUD operations for managing shoes inventory, and sales management functionalities. It provides APIs for user registration, login, CRUD operations for shoes, sales tracking, and generating sales history reports.

## Features

- **Authentication**:

  - User Registration and Login with JWT (JSON Web Tokens) for secure authentication.

- **Shoes Management**:

  - CRUD Operations: Add, delete, update, and view shoes in the inventory.
  - Filtering System: APIs to filter shoes based on various criteria such as price, release date, brand, model, style, size, and color.

- **Sales Management**:
  - Sell Products: API endpoint for selling products with quantity, buyer's name, and sale date.
  - Sales History: APIs to fetch sales history categorized by weekly, daily, monthly, and yearly.

## Technologies Used

- **Node.js**:
  - Express: Web framework for building APIs.
  - bcrypt: Library for hashing passwords.
  - JWT (JSON Web Tokens): For secure authentication.
  - MongoDB: Database for storing user data, shoes inventory, and sales history.
  - Mongoose: MongoDB ODM for modeling and querying data.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/assaignment-5-backend.git
   ```

1. **Install dependencies:**

   ```bash
   cd assaignment-5-backend
    npm install
   ```

1. **Set up environment variables:**
   - Create a .env file in the root directory.
   - Add the following environment variables:
   ```bash
    PORT=3001
    MONGO_URI=mongodb://localhost:27017/shoes_management_db
    JWT_SECRET=your-secret-key
   ```
1. **Start the server:**

   ```bash
   npm start:dev
   ```

## API Documentation

### Authentication

- `POST /api/auth/register`: Register a new user.

  - **Request Body:**

    ````json
    {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "role": "admin"
    }

        ```
    ````

- `POST /api/auth/login`: Login with existing user credentials.
  - **Request Body:**
    ```json
    {
      "username": "belal33000",
      "password": "password"
    }
    ```

### Shoes Management

- `GET /api/shoes`: Get all shoes in the inventory.

- `GET /api/shoes/:id`: Get single shoes in the inventory.

- `POST /api/shoes/add-shoes`: Add a new shoe to the inventory.

  - **Request Body:**

    ````json
    {
    "name": "Running Shoes",
    "image": "https://example.com/running-shoes.jpg",
    "price": 99.99,
    "quantity": 50,
    "releaseDate": "2023-08-15",
    "brand": "Nike",
    "model": "Air Zoom Pegasus",
    "style": "Running",
    "size": "US 10",
    "color": "Black/White",
    "description": "High-performance running shoes designed for speed and comfort.",
    "material": "Mesh upper, rubber sole",
    "weight": "300g"
    }

        ```
    ````

- `PUT /api/shoes/update/:id`: Update shoe details by ID.

- `DELETE /api/shoes/delete/:id`: Delete a shoe from the inventory by ID.

- `DELETE /api/shoes/bulk-delete`: Delete a shoe from the inventory by ID.

### Sales Management

- `POST /api/sales`: Sell a product.

- `GET /api/sales/history`: Get Sells History Monthly, yearly ,weekly daily product.

  - **Request Body:**
    ```json
    {
    "productId": "611e8d654c7d692d685d27f3",
    "price": 99.99,
    "productName": "Running Shoes",
    "quantity": 1,
    "buyerName": "John Doe",
    "saleDate": "2024-02-15"
    }

        ```
