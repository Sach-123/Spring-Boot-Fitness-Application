# 🏋️ Fitness Microservices Application

A comprehensive fitness tracking application built with microservices architecture, featuring AI-powered activity recommendations, real-time data processing, and secure authentication.

<img width="791" height="397" alt="Fitness app architecture drawio" src="https://github.com/user-attachments/assets/5b98713a-4f52-4a49-9b29-becb60508296" />

---

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Microservices](#microservices)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Start Infrastructure](#start-infrastructure)
  - [Keycloak Setup](#keycloak-setup)
  - [Start Microservices](#start-microservices)
  - [Start Frontend](#start-frontend)
- [Screenshots](#screenshots)
- [Testing](#testing)
- [Contact](#contact)

---

## Overview

This cloud-native fitness application allows users to track activities and receive AI-powered recommendations. Built with Spring Boot, React, and microservices principles, it leverages:

* Spring Cloud for service discovery, config, and gateway routing  
* Apache Kafka for asynchronous event-driven processing  
* Keycloak for secure authentication  
* Google Gemini API for AI recommendations  

---

## System Architecture

* **Frontend**: React SPA with Material-UI  
* **API Gateway**: Centralized routing and OAuth2 JWT validation  
* **Service Discovery**: Eureka for dynamic service lookup  
* **Configuration**: Centralized management via Config Server  
* **Microservices**: User, Activity, AI services  
* **Databases**: PostgreSQL (User) and MongoDB (Activity & AI)  
* **Message Broker**: Apache Kafka for event-driven communication  
* **Authentication**: Keycloak (OAuth2/OIDC)

All services communicate asynchronously and scale independently.

---

## Features

### Core

* User registration and profile management  
* Activity tracking (running, cycling, swimming, etc.)  
* AI-powered personalized fitness recommendations  
* Real-time activity analytics  
* Secure authentication with Keycloak  
* Responsive UI with React + Material-UI  

### Advanced

* Event-driven architecture using Kafka  
* Service-to-service communication via Eureka  
* Centralized configuration with Spring Cloud Config  
* Containerized deployment with Docker  

---

## Technology Stack

**Backend**
- Java 17/21  
- Spring Boot 3.5.6  
- Spring Cloud  
- Spring Data JPA & MongoDB  
- Spring Kafka  
- Keycloak  
- Google Gemini API  

**Frontend**
- React 19.0.0  
- Vite 6.2.0  
- Material-UI 6.4.6  
- Redux Toolkit  
- React Router  
- Axios  
- React OAuth2 Code PKCE  

**Infrastructure**
- PostgreSQL  
- MongoDB  
- Kafka  
- Docker  
- Maven  
- Git  

---

## Microservices

### 1. Config Server
* Centralized configuration management  
* Environment-specific configurations  
* Configuration versioning  

### 2. Eureka Server
* Service registration and discovery  
* Health monitoring  
* Load balancing support  

### 3. API Gateway
* Request routing to microservices  
* OAuth2 JWT validation  
* CORS configuration  
* User context propagation  

### 4. User Service
* Manage users: registration, validation, profile retrieval  

### 5. Activity Service
* Store and retrieve user activities  
* Publish activity events to Kafka  

### 6. AI Service
* Consume activity events from Kafka  
* Generate AI-powered recommendations  
* Store and retrieve recommendations  

---

## Project Structure



```
backend/
├── configserver/
├── eureka/
├── gateway/
├── userservice/
├── activityservice/
└── aiservice/
└── fitness-frontend/  # Frontend
```

---

## Getting Started

### Prerequisites

* Java 17/21, Maven 3.6+  
* Node.js 18+, npm  
* Docker & Docker Compose  
* PostgreSQL 12+, MongoDB 4.4+  
* Kafka 2.8+, Keycloak 20+  

### Environment Variables

```bash
# Google Gemini API
GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
GEMINI_KEY=your-gemini-api-key

# Keycloak
KEYCLOAK_URL=http://localhost:8181
KEYCLOAK_REALM=fitness-app

# Databases
POSTGRES_URL=jdbc:postgresql://localhost:5432/fitness-micro-user
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
MONGODB_URI=mongodb://localhost:27017

# Kafka
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
```

### Start Infrastructure

```bash
# Kafka (with Zookeeper)
# Keycloak
docker run -d --name keycloak -p 8181:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
```

### Keycloak Setup

User signup is currently handled through the **Keycloak Admin Console**, available at port 8181.

> 📝 Note: Self-service user registration can be enabled later in the Keycloak realm settings to allow signup directly from the frontend.


### Start Microservices

```bash
cd configserver && mvn spring-boot:run
cd eureka && mvn spring-boot:run
cd gateway && mvn spring-boot:run
cd userservice && mvn spring-boot:run
cd activityservice && mvn spring-boot:run
cd aiservice && mvn spring-boot:run
```

### Start Frontend

```bash
cd fitness-frontend
npm install
npm run dev
```

---

## Screenshots

* **UI Dashboard**: <img width="1867" height="952" alt="ui 3 " src="https://github.com/user-attachments/assets/cc7a0cc5-0b56-4b92-84b0-20423fc8acff" />

* **Keycloak Login**: <img width="1848" height="913" alt="ui 2 redirect to keycloak signin" src="https://github.com/user-attachments/assets/cc6b2e45-afd2-4549-87f5-e0cb66181aeb" />

* **Eureka Server**: <img width="1890" height="960" alt="eureka server" src="https://github.com/user-attachments/assets/272f3b5c-407a-4738-a46a-8a9a50e44c12" />


---

## Testing

Run tests for each service:

```bash
cd userservice && mvn test
cd activityservice && mvn test
cd aiservice && mvn test
cd gateway && mvn test
```

---


---

## Contact

Open an issue for questions or support.

---

**Built with ❤️ using Spring Boot, React, and microservices architecture**
