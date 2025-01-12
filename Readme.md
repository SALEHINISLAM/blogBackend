# Blog Backend

## Entity Relationship Diagram

<!-- Center align and set a custom width for the image -->
<div align="center">
  <img src="https://raw.githubusercontent.com/SALEHINISLAM/blogBackend/main/erDiagram.png" alt="Entity Relationship Diagram" width="500">
</div>

## About the project

### API Endpoints:

#### Authentication:

*   Users must log in to perform write, update, and delete operations.

#### Authorization:

*   Admin and User roles must be differentiated and secured.

### 3\. Blog API

*   A public API for reading blogs:
    *   Includes blog title, content, author details & other necessary information.
    *   Supports **search**, **sorting**, and **filtering** functionalities.

* * *

## Models

  

**User Model:**

*   `name`: string – The full name of the user.
*   `email`: string – The email address of the user, used for authentication and communication.
*   `password`: string – The password for the user, securely stored.
*   `role`: "admin" | "user" – The role of the user, determining their access level. Default is "user".
*   `isBlocked`: boolean – A flag indicating whether the user is blocked or not. Default is false.
*   `createdAt`: Date – The timestamp when the user was created.
*   `updatedAt`: Date – The timestamp of the last update to the user.

  

**Blog Model:**

*   `title`: string – The title of the blog post.
*   `content`: string – The main body or content of the blog post.
*   `author`: ObjectId – A reference to the `User` model, indicating the author of the blog post.
*   `isPublished`: boolean – A flag indicating whether the blog post is published. Default is true (published).
*   `createdAt`: Date – The timestamp when the blog post was created.
*   `updatedAt`: Date – The timestamp of the last update to the blog post.

##   

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

**Description:** Registers a new user with the platform. It validates user data and saves it to the database.

**Request Body:**

```json
{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "123456789"
}
```

**Response:**

*   **Success (201):**

```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "password": "",
        "role": "user",
        "isBlocked": false,
        "_id": "6782b775e6308e0f74f28093",
        "createdAt": "2025-01-11T18:24:53.170Z",
        "updatedAt": "2025-01-11T18:24:53.170Z",
        "__v": 0
    }
}
```

*   **Failure (400):**

```json
{
    "success": false,
    "message": "User already exists",
    "statusCode": 500,
    "errorSources": [
        {
            "path": "",
            "message": "User already exists"
        }
    ],
    "stack": "Error: User already exists\n    at C:\\Users\\User\\Desktop\\NextLevelCourse\\blogBackend\\src\\app\\modules\\user\\user.service.ts:22:15\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\User\\Desktop\\NextLevelCourse\\blogBackend\\src\\app\\modules\\user\\user.service.ts:5:58)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```

####   

#### 1.2 Login User

**POST** `/api/auth/login`

**Description:** Authenticates a user with their email and password and generates a JWT token.

**Request Body:**

```json
{
    "email":"alice@example.com",
    "password":"123456789"
}
```

**Response:**

*   **Success (200):**

```json
{
    "success": true,
    "message": "Login successful",
    "statusCode": 200,
    "data": {
        "accessToken": "secretToken"
    }
}
```

*   **Failure (401):**

```json
{
    "success": false,
    "message": "Invalid credentials",
    "statusCode": 401,
    "errorSources": [
        {
            "path": "",
            "message": "Invalid credentials"
        }
    ],
    "stack": "Error: Invalid credentials\n    at C:\\Users\\User\\Desktop\\NextLevelCourse\\blogBackend\\src\\app\\modules\\Auth\\auth.services.ts:22:15\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\User\\Desktop\\NextLevelCourse\\blogBackend\\src\\app\\modules\\Auth\\auth.services.ts:5:58)"
}
```

###   

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Description:** Allows a logged-in user to create a blog by providing a title and content.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

*   **Success (201):**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####   

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Description:** Allows a logged-in user to update their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

####   

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`

**Description:** Allows a logged-in user to delete their own blog by its ID.

**Request Header:**`Authorization: Bearer <token>`

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

####   

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Description:** Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

**Query Parameters**:

*   `search`: Search blogs by title or content (e.g., `search=blogtitle`).
*   `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
*   `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
*   `filter`: Filter blogs by author ID (e.g., `filter=authorId`).

  

**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```

In this example:

*   `search=technology`: Filters blogs containing the term "technology" in the title or content.
*   `sortBy=createdAt`: Sorts the blogs by the `createdAt` field.
*   `sortOrder=desc`: Sorts in descending order (newest blogs first).
*   `filter=60b8f42f9c2a3c9b7cbd4f18`: Filters blogs authored by the user with the given `authorId`.

  

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

###   

### 3\. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

**Description:** Allows an admin to block a user by updating the `isBlocked` property to `true`.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

*   **Success (200):**

```json
{
    "success": true,
    "message": "User blocked successfully",
    "statusCode": 200,
    "data": null
}
```
* **Failure**
```json
{
    "success": false,
    "message": "User not Found",
    "statusCode": 404,
    "errorSources": [
        {
            "path": "",
            "message": "User not Found"
        }
    ],
    "stack": "Error: User not Found\n    at C:\\Users\\User\\Desktop\\NextLevelCourse\\blogBackend\\src\\app\\modules\\user\\user.service.ts:29:15\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\User\\Desktop\\NextLevelCourse\\blogBackend\\src\\app\\modules\\user\\user.service.ts:5:58)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)"
}
```
####   

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

**Description:** Allows an admin to delete any blog by its ID.

**Request Header:**`Authorization: Bearer <admin_token>`

**Response:**

*   **Success (200):**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

* * *

  

## Bonus Section

### 1\. Error Handling

Error handling is crucial in ensuring that an application responds gracefully to unexpected situations, providing users with meaningful feedback while maintaining system stability. A well-structured error response format helps in identifying and diagnosing issues effectively.

#### Common Error Response Format

To maintain consistency across all API endpoints, the following error response structure will be used:

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```



### `.env` File Pattern:
To run this server you must create a `.env` file. There must have some secret key. 
```typescript
Bcrypt_Salt_Rounds= **
Default_Pass= ***
PORT= 5000 or as your wish
Node_Env= Development or Production
DB_Url= ***
Jwt_Access_Token= ***
```
#### Tips:
To generate jwt access token without much hustle and make token little bit more strong you can follow the steps:
1. Go to Terminal or press `Ctrl + J`
2. Write `node` then press `enter`
3. Then write
```bash
require('crypto').randomBytes(64).toString('hex') 
``` 
 If you want to generate 32 bit then replace 64 instead of 32.

### Error Pattern:
All the error are same pattern as below. 

```bash
success: false,
message: ****,
statusCode: ***,
errorSources: [
  path: ***,
  message: ***,
],
stack: "see full stack if it is run in development phase otherwise it show null"
```

### Response pattern:
All the response are same pattern as below.

```bash
statusCode: ***,
success: true or false,
message: ***,
data: ***
```

## How to Create a Similar Project?

**Step-1**  
Initialize the project with `npm`:

```bash
npm init
```
**Step-2** 
Install Typescript with `npm`:

```bash
npm install -D typescript
```
**Step-3** 
Install Express with `npm`:

```bash
npm i express
```
**Step-4** 
To create `tsconfig.json` to configure Typescript:

```bash
tsc --init
```
**Step-5** 
Create `src` folder in root directory. Then go to `tsconfig.json` and find out `//"rootDir": "./"`. Uncomment it and write:

```typescript
"rootDir": "./src/"
```
Now create folder in root named `dist` and find out `"//outDir": "./", `. Uncomment it and write:
```typescript
"outDir": "./dist/"
```
keep other thing as default.

**Step-6** 
Install mongoose (MongoDB), http-status-codes (HTTP codes), zod (validation), cors (CORS handling), bcrypt (password hashing), dotenv (environment variables), and lint-staged (pre-commit linting), ts-node-dev (running ts code), jwt(access token).
```typescript
npm i mongoose
npm i zod
npm i http-status
npm i cors
npm i bcrypt
npm i dotenv
npm i lint-staged
npm i ts-node-dev
npm i jsonwebtoken
```

**Step-7**
Go to `package.json` file and find out `script` then modify like:
```typescript
"scripts": {
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "lint:fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
for starting server in production mode
```bash
npm run start:prod
```
for starting server in development mode
```bash
npm run start:dev
```
to build the project 
```bash
npm run build
```
for linting the project
```bash
npm run lint
```
for fixing lint in the project
```bash
npm run lint:fix
```
for formatting code with prettier
```bash
npm run prettier
```
to fix formatting code with prettier
```bash
npm run prettier:fix
```