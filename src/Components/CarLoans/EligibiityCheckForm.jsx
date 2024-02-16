import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function EligibiityCheckForm() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyEMI, setMonthlyEMI] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [loanEligibleAmount, setLoanEligibleAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [tenureMonths, setTenureMonths] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEMI] = useState("");

  useEffect(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const months = parseFloat(tenureMonths);

    if (principal && rate && months) {
      const emiAmount =
        (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);

      setEMI(emiAmount.toFixed(2));
    } else {
      setEMI("");
    }
  }, [loanAmount, tenureMonths, interestRate]);

  const handleTenureChange = (value) => {
    setTenureMonths(value);
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const handleAnnualIncomeChange = (event) => {
    const income = parseFloat(event.target.value);
    const monthly = isNaN(income) ? "" : (income / 12).toFixed(2);
    setAnnualIncome(event.target.value);
    setMonthlyIncome(monthly);
  };

  const handleMonthlyEMIChange = (event) => {
    const emi = parseFloat(event.target.value);
    setMonthlyEMI(emi);
  };

  const handleEmploymentStatusChange = (status) => {
    setEmploymentStatus(status);
  };

  const calculateLoanEligibleAmount = () => {
    const eligibilityCriteria = 30;
    const eligibleAmount =
      (monthlyIncome * eligibilityCriteria) / 100 - monthlyEMI;
    setLoanEligibleAmount(eligibleAmount.toFixed(2));
  };

  return (
    <>
      <div className="container-fluid newCar_loan_EligibilityCheck_Wrapper">
        <div className="container newCar_loan_EligibilityCheck_form">
          <h3 style={{ textAlign: "start" }}>Eligibility Check</h3>
          <h6>
            Find out your loan eligibility by providing us with just a few
            details.
          </h6>
          <form>
            <p className="newCAr_loan_EligibilityFormParag">Personal Details</p>
            <div className="newCAr_loan_EligibilityFormInput">
              <div className="newCAr_loan_EligibilityFormPersonalDetails">
                <label htmlFor="DateOfBirth">Date Of Birth*</label>
                <input type="date" />
              </div>
              <div className="newCAr_loan_EligibilityFormPersonalDetails">
                <label htmlFor="MobileNumber">Mobile*</label>
                <input type="input" />
              </div>
            </div>
            <p className="newCAr_loan_EligibilityFormParag">
              What is your current employment status?
            </p>
            <div className="newCAr_loan_EligibilityFormRadio">
              <div className="newCAr_loan_EligibilityFormRadio1">
                <input
                  type="radio"
                  id="salaried"
                  checked={employmentStatus === "salaried"}
                  onChange={() => handleEmploymentStatusChange("salaried")}
                />
                <label htmlFor="salaried">Salaried*</label>
              </div>
              <div className="newCAr_loan_EligibilityFormRadio1">
                <input
                  type="radio"
                  id="selfEmployed"
                  checked={employmentStatus === "selfEmployed"}
                  onChange={() => handleEmploymentStatusChange("selfEmployed")}
                />
                <label htmlFor="selfEmployed">Self Employed*</label>
              </div>
            </div>
            <p className="newCAr_loan_EligibilityFormParag">
              Tell us a bit about your financial details
            </p>
            <div className="newCAr_loan_EligibilityFormIncomeStatus">
              <div className="newCAr_loan_EligibilityFormIncomeStatusHeading">
                <h6>What is your current annual income? *</h6>
              </div>

              <div className="newCAr_loan_EligibilityFormIncomeStatus_Annual">
                <input
                  type="number"
                  id="annualIncome"
                  value={annualIncome}
                  placeholder="Annual Income"
                  onChange={handleAnnualIncomeChange}
                />

                <input
                  type="text"
                  id="monthlyIncome"
                  placeholder="Monthly Income"
                  value={monthlyIncome}
                  readOnly
                />

                <input
                  type="text"
                  id="monthlyEMI"
                  value={monthlyEMI}
                  placeholder="Monthly EMI"
                  onChange={handleMonthlyEMIChange}
                />
              </div>
            </div>
            <button
              type="button"
              className=" NewCarLoanEmiBox"
              onClick={calculateLoanEligibleAmount}
            >
              Calculate Loan Eligible Amount
            </button>
            {loanEligibleAmount && (
              <div className="LoanEligibilityCheckBox">
                <h4> Congratulations Loan Eligible Amount:</h4>
                <p>{loanEligibleAmount}</p>
              </div>
            )}
          </form>
          <NavLink to={"/applyNowPage"}>
            <button style={{ marginTop: "20px" }} className="NewCarLoanEmiBox">
              Apply Now
            </button>
          </NavLink>

          {/* <div>
          <h2>EMI Calculator</h2>
          <div>
            <label htmlFor="loanAmount">Loan Amount:</label>
            <input
              type="text"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="tenureMonths">Tenure (in months):</label>
            <div>
              {[1, 2, 3, 4, 5, 6, 7].map((month) => (
                <button
                  key={month}
                  onClick={() => handleTenureChange(month)}
                  className={tenureMonths === String(month) ? "active" : ""}
                >
                  {month}
                </button>
              ))}
              <input
                type="number"
                min="1"
                placeholder="Custom"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="interestRate">Interest Rate (per annum):</label>
            <input
              type="text"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          {emi && (
            <div>
              <h3>Equated Monthly Installment (EMI):</h3>
              <p>{formatCurrency(parseFloat(emi))}</p>
            </div>
          )}
        </div> */}
        </div>
      </div>
    </>
  );
}

export default EligibiityCheckForm;
