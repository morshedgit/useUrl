"use client";
import { useState, useEffect } from "react";

interface QueryParams {
  [key: string]: string | undefined;
}

// Custom hook for managing state with the URL query parameters
function useUrl(): [QueryParams, (key: string, value?: string) => void] {
  // Function to get all query parameters from the URL and convert them to an object
  const getQueryParams = (): QueryParams => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  // State for managing the query parameters
  const [queryParams, setQueryParams] = useState<QueryParams>(getQueryParams());

  // Function to set a query parameter in the URL
  const setQueryParam = (key: string, value?: string): void => {
    setQueryParams((prevParams) => {
      const newParams = new URLSearchParams(window.location.search);
      if (value === undefined || value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${newParams}`
      );
      return { ...prevParams, [key]: value };
    });
  };

  // Effect to update state when the URL changes
  useEffect(() => {
    const handlePopState = () => {
      setQueryParams(getQueryParams());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return [queryParams, setQueryParam];
}

export default useUrl;
