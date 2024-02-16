import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NewCarEligibility() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <div className="newCarLoan_Eligibility_wrapper">
        <div className="newCarLoan_Eligibiity_Cover">
          <img src="https://applycarloan.hdfcbank.com/DiAL/assets/img/loan/loan-top-banner.jpg" />
        </div>
        <div className="container newCarLoan_Eligibility_Hero_Section">
          <h5 style={{ textAlign: "center" }}>
            We have made financing as simple as 1-2-3
          </h5>
          <div className="newCaroan_Eligibility_Hero_Documentation">
            <div className="newCaroan_Eligibility_Hero_Documentation_Child">
              <img src="https://applycarloan.hdfcbank.com/DiAL/assets/img/offers.svg"></img>
              <h3>Quick Loan Disbursal</h3>
              <p>Get a Car Loan within 30 minutes</p>
            </div>
            <div className="newCaroan_Eligibility_Hero_Documentation_Child">
              <img src="https://applycarloan.hdfcbank.com/DiAL/assets/img/pocket-friendly.svg" />
              <h3>No Documentation</h3>
              <p>Zero paperwork involved in the process</p>
            </div>
            <div className="newCaroan_Eligibility_Hero_Documentation_Child">
              <img src="https://applycarloan.hdfcbank.com/DiAL/assets/img/quick.svg" />
              <h3>Pre-eligible Offers</h3>
              <p style={{ textAlign: "center" }}>
                Exclusive to HDFC bank customers. Others can avail with a few
                details
              </p>
            </div>
          </div>
          <div className="newCarLoan_Eligibillity_Input_Section">
            <div
              className={`newCarLoan_Eligibillity_Button_Section1 ${
                selectedOption === "newCar" ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect("newCar")}
            >
              <input type="radio" name="carType" id="newCar" />
              <span>New Car</span>
            </div>
            <div
              className={`newCarLoan_Eligibillity_Button_Section1 ${
                selectedOption === "preOwnedCar" ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect("preOwnedCar")}
            >
              <input type="radio" name="carType" id="preOwnedCar" />
              <span>Pre Owned Car</span>
            </div>
          </div>
          <div className="newCarLoan_Eligibility_Btn_Section">
            <NavLink to={"/applyNowPage"}>
              <button className="NewCarLoanEmiBox">Apply Now</button>
            </NavLink>
            <NavLink to={"/EligibiityCheckForm"}>
              <button className="NewCarLoanEmiBtnBBox1">
                Calculate Eligibility
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewCarEligibility;
