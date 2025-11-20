# DeployVerse

Production-Grade Full-Stack Platform with Enterprise CI/CD, Infrastructure as Code, and Observability

DeployVerse is a complete, cloud-native web application that serves as both a functional blogging and authentication platform and a reference architecture for modern software delivery. It demonstrates end-to-end best practices in DevOps, security, scalability, and operational excellence on AWS.

## Architecture Overview

A resilient, multi-tier architecture with full automation and defense-in-depth:

- Frontend: Static assets hosted on Amazon S3, distributed globally via CloudFront CDN  
- Backend: Containerized Node.js API running on EC2 (Docker) behind Nginx reverse proxy  
- Authentication: Google OAuth 2.0 with secure session management and JWT  
- Data Layer: MongoDB Atlas (primary) with optional PostgreSQL on Amazon RDS  
- Domain & TLS: Custom domain (deployverse.dev) with automated Let's Encrypt and AWS ACM certificates  
- Email Delivery: Transactional emails via Resend with fully verified sending domain  
- Observability: Prometheus for metrics, Grafana for visualization, Node Exporter for system telemetry  
- Infrastructure as Code: Modular Terraform with remote S3 backend and GitOps workflow  
- Configuration Management: Ansible for reproducible server provisioning and service orchestration  

## Key Capabilities

- Semantic versioning with automated changelog generation  
- Conventional Commits enforcement across the entire codebase  
- Comprehensive vulnerability scanning (Trivy) at source, build, and image layers  
- Zero-downtime deployment pipeline with manual promotion gate  
- Multi-stage Terraform workflow: validate → plan → package → manual apply  
- Full GitHub Actions automation from linting to production release  
- Complete monitoring stack with pre-configured dashboards and alerting rules  
- Automated SSL/TLS certificate issuance and renewal  
- Secure-by-default networking, IAM, and container configuration  


## Development & Contribution Workflow

Strict Git branching model aligned with GitFlow and CI/CD integration:

- main: Production branch (protected, requires approvals and passing checks)  
- dev: Integration and staging branch (automatic Docker builds)  
- feature/*, bugfix/*: Short-lived branches with automated linting and scanning  

All commits follow the Conventional Commits specification to enable reliable automated releases.

## Security & Compliance

Security is embedded at every layer:

- Dependency and infrastructure vulnerability scanning on every change  
- Secrets stored exclusively in GitHub encrypted secrets (never in code)  
- Least-privilege IAM policies and security group rules  
- Automatic TLS enforcement across all services  
- Regular dependency updates and CVE monitoring  

## Monitoring & Observability

Full-stack observability provisionally deployed:

- Prometheus: Time-series metrics with custom application instrumentation  
- Grafana: Pre-built dashboards for system, container, and application performance  
- Node Exporter: Host-level metrics collection  
- Alerting: Rule-based notifications for resource exhaustion and service health  

Access  
Grafana: https://grafana.blog.deployverse.dev  
Prometheus: https://prometheus.blog.deployverse.dev  

## Live Deployment

The platform is fully deployed and publicly accessible:

Application: https://blog.deployverse.dev    

## Built With

React + Vite • Node.js + Express • MongoDB Atlas • Docker  
Terraform • Ansible • GitHub Actions  
AWS (EC2, S3, CloudFront, Route53, RDS, ACM)  
Prometheus + Grafana • Nginx + Certbot  
