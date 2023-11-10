"use client";

import { useState, useEffect, useCallback } from "react";

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
const getQueryParams = <T>(): QueryParams<T> => {
  const searchParams = new URLSearchParams(window.location.search);
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

export const useUrl = <T, K extends keyof QueryParams<T>>(
  key: string
): [QueryParams<T>[K], (newParams: QueryParams<T>) => void] => {
  const [queryParams, setQueryParams] = useState<QueryParams<T>>(
    getQueryParams()
  );

  // Update the queryParams state and notify all subscribers
  const updateQueryParams = useCallback(
    (newParams: QueryParams<T>) => {
      const searchParams = new URLSearchParams();

      // Merge newParams into the existing queryParams
      Object.entries({ ...queryParams, ...newParams }).forEach(
        ([key, value]) => {
          if (value !== undefined) {
            // Convert object values to JSON strings
            const stringValue =
              typeof value === "object"
                ? JSON.stringify(value)
                : value.toString();
            searchParams.set(key, stringValue);
          } else {
            // If value is undefined, remove the key
            searchParams.delete(key);
          }
        }
      );

      // Update the URL without causing a page reload
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${searchParams}`
      );

      // Get the updated queryParams and set the state
      const updatedQueryParams = getQueryParams<T>();
      setQueryParams(updatedQueryParams);

      // Notify all subscribers about the change
      notifySubscribers(updatedQueryParams);
    },
    [queryParams]
  );

  useEffect(() => {
    // Subscribe to changes
    const unsubscribe = subscribe(setQueryParams);

    // Unsubscribe when the component unmounts
    return unsubscribe;
  }, []);

  return [queryParams[key], updateQueryParams];
};
