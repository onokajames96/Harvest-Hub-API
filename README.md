# E-commerce API[Harvest-Hub-API]

## Introduction

This project is an E-commerce API built with Node.js, Express, and MongoDB. It includes basic features such as user authentication, product management, and order processing.

## Table of Contents

   1. Features
   2. Tech Stack
   3. Installation
   4. Usage
   5. API Endpoints
   6. Future Extensions
   7. Contributing
   8. License

### Features

    #### Authentication and Authorization.

Role-based user authentication and authorization was implemented. We currently included three types of users namely admin, buyer, and seller. The default user is set to seller. Therefore, if a user registers without the role field, they will be assigned the default role. Bellow is a summary of the process and routes involved.

    # Authentication and Authorization.
        Register a user
	Verify a user's email
	Login a user
	Authrize user by issuing a JWT token
	Request password reset
	Reset password
	Change password

A user registered as a seller essentially represent the farmer. Sellers are authorised to all product management routes as detailed under product management.

A user registered as a buyer represents the consumer. The are authorised and have access to some specific product routes. They however have exclusive acess to cart and order routes.

Admin users on the other hand are like super user. They have a broader array of access rights.

For detailed description of this API's endpoints.

    # Product Management
	Add a product
	Edit a product
	View all products
	View a product by its ID
	Delete a product by its ID

For a detailed description of this APS's endpoints.

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

Installation

    Clone the repository:

    bash

git clone https://github.com/yourusername/Harvest-Hub-API.git
cd Harvest-Hub-API

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
