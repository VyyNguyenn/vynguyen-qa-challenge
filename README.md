# Playwright Test Automation Framework

This repository contains an automated testing framework built using [Playwright](https://playwright.dev/). 

Test Cases can be found here: https://zt.ms/11Zm
---

## 🚀 **Key Components**
1. **Page Object Model (POM):**
   - Each page (e.g., AdminPage) is represented as a class with locators and methods for interacting with the page.
   - This approach promotes reusability and maintainability.

2. **Helpers:**
   - `TestHelpers.ts` contains reusable functions like `loginSuccessfully` to simplify test setup.

3. **Constants:**
   - Centralized constants (e.g., URLs, test data) in `constants.ts` to avoid hardcoding values.

4. **Tests:**
   - Test files (e.g., `admin.spec.ts`) contain test cases organized using Playwright's `test.describe` and `test` blocks.

---

## 🚦 Getting Started

### Prerequisites

- Node.js (version v20.8.10 or later)
- Playwright (version 1.39.0 or later)

### 🚀 Installation

```zsh
npm install
```

```zsh
npm playwright install
```

### 🏃‍♂️ Running Tests

- **Run all tests**
```zsh
npm test
```

- **Run tests with ui headed mode**
```zsh
npm test --headed --ui
```

- **Run demo test**
```zsh
npm test demo.spec.ts
```

- **Run tests with ui headed mode**
```zsh
npm test --headed --ui
```
