# Factory Management System

This backend project, built with **Node.js**, **Express**, and **MongoDB**, serves as a factory management system.  
It allows for managing employees, departments, and shifts through a RESTful API.  
The system includes role-based access control, JWT authentication, action logging, and daily action limits.

## Technologies Used
- **Node.js & Express** – Backend REST API
- **MongoDB & Mongoose** – NoSQL database with schema validation
- **JWT (JSON Web Token)** – Authentication mechanism
- **Custom Middlewares** – Role-based access, request limiting, logging

##  Authentication & Authorization

- Users log in using an external API via `username` and `email`.
- Upon successful login, they receive a **JWT token**.
- Every protected route is guarded using the `authenticateToken` middleware, which verifies and decodes the token.

##  User Roles
- **Admin**: Full access to create, edit, delete, and view all resources.
- **User**: Limited to viewing data, with a daily action limit of 10.

  ##  Features
- Manage employees, departments, and shifts
- Role-based access (Admin/User)
- JWT-based login
- Daily action limit with middleware
- Action logs stored in JSON file and MongoDB

##  Project Structure
- `models/` – Mongoose schemas
- `services/` – Business logic
- `controllers/` – Route handlers
- `middlewares/` – Auth, logger, role checks
- `repository/` – DB access layer
- `routes/` – Express routers



