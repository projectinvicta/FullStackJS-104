# Exercise 02: Front-End DOM Testing with JSDOM & Mocking

Welcome to Module 02! In Node.js, browser globals like `window` and `document` don't exist by default, and calling live backend APIs from UI tests makes tests slow and brittle. In this module, you will simulate a browser environment using **JSDOM** and isolate frontend UI event handlers using **Vitest mocks (`vi.fn`)**.

---

## 📖 Key Concepts

### 1. Virtual Browser Environments (`jsdom`)
Launching a full Chrome browser just to verify a button click updates a `<div>` is like renting a stadium to practice free throws. Adding the `@vitest-environment jsdom` docblock instructs Vitest to mount a lightweight virtual DOM (`document`, `HTMLElement`, DOM events) right inside Node.js.

### 2. Isolating Network Calls with `vi.fn()` and `vi.waitFor()`
When a user clicks **"Play Against Computer"**, the UI calls `fetch('/api/game/start', ...)`. By replacing `global.fetch` with `vi.fn().mockResolvedValue(...)`, we control the exact JSON payload returned and inspect what URL and options our UI sent—zero server required! Because `fetch` and `.json()` resolve asynchronously on the microtask queue, `await vi.waitFor(...)` cleanly waits for the DOM text update to settle.

---

## 🛠️ Step-by-Step Instructions

### Step 0: Install Module Dependencies
Navigate into `02-dom-mocking/` and install dependencies:

```bash
cd ../02-dom-mocking
npm install
```

### Step 1 & 2: Wire Up Frontend Event Listeners (`src/ui.js`)
Open [src/ui.js](./src/ui.js) and complete `attachGameHandlers()`:
1. Attach a `'click'` listener to `#vs-computer-btn` that sends a `POST` request to `'/api/game/start'` with JSON body `{ mode: 'AI' }`, parses `await response.json()`, and sets `#status` text to `` `Game Started: ${data.mode} Mode` ``.
2. Attach `'click'` listeners to every `.cell` button in `#grid`. When clicked, read `Number(cell.dataset.index)`, send a `POST` request to `'/api/game/move'` with JSON body `{ index }`, parse the JSON response, and update `cell.textContent = data.symbol` and `statusEl.textContent = data.message`.

### Step 3 & 4: Mock `fetch` & Verify DOM Updates (`tests/dom/ui.test.js`)
Open [tests/dom/ui.test.js](./tests/dom/ui.test.js) and complete the JSDOM test suite:
1. Ensure the `/** @vitest-environment jsdom */` pragma stays at the very top of the file.
2. In the first test (`mocks fetch call when clicking Play Against Computer`), mock `global.fetch` using `vi.fn().mockResolvedValue(...)`, click `#vs-computer-btn`, assert `global.fetch` was called with `'/api/game/start'`, and use `await vi.waitFor(...)` to assert `#status` updates to `'Game Started: AI Mode'`.
3. In the second test (`updates clicked grid cell and status after mocked move`), mock `global.fetch` to resolve `{ ok: true, json: async () => ({ symbol: 'X', message: 'Turn: O' }) }`, click `.cell[data-index="0"]`, and assert both the cell text (`'X'`) and `#status` (`'Turn: O'`) update.

---

## ✅ Verification

Run Vitest inside `02-dom-mocking/`:

```bash
npm test
```

---

> [!IMPORTANT]
> **Docblock Placement Matters**
> The `@vitest-environment jsdom` comment block must appear at the **top** of your test file (before any `import` statements) so Vitest initializes `document` before running your suite.

> [!TIP]
> **Cleaning Up Mocks**
> Calling `vi.restoreAllMocks()` inside `afterEach` ensures mocked globals don't leak into subsequent tests.

---

*Ready for the main event? Continue to **[Exercise 03: TDD Exercise — Complete the Tic-Tac-Toe Engine](../03-tdd-tictactoe/README.md)**!*

