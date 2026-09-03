# Agile Team Conventions

> Defines how the team works through its development cycles. Agree on and sign off
> with the entire team before the first sprint. Update when the team decides to change something.

---

## Sprint structure

| Field | Value |
|-------|-------|
| Duration | 1 week  |
| Sprint start | Tuesday |
| Sprint end | Monday of the following week |
| Current sprint | Sprint [N] — [start date] to [end date] |
| Estimated capacity | 42 points |

---

## Ceremonies

### Sprint Planning
- **When:** 25/08/2026 - 3:00 p.m.
- **Duration:** 1 hour 
- **Who:** Entire team
- **Goal:** Select and commit to sprint user stories, break down into technical tasks
- **Output artifact:** Sprint Backlog updated in ClickUp https://app.clickup.com/90171046961/v/b/li/901712132123

### Daily Stand-up
- **When:** Every day - 10:00 p.m.
- **Duration:** 15 minutes
- **Format:**
  1. What did I do yesterday?
  2. What will I do today?
  3. Is anything blocking me?
- **Rule:** Technical discussions happen after the daily, not during it

### Sprint Review
- **When:** Mondays of each week - 2:00 p.m. 
- **Duration:** 30 minutes
- **Who:** Team + Product Owner 
- **Goal:** Show what was built and collect feedback

### Sprint Retrospective
- **When:** Last day of the sprint — after the review
- **Duration:** 45 minutes 
- **Format:** What went well / What to improve / Action commitments
- **Rule:** Each retro produces at least 1 improvement action with an owner and due date

### Backlog Refinement
- **When:** Thursday of the week / mid-sprint
- **Duration:** 1 hour 
- **Goal:** Detail, clarify, prioritize, and estimate the user stories that could be included in the next sprint.
- **Exit criterion:** The story meets the Definition of Ready and can be considered for the next Sprint

---

## Estimation

### Scale
| Points | Meaning |
|--------|---------|
| 1 | Trivial — done in hours |
| 2 | Small — done in one day |
| 3 | Medium — takes 2–3 days |
| 5 | Large — takes almost a full sprint |
| 8 | Very large — should be split |
| 13 | Epic — MUST be split before the sprint |

**Technique:** Planning Poker 
**Tool:** Parabol Spring Poker 

### Estimation rule
- If there is disagreement of 2+ levels (e.g., someone says 3 and another says 8), discuss before voting again.
- If a story is estimated at 8 or 13, it must be split into smaller sub-tasks.

---

## Backlog tool

**Tool:** ClickUp 
**Board URL:** https://app.clickup.com/90171046961/v/b/li/901712132123

### Board columns
| Column | Meaning |
|--------|---------|
| Backlog | Pending refinement |
| Ready | Ready to enter the sprint (meets DoR) |
| In Progress | Someone is actively working on it |
| In Review | In Pull Request / code review |
| Done | Meets DoD and is closed |

---

## Team velocity

| Sprint | Story points completed | Notes |
|--------|----------------------|-------|
| Sprint 1 | — | — |
| Sprint 2 | — | — |
| Sprint 3 | — | — |
| Average | — | — |

---

## Related documents

- Definition of Ready → `00-governance/definition-of-ready.md`
- Definition of Done → `00-governance/definition-of-done.md`
- Risk management → `15-project-control/risks.md`
- Technical debt backlog → `15-project-control/tech-backlog.md`