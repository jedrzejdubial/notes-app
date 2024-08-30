"use client";

import { createElement } from "react";

export default function Block({ type, text }: { type?: string, text?: string }) {
  // Currently this code looks incredibly stupid, but soon it will make sense...
  function createBlock(type: string, text: string) {
    switch(type) {
      case "h1":
      case "h2":
      case "h3":
        return createElement(type, {
          tabIndex: 0,
          onClick: (e: React.MouseEvent<HTMLElement>) => handleClick(e),
          onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => handleKeyDown(e)
        }, text);
      default:
        return createElement("p", { tabIndex: 0 }, "Write something..."); // or press '/' for commands...
    }
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    const item = e.currentTarget;

    item.classList.toggle("bg-purple-500");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    e.preventDefault();

    // Get element from event
    const item = e.currentTarget;

    switch(e.key) {
      case "Backspace":
        item.textContent = item.textContent.slice(0, -1);
        break;
      default:
        // Check for letters only
        if(e.key.length === 1) {
          item.textContent = item.textContent += e.key;
        }
    }
  }

  return createBlock(type, text);
}
