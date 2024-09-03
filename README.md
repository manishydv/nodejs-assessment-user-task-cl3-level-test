# node_assessment_user_task_project
The **Task Manager API** is a backend service built using Node.js and SQLite3 to demonstrate the implementation of a RESTful API for managing tasks and projects. This API allows users to perform essential actions related to task and project management, such as creating, retrieving, and managing users, projects, and tasks.

#### **Objective**

The primary objective of this project is to showcase how to build a RESTful API using Node.js with an SQLite3 database. The API provides endpoints for user authentication, project management, and task management. The key features include:

1. **User Authentication**: Provides endpoints for user registration and login using email and password, ensuring secure access to the system.
2. **Project Management**: Allows authenticated users to create new projects, view all projects, or fetch details of a specific project.
3. **Task Management**: Enables users to create tasks under specific projects, view all tasks, or retrieve tasks related to a specific project.

#### **Functionality Overview**

The Task Manager API provides the following core functionalities:

1. **User and Authentication Routes**:
   - **Register User**: Create a new user account with unique credentials.
   - **Login User**: Authenticate an existing user and provide a token for accessing protected routes.

2. **Project Routes**:
   - **Create Project**: Create a new project associated with a user.
   - **Get All Projects**: Retrieve all projects created by users.
   - **Get Project by ID**: Fetch specific project details using the project ID.

3. **Task Routes**:
   - **Create Task**: Add a new task under a specific project.
   - **Get All Tasks**: Retrieve all tasks available in the system.
   - **Get Task by ID**: Fetch details of a specific task using its ID.
   - **Get Tasks by Project**: Retrieve all tasks related to a specific project.

#### **Protected Routes**

Most of the routes related to projects and tasks are protected. Only authenticated users with valid tokens can access these routes. This demonstrates the use of middleware for authentication and security in a Node.js application.

#### **Technologies Used**

- **Node.js**: The runtime environment for building the backend API.
- **Express.js**: A web application framework for creating the RESTful endpoints.
- **SQLite3**: A lightweight relational database management system used to store users, projects, and tasks.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.

#### **Use Cases and Demonstrations**

This API demonstrates how to:

- Set up and configure a RESTful API using Node.js and Express.js.
- Implement secure user authentication with hashing and token-based authorization.
- Create, read, update, and delete (CRUD) operations on a SQLite3 database.
- Structure a Node.js project for clarity and maintainability, separating concerns into routes, controllers, and database management.
- Use middleware to protect API routes and handle common errors effectively.

By building this API, developers can understand the practical aspects of designing a backend system for managing tasks and projects, which is a common use case in many business applications.
