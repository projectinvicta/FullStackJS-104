# FullStackJS-104: Hands-on Workshop • Test-Driven Development (TDD)

Welcome to **FullStackJS-104: Test-Driven Development (TDD)**! This repository is a step-by-step GitHub Codespaces & VS Code Devcontainer workshop template hosted by **JavaScript HTX** at **The Ion Houston**. You will gain practical experience building clean, resilient JavaScript codebases using test-first methodologies across both server and browser environments—culminating in a full-stack TDD Tic-Tac-Toe game engine.

---

## 🧭 Workshop Quick Reference

| Resource | Details |
| :--- | :--- |
| **Repository URL** | `github.com/projectinvicta/FullStackJS-104` |
| **Location** | The Ion Houston |
| **Test Runner** | Vitest |
| **Main Packages** | `express`, `vitest`, `chai`, `chai-http`, `jsdom` |

---

## 📅 Lesson Outline (90 Minutes)

| Time | Module | Key Topics | Focus |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:10** | **Intro & Setup** | TDD Red-Green-Refactor Cycle, Vitest Runner | Environment verification & test pyramid overview |
| **00:10 - 00:35** | **[01 - Server Testing](./01-server-testing/)** | Pure Function Unit Tests, Express Integration with `chai-http` | Testing game win logic & HTTP endpoints without port binding |
| **00:35 - 00:55** | **[02 - DOM & Mocking](./02-dom-mocking/)** | Virtual DOM (`jsdom`), `vi.fn()` Fetch Mocks, `vi.waitFor()` | Isolating frontend event handlers from live backend APIs |
| **00:55 - 01:30** | **[03 - TDD Tic-Tac-Toe](./03-tdd-tictactoe/)** | State Machines, Fake Timers (`vi.useFakeTimers`), Full-Stack App | Red-Green-Refactor build of the Tic-Tac-Toe engine & Express API |

---

## 🚀 Getting Started

Verify your Node.js and npm environment inside the Devcontainer terminal:

```bash
node -v
npm -v
```

Complete the hands-on exercises sequentially:

1. **[Exercise 01: Server-Side Testing with Vitest & Express](./01-server-testing/README.md)** — Write fast unit tests for pure board evaluation logic and integration tests for Express API routes using `chai-http`.
2. **[Exercise 02: Front-End DOM Testing with JSDOM & Mocking](./02-dom-mocking/README.md)** — Simulate browser DOM elements with `jsdom` and mock `fetch` calls using Vitest spies.
3. **[Exercise 03: TDD Exercise — Complete the Tic-Tac-Toe Engine](./03-tdd-tictactoe/README.md)** — Follow the Red-Green-Refactor loop to build a PvP and AI Tic-Tac-Toe engine, wire up Express endpoints, and play your finished game on `http://localhost:3000`.

---

> [!TIP]
> **Using Test Watch Mode**
> Inside any exercise directory, run `npm run test:watch` to keep Vitest running continuously—your tests will re-run automatically every time you save a file!

---

*Stuck? Check the [solutions/](./solutions/) folder to see the complete, verified implementations for every exercise.*

