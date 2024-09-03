"use client";

import { createElement } from "react";

export default function Block({ type, text, placeholder }: { type?: string, text?: string, placeholder?: string }) {
  function getContent(text: string, placeholder: string) {
    return text ?? placeholder;
  }

  function createBlock(type: string, text: string, placeholder: string) {
    const props = {
      contentEditable: true,
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => handleKeyDown(e, placeholder),
      // Apply style if textContent is placeholder
      className: text === null ? "" : "pl"
    };

    switch(type) {
      case "h1":
      case "h2":
      case "h3":
        return createElement(type, props, getContent(text, placeholder));
      case "title":
        return createElement("h1", {
          ...props,
          // Use bigger font for title
          className: `${props.className} text-4xl`
        }, getContent(text, placeholder));
      default:
        return createElement("p", props, getContent(text, "Write something or press '/' for commands..."));
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>, placeholder: string) {
    const el = e.currentTarget;

    switch(e.key) {
      case "Backspace":
        // If there's no text, use placeholder
        if(el.textContent.length === 1) {
          e.preventDefault();
          el.textContent = placeholder;
          el.classList.add("pl");
        }
        break;
      default:
        // If textContent is placeholder, clear textContent and use normal text
        if(el.classList.contains("pl")) {
          el.textContent = "";
          el.classList.remove("pl");
        }
    }
  }

  return createBlock(type, text, placeholder || text);
}
