# Node.js Authentication API

This is a simple Node.js authentication API built with Express, MongoDB, and JWT.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. **Clone the repository:**

    ```
    git clone https://github.com/your-username/node-authentication-api.git
    ```

2. **Navigate to the project directory:**

    ```
    cd node-authentication-api
    ```

3. **Install dependencies:**

    ```
    npm install
    ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   SECRET_KEY=your-secret-key

## Running the Application
1. Start MongoDB:

2. Make sure your MongoDB server is running.

Start the application:

```bash
Copy code
npm start
```
The API will be accessible at http://localhost:3000.

## API Endpoints
- GET /users

Returns a list of all users.

- GET /users/<id>

Returns the user with the specified ID.

- POST /users

Creates a new user with the specified data.

- PUT /users/<id>

Updates the user with the specified ID with the new data.

- DELETE /users/<id>

Deletes the user with the specified ID.

Testing
- Run Jest tests using the following command:

```bash
Copy code
npm test
```

## Test Cases
- Validating user input for each endpoint.
- Ensuring proper CRUD functionality and error handling.
- Verifying the authentication middleware for secured endpoints.
```go
Copy code

Make sure to replace placeholders like `your-username` and customize the database
```
