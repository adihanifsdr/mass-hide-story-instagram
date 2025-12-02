# Mass Hide Story on Instagram

A JavaScript bookmarklet to quickly select all users when hiding your Instagram story from specific people.

## How to Use

### Step 1: Login to Instagram
Open Instagram in your browser and make sure you're logged in.

### Step 2: Navigate to Hide Story Settings
Go to: **https://www.instagram.com/accounts/hide_story_and_live_from/**

### Step 3: Run the Script
Open your browser's Developer Console:
- **Chrome/Edge**: Press `F12` or `Ctrl + Shift + J` (Windows) / `Cmd + Option + J` (Mac)
- **Firefox**: Press `F12` or `Ctrl + Shift + K` (Windows) / `Cmd + Option + K` (Mac)

Paste the following code and press Enter:

```javascript
javascript:(function(){
  'use strict';

  const icons = document.querySelectorAll(
    'div[data-bloks-name="ig.components.Icon"][style*="circle__outline__"]'
  );

  if (icons.length === 0) {
    alert("No checkboxes found.");
    return;
  }

  function findClickable(el) {
    while (el && el !== document.body) {
      const pe = getComputedStyle(el).pointerEvents;
      if (pe === "auto") return el;
      el = el.parentElement;
    }
    return null;
  }

  function realClick(el) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const down = new PointerEvent("pointerdown", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      pointerType: "mouse",
      isPrimary: true
    });

    const up = new PointerEvent("pointerup", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      pointerType: "mouse",
      isPrimary: true
    });

    const click = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y
    });

    el.dispatchEvent(down);
    el.dispatchEvent(up);
    el.dispatchEvent(click);
  }

  let count = 0;

  icons.forEach(icon => {
    const clickable = findClickable(icon);
    if (!clickable) return;

    realClick(clickable);
    count++;
  });

  alert(`Clicked ${count} checkboxes!`);
})();
```

## What It Does

This script automatically clicks all visible checkboxes on Instagram's "Hide Story and Live From" page, allowing you to quickly select multiple users at once instead of clicking each one individually.

## ⚠️ Disclaimer

- This tool is for personal use only
- Use at your own risk
- Instagram may update their UI which could break this script
- This script does not collect or transmit any data

## License

MIT License - Feel free to use and modify as needed.

