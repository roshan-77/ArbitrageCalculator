import React from "react";

function InputField({ onChanges }) {
  return <input onChange={(e) => onChanges(e.target.value)}></input>;
}

export default InputField;
