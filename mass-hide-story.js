javascript:(async function(){
  'use strict';

  const icons = document.querySelectorAll(
    'div[data-bloks-name="ig.components.Icon"][style*="circle__outline__"]'
  );

  if (icons.length === 0) {
    alert("No checkboxes found.");
    return;
  }

  const total = icons.length;
  console.log(`Found ${total} checkboxes. Starting...`);

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

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let count = 0;

  for (const icon of icons) {
    const clickable = findClickable(icon);
    if (!clickable) continue;

    realClick(clickable);
    count++;
    console.log(`Progress: ${count}/${total} (${Math.round(count/total*100)}%)`);
    await delay(50);
  }

  console.log(`Done! Clicked ${count} checkboxes.`);
  alert(`Done! Clicked ${count} checkboxes.`);
})();

