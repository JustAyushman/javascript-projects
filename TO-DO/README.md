# TO-DO — Minimal Todo List

> A clean, responsive todo app: add tasks, auto-number them, check to complete with strikethrough → fade → auto-remove. Demonstrates dynamic DOM, event delegation, and CSS animations.

## Folder Structure

```
TO-DO/
├── index.html
├── styles.css
└── script.js
```

## Live Preview

Open `index.html` → type task → **+** or **Enter** → task appears numbered (`1. Task`). Check checkbox → strike → fade → removed, remaining tasks re-number.

## What It Does

- **Add:** Input + `+` button (or `Enter`) creates `.todo` row with checkbox + `<span>` text. Ignores empty/whitespace-only input (`trim()`). Clears input after add.
- **Numbering:** `updateNumbers()` iterates `.todo` spans, rewrites `span.innerText = (index+1)+". "+dataset.text` — uses `dataset.text` to preserve raw text.
- **Complete:** Checking box adds `.completed` (opacity + line-through), after 300ms adds `.fade-out` (translateX + opacity 0), after 700ms removes node + re-numbers.
- **UX:** Inter font, card design, custom checkbox, responsive breakpoints.

## File Breakdown — Line by Line

### `index.html` (26 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-8 | Boilerplate | `charset`, `viewport`, title `My Todo List`, Google Fonts `Inter` preconnect + `styles.css` |
| 11-13 | `<div class="app-wrapper"><div class="card"><h2>... My Todo List</h2>` | Wrapper (`max-width:560px`) + card |
| 15-18 | `<div class="input-row"><input id="taskInput" placeholder="Enter task"><button id="addBtn">+</button></div>` | Input row |
| 20 | `<div id="container"></div>` | Tasks injected here |
| 23 | `<script src="script.js">` | Logic |

> `h2` contains corrupted prefix `dY"?` — remove for clean title.

### `script.js` (60 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-3 | `getElementById("container"/"addBtn"/"taskInput")` | Cache nodes |
| 6-13 | `function updateNumbers(){ const todos=container.querySelectorAll(".todo"); todos.forEach((todo,index)=>{ span=todo.querySelector("span"); text=span.dataset.text; span.innerText=(index+1)+". "+text; })}` | Re-number all tasks — relies on `dataset.text` as source |
| 16-36 | `addBtn.addEventListener("click", ...){ taskText=taskInput.value.trim(); if(!taskText) return; todo=createElement("div").classList.add("todo"); leftDiv=createElement("div").classList.add("left"); checkbox=createElement("input") type="checkbox"; span=createElement("span") dataset.text=taskText innerText=taskText; leftDiv.append(checkbox,span); todo.appendChild(leftDiv); container.appendChild(todo); taskInput.value=""; updateNumbers(); }` | Full creation pipeline |
| 39-57 | `document.addEventListener("change", (e)=>{ if(e.target.type==="checkbox"){ todo=e.target.closest(".todo"); todo.classList.add("completed"); setTimeout(()=> todo.classList.add("fade-out"),300); setTimeout(()=>{ todo.remove(); updateNumbers(); },700); }})` | **Event delegation** on `document` catches future checkboxes; staged removal |
| 60-62 | `taskInput.addEventListener("keydown", (e)=>{ if(e.key==="Enter") addBtn.click(); })` | Keyboard shortcut — proxies to click handler |

**Pattern:** Single `change` listener on `document` instead of per-checkbox — efficient delegation.

### `styles.css` (211 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | `*,*::before,*::after {box-sizing:border-box; margin:0; padding:0;}` | Reset |
| 9-16 | `body {font-family:''Inter''; min-height:100vh; background:#f5f5f5; display:flex; align-items:center; justify-content:center; padding:24px 16px;}` | Centered light gray |
| 19-22 | `.app-wrapper {width:100%; max-width:560px;}` | Constrain |
| 25-33 | `.card {background:#fff; border:1px solid #e0e0e0; border-radius:16px; padding:40px 36px; box-shadow:0 1px 3px rgba(0,0,0,0.06), 0 8px 30px rgba(0,0,0,0.08);}` | Elevated card |
| 36-43 | `h2 {font-size:clamp(1.4rem,4vw,1.9rem); font-weight:700; color:#111; border-bottom:2px solid #111; padding-bottom:20px; margin-bottom:28px;}` | Title with underline |
| 46-49 | `.input-row {display:flex; gap:10px; margin-bottom:24px;}` | Input + button row |
| 51-71 | `input[type="text"] {flex:1; padding:13px 16px; font-size:0.93rem; background:#fafafa; border:1.5px solid #d0d0d0; border-radius:10px; ...}` + `::placeholder{color:#aaa}` + `:focus{border-color:#111; background:#fff; box-shadow:0 0 0 3px rgba(0,0,0,0.07)}` | Styled input with focus ring |
| 74-89 | `#addBtn {background:#111; color:#fff; border:none; border-radius:50%; padding:13px 20px; font-size:1.6rem; ...}` + `:hover{background:#333; translateY(-1px); box-shadow}` + `:active{translateY(0); background:#000}` | Circular + button |
| 92-95 | `#container {display:flex; flex-direction:column; gap:8px;}` | Stack tasks |
| 98-116 | `.todo {display:flex; align-items:center; justify-content:space-between; background:#fafafa; border:1px solid #e8e8e8; padding:14px 16px; border-radius:10px; transition:all 0.25s; animation:slideIn 0.3s;}` | Task row |
| 118-127 | `@keyframes slideIn {from{opacity:0; transform:translateY(-8px)} to{opacity:1; transform:translateY(0)}}` | Entry animation |
| 129-133 | `.todo:hover {border-color:#bbb; background:#f0f0f0; box-shadow:0 2px 8px rgba(0,0,0,0.06)}` | Hover |
| 137-143 | `.left {display:flex; align-items:center; gap:12px; flex:1; min-width:0;}` | Checkbox+text group |
| 146-169 | `.todo input[type="checkbox"] {appearance:none; width:20px; height:20px; border:2px solid #bbb; border-radius:5px; cursor:pointer; ...}` + `:hover{border-color:#555}` + `:checked{background:#111; border-color:#111}` + `:checked::after{content:''''; position:absolute; left:4px; top:1px; width:6px; height:10px; border:2px solid #fff; border-top:none; border-left:none; transform:rotate(45deg)}` | Custom checkbox with checkmark |
| 172-178 | `.todo span {font-size:0.92rem; color:#222; line-height:1.5; word-break:break-word;}` | Text wrapping |
| 181-187 | `.completed {opacity:0.45;}` + `.completed span{ text-decoration:line-through; color:#888}` | Completed state |
| 190-194 | `.fade-out {opacity:0; transform:translateX(30px); transition:all 0.4s !important;}` | Exit animation |
| 200-231 | `@media (max-width:600px)` | Tablet: reduce padding, align top, smaller inputs |
| 234-257 | `@media (max-width:380px)` | Small mobile: even tighter padding, smaller fonts |

## Data Flow

```
Input → addBtn.click (or Enter) → trim → guard empty → createElement(.todo > .left > checkbox+span)
→ append to #container → clear input → updateNumbers()
Checkbox change (delegated) → .completed → 300ms → .fade-out → 700ms → remove() → updateNumbers()
```

## Concepts Demonstrated

- `createElement`, `appendChild`, `closest`, `dataset`
- Event delegation (`document.addEventListener("change")`)
- `keydown` + `e.key === "Enter"`
- `querySelectorAll` + `forEach` re-numbering
- CSS custom checkbox (`appearance:none` + `::after`)
- `clamp()`, `animation`, `transition`, responsive `media queries`

## How to Run

```bash
open index.html
```

## Possible Improvements

- Persist todos in `localStorage` (JSON array)
- Add **delete** button per todo (not just checkbox)
- Allow unchecking before fade (currently one-way)
- Add empty state: `"No tasks yet"`
- Debounce rapid adds, limit length
- Accessibility: `label` for checkbox, `aria-live` for container
- Remove corrupted `dY"` chars from `h2` and JS comments

## Tech Stack

- HTML5, CSS3 (Flexbox, animations), Vanilla JS (ES6)
