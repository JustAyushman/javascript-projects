# Dynamic Profile Card Generator

> Create profile cards on the fly from a form — demonstrates dynamic DOM creation with `createElement`, `appendChild`, and form handling via `preventDefault()`.

## Folder Structure

```
dynamic_profile_card_generator/
├── index.html
├── style.css
└── script.js
```

## Live Preview

Open `index.html` — fill the four fields (Image URL, Name, Role, Description) → **Create Card** → card appears below. Cards stack vertically.

## What It Does

- Form with 4 inputs: **Image URL**, **Name**, **Role**, **Description** + submit button.
- On submit, builds a card:
  - Circular profile image (100×100)
  - `<h3>` name
  - `<h5>` role (muted)
  - `<p>` description
- Appends card to `#main` container.
- Clears text inputs (keeps submit button intact).

## File Breakdown — Line by Line

### `index.html` (22 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | Boilerplate | `charset`, title `Profile Card Generator`, links `style.css` |
| 8 | `<div id="main">` | Flex container for form + generated cards |
| 10-16 | `<form>` with 4 `<input type="text">` | Placeholders: Image URL, Name, Role, Description — all `required` |
| 14 | `<input type="submit" value="Create Card">` | Submit trigger |
| 19 | `<script src="script.js">` | Logic |

### `script.js` (37 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-3 | `querySelector("form")`, `querySelectorAll("input")`, `querySelector("#main")` | Cache form, all inputs (NodeList of 5: 4 text + 1 submit), main container |
| 5 | `form.addEventListener("submit", function(dets){ dets.preventDefault();` | Prevent page reload, `dets` is submit event |
| 8-9 | `createElement("div")` + `classList.add("card")` | Card wrapper |
| 11-12 | `createElement("div")` + `classList.add("profile")` | Inner profile wrapper for image |
| 14-15 | `createElement("img")` + `setAttribute("src", inputs[0].value)` | Image from first input — no validation |
| 17-18 | `createElement("h3")` + `textContent = inputs[1].value` | Name |
| 20-21 | `createElement("h5")` + `textContent = inputs[2].value` | Role |
| 23-24 | `createElement("p")` + `textContent = inputs[3].value` | Description |
| 26-30 | `profile.appendChild(img); card.appendChild(profile); card.appendChild(h3/h5/p); main.appendChild(card);` | Assemble hierarchy: `main > card > profile > img` + siblings |
| 33-37 | `inputs.forEach(... if(inp.type !== "submit") inp.value = "")` | Clear only text inputs |

**Note:** Relies on input order (`inputs[0]`…`[3]`) — fragile if HTML order changes.

### `style.css` (71 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | `* {margin:0; padding:0; box-sizing:border-box; font-family:"Segoe UI"}` | Reset |
| 8-12 | `html,body {width:100%; height:100%;}` | Full viewport |
| 14-22 | `#main` | `min-height:100vh`, `background:linear-gradient(135deg,#111,#222)`, flex column centered, `padding:40px`, `gap:30px` |
| 25-33 | `form` | Flex column, `gap:10px`, `background:#1c1c1c`, `padding:20px`, `border-radius:10px`, `width:300px` |
| 35-40 | `form input` | `padding:10px`, `border-radius:6px`, `border:none`, `outline:none` |
| 42-49 | `form input[type="submit"]` | Blue `background:#0072ff`, white text, hover → `#005be0`, `transition:0.3s` |
| 52-63 | `.card` | `width:280px`, `background:#2a2a2a`, `border-radius:12px`, `padding:20px`, centered text, `box-shadow:0 10px 30px rgba(0,0,0,0.5)`, `transition:transform 0.3s` |
| 65-67 | `.card:hover` | `translateY(-5px)` lift |
| 69-75 | `.profile img` | `100x100`, `border-radius:50%`, `object-fit:cover`, `margin-bottom:10px` |
| 77-89 | `h3 / h5 / p` | `h3` margin-top 10px; `h5` muted `#aaa`; `p` `0.9rem` `#ccc` |

## Data Flow

```
Submit → preventDefault → createElement (card, profile, img, h3, h5, p)
→ set textContent/src from inputs[0..3] → nested appendChild → main.appendChild → clear inputs
```

## Concepts Demonstrated

- `querySelector` / `querySelectorAll`
- `addEventListener(''submit'')` + `preventDefault()`
- Dynamic DOM: `createElement`, `setAttribute`, `classList.add`, `appendChild`
- Form input indexing, `dataset` vs index access
- Flexbox & gradients, `object-fit:cover`, hover transforms

## How to Run

```bash
open index.html
# Test with: https://i.pravatar.cc/300 for image URL
```

## Possible Improvements

- Use `id`/`name` per input (e.g., `#imageUrl`) instead of index — more robust
- Validate URL & image `onerror` fallback (placeholder image)
- Escape/sanitize `textContent` is already safe (vs `innerHTML`)
- Add delete/edit button per card
- Use `<template>` element for card markup
- Persist cards in `localStorage`
- Add empty-state message

## Tech Stack

- HTML5, CSS3, Vanilla JS (ES6)
