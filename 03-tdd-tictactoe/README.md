# Exercise 03: TDD Exercise — Complete the Tic-Tac-Toe Engine

Welcome to Module 03! Now it's time to put the **Red → Green → Refactor** workflow into practice. You will build the complete `GameEngine` state machine and wire up the Express API endpoints so you can play Tic-Tac-Toe (both Two-Player PvP and vs. Computer AI) right in your browser!

---

## 📖 Key Concepts

### 1. The Red-Green-Refactor Loop
Think of TDD like building with blueprints:
1. **🔴 Red:** Uncomment a single test describing the next behavior and watch it fail. Confirming the failure proves the test actually guards the feature.
2. **🟢 Green:** Write the minimum production code in `src/gameEngine.js` (and `src/server.js`) needed to make that test—and all prior tests—pass.
3. **🔵 Refactor:** Clean up duplication and edge cases while keeping your test suite green.

### 2. Controlling Time with `vi.useFakeTimers()`
In AI mode, the computer waits `500ms` via `setTimeout` before making its move so turns feel natural in the UI. Waiting half a second per test adds up across large suites! Vitest's `vi.useFakeTimers()` and `vi.advanceTimersByTime(600)` let your test fast-forward the clock instantaneously and deterministically.

---

## 🛠️ Step-by-Step Instructions

### Step 0: Install Module Dependencies
Navigate into `03-tdd-tictactoe/` and install dependencies:

```bash
cd ../03-tdd-tictactoe
npm install
npm test
```

### Step 1: Guard Game Start (`HINT 1`)
1. Open [tests/tdd/tictactoe.test.js](./tests/tdd/tictactoe.test.js) and uncomment **Test 1** (`"Game cannot start without two players"`).
2. Run `npm test` and observe it **FAIL (Red)**.
3. In [src/gameEngine.js](./src/gameEngine.js), implement `addPlayer(name)` (accepting up to 2 players) and update `start()` to throw `new Error("Need 2 players to start")` if fewer than 2 players have joined.
4. Re-run `npm test` until it **PASSES (Green)**.

### Step 2: Randomly Assign `'X'` and `'O'` Roles (`HINT 2`)
1. Uncomment **Test 2** (`"O and X are randomly assigned to players on game start"`).
2. Run `npm test` to confirm **Red**.
3. In `start()`, use `Math.random() < 0.5` to assign `'X'` and `'O'` to the two players, set `this.state.status = 'IN_PROGRESS'`, and set `this.state.currentTurn = 'X'`.
4. Confirm **Green** with `npm test`.

### Step 3: Process Moves & Detect Winners (`HINT 3`)
1. Uncomment **Test 3** (`"game ends when a player gets 3 in a row"`).
2. Run `npm test` to confirm **Red**.
3. Implement `makeMove(playerName, cellIndex)` in [src/gameEngine.js](./src/gameEngine.js):
   - Validate that `status === 'IN_PROGRESS'`, the player's symbol matches `currentTurn`, and `board[cellIndex] === null` (return `false` otherwise).
   - Place the player's symbol on `board[cellIndex]`.
   - Call `checkWinner(this.state.board)`. If a winner or `'Draw'` is returned, set `status = 'FINISHED'` and `winner = result`, then return `true`.
   - Otherwise toggle `currentTurn` between `'X'` and `'O'` and return `true`.
4. Confirm **Green** with `npm test`.

### Step 4: Implement Computer AI Mode with Delayed Moves (`HINT 4`)
1. Uncomment **Test 4** (`"computer plays random moves after a short delay in AI mode"`).
2. Run `npm test` to confirm **Red**.
3. Implement `startVSComputer(humanName)` and `triggerAIMove()` in [src/gameEngine.js](./src/gameEngine.js):
   - Reset state, set `mode = 'AI'`, randomly assign `'X'` and `'O'` to `humanName` and `'COMPUTER'`, and set `status = 'IN_PROGRESS'` and `currentTurn = 'X'`.
   - If `'COMPUTER'` was assigned `'X'`, immediately call `this.triggerAIMove()`.
   - In `makeMove()`, after toggling `currentTurn`, check if `mode === 'AI'` and `players['COMPUTER'] === currentTurn`—if so, call `this.triggerAIMove()`.
   - In `triggerAIMove()`, use `setTimeout(..., 500)` to pick a random empty index (`null` cell) on `this.state.board` and call `this.makeMove('COMPUTER', randomChoice)`.
4. Confirm **Green** with `npm test`.

### Step 5: Wire Up Express API Routes (`src/server.js`)
1. Open [tests/integration/server.test.js](./tests/integration/server.test.js) and uncomment the Express API integration tests.
2. Implement the missing routes in [src/server.js](./src/server.js):
   - `POST /api/game/join` — Add `req.body.name`; auto-call `game.start()` once 2 players have joined; return `game.state`.
   - `POST /api/game/start-ai` — Call `game.startVSComputer(req.body.name || 'Player 1')`; return `game.state`.
   - `POST /api/game/move` — Call `const success = game.makeMove(req.body.player, req.body.index)`; return `{ success, state: game.state }`.

---

## ✅ Verification & Play Your Game!

Once all unit, TDD, and integration tests pass:

```bash
# Run all TDD & integration tests
npm test

# Start the Express server locally
npm run dev
# Server running at http://localhost:3000
```

Test your live API with `curl` or open `http://localhost:3000` in your browser preview to play Tic-Tac-Toe!

```bash
curl -X POST http://localhost:3000/api/game/start-ai \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'
```

---

> [!TIP]
> **Preventing Orphaned Timers**
> Store the timer ID returned by `setTimeout` (`this.aiTimer = setTimeout(...)`) and clear it inside `reset()` with `clearTimeout(this.aiTimer)`. That prevents a delayed AI move from firing into a newly started game!

