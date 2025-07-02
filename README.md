## Service Appointment Calendar

This repository provides a services appointments management system for technicians. It contains functions such as create, edit and delete to manage their appointments accordingly.

## Non Functional Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Installation
First, execute the command to install all the dependencies needed for this project.

```bash
npm install
```

After the installation is done, put the amplify_outputs.json file provided into this project.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.