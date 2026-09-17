# Form Validator — Login Form with Regex Validation

> Client-side form validation using regular expressions for email and strong password rules. Shows inline errors and success feedback without page reload.

## Folder Structure

```
Form-validator/
├── index.html
├── styles.css   # referenced as styles.css (not style.css)
└── script.js
```

## Live Preview

Open `index.html` → try submitting empty / invalid email / weak password → inline errors appear; valid inputs show success message.

## What It Does

- **Email validation:** required + regex `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$`
- **Password validation:** required + strong regex requiring **8+ chars, 1 lowercase, 1 uppercase, 1 digit, 1 special (`@$!%*?#&^`)**
- Shows per-field error in `#emailError` / `#passwordError` + red border `.input-error`
- On full success: `#resultMessage` displays `"Everything is correct"`

## File Breakdown — Line by Line

### `index.html` (31 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | Boilerplate | `charset`, `viewport`, title `Form Validation`, links `styles.css` |
| 9-11 | `<div class="container"><form><h2>Login Form</h2>` | Card wrapper + form |
| 13-17 | Email `.input-group` | `<label for="email">`, `<input type="text" id="email" placeholder="Enter your email" autocomplete="off">`, `<div id="emailError" class="error">` |
| 19-23 | Password `.input-group` | Similar: `<input type="password" id="password">` + `#passwordError` |
| 25 | `<button type="submit">Submit</button>` | Submit trigger |
| 27 | `<p id="resultMessage" class="success"></p>` | Success placeholder |
| 30 | `<script src="script.js">` | Validation logic |

### `script.js` (65 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1 | `DOMContentLoaded` wrapper | Waits for DOM |
| 2-4 | `querySelector("#email")`, `#password`, `form` | Cache nodes |
| 6-7 | `form.addEventListener("submit", (dets) => dets.preventDefault())` | Prevent reload |
| 10-14 | Reset block | Clears `textContent` of errors + `resultMessage`, hides errors via `display:none` |
| 16-17 | `email.value.trim()`, `password.value.trim()` | Trim whitespace |
| 20-22 | `const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/` | Email pattern (allows subdomains, requires TLD 2+ lowercase) |
| 23-24 | `passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^])[A-Za-z\d@$!%*?#&^]{8,}$/` | Lookaheads for each complexity rule; allowed charset limited |
| 26 | `let isValid = true` | Flag |
| 29-44 | Email validation `if` chain | Empty → `"Email is required"` + show + `input-error` + `isValid=false`; else if regex fail → `"Email is incorrect"`; else `remove("input-error")` |
| 47-60 | Password validation `if` chain | Empty → `"Password is required"`; regex fail → `"Password must contain uppercase, lowercase, number & special character"`; else remove error class |
| 63-65 | `if(isValid) resultMessage.textContent = "Everything is correct"` | Success |

> Note: Errors fetched via `querySelector` each time — could cache.

### `styles.css` (78 lines)

| Line(s) | Code | Purpose |
|---------|------|---------|
| 1-6 | `* {margin:0; padding:0; box-sizing:border-box; font-family:Arial}` | Reset |
| 8-14 | `body {height:100vh; display:flex; justify-content:center; align-items:center; background:#FE9A76; color:#491D0D;}` | Centered peach backdrop |
| 16-22 | `.container {background:#fff; padding:30px; border-radius:10px; width:350px; box-shadow:0 10px 25px rgba(0,0,0,0.2);}` | White card |
| 24-27 | `form h2 {text-align:center; margin-bottom:20px;}` | Title |
| 29-32 | `.input-group {margin-bottom:15px;}` + label styling | Spacing + bold label |
| 37-45 | `.input-group input {width:100%; padding:10px; border:1px solid #ccc; border-radius:5px; ...}` | Input base |
| 47-49 | `input:focus {border-color:#FE5010;}` | Focus orange |
| 51-64 | `button {width:100%; padding:10px; background:#FE9A76; ... color:#491D0D;}` + `button:hover {background:#FE5010;}` | Peach button, darker on hover; `opacity:0.9867` (unusual) |
| 67-70 | `.error {color:red; font-size:12px;}` | Error text |
| 73-78 | `.success {margin-top:15px; color:green; text-align:center; font-weight:bold;}` | Success |
| 81-83 | `.input-error {border:2px solid red !important;}` | Error border override |

## Validation Flow

```
Submit → preventDefault → reset errors/hide → trim values → test regexes sequentially
→ toggle display + .input-error per field → if all pass → show success
```

**Regex Details:**
- Email: local-part `a-zA-Z0-9._%+-`, domain `a-zA-Z0-9.-`, TLD `[a-z]{2,}` (case-sensitive — uppercase TLD fails)
- Password: `(?=.*[a-z])` lower, `(?=.*[A-Z])` upper, `(?=.*\d)` digit, `(?=.*[@$!%*?#&^])` special, length `{8,}`

## Concepts Demonstrated

- `preventDefault` for SPA-like forms
- Regex with lookaheads
- Inline error display (`style.display = "inline"`)
- Class toggling (`classList.add/remove`)
- `trim()` sanitization, `DOMContentLoaded`

## How to Run

```bash
open index.html
# Test cases:
# email: "test@example.com" (valid), "test@" (invalid)
# password: "Aa1@abcd" (valid), "password" (invalid)
```

## Possible Improvements

- Use `<input type="email">` + native validation as fallback
- Live validation on `input`/`blur` not just submit
- Fix email TLD regex to allow uppercase: `[a-zA-Z]{2,}` or `/i`
- Debounce, show password strength meter
- Accessibility: `aria-describedby`, `role="alert"` for errors
- Clear success after timeout, prevent double-submit
- Add `novalidate` to form to suppress browser bubbles

## Tech Stack

- HTML5, CSS3, Vanilla JS (Regex)
