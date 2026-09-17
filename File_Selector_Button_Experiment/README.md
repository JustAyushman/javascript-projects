# File Selector Button Experiment — Custom File Input

> A polished custom file picker: hides the native `<input type="file">` and proxies clicks through a styled gradient button that shows the selected filename.

## Folder Structure

```
File_Selector_Button_Experiment/
└── index.html   # single-file demo: HTML + <style> + <script> inline
```

## Live Preview

Open `index.html` — click **Choose File** → native file dialog opens → button text updates to chosen filename.

## What It Does

- Native file input is hidden (`display:none`).
- Stylized button `#btn` triggers `fileinp.click()` programmatically.
- On file selection (`change` event), button label becomes `file.name`; if cancelled, label unchanged.

## File Breakdown — Line by Line

### `index.html` — `<head>` & `<style>` (inside same file)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | Boilerplate | `charset`, title `Custom File Button` |
| 8-14 | `* {margin:0; padding:0; box-sizing:border-box; font-family:"Segoe UI"}` | Reset |
| 16-18 | `html,body {width:100%; height:100%;}` | Full height |
| 20-26 | `#main {display:flex; align-items:center; justify-content:center; height:100%; background:linear-gradient(135deg,#111,#222);}` | Centered dark gradient stage |
| 29-31 | `#fileinp {display:none;}` | Hide native input — still functional via JS |
| 34-47 | `#btn {padding:18px 40px; font-size:1.2rem; border:none; border-radius:50px; background:linear-gradient(45deg,#00c6ff,#0072ff); ... box-shadow:0 10px 25px rgba(0,114,255,0.4);}` | Pill gradient button, overflow hidden for shine effect |
| 50-53 | `#btn:hover {transform:translateY(-3px) scale(1.05); box-shadow:0 15px 35px rgba(0,114,255,0.6);}` | Lift + scale on hover |
| 56-58 | `#btn:active {transform:scale(0.95);}` | Press feedback |
| 61-71 | `#btn::after {content:""; position:absolute; top:0; left:-100%; width:100%; height:100%; background:rgba(255,255,255,0.2); transform:skewX(-20deg);}` | Diagonal shine strip off-screen |
| 73-76 | `#btn:hover::after {left:120%; transition:left 0.6s ease;}` | Shine sweeps across on hover |

### `index.html` — `<body>` & `<script>`

| Line(s) | Code | Purpose |
|---------|------|---------|
| 81-84 | `<div id="main"><button id="btn">Choose File</button><input type="file" id="fileinp"></div>` | Button + hidden input siblings |
| 87-88 | `let btn = querySelector("#btn"); let fileinp = querySelector("#fileinp");` | Cache nodes |
| 90-92 | `btn.addEventListener("click", () => fileinp.click())` | Proxy click → opens OS file picker |
| 94-99 | `fileinp.addEventListener("change", (dets) => { const file = dets.target.files[0]; if(file) btn.textContent = file.name; })` | Reads `FileList`, updates button text to filename; handles cancel (no file) gracefully |

**Security note:** Only filename is displayed — not file path (browsers block path for privacy).

## Concepts Demonstrated

- Customizing unstyleable `<input type="file">` via proxy pattern
- `element.click()` programmatic trigger
- `change` event + `File API` (`files[0].name`)
- CSS gradients, `::after` pseudo-element shine animation, `transform` & `box-shadow` transitions
- `overflow:hidden` + absolute positioning tricks

## How to Run

```bash
open index.html
# No server needed — pure client side
```

## Possible Improvements

- Show file size/type: `file.size`, `file.type`
- Handle long filenames: `text-overflow: ellipsis` + `max-width`
- Add drag-and-drop zone (`dragover`/`drop`)
- Display preview if image (`URL.createObjectURL(file)`)
- Reset to "Choose File" with a clear button
- Support `multiple` attribute + list filenames
- Add `accept` filter (e.g., `accept="image/*"`)
- Accessibility: `aria-label`, keyboard focus

## Tech Stack

- HTML5, CSS3 (gradients, pseudo-elements), Vanilla JS (File API)
