import { useEffect, useRef } from "react";

const useAutoResizeTextarea = (value: any) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [value]);

  return textareaRef;
};

export default useAutoResizeTextarea;
