# Exercise 01: Server-Side Testing with Vitest & Express

Welcome to Module 01! Test-Driven Development (TDD) revolves around writing automated tests to specify expected behavior before—or alongside—production logic. In this module, you will build two fundamental server-side testing layers: **pure unit tests** for Tic-Tac-Toe board evaluation and **HTTP integration tests** for Express API routes.

---

## 📖 Key Concepts

### 1. Pure Function Unit Testing with Vitest
Think of a pure function like a pocket calculator: given the exact same inputs, it always returns the exact same output without touching databases, files, or network sockets. Because `checkWinner(board)` has zero external side effects, unit testing it with `vitest` takes milliseconds and catches logic bugs immediately.

### 2. Integration Testing Express Routes with `chai-http`
Starting a live server on port `3000` during automated test runs can cause port collisions (`EADDRINUSE`) in CI pipelines. By exporting the Express `app` instance without immediately binding a port, `chai-http` spins up an ephemeral server per request, sends real HTTP payloads through Express middleware and routers, and tears it down automatically.

---

## 🛠️ Step-by-Step Instructions

### Step 0: Install Module Dependencies
Open a terminal and navigate into `01-server-testing/`:

```bash
cd 01-server-testing
npm install
```

### Step 1 & 2: Implement `checkWinner` (`src/gameLogic.js`)
Open [src/gameLogic.js](./src/gameLogic.js) and complete the `TODO` markers:
1. Iterate over every `[a, b, c]` winning index triplet in `lines`. If `board[a]` is truthy and equals both `board[b]` and `board[c]`, return `board[a]` (`'X'` or `'O'`).
2. After checking all winning lines, check whether any `null` cells remain on `board`. Return `null` if moves remain, or `'Draw'` if all 9 cells are filled.

### Step 3: Write Unit Tests (`tests/unit/gameLogic.test.js`)
Open [tests/unit/gameLogic.test.js](./tests/unit/gameLogic.test.js) and complete the unit test cases:
- Assert that a horizontal row of `'X'` values (`['X', 'X', 'X', 'O', 'O', null, null, null, null]`) returns `'X'`.
- Assert that a diagonal line of `'O'` values returns `'O'`.
- Assert that a completely filled board with no three-in-a-row returns `'Draw'`.

### Step 4 & 5: Build the Express State Routes (`src/server.js`)
Open [src/server.js](./src/server.js) and implement the two endpoints:
1. `GET /api/game/state` — Respond with status `200` and the JSON `gameState` object (`{ board, status }`).
2. `POST /api/game/reset` — Reset `gameState.board` to `Array(9).fill(null)` and `gameState.status` to `'WAITING'`, then return `gameState` as JSON.

### Step 6 & 7: Test Routes with `chai-http` (`tests/integration/server.test.js`)
Open [tests/integration/server.test.js](./tests/integration/server.test.js) and complete the integration assertions:
1. Use `await chai.request(app).get('/api/game/state')` and assert `res.status` is `200`, and `res.body` has `board` and `status` properties.
2. Use `await chai.request(app).post('/api/game/reset')` and assert `res.status` is `200` and `res.body.status` equals `'WAITING'`.

---

## ✅ Verification

Run the test suite from `01-server-testing/`:

```bash
npm test
```

You can also start the server manually (`npm run dev`) and verify endpoints with `curl` in a second terminal:

```bash
curl -i http://localhost:3000/api/game/state
curl -i -X POST http://localhost:3000/api/game/reset
```

---

> [!TIP]
> **Why Export `app` Separately from `app.listen()`?**
> Guarding `app.listen(3000)` behind `process.argv[1] === fileURLToPath(import.meta.url)` lets `server.test.js` import `app` cleanly for `chai.request(app)` without keeping a background port open after tests finish.

> [!NOTE]
> Once all unit and integration tests show green checkmarks, head over to **[Exercise 02: Front-End DOM Testing with JSDOM & Mocking](../02-dom-mocking/README.md)**!

