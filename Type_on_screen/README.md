# Type on Screen — Key Display

> Minimal key logger visual: every key press replaces a giant centered heading with the key value (space shows "SPC"). Demonstrates the `keydown` event and `KeyboardEvent.key`.

## Folder Structure

```
Type_on_screen/
├── index.html   # contains inline <style>
└── script.js
```

## Live Preview

Open `index.html` → press any key → large text in center updates. Try `a`, `Shift`, `Enter`, ` ` (space), `ArrowUp`.

## What It Does

- Full-screen dark stage (`#222`) with centered `<h1>Type here</h1>` (`10rem`, `300` weight, `#555`, `user-select:none`).
- Listens on `window` for `keydown`.
- If `dets.key === " "` (space), shows `"SPC"`; otherwise shows `dets.key` verbatim.
- No input field needed — works globally.

## File Breakdown — Line by Line

### `index.html` (41 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | Boilerplate | `charset`, `viewport`, title `Document` (generic — could be more descriptive) |
| 7-31 | `<style>` | Reset `* {margin:0; padding:0; font-family:"Helvetica Now Display"; box-sizing:border-box}` |
| 13-17 | `html,body {width:100%; height:100%;}` | Full viewport |
| 19-27 | `#main {display:flex; align-items:center; justify-content:center; width:100%; height:100%; background-color:#222;}` | Centered dark flex container |
| 29-34 | `h1 {color:#555; font-size:10rem; font-weight:300; user-select:none;}` | Giant muted heading, non-selectable |
| 36-39 | `<div id="main"><h1>Type here</h1></div>` | Single heading target |
| 40 | `<script src="script.js">` | Logic |

### `script.js` (9 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1 | `let h1 = document.querySelector("h1");` | Cache heading |
| 3 | `window.addEventListener("keydown", function(dets){` | Global key handler; `dets` is `KeyboardEvent` |
| 4-5 | `if(dets.key===" "){ h1.textContent="SPC"; }` | Space is invisible → show placeholder |
| 6-7 | `else { h1.textContent=dets.key; }` | All other keys: `a`, `A` (with Shift), `Enter`, `Escape`, `Arrow...`, `F1` etc. — displays exact `.key` value |
| 8 | `});` | End handler |

**Nuance:** `textContent` overwrites entire display — only latest key is shown, no history/accumulation.

## Event Flow

```
User presses key → window keydown fires → KeyboardEvent.key evaluated
→ h1.textContent = (key===" " ? "SPC" : key) → repaint
```

## Concepts Demonstrated

- `window.addEventListener("keydown", ...)`
- `KeyboardEvent.key` vs legacy `keyCode`
- `querySelector` + `textContent`
- Full-screen flex centering, `user-select:none`
- Inline `<style>` vs external CSS

## How to Run

```bash
open index.html
# Press keys; hold a key to see repeat behavior
```

## Possible Improvements

- Show `event.code` as well (physical key) to distinguish `a` vs `A`
- Display `keyCode`/`which` for learning (deprecated but educational)
- Add visual feedback: scale/bounce animation on each press
- Accumulate typed string instead of single char, with backspace handling
- Handle `Space` as `"Space"` not `"SPC"` or support both
- Add `keyup` to revert or show pressed/released states
- Change title from `Document` to `Type on Screen`
- Add `preventDefault` for `Space` to avoid page scroll

## Tech Stack

- HTML5, CSS3 (Flexbox), Vanilla JS (KeyboardEvent API)
