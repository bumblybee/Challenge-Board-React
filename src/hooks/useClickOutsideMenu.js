import { useRef, useEffect } from "react";

export const useClickOutsideMenu = (cb) => {
  const domNode = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        cb();
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return domNode;
};
