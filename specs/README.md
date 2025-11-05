# Test Plans

This directory contains test plans and specifications for the sau-portal.de system tests.

## Structure

Test plans should be created as markdown files in this directory. Each test plan should include:

- **Application Overview**: Description of the application or feature being tested
- **Test Scenarios**: Detailed test cases with steps and expected results
- **Prerequisites**: Any setup or data requirements
- **Success Criteria**: How to determine if tests pass

## Usage with GitHub Copilot Agents

The test plans in this directory are used by the Playwright agent system:

1. **🎭 Planner Agent**: Creates comprehensive test plans by exploring the application
2. **🎭 Generator Agent**: Generates automated Playwright tests from test plans
3. **🎭 Healer Agent**: Fixes broken tests when the application changes

## Example Structure

```markdown
# Feature Name - Test Plan

## Application Overview
Brief description of the feature or application area.

## Test Scenarios

### 1. Scenario Name
**Seed:** `tests/seed.spec.ts`

#### 1.1 Specific Test Case
**Steps:**
1. Step description
2. Another step

**Expected Results:**
- What should happen
- Verification points
```

## Creating New Test Plans

To create a new test plan:
1. Use the 🎭 Planner agent to explore the application
2. Save the generated plan in this directory
3. Use the 🎭 Generator agent to create automated tests from the plan
