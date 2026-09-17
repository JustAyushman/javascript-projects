# Random Color Generator

> One-click random hex color generator with animated color display — showcases `Math.random()`, hex generation, and CSS glassmorphism with blurred blobs.

## Folder Structure

```
Random_Color_Generator/
├── index.html
├── style.css
└── script.js
```

## Live Preview

Open `index.html` → click **Generate Color** → background + central octagonal box update to same random hex, code displayed, box rotates 180° + scales.

## What It Does

- Button click generates random 6-digit hex `#RRGGBB` (16.7M possibilities).
- Applies color to `document.body.style.background` **and** `#colorBox` background.
- Updates `#colorCode` text (e.g., `#A3F9C1`).
- Animates `#colorBox`: cumulative `rotation += 180°` + `scale(1.08)` pop, resets after 300ms.

## File Breakdown — Line by Line

### `index.html` (22 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | Boilerplate | `charset`, `viewport`, title `Random Color Generator`, links `style.css` |
| 8-15 | `<div class="container">` | Glass card: `<h1>`, `<div id="colorBox">`, `<h2 id="colorCode">#FFFFFF</h2>`, `<button id="btn">Generate Color</button>` |
| 17 | `<script src="script.js">` | Logic |

### `script.js` (25 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-3 | `getElementById("btn")`, `"colorBox"`, `"colorCode"` | Cache nodes |
| 5 | `let rotation = 0;` | Persistent rotation accumulator |
| 7 | `button.addEventListener("click", () => {` | Click handler |
| 9-11 | `const letters="0123456789ABCDEF"; let color="#"; for i<6 { color += letters[Math.floor(Math.random()*16)] }` | Classic hex generation: 6 random picks from 16 chars |
| 14-16 | `document.body.style.background=color; colorBox.style.background=color; colorCode.textContent=color;` | Apply to body, box, text — note `style.background` overwrites gradient |
| 18-22 | `rotation+=180; colorBox.style.transform=`rotate(${rotation}deg) scale(1.08)`; setTimeout(()=> transform=rotate(${rotation}deg) scale(1),300)` | Cumulative rotation + pop animation; timeout resets scale |

Alternative modern one-liner: `'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0')`.

### `style.css` (83 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-5 | `* {margin:0; padding:0; box-sizing:border-box; font-family:Arial}` | Reset |
| 7-13 | `body {height:100vh; display:flex; justify-content:center; align-items:center; background:linear-gradient(135deg,#6a11cb,#37331F); overflow:hidden;}` | Centered, gradient fallback (overwritten on click) |
| 16-23 | `body::before, body::after {content:""; position:absolute; width:250px; height:250px; border-radius:50%; filter:blur(60px); z-index:-1;}` | Blurred blobs base |
| 25-29 | `body::before {background:#ff4d6d; top:-50px; left:-50px;}` | Top-left pink blob |
| 31-35 | `body::after {background:#00f5d4; bottom:-50px; right:-50px;}` | Bottom-right teal blob |
| 37-56 | `.container {width:350px; padding:35px; text-align:center; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); border-radius:20px; backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); box-shadow:0 8px 32px rgba(0,0,0,.3), inset 0 1px 1px rgba(255,255,255,.4); color:white;}` | Glassmorphism card |
| 58-60 | `h1 {margin-bottom:20px;}` | Title spacing |
| 62-75 | `#colorBox {width:180px; height:180px; margin:20px auto; background:white; clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%); border:2px solid rgba(208,208,208,0.658); transition:0.6s ease;}` | Octagon via `clip-path`, smooth transition |
| 78-81 | `#colorCode {margin:15px 0; letter-spacing:2px;}` | Spaced hex text |
| 83-96 | `button {width:100%; padding:14px; border:none; border-radius:12px; background:rgba(255,255,255,.2); color:white; font-size:16px; cursor:pointer; transition:.3s; backdrop-filter:blur(10px);}` | Glass button |
| 98-101 | `button:hover {transform:translateY(-3px); background:rgba(255,255,255,.3); box-shadow:0 10px 20px rgba(0,0,0,.25);}` | Hover lift |
| 103-105 | `button:active {transform:scale(.98);}` | Press |

## Data Flow

```
Click → loop 6× random hex digit → "#RRGGBB" → set body bg + box bg + text
→ rotation+=180 → transform rotate+scale → 300ms timeout → scale back to 1
```

## Concepts Demonstrated

- Hex color generation (`Math.random`, `Math.floor`, string concatenation)
- `style.background` / `style.transform` manipulation
- `setTimeout` for staged animation
- Glassmorphism (`backdrop-filter:blur`, `rgba` translucency)
- `clip-path:polygon` for octagon shape
- `::before`/`::after` blurred decorative blobs

## How to Run

```bash
open index.html
# Click multiple times — note rotation accumulates (180, 360, 540...)
```

## Possible Improvements

- Use `backgroundColor` instead of `background` to preserve gradient fallback or use CSS variable
- Ensure 6-char pad: `padStart(6,''0'')` if using numeric method
- Add copy-to-clipboard: `navigator.clipboard.writeText(color)` + toast
- Add history palette of last 5 colors
- Support `#` shorthand toggle or RGB display
- Add `aria-live` for color code announcements

## Tech Stack

- HTML5, CSS3 (glassmorphism, clip-path), Vanilla JS
