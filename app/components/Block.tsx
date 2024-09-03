"use client";

import { createElement } from "react";

export default function Block({ type, text, placeholder }: { type?: string, text?: string, placeholder?: string }) {
  function getContent(text: string, placeholder: string) {
    return text ?? placeholder;
  }

  function createBlock(type: string, text: string, placeholder: string) {
    const props = {
      contentEditable: true,
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => handleKeyDown(e, type, placeholder),
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>, type: string, placeholder: string) {
    const el = e.currentTarget;

    switch(e.key) {
      case "Backspace":
        // If textContent is empty, use placeholder
        if(el.textContent.length === 1) {
          el.textContent = placeholder;
          el.classList.add("pl");
        // If textContent is placeholder, remove element
        } else if(el.textContent === placeholder && el.classList.contains("pl") && type !== "title") {
          el.remove();
        // Make sure title can't be edited
        } else if(type === "title") {
          e.preventDefault();
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
