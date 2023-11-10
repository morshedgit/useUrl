import { useEffect } from "react";

const wait = (t: number) =>
  new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, t)
  );

export const useFetch = <R, E>(
  endpointUrl: URL,
  state: {
    setResult: (v: R) => void;
    setLoading: (v: boolean) => void;
    setError: (e: E) => void;
  },
  deps: any[]
) => {
  const { setResult, setLoading, setError } = state;

  useEffect(() => {
    const abortController = new AbortController(); // Create a new instance of AbortController
    const { signal } = abortController; // Get the AbortSignal from the controller

    const run = async () => {
      try {
        setLoading(true);
        await wait(100);
        if (Math.random() > 0.9) {
          throw new Error("400: Bad Request");
        }
        const res = await fetch(endpointUrl.toString(), {
          method: "GET",
          headers: { "content-type": "application/json" },
          signal, // Pass the AbortSignal to the fetch call
        });
        const jsonRes = (await res.json()) as R;
        setResult(jsonRes);
      } catch (e: any) {
        if (e.name === "AbortError") {
          // Handle abort error, but typically no setState is needed
          console.log("Fetch aborted");
        } else {
          setError(e.message as E);
        }
      } finally {
        setLoading(false);
      }
    };

    run();

    // Cleanup function to abort the fetch when component unmounts or deps change
    return () => {
      abortController.abort();
    };
  }, [...deps]);
};
