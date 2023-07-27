/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";

const API_ENDPOINT = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_REACT_APP_API_KEY
}/latest/`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [amount, setAmount] = useState("1");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [curCode, setCurCode] = useState("MAD");
  const [exchangeCode, setExchangeCode] = useState("TRY");
  const [loading, setLoading] = useState(true);

  const reverseCurCode = () => {
    setExchangeCode(curCode);
    setCurCode(exchangeCode);
  };

  const fetchExchangeRate = async (url) => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      const exchangeRateData = data.conversion_rates[exchangeCode];
      const totalExchange = (
        parseFloat(amount) * parseFloat(exchangeRateData)
      ).toFixed(2);
      setExchangeRate(totalExchange);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExchangeRate(`${API_ENDPOINT}${curCode}`);
  }, []);

  return (
    <AppContext.Provider
      value={{
        amount,
        loading,
        exchangeRate,
        curCode,
        exchangeCode,
        setAmount,
        setCurCode,
        setExchangeCode,
        fetchExchangeRate,
        reverseCurCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
