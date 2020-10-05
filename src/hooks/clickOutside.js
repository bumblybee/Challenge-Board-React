import { useRef, useEffect } from "react";

export const useClickOutside = (cb) => {
  const domNode = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return domNode;
};
