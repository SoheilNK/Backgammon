import { useState, useEffect } from "react";
import { stringify } from "uuid";

function getStorageValue(key: string, defaultValue: any) {
    // getting stored value
    const saved = localStorage.getItem(key) || JSON.stringify("");
    // parsing stored json or if none return defaultValue
    let initial: string
    if (saved === "undefined") {
        initial = defaultValue;
    } else {
        initial = JSON.parse(saved);
    }
    return initial || defaultValue;

}

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};