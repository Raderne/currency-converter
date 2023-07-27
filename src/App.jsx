import SelectBox from "./SelectBox";
import { FaExchangeAlt } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { useRef } from "react";

const API_ENDPOINT = `https://v6.exchangerate-api.com/v6/${
  import.meta.env.VITE_REACT_APP_API_KEY
}/latest/`;

const App = () => {
  const {
    amount,
    loading,
    exchangeRate,
    curCode,
    setAmount,
    fetchExchangeRate,
    reverseCurCode,
  } = useGlobalContext();

  const inputRef = useRef();

  const inputChange = (num) => {
    setAmount(num);
    if (num.length >= 6) {
      inputRef.current.style.fontSize = "2rem";
    } else if (num.length < 5) {
      inputRef.current.style.fontSize = "4rem";
    }
  };

  const getExchangeRate = () => {
    fetchExchangeRate(`${API_ENDPOINT}${curCode}`);
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="convert-box">
          <div className="from">
            <p>From</p>
            <SelectBox direction={"from"} />
            <input
              type="number"
              value={amount}
              ref={inputRef}
              className="rate"
              onChange={(e) => inputChange(e.target.value)}
            />
          </div>

          <div className="reverse" onClick={reverseCurCode}>
            <FaExchangeAlt />
          </div>

          <div className="to">
            <p>To</p>
            <SelectBox direction={"to"} />
            {loading ? (
              <div className="loading">
                <div className="ball ball1"></div>
                <div className="ball ball2"></div>
                <div className="ball ball3"></div>
              </div>
            ) : (
              <div
                className="result"
                style={{ fontSize: exchangeRate.length > 6 ? "2rem" : "4rem" }}
              >
                {exchangeRate}
              </div>
            )}
          </div>
        </div>
        <button type="submit" onClick={getExchangeRate}>
          Get Exchange rate
        </button>
      </form>
    </div>
  );
};

export default App;
