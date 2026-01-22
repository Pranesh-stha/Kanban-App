# 📋 Kanban App (Next.js + TypeScript)

A simple, **client-side Kanban board** where you can create columns and tasks, then **drag & drop** tasks between columns to track progress. 🚀

---

## ✨ Features

- ➕ **Add Columns** (e.g., To Do / In Progress / Done)
- ✏️ **Rename Columns** (prompt-based rename)
- 🗑️ **Delete Columns** (with confirmation — removes all cards inside)
- ✅ **Add Tasks / Cards** with:
  - 📝 Title
  - 📌 Priority (Low / Medium / High)
  - 🗓️ Due date
  - 🏷️ Labels (comma-separated)
  - 📄 Optional description
- ❌ **Delete Tasks** (with confirmation)
- 🧲 **Drag & Drop** cards between columns (HTML5 drag events)
- 🎨 Styled with a custom CSS theme in `globals.css`

> Note: This app stores data **in React state only** (no database / localStorage yet). Refreshing the page will reset the board.

---

## 🧰 Tech Stack

- ⚡ **Next.js (App Router)** — `src/app/*`
- ⚛️ **React** — client components + `useState`
- 🟦 **TypeScript** — typed cards/columns/board state
- 🎨 **CSS** — custom styles in `src/app/globals.css`
- 🧩 **HTML5 Drag & Drop API** — move cards across columns

---

## 🗂️ Folder Structure

```bash
src/
└── app/
    ├── components/
    │   ├── home/
    │   │   ├── AddCard.tsx       # “Add Task” modal
    │   │   ├── AddColumn.tsx     # “Add Column” modal
    │   │   └── Board.tsx         # Board UI + drag & drop + card rendering
    │   └── layout/
    │       └── Header.tsx        # Top header + “Add Column” button
    ├── favicon.ico
    ├── globals.css               # App styling/theme
    ├── layout.tsx                # Root layout + metadata
    └── page.tsx                  # Main page: board state + handlers + modals
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- **Node.js 18+** (recommended)
- npm / yarn / pnpm (any one)

### 📦 Install
From the project root (where your `package.json` is):

```bash
npm install
```

### ▶️ Run (Dev)
```bash
npm run dev
```

Now open:
- `http://localhost:3000`

### 🏗️ Build & Start (Production)
```bash
npm run build
npm run start
```

---

## 🕹️ How to Use

1. **Add a column**  
   Click **+ Add Column** in the header ➜ type a name ➜ **Save**.

2. **Add a task**  
   Inside a column, click **+ Add Task** ➜ fill in details ➜ **Save**.

3. **Move tasks**  
   Drag a card and drop it into another column. ✨

4. **Rename a column**  
   Click **✏️** on the column header, type a new name in the prompt, and confirm.

5. **Delete a card / column**  
   Use **❌ Delete** on a card or **🗑️** on the column header (both confirm first).

---

## 🔧 Customization

### Change the default columns
Edit the initial state in:

- `src/app/page.tsx` → `useState({ columns: [...] })`

Example:
```ts
columns: [
  { id: 1, name: "Backlog", cards: [] },
  { id: 2, name: "Doing", cards: [] },
  { id: 3, name: "Review", cards: [] },
  { id: 4, name: "Done", cards: [] },
]
```

### Update styles
All styling lives here:
- `src/app/globals.css`

---

## 🧠 Implementation Notes (Quick)

- The board is stored in a single React state object: `board`
- Cards are moved via **HTML5 drag events**:
  - `onDragStart` saves `{ fromColumnId, cardId }` into `dataTransfer`
  - `onDrop` reads that payload and calls `onMoveCard(...)`

---

## 🛣️ Roadmap Ideas (Optional)

If you want to level it up later:

- 💾 Persist board to **localStorage**
- 🗄️ Add a backend (Next.js API routes) + database (SQLite / Prisma)
- 🔎 Search & filters (by label/priority/due date)
- 👤 Auth + multiple boards
- 📱 Better mobile drag support

---


