# Domain Map — Bounded Contexts

> **What to fill in here:** The domain map is the central DDD (Domain-Driven Design) artifact.
> It defines the system's boundaries and how they relate to each other.
> Build it first with the team and domain experts in an Event Storming session.

## Before filling in this document: Event Storming

**Event Storming** is a collaborative workshop for modeling the domain before writing code.

It lasts 2–4 hours with the whole team (dev + PO + business expert).

**Materials:** Long wall, 4-color sticky notes, markers.

**Standard colors:**

| Color | Represents | Example |
|-------|-----------|---------|
| 🟠 Orange | **Domain events** (something that happened, past tense) | `EnvironmentalDataRecorded`, `UserRegistered` |
| 🔵 Blue | **Commands** (action that triggers the event) | `RecordEnvironmentalData`, `RegisterUser` |
| 🟡 Yellow | **Actors** (who executes the command) | `User`, `Administrator` |
| 🩷 Pink | **External systems** or integration points | `Environmental Sensor`, `Email Service` |

**Session steps:**

1. (30 min) Post all events that occur in the business, in chronological order, on the wall.
2. (30 min) Identify which command or actor triggers each event.
3. (45 min) Group related events — each group is a candidate Bounded Context.
4. (30 min) Draw relationships between Bounded Contexts (who depends on whom).
5. (30 min) Discuss the resulting map and agree on names.

**Result:** The session output directly feeds the 3 documents in `02-domain/`:

- Identified events → `domain-events.md`
- Entities and their rules → `entities-and-rules.md`
- Bounded Contexts and their map → this document

---

## 1. Domain overview

EduAirControl manages the monitoring and analysis of environmental conditions in educational environments. The system allows users to consult information about temperature, humidity, CO₂, and noise levels, and analyze how these variables change over time through daily, weekly, monthly, and yearly views. The goal is to centralize environmental information and make it easier to understand the conditions of educational spaces.

---

## 2. Identified Bounded Contexts

A **Bounded Context** is the explicit boundary within which a particular domain model has consistent meaning. Each bounded context has its own Ubiquitous Language.

### Bounded Context: User Management

| Field | Value |
|-------|-------|
| **Name** | User Management |
| **Responsibility** | Manages user registration, authentication, access, and user-related information. |
| **Owning team** | Development Team |
| **Microservice(s)** | Not defined |
| **Database** | MySQL |
| **Ubiquitous Language** | User, Administrator, Account, Authentication, Registration, Access |

**Context-specific terms (Ubiquitous Language):**

| Term | Meaning in THIS context | Different in another context? |
|------|------------------------|-------------------------------|
| User | A person with an account who can access the EduAirControl platform. | Yes — in Environmental Monitoring, the user is primarily a consumer of environmental information. |
| Administrator | A user with permissions to manage platform information. | Yes — permissions may have a different meaning in other contexts. |
| Account | The information required to identify and authenticate a user. | No |

---

### Bounded Context: Environmental Monitoring

| Field | Value |
|-------|-------|
| **Name** | Environmental Monitoring |
| **Responsibility** | Manages the environmental information collected from educational environments. |
| **Owning team** | Development Team |
| **Microservice(s)** | Not defined |
| **Database** | MySQL |
| **Ubiquitous Language** | Educational Environment, Temperature, Humidity, CO₂, Noise Level, Environmental Data, Environmental Monitoring |

**Context-specific terms (Ubiquitous Language):**

| Term | Meaning in THIS context | Different in another context? |
|------|------------------------|-------------------------------|
| Educational Environment | An educational space whose environmental conditions are monitored. | Yes — in Environmental Data Analysis, it is the environment associated with historical data. |
| Environmental Data | Recorded values of temperature, humidity, CO₂, and noise level. | Yes — in Data Analysis, it represents historical information used for analysis. |
| Environmental Variable | A measurable condition of an educational environment. | No |
| Environmental Monitoring | The process of collecting and tracking environmental conditions. | No |

---

### Bounded Context: Environmental Data Analysis

| Field | Value |
|-------|-------|
| **Name** | Environmental Data Analysis |
| **Responsibility** | Analyzes environmental data and presents historical information according to different time periods. |
| **Owning team** | Development Team |
| **Microservice(s)** | Not defined |
| **Database** | MySQL |
| **Ubiquitous Language** | Environmental Data, Historical Data, Data Analysis, Daily Analysis, Weekly Analysis, Monthly Analysis, Yearly Analysis, Dashboard |

**Context-specific terms (Ubiquitous Language):**

| Term | Meaning in THIS context | Different in another context? |
|------|------------------------|-------------------------------|
| Historical Data | Previously recorded environmental information used for analysis. | Yes — in Environmental Monitoring, data represents current or collected measurements. |
| Data Analysis | Process of examining environmental data to identify variations and conditions over time. | No |
| Environmental Dashboard | Visual interface used to display environmental information and analysis. | No |
| Analysis Period | The time range used to analyze environmental data. | No |

---

## 3. Context Map

The Context Map shows relationships between bounded contexts. Relationships define how contexts communicate and who provides the information.

```text
┌─────────────────────────┐
│    User Management      │
│                         │
│ User registration,      │
│ authentication and      │
│ access management       │
└────────────┬────────────┘
             │
             │ User access
             ▼
┌─────────────────────────┐
│ Environmental           │
│ Monitoring              │
│                         │
│ Environmental data from │
│ educational environments│
└────────────┬────────────┘
             │
             │ Environmental Data
             ▼
┌─────────────────────────┐
│ Environmental Data       │
│ Analysis                 │
│                          │
│ Dashboard and historical │
│ analysis by day, week,   │
│ month and year           │
└─────────────────────────┘


## Context relationship types

Type	Symbol	Description	Example
Upstream → Downstream	U → D	U provides, D consumes. D depends on U.	Environmental Monitoring → Environmental Data Analysis
Shared Kernel	SK	Two teams share part of the model.	Not defined
Customer/Supplier	C/S	Supplier (U) provides information required by Customer (D).	Environmental Monitoring → Environmental Data Analysis
Conformist	CONF	D adopts U's model without negotiating.	Not defined
Anti-Corruption Layer	ACL	D translates U's model to protect its own model.	Not defined
Open Host Service	OHS	U publishes a protocol that other contexts can consume.	REST API
Published Language	PL	Explicit shared language used for integration.	API contract
Relationships table
Context A	Relationship	Context B	Communication channel	Contract
User Management	U → D	Environmental Monitoring	REST API	API contract
Environmental Monitoring	U → D	Environmental Data Analysis	REST API	API contract
4. Core Domain, Supporting, Generic

DDD classifies subdomains by their strategic value:

Type	Description	Investment	Example
Core Domain	Where the business competitive advantage lies. What differentiates the system.	MAXIMUM — build, don't buy	Environmental data analysis
Supporting Subdomain	Necessary for the core but not differentiating.	MEDIUM	Environmental monitoring
Generic Subdomain	Commodity. Off-the-shelf solution exists.	MINIMUM — buy/use OSS	User authentication
Classification of this project's bounded contexts
Bounded Context	Type	Justification
Environmental Data Analysis	Core	It is the main differentiating functionality of EduAirControl, providing historical analysis of environmental conditions through the dashboard.
Environmental Monitoring	Supporting	It provides the environmental information required by the analysis functionality.
User Management	Generic	User authentication and account management are common functionalities with standard solutions available.
5. Modeling decisions
How were these decisions made?

The initial domain map was defined based on the current functional scope of EduAirControl and the main business capabilities identified by the development team. The map can be refined after conducting a formal Event Storming session with the complete team.

Event Storming session: Not performed yet
Tool used: Not defined
Map iterations: Initial version
Key decisions and discarded alternatives
Decision	Discarded alternative	Reason
Separate Environmental Monitoring and Environmental Data Analysis	Combine both into a single context	Monitoring focuses on environmental information, while analysis focuses on historical data and time-based analysis.
Use Environmental Data Analysis as the Core Domain	Use Environmental Monitoring as the Core Domain	The dashboard and historical analysis are the main differentiating functionality of the current project.
Remove Environmental Ranking from the domain	Keep ranking as a system capability	Ranking is no longer part of the current project scope.
Analyze data by day, week, month, and year	Use only current environmental values	Historical analysis is now a central functionality of EduAirControl.
6. How to update this map
Before adding a new microservice, verify whether it belongs to an existing bounded context.
If a context's ubiquitous language is changing, review whether the context should be split.
Run an Event Storming session every time the domain changes significantly.
The context map MUST be synchronized with the C4 system-level diagram (05-architecture/overview.md).

Important correlation: The bounded contexts in this document →

Microservices in 09-microservices/service-catalog.md →

C4 diagrams in 08-uml/ →

Service separation ADRs in 05-architecture/decisions/