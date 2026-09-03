# Project Glossary

> **Instructions:** Define here all technical and business terms used in the project.
> This is the official dictionary — if there is ambiguity, this document wins.
> Add terms throughout the project, not only at the start.

---

## How to use this glossary

1. Before using a technical or business term in code, docs, or conversations: look it up here.
2. If it's not there: add it with its definition.
3. If there is disagreement about the definition: discuss it as a team and update this document.

---

## Domain terms

| Term | Definition | Notes / Synonyms |
|------|-----------|-----------------|
| Educational Environment | An educational space monitored by EduAirControl where environmental conditions are recorded and analyzed. | Avoid using "classroom" when referring to any type of educational space. |
| Temperature | An environmental variable that represents the level of heat present in an educational environment. | Environmental variable. |
| Humidity | An environmental variable that represents the amount of moisture present in an educational environment. | Environmental variable. |
| CO₂ | The level of carbon dioxide recorded in an educational environment. | Environmental variable. |
| Noise Level | A measurement of the noise present in an educational environment. | Environmental variable. |
| Environmental Monitoring | The process of tracking the environmental variables of educational environments through the system. | Includes temperature, humidity, CO₂, and noise level. |
| Environmental Data | Information collected from environmental variables such as temperature, humidity, CO₂, and noise level. | Used for monitoring and analysis. |
| Environmental Data Analysis | The process of analyzing environmental data to identify conditions and variations over time. | Can be performed by day, week, month, or year. |
| Historical Data | Previously recorded environmental data used to analyze changes and behavior over time. | Organized by day, week, month, and year. |
| User | A person who uses EduAirControl to consult and manage available information according to their permissions. | Do not confuse with Administrator. |
| Administrator | A user responsible for managing information and administrative functionalities of the platform. | System role. |
| Favorites | A feature that allows users to save educational environments for quick access. | Avoid using "saved" as the feature name. |
| Environmental Dashboard | A visual panel that presents environmental data and analysis for educational environments. | Displays information by day, week, month, and year. |

---

## Technical terms of the project

| Term | Definition |
|------|-----------|
| Microservice | Independent service with a single responsibility, its own process, and its own database |
| Domain Event | A fact that occurred in the business that other services can observe. Name always in past tense. |
| Bounded Context | Boundary within which a particular domain model has consistent meaning |
| API Gateway | Single entry point to the system that routes requests to the corresponding microservices |
| Circuit Breaker | Pattern that stops calls to a failing service, preventing failure cascades |
| Saga | Sequence of local transactions across different services with compensating transactions on failure |
| Dead Letter Queue | Queue where messages that could not be processed after several retries are sent |
| Idempotence | Property of an operation to produce the same result if executed multiple times |

---

## Acronyms

| Acronym | Meaning |
|---------|---------|
| IAM | Identity and Access Management |
| JWT | JSON Web Token |
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| DTO | Data Transfer Object |
| FR | Functional Requirement |
| NFR | Non-Functional Requirement |
| SLO | Service Level Objective |
| SLA | Service Level Agreement |
| ADR | Architecture Decision Record |
| PR | Pull Request |
| DoD | Definition of Done |
| CI/CD | Continuous Integration / Continuous Delivery |