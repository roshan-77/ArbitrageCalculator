import React, { useEffect, useState, useRef } from "react";
import InputField from "./InputField";
import CalculateArbitrage from "./arbitrageCalculator";

function CalculateArbitrage3Odds() {
  const [investment, updateInvestment] = useState();
  const [stakeA, updateStakeA] = useState(0);
  const [stakeB, updateStakeB] = useState(0);
  const [stakeC, updateStakeC] = useState(0);
  const [arbitragePercentage, updateArbitragePercentage] = useState(null);
  const [userInputs, setUserInputs] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
  });
  const [tempRevenue, setTempRevenue] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
  });

  const [profitLossStyle, updateProfitLossStyle] = useState("black");

  const newRef = useRef(userInputs);

  const handleInputChange = (key, value) => {
    setUserInputs((prevVals) => ({ ...prevVals, [key]: value }));
  };

  const handleInvestmentAmount = (val) => {
    updateInvestment(val);
  };

  function calculate() {
    const arbitragePercentA = 1 / userInputs.input1;
    const arbitragePercentB = 1 / userInputs.input2;
    const arbitragePercentC = 1 / userInputs.input3;
    const sumArbitrage =
      arbitragePercentA + arbitragePercentB + arbitragePercentC;

    // Calculate stakes
    const calculatedStakeA = (investment * arbitragePercentA) / sumArbitrage;
    const calculatedStakeB = (investment * arbitragePercentB) / sumArbitrage;
    const calculatedStakeC = (investment * arbitragePercentC) / sumArbitrage;

    // Update state with calculated values
    updateStakeA(calculatedStakeA);
    updateStakeB(calculatedStakeB);
    updateStakeB(calculatedStakeC);
    updateArbitragePercentage((sumArbitrage * 100).toFixed(2));
  }

  useEffect(() => {
    const fontColor =
      arbitragePercentage === null
        ? "black"
        : arbitragePercentage >= 100
        ? "red"
        : "green";
    updateProfitLossStyle(fontColor);
  }, [arbitragePercentage]);

  useEffect(() => {
    newRef.current = userInputs;
    setTempRevenue((prevRev) => ({
      ...prevRev,
      input1: (stakeA * newRef.current.input1).toFixed(2),
      input2: (stakeB * newRef.current.input2).toFixed(2),
      input3: (stakeC * newRef.current.input3).toFixed(2),
    }));
  }, [stakeA, stakeB, stakeC]);

  return (
    <div>
      <h1>Arbitrage Calculator</h1>
      <p>
        Odds A:
        <InputField onChanges={(value) => handleInputChange("input1", value)} />
      </p>
      <p>
        Odds B:
        <InputField onChanges={(value) => handleInputChange("input2", value)} />
      </p>
      <p>
        Odds C:
        <InputField onChanges={(value) => handleInputChange("input3", value)} />
      </p>
      <div>
        <button onClick={CalculateArbitrage}>2 Odds</button>
      </div>
      <p>
        Arbitrage Percentage:{" "}
        {arbitragePercentage === null ? 0 : arbitragePercentage}%
        <span style={{ color: profitLossStyle }}>
          {arbitragePercentage >= 100
            ? " No Profit"
            : ` Profit margin: ${
                arbitragePercentage === null
                  ? 0
                  : (100 - arbitragePercentage).toFixed(2)
              }%`}
        </span>
      </p>
      <p>
        Investment: <InputField onChanges={handleInvestmentAmount} />
      </p>
      <p>
        Stake A: ${stakeA.toFixed(2)}, Total revenue if won -{" "}
        {tempRevenue.input1}
      </p>
      <p>
        Stake B: ${stakeB.toFixed(2)}, Total revenue if won -{" "}
        {tempRevenue.input2}
      </p>
      <p>
        Stake C: ${stakeC.toFixed(2)}, Total revenue if won -{" "}
        {tempRevenue.input3}
      </p>
      <button onClick={calculate}>Calculate</button>
    </div>
  );
}

export default CalculateArbitrage3Odds;
