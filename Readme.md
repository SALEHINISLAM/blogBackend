# Blog Backend

## Entity Relationship Diagram

<!-- Center align and set a custom width for the image -->
<div align="center">
  <img src="https://i.ibb.co.com/SPh4619/blog-backend.png" alt="Entity Relationship Diagram" width="500">
</div>

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
**step-5**
Create `src` folder in root directory. Then go to `tsconfig.json` and find out `//"rootDir": "./"`. Uncomment it and write:

```typescript
"rootDir": "./src/"
```
Now create folder in root named `dist` and find out `"//outDir": "./", `. Uncomment it and write:
```typescript
"outDir": "./dist"
```
keep other thing as default.
