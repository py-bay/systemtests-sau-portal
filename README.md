# systemtests-sau-portal

Automated system tests for [sau-portal.de](https://sau-portal.de) using Playwright with GitHub Copilot agent integration.

## Overview

This project uses Playwright v1.56+ for end-to-end testing with autonomous test generation, healing, and maintenance capabilities through GitHub Copilot agents.

## Features

- 🎭 **Playwright v1.56+**: Latest Playwright features for robust browser automation
- 🤖 **GitHub Copilot Agent Integration**: Autonomous test generation and maintenance
- 📝 **Test Planning**: Structured test plans in the `specs/` directory
- 🔧 **Custom Fixtures**: Enhanced test capabilities with custom fixtures
- 🌐 **Multi-browser Support**: Test across Chromium, Firefox, and WebKit
- 📊 **Rich Reporting**: HTML reports with trace viewer integration

## GitHub Copilot Agents

This project includes three specialized agents for autonomous testing:

### 🎭 Planner Agent
Creates comprehensive test plans by exploring the application and identifying test scenarios.

**Usage**: Use the planner agent to navigate and analyze the application, then generate detailed test plans saved in the `specs/` directory.

### 🎭 Generator Agent
Generates automated Playwright tests from test plans with proper step-by-step implementation.

**Usage**: Provide a test plan, and the generator creates corresponding Playwright test files with all necessary interactions and assertions.

### 🎭 Healer Agent
Automatically fixes broken tests when the application changes.

**Usage**: Run when tests fail due to UI changes or application updates to automatically repair test selectors and logic.

## Project Structure

```
.
├── .github/
│   └── chatmodes/          # Copilot agent configurations
│       ├── 🎭 planner.chatmode.md
│       ├── 🎭 generator.chatmode.md
│       └── 🎭 healer.chatmode.md
├── .vscode/
│   └── mcp.json           # MCP server configuration for agents
├── specs/                 # Test plans and specifications
│   └── README.md
├── tests/                 # Playwright test files
│   └── seed.spec.ts      # Seed test with custom fixtures
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ (20.x recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Open test report
npm run report

# Generate tests with Codegen
npm run test:codegen
```

## Configuration

### Base URL

The project is configured to test `https://sau-portal.de` as specified in `playwright.config.ts`:

```typescript
use: {
  baseURL: 'https://sau-portal.de',
  // ...
}
```

### Custom Fixtures

The seed test (`tests/seed.spec.ts`) includes custom fixtures:

- **homePage**: Automatically navigates to the home page
- **testContext**: Provides test metadata (timestamp, testId)

Example usage:
```typescript
test('my test', async ({ page, homePage, testContext }) => {
  // homePage fixture has already navigated to '/'
  console.log(`Test ID: ${testContext.testId}`);
  // Your test code here
});
```

## Writing Tests

### Using the Seed Test

The seed test serves as a template for generated tests. It includes:

1. Custom fixtures setup
2. Base navigation
3. Basic assertions
4. Placeholder for generated code

### Creating Test Plans

1. Create a markdown file in the `specs/` directory
2. Document test scenarios with steps and expected results
3. Use the 🎭 Generator agent to create automated tests from the plan

### Best Practices

- Use descriptive test names
- Leverage custom fixtures for common setup
- Keep tests independent and idempotent
- Use the baseURL for relative navigation
- Add comments for complex interactions

## Agent-Driven Development

### Workflow

1. **Plan**: Use 🎭 Planner to explore and document test scenarios
2. **Generate**: Use 🎭 Generator to create automated tests from plans
3. **Maintain**: Use 🎭 Healer to fix tests when the application changes
4. **Iterate**: Continuously improve test coverage and reliability

### MCP Server Integration

The `.vscode/mcp.json` configuration enables agent tools through the Playwright MCP server:

```bash
npx playwright run-test-mcp-server
```

This provides agents with browser automation capabilities for exploration and test generation.

## CI/CD Integration

The configuration is ready for CI/CD with:

- Automatic retry on CI (`retries: 2`)
- Single worker on CI for stability
- `forbidOnly` to prevent accidental `.only()` in CI builds
- Trace collection on first retry for debugging

## Troubleshooting

### Browser Installation Issues

```bash
npm run install:browsers
```

### Test Failures

1. Check the HTML report: `npm run report`
2. Use debug mode: `npm run test:debug`
3. Run in UI mode for interactive debugging: `npm run test:ui`
4. Use 🎭 Healer agent to auto-fix selector issues

### Agent Issues

Ensure the MCP server is properly configured in `.vscode/mcp.json` and the Playwright MCP server is available:

```bash
npx playwright run-test-mcp-server --help
```

## Contributing

When adding new tests:

1. Create a test plan in `specs/`
2. Use or extend custom fixtures as needed
3. Follow existing test patterns
4. Run tests locally before committing
5. Leverage agents for test generation and maintenance

## License

ISC
