# E-commerce API[Harvest-Hub-API]

This project is an E-commerce API built with Node.js, Express, and MongoDB. It includes basic features such as user authentication, product management, and order processing.
. Table of Contents

   1. Features
   2. Tech Stack
   3. Installation
   4. Usage
   5. API Endpoints
   6. Future Extensions
   7. Contributing
    .License

# Features

    . Authentication and Authorization
        Sign Up
        Sign In
        Sign Out
        JWT token authorization

    # Product Management
        Add, Edit, View (one/all), and Delete products

    # Cart Management
        Create cart
        Add items to cart
        Remove items from cart

    # Order Processing
        Calculate the bill

Tech Stack

    Backend: Node.js, Express
    Database: MongoDB
    ODM: Mongoose
    Authentication: JWT, Bcrypt
    Environment Variables: Dotenv
    Dev Tools: Nodemon
    Validation: Validator
    Payment Integration: Stripe / Flutterwave SDK

Installation

    Clone the repository:

    bash

git clone https://github.com/yourusername/ecommerce-api.git
cd ecommerce-api

Install dependencies:

bash

npm install

Set up environment variables. Create a .env file in the root directory and add the following:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the server:

bash

    npm run dev

# Usage

Use a tool like Postman or Insomnia to test the API endpoints.
API Endpoints
Auth

   . POST /api/auth/register - Register a new user
   . POST /api/auth/login - Log in a user
   . GET /api/auth/logout - Log out a user

# Products

    GET /api/products - Get all products
