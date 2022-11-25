import { useCallback, useRef, useState } from "react";

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
        const response = fetch(url, {
          method,
          body,
          headers,
		  signal: httpAbortCtrl.signal
        });

        const resdata = await response.json();

        if (!response.ok) {
          throw new Error(resdata.message);
        }

        return resdata;
      } catch (error) {
        setError(error.message || "Unknown error occured");
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {  
	return () => {
	  activeHttpRequest.current.forEach(ctrl => ctrl.abort());
	};
  }, [])
  

  return { isLoading, error, sendRequest, clearError };
};
