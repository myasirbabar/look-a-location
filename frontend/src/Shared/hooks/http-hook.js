import { useCallback, useRef, useState,useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const resdata = await response.json();

		activeHttpRequest.current = activeHttpRequest.current.filter(req => req !== httpAbortCtrl)

        if (!response.ok) {
          throw new Error(resdata.message);
        }
        setIsLoading(false);

        return resdata;
      } catch (error) {
        setError(error.message || "Unknown error occured");
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
