import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Import Chart.js directly
import "./NewcarLoans.css";
import { IoIosArrowDown } from "react-icons/io";

function EmiCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [interestRate, setInterestRate] = useState(7);
  const [tenure, setTenure] = useState(1);
  const [emi, setEMI] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [showCaculateBox, setShowCaculateBox] = useState(false);

  const calculateEMI = () => {
    if (principal && interestRate && tenure) {
      const monthlyInterestRate = interestRate / 12 / 100;
      const n = tenure * 12; // Convert tenure to months
      const emi =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, n)) /
        (Math.pow(1 + monthlyInterestRate, n) - 1);
      setEMI(emi.toFixed(2));
      setShowChart(!showChart);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "principal":
        setPrincipal(value);
        break;
      case "interestRate":
        setInterestRate(value);
        break;
      case "tenure":
        setTenure(value);
        break;
      default:
        break;
    }
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "principalRange":
        setPrincipal(value);
        break;
      case "interestRateRange":
        setInterestRate(value);
        break;
      case "tenureRange":
        setTenure(value);
        break;
      default:
        break;
    }
  };
  const calculateAmortizationSchedule = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const n = tenure * 12; // Total number of payments

    let remainingPrincipal = principal;
    let amortizationData = [];
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let i = 1; i <= n; i++) {
      const interestPayment = remainingPrincipal * monthlyInterestRate;
      const principalPayment = emi - interestPayment;
      remainingPrincipal -= principalPayment;

      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;

      if (i % 12 === 0) {
        // Calculate for each year
        const year = Math.floor(i / 12);

        amortizationData.push({
          year: `Year ${year}`,
          principalPayment: yearlyPrincipal.toFixed(2),
          interestPayment: yearlyInterest.toFixed(2),
        });

        // Reset yearly totals for the next year
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }

    return amortizationData;
  };

  const resetCalculator = () => {
    setPrincipal(500000);
    setInterestRate(7);
    setTenure(1);
    setEMI(null);
    setShowChart(false);
    // setShowCaculateBox(false);
  };

  const data = {
    labels: calculateAmortizationSchedule().map((data) => ` ${data.year}`),
    datasets: [
      {
        label: "Principal",
        data: calculateAmortizationSchedule().map(
          (data) => data.principalPayment
        ),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Interest",
        data: calculateAmortizationSchedule().map(
          (data) => data.interestPayment
        ),
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="NewCarLoan-emi-calculator">
      <h2 className="NewCarLoan-emi-calculator-Heading">
        Calculate Your Car Loan EMI
      </h2>
      <IoIosArrowDown
        className="NewCarLoanDropDownEmiBox"
        onClick={() => {
          setShowCaculateBox(!showCaculateBox);
          setShowChart(false);
        }}
      />
      {showCaculateBox && (
        <>
          <div className="NewCarLoan-form">
            <div className="NewCarLoanEmiPricipal">
              <label className="NewCarLoanEmiLabel" htmlFor="principal">
                Amount you need:
              </label>
              <input
                type="number"
                name="principal"
                className="NewCarLoanEmiInput"
                min="500000"
                max="1500000"
                step="5000"
                value={principal}
                onChange={handleInputChange}
                required
              />
              <input
                type="range"
                id="principalRange"
                name="principalRange"
                className="NewCarLoanEmiRange"
                min="500000"
                max="1500000"
                step="5000"
                value={principal}
                onChange={handleRangeChange}
              />
            </div>
            <div className="NewCarLoanEmiPricipal">
              <label className="NewCarLoanEmiLabel" htmlFor="interestRate">
                Interest Rate (%):
              </label>
              <input
                type="number"
                name="interestRate"
                className="NewCarLoanEmiInput"
                min="7"
                max="13"
                step="0.1"
                value={interestRate}
                onChange={handleInputChange}
                required
              />
              <input
                type="range"
                id="interestRateRange"
                name="interestRateRange"
                className="NewCarLoanEmiRange"
                min="7"
                max="13"
                step="0.1"
                value={interestRate}
                onChange={handleRangeChange}
              />
            </div>
            <div className="NewCarLoanEmiPricipal">
              <label className="NewCarLoanEmiLabel" htmlFor="tenure">
                Loan Tenure (years):
              </label>
              <input
                type="number"
                name="tenure"
                className="NewCarLoanEmiInput"
                min="1"
                max="7"
                step="1"
                value={tenure}
                onChange={handleInputChange}
                required
              />
              <input
                type="range"
                id="tenureRange"
                name="tenureRange"
                className="NewCarLoanEmiRange"
                min="1"
                max="7"
                step="1"
                value={tenure}
                onChange={handleRangeChange}
              />
            </div>
          </div>
          <div className="NewCarLoanEmiBtnBBox">
            <button type="button" className="NewCarLoanEmiBox" onClick={calculateEMI}>
              Calculate EMI
            </button>
            <button type="button" className="NewCarLoanEmiBtnBBox1" onClick={resetCalculator}>
              Reset
            </button>
          </div>
        </>
      )}

      {showChart && (
        <>
          {emi && (
            <h5 className="NewCarLoanEmiShowBox">
              Your Monthly EMI will be <span className="NewCarLoanEmiShowBoxSpan">₹{emi} </span>per month
            </h5>
          )}
          <div className="NewCarLoanChartBox">
            <Doughnut data={data} />
          </div>
        </>
      )}
    </div>
  );
}

export default EmiCalculator;
