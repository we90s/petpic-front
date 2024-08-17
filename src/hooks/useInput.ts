import { useState, useCallback } from "react";

function useInput(initialInput: string) {
  const [input, setInput] = useState(initialInput);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  }, []);
  const reset = useCallback(() => setInput(initialInput), [initialInput]);
  return { input, onChange, reset };
}

export { useInput };
