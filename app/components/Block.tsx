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
          contentEditable: true
        }, text);
      case "title":
        return createElement("h1", {
          contentEditable: true,
          // Use bigger font for title
          className: "text-4xl"
        }, text);
      default:
        return createElement("p", { contentEditable: true }, "Write something..."); // or press '/' for commands...
    }
  }

  return createBlock(type, text);
}
