# 🍩 Donut Order System – Event-Driven Serverless App with DevOps Pipeline

A fully serverless donut ordering platform built on AWS to showcase event-driven architecture, CI/CD automation, and modern DevOps practices.

## 🚀 Features

### 👨‍🍳 User-Facing
- Browse available donuts
- Submit orders through the UI
- Receive confirmation email with a downloadable receipt

### 🧱 Backend & Infrastructure
- Event-driven backend powered by AWS Step Functions and EventBridge
- Serverless functions using AWS Lambda
- CI/CD pipeline for React frontend using CodePipeline, CodeBuild, and ECR
- Containerized frontend deployed to ECS Fargate behind an ALB
- Infrastructure-as-Code using CloudFormation
- Logs and metrics managed via CloudWatch

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Dockerized and deployed via ECS Fargate

### AWS Services
- API Gateway – frontend integration
- Lambda – backend logic
- Step Functions – order flow orchestration
- EventBridge – workflow trigger
- DynamoDB – inventory storage
- S3 – downloadable receipts (via pre-signed URLs)
- SES – transactional email notifications
- ECS Fargate – containerized frontend hosting
- CodePipeline + CodeBuild – CI/CD for frontend
- CloudWatch – logging and monitoring
- CloudFormation – infrastructure provisioning

<details> <summary><code>donut-order-system/</code></summary>
donut-order-system/
├── frontend/         # React + Vite app
├── lambdas/          # Backend Lambda functions
├── step-functions/   # ASL workflow definitions
├── cicd/             # CodePipeline & CodeBuild configs
├── infra/            # CloudFormation templates
└── README.md         # Project documentation
</details>

## 📚 Learning Outcomes
- Built a full serverless app using AWS best practices
- Designed scalable event-driven workflows
- Implemented DevOps pipelines for containerized deployment
- Applied monitoring and alerting via CloudWatch


## 🔧 In Progress Enhancements (April 2025)

These features are currently being developed to expand the functionality, monitoring, and security of the Donut Order System.

### 🔒 Cognito Authentication + Order History
- Integrating **Amazon Cognito** for secure user sign-up and sign-in
- Protecting API Gateway endpoints using JWT-based authorizers
- Storing and displaying **order history by user** using DynamoDB and RDS
- Personalizing receipt access with Cognito-authenticated pre-signed URLs

### 🧪 CI/CD Pipeline Testing Integration
- Adding **unit tests** for Lambda functions using Jest
- Configuring **GitHub Actions** to run tests on every push
- Incorporating **Pa11y** and **Lighthouse CI** to audit accessibility and performance
- Storing test and audit reports as build artifacts for visibility

### 📈 CloudWatch Dashboard + Alerting
- Creating a **CloudWatch Dashboard** to monitor:
  - Lambda errors, invocations, and duration metrics
  - Step Function execution state and error rates
  - API Gateway latency and 4XX/5XX responses
- Setting up **CloudWatch Alarms + SNS alerts** for:
  - High order failure rates
  - Unusual error spikes across the application

Stay tuned for updates as these features roll out!

## 🧑‍💻 Author

**Harrison Holt**  
AWS Certified Developer & Solutions Architect  
[Portfolio](https://harrisonholt.dev) | [Email](mailto:hholt2901@gmail.com)
