# Counter — Simple JavaScript Counter App

> A minimal counter application demonstrating DOM manipulation, event handling, and state management with vanilla JavaScript.

## Folder Structure

```
Counter/
├── index.html
├── style.css
└── script.js
```

## Live Preview

Open `index.html` in any modern browser. No build step required.

## What It Does

- Displays a numeric counter starting at `0`.
- Three controls:
  - **Increase** → increments by 1
  - **Decrease** → decrements by 1 (allows negatives)
  - **Reset** → back to 0
- Updates the DOM instantly on each click.

## File Breakdown — Line by Line

### `index.html` (17 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1 | `<!DOCTYPE html>` | HTML5 doctype |
| 2 | `<html lang="en">` | English document |
| 3-6 | `<head>` + meta tags | Charset `UTF-8`, viewport for responsiveness, title `Counter` |
| 7 | `<link rel="stylesheet" href="style.css">` | Links CSS |
| 9-16 | `<body>` | Contains UI |
| 10 | `<label id="countLable">0</label>` | Counter display. Note typo: `countLable` (should be `countLabel`) — kept consistent with JS/CSS |
| 11-15 | `<div id="btnContainers">` + 3 `<button>` | Button group: `decreasebtn`, `resetbtn`, `increasebtn`, all share class `button` |
| 17 | `<script src="script.js">` | Loads JS at end of body for DOM availability |

### `script.js` (30 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-5 | `// user input` commented block | Leftover demo code for username greeting — inactive |
| 7-10 | `const decreasebtn = getElementById(...)` etc. | Cache DOM references for 3 buttons + label |
| 12 | `let count = 0;` | Single source of truth — numeric state |
| 14-18 | `increasebtn.onclick = function(){ count++; countLable.textContent = count; }` | Increment and re-render |
| 20-24 | `decreasebtn.onclick = ... count--` | Decrement and re-render |
| 26-30 | `resetbtn.onclick = ... count = 0` | Reset state and UI |

**Pattern:** `state → DOM update` on every event. No validation needed.

### `style.css` (42 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-3 | `body{ background-color: rgb(69,69,68); }` | Dark gray backdrop |
| 4-10 | `#countLable{ display:block; text-align:center; font-size:10rem; ... background-color:bisque; }` | Huge centered counter, bisque background, white text |
| 12-18 | `#btnContainers{ display:flex; justify-content:center; gap:20px; width:100%; margin-top:20px; }` | Flex row centered button container |
| 21-31 | `.button{ ... background-color:rgb(85,136,218); padding:10px 20px; border-radius:50px; ... }` | Pill-shaped blue buttons |
| 33-35 | `.button:hover{ background-color:rgb(241,135,6); }` | Orange hover feedback |

> Note: CSS contains a corrupted comment `/* dY"" THIS IS THE KEY */` — likely an encoding artifact, not functional.

## Data Flow

```
User clicks button → onclick handler mutates `count` → updates `countLable.textContent` → browser repaints
```

## Concepts Demonstrated

- `document.getElementById`
- `.onclick` event assignment (vs `addEventListener`)
- Mutable state with `let`
- `.textContent` DOM update
- Flexbox centering

## How to Run

```bash
# Option 1: double-click index.html
# Option 2: serve locally
npx serve .
```

## Possible Improvements

- Fix spelling: `countLable` → `countLabel` everywhere
- Use `addEventListener` for consistency
- Prevent excessive negatives or add min/max limits
- Add keyboard support (ArrowUp/ArrowDown)
- Persist count with `localStorage`
- Add `aria-live="polite"` for accessibility

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES5)
- No dependencies
