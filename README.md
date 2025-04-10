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
perl
Copy
Edit
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

## 🧑‍💻 Author

**Harrison Holt**  
AWS Certified Developer & Solutions Architect  
[Portfolio](https://harrisonholt.dev) | [Email](mailto:hholt2901@gmail.com)
