# iOS WebView Keyboard Demo

> Demo project to fix keyboard bounce and scroll issues in iOS WKWebView with web app.

## Problem

When focusing on input fields in iOS WKWebView:

- Keyboard causes unwanted document scroll
- Unable to maintain separate fixed and scrollable areas

## Solution

### Swift (WKWebView)

- Lock scroll position using `UIScrollViewDelegate`
- Disable bounce on WebView's root scroll view
- Handle keyboard notifications to prevent unwanted scroll

### React

- Separate fixed header and scrollable content areas
- Track `visualViewport` for keyboard height changes
- Auto-scroll to focused input after keyboard appears
- Use `position: fixed` to prevent page-level scroll

## Tech Stack

- iOS: Swift, WKWebView
- Web: React, TypeScript, Vite, TailwindCSS

## Get Started

1. Install dependencies

```bash
cd web
pnpm install
```

2. Build React app

```bash
pnpm ios:build

# or

cd web
pnpm build:ios
```

3. Run in Xcode

```bash
open ios/KeyboardTest.xcodeproj
```

Then press `cmd + r` to build and run.

## Result

- Document doesn't bounce when keyboard appears
- Fixed header stays in place
- Scrollable content area works properly
- Smooth auto-scroll to focused input
