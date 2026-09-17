# DOM-1 — Interactive Colors & Greeting

> A beginner-friendly DOM manipulation playground: click color boxes to fill them and greet users by name. Demonstrates `querySelector`, `data-*` attributes, and event delegation.

## Folder Structure

```
DOM-1/
├── index.html
├── style.css
└── script.js
```

## Live Preview

Open `index.html` directly — no build tools needed. Google Fonts (`Inter`) loaded via CDN.

## What It Does

1. **Greeting:** Type a name → click **Greet** → header changes from `Hello` to `Hello,<name>` (fallback to `Hello` if empty).
2. **Color Boxes:** Four boxes (Red/Blue/Green/Yellow) each fill with their `data-color` hex value on click, switching text/border to white/matching color.

## File Breakdown — Line by Line

### `index.html` (32 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-9 | Boilerplate `<head>` | `charset`, `viewport`, title `Interactive Colors`, links `style.css` + Google Fonts preconnect + `Inter` |
| 11-14 | `<header><h1 id="header">Hello</h1></header>` | Greeting target — manipulated by JS |
| 15-26 | `<main class="page"><div class="container">` | Centered card wrapper |
| 17-22 | `<div class="color-boxes">` + 4 `.box` divs | Each box has unique `id` (`red`/`blue`/`green`/`yellow`) and `data-color` hex (`#ff4757`, `#2e86de`, `#2ed573`, `#ffa502`) |
| 24-27 | `<div class="controls">` | Text input `#nameInput` + button `#greetBtn` |
| 30 | `<script src="script.js">` | Deferred script |

### `script.js` (27 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1 | `DOMContentLoaded` listener | Ensures DOM is ready before querying |
| 2-5 | `getElementById` / `querySelectorAll` | Cache `header`, `nameInput`, `greetBtn`, all `.box` elements |
| 8-15 | `greetBtn.addEventListener(''click'', ...)` | Trims input; if non-empty `header.textContent = ''Hello,'' + name` else `''Hello''` (note missing space after comma) |
| 18-26 | `boxes.forEach(box => box.addEventListener(''click'', ...))` | On click: reads `box.getAttribute(''data-color'')`, sets `backgroundColor`, `color=''white''`, `borderColor` to that hex |

**Key technique:** `data-color` stores presentation data in HTML, JS reads it — separation of concerns.

### `style.css` (101 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-8 | `:root` variables | `--bg-color:#f3f4f6`, `--text-color`, `--card-bg`, `--primary-color:#2563eb`, shadow & radius tokens |
| 10-14 | `* {box-sizing:border-box; margin:0; padding:0;}` | Reset |
| 16-21 | `body` | `Inter` font, `var(--bg-color)`, `min-height:100vh` |
| 23-28 | `.page` | Flex center with `min-height:calc(100vh - 80px)` accounting for header |
| 30-38 | `header h1` | `2.5rem`, `600` weight, centered, `background:#c9ced6` |
| 40-52 | `.container` | White card, `3rem` padding, `border-radius:12px`, shadow, `max-width:800px`, `gap:3rem` flex column |
| 55-60 | `.color-boxes` | Flex row, wrap, `gap:20px`, centered |
| 62-77 | `.box` | `120x120px`, centered text, `border:2px solid #e5e7eb`, `border-radius:12px`, `transition: all 0.3s cubic-bezier(...)`, white bg |
| 79-82 | `.box:hover` | `translateY(-4px)` + larger shadow — lift effect |
| 84-88 | `.controls` | Flex centered, `gap:12px`, `margin-top:1rem` |
| 90-100 | `input[type="text"]` | `250px` wide, `2px` border, `outline:none`, focus → `border-color:var(--primary-color)` |
| 102-116 | `button` | Gray `background:#9ca3af`, white text, `8px` radius, hover → `#6b7280` |

## Interaction Flow

```
DOMContentLoaded → cache nodes
Greet: input → trim → header.textContent update
Color: click box → read data-color → inline style update (background + text + border)
```

## Concepts Demonstrated

- `DOMContentLoaded` vs placing script at bottom
- `data-*` attributes + `getAttribute`
- `querySelectorAll` + `forEach`
- `addEventListener`
- CSS variables (`:root`), Flexbox, transitions
- Google Fonts integration

## How to Run

```bash
open index.html
# or
npx serve .
```

## Possible Improvements

- Add space: `''Hello, '' + name` (currently `Hello,<name>`)
- Toggle behavior — second click resets color
- Trim + sanitize input, handle long names
- Keyboard UX: trigger greet on `Enter`
- Use `dataset.color` instead of `getAttribute`
- Add `aria-label` to boxes

## Tech Stack

- HTML5, CSS3 (Variables, Flexbox), Vanilla JS (ES6 arrow functions)
