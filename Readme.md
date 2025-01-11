# Blog Backend

## Entity Relationship Diagram

<!-- Center align and set a custom width for the image -->
<div align="center">
  <img src="https://raw.githubusercontent.com/SALEHINISLAM/blogBackend/main/erDiagram.png" alt="Entity Relationship Diagram" width="500">
</div>

## About the project

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
success: true or false,
message: ****,
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