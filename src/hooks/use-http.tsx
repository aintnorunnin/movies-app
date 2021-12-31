import React, { useCallback, useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(async (requestConfig, setData) => {
    setLoading(true);
    const config = {
      method: requestConfig.method ? requestConfig.method : "GET",
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      headers: requestConfig.headers ? requestConfig.header : {},
    };
    try {
      const jsonResponse = await fetch(requestConfig.url, config);
      if (!jsonResponse.ok)
        throw new Error("An error occurred while retrieving data.");
      const dataObj = await jsonResponse.json();
      setData(dataObj);
    } catch (error) {
      const er = error as Error;
      setError(er.message);
    }
    setLoading(false);
  }, []);

  return {
    loading,
    error,
    sendRequest,
  };
};

export default useHttp;
