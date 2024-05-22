# Full-Stack Project - Node.js Backend

This is the Node.js backend for the full-stack project. It provides APIs for managing campaigns, leads, and subscriptions.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v14 or higher)

## Getting Started

1. Clone the repository:
git clone https://github.com/your-repo/server.git
Copy code
2. Install dependencies:
cd server
npm install
Copy code
3. Set up the PostgreSQL database and update the connection details in `src/db.ts`.

4. Build the TypeScript code:
npm run build
Copy code
5. Start the server:
npm start
Copy code
The server will start running on `http://localhost:3000`.

## Development

During development, you can use the following command to automatically rebuild and restart the server whenever you make changes to the code:
npm run dev
Copy code
This command uses `nodemon` to watch for file changes and automatically restart the server.

## API Endpoints

### Campaigns

- `POST /api/campaigns`: Create a new campaign
- `GET /api/campaigns`: Get all campaigns

### Leads

- `POST /api/leads`: Upload a CSV file to create new leads
- `GET /api/leads`: Get all leads

### Subscriptions

- `POST /api/subscriptions`: Create a new subscription
- `GET /api/subscriptions`: Get all subscriptions

## Docker

The project includes a `Dockerfile` for building and running the Node.js app in a Docker container. To build and run the Docker image, follow these steps:

1. Build the Docker image:
docker build -t server .
Copy code
2. Run the Docker container:
docker run -p 3000:3000 server
Copy code
## Deployment

This project is configured to be deployed to AWS using Elastic Container Service (ECS) and Elastic Container Registry (ECR). The Terraform configuration files are included in the repository.

To deploy the application, follow these steps:

1. Set up your AWS credentials and configure Terraform.
2. Run `terraform init` to initialize the Terraform working directory.
3. Run `terraform apply` to create or update the necessary AWS resources and deploy the application.

Refer to the Terraform documentation for more details on deploying the application