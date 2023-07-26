/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Country_List } from "./countries";
import { useGlobalContext } from "./context";

const countriesCurCodes = Object.keys(Country_List);

const SelectBox = ({ direction }) => {
  const { setCurCode, setExchangeCode } = useGlobalContext();
  const imgTag = useRef();

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

  return (
    <div className="select-input">
      <img
        ref={imgTag}
        src={`https://flagcdn.com/48x36/${
          direction === "from" ? "ma" : "tr"
        }.png`}
      />
      <select onChange={(e) => changeFlag(e.target.value)}>
        {countriesCurCodes.map((curCode, i) => {
          const selected =
            (direction === "from" && curCode === "MAD") ||
            (direction === "to" && curCode === "TRY")
              ? "selected"
              : "";

          return (
            <option key={i} value={curCode} selected={selected}>
              {curCode}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
