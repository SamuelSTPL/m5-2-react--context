import { useState, useEffect } from "react";

export const usePersistedState = (initialValue, localStorageKey) => {
  const [storedValue, setStoredValue] = useState(() => {
    const currentItem = localStorage.getItem(localStorageKey);
    if (currentItem) {
      return JSON.parse(currentItem);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(storedValue));
  }, [setStoredValue, storedValue]);

  return [storedValue, setStoredValue];
};
