"use client";

import { useState, useEffect } from "react";

type QueryParams<T> = {
  [key: string]: T | undefined;
};

// A global list of subscriber callbacks
const subscribers: ((params: QueryParams<any>) => void)[] = [];

// Notifies all subscribers about the current queryParams
const notifySubscribers = (queryParams: QueryParams<any>) => {
  subscribers.forEach((callback) => callback(queryParams));
};

// Adds a subscriber callback
const subscribe = (callback: (params: QueryParams<any>) => void) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

// Parses the current URL's search parameters into an object
export const getQueryParams = <T>(): QueryParams<T> => {
  const searchParams = new URLSearchParams(window?.location.search);
  const params: QueryParams<T> = {};
  searchParams.forEach((value, key) => {
    try {
      // Attempt to parse the JSON if it's a stringified object
      params[key] = JSON.parse(value);
    } catch {
      // Fallback to regular string if parsing fails
      params[key] = value as T;
    }
  });
  return params;
};

let queuedUpdates: QueryParams<any> = {};
let timeoutId: number | null = null;

export const useUrl = <
  T,
  K extends keyof QueryParams<T> = keyof QueryParams<T>
>(
  key: string
): [QueryParams<T>[K], (newValue: T) => void] => {
  const [queryParams, setQueryParams] = useState<QueryParams<T>>(
    getQueryParams()
  );

  const applyUpdates = () => {
    const searchParams = new URLSearchParams();

    // Collect all updates
    const combinedParams = { ...queryParams, ...queuedUpdates };

    // Convert combinedParams to URLSearchParams
    Object.entries(combinedParams).forEach(([key, value]) => {
      if (value !== undefined) {
        const stringValue =
          typeof value === "object" ? JSON.stringify(value) : value.toString();
        searchParams.set(key, stringValue);
      } else {
        searchParams.delete(key);
      }
    });

    // Update the URL without causing a page reload
    window?.history.pushState(
      {},
      "",
      `${window?.location.pathname}?${searchParams}`
    );

    // Clear the queued updates after applying them
    queuedUpdates.current = {};

    // Update state and notify subscribers
    const updatedQueryParams = getQueryParams<T>();
    setQueryParams(updatedQueryParams);
    notifySubscribers(updatedQueryParams);
  };

  const updateQueryParams = (newParams: QueryParams<T>) => {
    // Queue updates
    queuedUpdates = { ...queuedUpdates, ...newParams };

    // Clear the previous timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to batch updates
    timeoutId = window?.setTimeout(() => {
      applyUpdates();
    }, 10);
  };

  useEffect(() => {
    // Subscribe to changes
    const unsubscribe = subscribe(setQueryParams);

    // Unsubscribe when the component unmounts and clear any pending updates
    return () => {
      unsubscribe();
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return [queryParams[key], (value: T) => updateQueryParams({ [key]: value })];
};
