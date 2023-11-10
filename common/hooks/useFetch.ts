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
    const run = async () => {
      try {
        setLoading(true);
        await wait(2000);
        const res = await fetch(endpointUrl, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        const jsonRes = (await res.json()) as R;
        setResult(jsonRes);
      } catch (e: unknown) {
        setError(e as E);
      } finally {
        setLoading(false);
      }
    };

    run();

    return () => {};
  }, [...deps]);
};
