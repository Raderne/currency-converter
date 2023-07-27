/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Country_List } from "./countries";
import { useGlobalContext } from "./context";

const countriesCurCodes = Object.keys(Country_List);

const SelectBox = ({ direction }) => {
  const { curCode, exchangeCode, setCurCode, setExchangeCode } =
    useGlobalContext();
  const imgTag = useRef();
  const selectRef = useRef();

  const changeFlag = (value) => {
    if (direction === "from") {
      setCurCode(value);
    } else {
      setExchangeCode(value);
    }
    imgTag.current.src = `https://flagcdn.com/48x36/${Country_List[
      value
    ].toLowerCase()}.png`;
  };

  useEffect(() => {
    imgTag.current.src = `https://flagcdn.com/48x36/${Country_List[
      selectRef.current.value
    ].toLowerCase()}.png`;
  }, [curCode, exchangeCode]);

  return (
    <div className="select-input">
      <img
        ref={imgTag}
        src={`https://flagcdn.com/48x36/${
          direction === "from" ? "ma" : "tr"
        }.png`}
      />
      <select onChange={(e) => changeFlag(e.target.value)} ref={selectRef}>
        {countriesCurCodes.map((countryCode, i) => {
          const selected =
            (direction === "from" && countryCode === curCode) ||
            (direction === "to" && countryCode === exchangeCode)
              ? "selected"
              : "";

          return (
            <option key={i} value={countryCode} selected={selected}>
              {countryCode}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
