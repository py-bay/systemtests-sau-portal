# Example Test Plan Template

This is a template file to demonstrate the structure of test plans for the sau-portal.de project.

## Application Overview

[Description of the application area or feature being tested]

## Test Scenarios

### 1. [Feature Category Name]

**Seed:** `tests/seed.spec.ts`

#### 1.1 [Test Scenario Name]

**Steps:**
1. Navigate to [specific page or section]
2. [Action to perform]
3. [Another action]
4. [Verification step]

**Expected Results:**
- [What should be visible/happen]
- [Another expected outcome]
- [Verification point]

**Prerequisites:**
- [Any required setup or state]

#### 1.2 [Another Test Scenario]

**Steps:**
1. [First step]
2. [Second step]

**Expected Results:**
- [Expected outcome]

---

## Notes for Test Generation

- Use the 🎭 Planner agent to explore sau-portal.de and create comprehensive test plans
- Each scenario should be independent and testable in isolation
- Include both positive and negative test cases
- Consider edge cases and error conditions
- Reference the seed test for custom fixtures

## Example Usage

To generate tests from this plan:

1. Open GitHub Copilot Chat in VS Code
2. Select the 🎭 Generator agent
3. Provide the test plan and specify which scenarios to generate
4. The agent will create corresponding `.spec.ts` files in the `tests/` directory
