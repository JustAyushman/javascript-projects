# Hacking — System Simulation / Matrix Prank

> A theatrical "hacking" simulation: staged terminal progression → progress bar → typewriter → depleting metrics → red Matrix rain with "SYSTEM COMPROMISED" warning. Purely visual, no real hacking.

## Folder Structure

```
Hacking/
└── index.html   # self-contained: inline <style> + <script>, no external files
```

## Live Preview

Open `index.html` — sequence auto-plays (no interaction needed). Runs ~10–12 seconds to Matrix finale. Refresh to replay.

## What It Does — Staged Timeline

1. **0s:** Green-on-black terminal shows `" Accessing system..."` (red alert).
2. **2s:** Alert hides, `"Downloading files..."` + progress bar animates 0→100% (`30ms` × 100).
3. **~5s:** Download hides, typewriter prints `"Redirecting......"` (`60ms`/char), then ~1.5s pause.
4. **~7s:** Metrics appear: **System Integrity / Security Level / Firewall Status** all start 100% and drop randomly (`150ms` ticks, decrements `≈4/5/6` per tick) until 0.
5. **~11s:** Metrics hide, **red Matrix rain** full-screen canvas + blinking `" SYSTEM COMPROMISED "` overlay.

## File Breakdown — Line by Line

### `<style>` (inside index.html)

| Selector | Purpose |
|----------|---------|
| `body {margin:0; background:black; font-family:monospace; color:#00ff00; overflow:hidden;}` | Terminal aesthetic, hides scroll |
| `.terminal {padding:20px;}` | Content inset |
| `.alert {color:red; font-size:20px; margin-bottom:20px;}` | Warning color |
| `.hidden {display:none !important;}` | State toggle for staged sections |
| `.progress-bar {width:100%; height:20px; border:1px solid #00ff00;}` | Container |
| `#progress {height:100%; width:0%; background:#00ff00;}` | Fill grows via JS `style.width` |
| `#finalMessage {font-size:22px; margin-top:20px;}` | Typewriter area |
| `#metrics {margin-top:20px; font-size:18px;}` + `#metrics p{margin:5px 0;}` | Metrics spacing |
| `#dangerScreen {position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:9999; background:black;}` | Fullscreen overlay |
| `#matrixCanvas {display:block; width:100%; height:100%;}` | Canvas fills overlay |
| `.warning-text {position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#ff0000; font-size:3rem; font-weight:bold; text-shadow:0 0 10px #ff0000; animation:blink 0.6s infinite alternate;}` | Centered blinking warning |
| `@keyframes blink {0%{opacity:1} 100%{opacity:0}}` | Blink |

### `<body>` Structure

| Element | Role |
|---------|------|
| `#alertBox.alert` | Initial alert |
| `#downloadSection.hidden` → `<p>` + `.progress-bar > #progress` + `#percent` | Download stage |
| `#finalMessage.hidden > .final-text` | Typewriter target |
| `#metrics.hidden` → `#integrity` / `#security` / `#firewall` spans | Metrics stage |
| `#dangerScreen.hidden` → `#matrixCanvas` + `.warning-text` | Finale |

### `<script>` — Step-by-Step

| Line(s) | Code | Purpose |
|---------|------|---------|
| `const alertBox = getElementById(...)` etc. (7 consts) | Cache all stage elements |
| `setTimeout(() => { alertBox.classList.add("hidden"); downloadSection.classList.remove("hidden"); startDownload(); }, 2000)` | **Step 1** — 2s delay → swap alert for download |
| `function startDownload(){ let width=0; setInterval(...,30) { width++; progress.style.width=width+"%"; percentText.textContent=width+"%"; if(width>=100){clearInterval; downloadSection.classList.add("hidden"); showFinalScreen();}}}` | **Step 2** — 30ms interval → ~3s total to 100% |
| `function showFinalScreen(){ finalMessage.classList.remove("hidden"); let message="Redirecting......"; let index=0; setInterval(...,60){ textElement.textContent+=message[index++]; if(done){clearInterval; setTimeout(()=>{finalMessage.classList.add("hidden"); metrics.classList.remove("hidden"); startMetricsDrop();},1500)}}}` | **Step 3** — Typewriter 60ms/char (~1s) + 1.5s hold |
| `function startMetricsDrop(){ let i=100,s=100,f=100; setInterval(...,150){ i-=Math.random()*4; s-=Math.random()*5; f-=Math.random()*6; clamp to 0 via Math.max/Math.floor; update textContent; if all <=0 {clearInterval; set integrity/security/firewall to "0"; setTimeout(triggerDangerScreen,800)}}}` | **Step 4** — Random decay, different rates per metric, 150ms tick |
| `function triggerDangerScreen(){ metrics.classList.add("hidden"); dangerScreen.classList.remove("hidden"); canvas.width=innerWidth; height=innerHeight; const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()"; const fontSize=16; columns=width/fontSize; drops=Array(columns).fill(1); function drawMatrix(){ fillStyle="rgba(0,0,0,0.05)" fillRect (trail fade); fillStyle="#ff0000" font=16px monospace; for each column { random char fillText; if(drop*fontSize>height && Math.random()>0.975) reset; drop++ } } setInterval(drawMatrix,33); addEventListener("resize", update canvas)}` | **Step 5** — Canvas Matrix rain ~30fps, translucent overlay for trails, red characters |

**Timing totals:** 2s + 3s + 2.5s + ~4s decay + instant Matrix = ~11–12s.

## Concepts Demonstrated

- Staged UI via `.hidden` class toggling + `setTimeout`/`setInterval` choreography
- Progress bar via inline `style.width`
- Typewriter effect (char-by-char `textContent` append)
- Random decay simulation (`Math.random()*N`, `Math.floor`, `Math.max`)
- HTML5 `<canvas>` + `getContext("2d")`, `fillRect`, `fillText`, `fillStyle` with alpha for trailing
- `window.innerWidth/Height` + `resize` handler
- CSS animations (`@keyframes blink`), `position:fixed` overlay

## How to Run

```bash
open index.html
# For fullscreen effect, use browser fullscreen (F11)
```

## Disclaimer

This is a **harmless prank/simulation**. No files are downloaded, no system is accessed. All visuals are local DOM/canvas tricks.

## Possible Improvements

- Add `clearInterval` on replay, add restart button
- Use `requestAnimationFrame` instead of `setInterval` for Matrix
- Add sound effects (typing, alert)
- Make sequence skippable (`Esc` to exit)
- Fix corrupted `"�s�"` characters → use proper emoji ``
- Extract CSS/JS to separate files for maintainability
- Add `prefers-reduced-motion` guard

## Tech Stack

- HTML5, CSS3 (animations), Vanilla JS, Canvas API
