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

