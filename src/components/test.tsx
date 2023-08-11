import { useEffect, useState } from 'react';

interface LocalStorageItem {
  key: string;
  value: string;
}

function Test(): JSX.Element {
  const [localStorageItems, setLocalStorageItems] = useState<LocalStorageItem[]>([]);

  useEffect(() => {
    // Function to get all items from localStorage
    const getAllLocalStorageItems = (): LocalStorageItem[] => {
      const items: LocalStorageItem[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key!); // "key" could be null, so we use "!" to assert it's not null
        if (key && value) {
          items.push({ key, value });
        }
      }
      return items;
    };

    // Fetch all items from localStorage and update state
    const items = getAllLocalStorageItems();
    setLocalStorageItems(items);
  }, []);

  return (
    <div>
      <h1>Local Storage Items:</h1>
      <ul>
        {localStorageItems.map(item => (
          <li key={item.key}>
            <strong>{item.key}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
