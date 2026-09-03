# System Scope

> **Why this document exists:** Scope prevents scope creep and aligns expectations.
> It is equally important to define what the system does NOT do as what it does.
> Review this document at the start of each planning cycle.

---

## In Scope

What the system **DOES build and maintain**:

### MVP Features

| # | Feature | Description | Responsible service |
|---|---------|-------------|---------------------|
| 1 | User Authentication and Registration | Allows users to register, log in, and access the platform securely. | Not defined |
| 2 | Educational Environment Monitoring | Allows users to view and monitor temperature, humidity, CO₂, and noise level in educational environments. | Not defined |
| 3 | Environment Management | Allows the management and consultation of educational environment information. | Not defined |
| 4 | Environmental Data Dashboard | Displays environmental data in an organized dashboard, allowing users to analyze the conditions of educational environments. | Not defined |
| 5 | Historical Data Analysis | Allows users to analyze environmental data by day, week, month, and year. | Not defined |
| 6 | Environment Favorites | Allows users to add and remove educational environments from their favorites. | Not defined |
| 7 | Environment Rating | Allows users to rate the comfort or conditions of an educational environment. | Not defined |

### Included integrations

| External system | Integration type | Purpose |
|----------------|------------------|---------|
| GitHub | Repository | Source code management and version control. |
| Jenkins | CI/CD | Continuous integration and project automation. |
| Docker | Containerization | Provides a consistent environment for application development and deployment. |

### Environments being built

| Environment | Purpose |
|-------------|---------|
| Local | Development on the developer's machine. |
| Development (dev) | Continuous integration and development testing. |
| Staging | Pre-production testing and validation. |
| Production | Production environment. |

---

## Out of Scope

What the system **does NOT build** in this version and why:

| # | What is out of scope | Reason | Future version? |
|---|---------------------|--------|----------------|
| 1 | Environmental ranking | Removed from the current project scope. The project now focuses on environmental data analysis through the dashboard. | No |
| 2 | Advanced predictive environmental analysis | Not part of the current MVP scope. | To be determined |
| 3 | Automated control of environmental equipment | The current system focuses on monitoring, visualization, and data analysis. | To be determined |
| 4 | Integration with external environmental control systems | No external control integration has been defined for the current version. | To be determined |

### What another system / team handles (and why not us)

| Feature | Who builds it | Why not us |
|---------|--------------|-----------|
| External environmental sensor hardware | Not defined | Hardware development is outside the current software scope. |
| External infrastructure services | Not defined | Infrastructure services outside the project are not managed by EduAirControl. |

---

## Scope assumptions

> These assumptions are taken to be true. If they change, the scope must be renegotiated.

| # | Assumption | Consequence if false |
|---|-----------|---------------------|
| 1 | Environmental data is available to the system. | The monitoring and data analysis functionalities would require an alternative data source. |
| 2 | Users access the system through a web interface. | The interface and user experience requirements would need to change. |
| 3 | MySQL is available for storing system information and environmental data. | The database strategy would need to be reviewed. |
| 4 | Environmental data can be analyzed using daily, weekly, monthly, and yearly periods. | The dashboard and data analysis strategy would need to be adjusted. |
| 5 | The initial project is developed by a team of 3 members. | The scope or sprint capacity may need to be adjusted. |

---

## Constraints

| Type | Description |
|------|-------------|
| **Time** | The project is developed using one-week Sprints. |
| **Budget** | No specific budget has been defined. |
| **Technology** | The project uses React for the frontend, Spring Boot for the backend, and MySQL for the database. |
| **Regulatory** | No specific regulation or certification has been defined. |
| **Team** | 3 developers are available for the project. |

---

## External dependencies

| Dependency | Team / Provider | Required date | Status |
|-----------|----------------|--------------|--------|
| GitHub repository | Development team | Not defined | 🟢 Available |
| Jenkins | Development team | Not defined | 🟡 In progress |
| Docker environment | Development team | Not defined | 🟡 In progress |
| Environmental data source | Not defined | Not defined | 🟡 In progress |

---

## How to update the scope

The scope can change, but the change has a process:

1. Document the proposed change in this file.
2. Evaluate the impact on schedule and effort.
3. Obtain approval from the Product Owner and Tech Lead.
4. Update the roadmap in `03-product/vision.md`.
5. Create or update HUs in `04-requirements/user-stories.md`.

---

## Correlations

- Vision and roadmap → `03-product/vision.md`
- Term glossary → `01-context/glossary.md`
- System overview → `01-context/overview.md`
- Scope-related risks → `15-project-control/risks.md`