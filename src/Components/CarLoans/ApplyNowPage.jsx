import React from "react";
import { NavLink } from "react-router-dom";

function ApplyNowPage() {
  return (
    <>
      <div className="NewCar_Loan_ApplyNow_Page_Wrapper">
        <div className="container NewCar_Loan_ApplyNow_Page_Wrapper_container">
          <div className="row">
            <div className="col-xs-12 NewCar_Loan_ApplyNow_Page_Heading">
              <img
                src="https://applycarloan.hdfcbank.com/DiAL/assets/img/img-perso-loan-offer1.png"
                alt=""
              />
              <h3 style={{ color: "white" }}>
                Applying for Xpress Car Loan is easy!
              </h3>
            </div>
            <div className="NewCar_Loan_ApplyNow_Page_Box_Main">
              <div className="NewCar_Loan_ApplyNow_Page_Box">
                <div className="NewCar_Loan_ApplyNow_Page_Box1">
                  <img
                    src="https://applycarloan.hdfcbank.com/DiAL/assets/img/pers-dtls.png"
                    alt=""
                  />
                </div>
                <div className="NewCar_Loan_ApplyNow_Page_Box2">
                  <h6>Personal and Employment Details</h6>
                  <p>
                    Tell us a bit about your personal and employment details.
                  </p>
                </div>
              </div>
              <div className="NewCar_Loan_ApplyNow_Page_Box">
                <div className="NewCar_Loan_ApplyNow_Page_Box1">
                  <img
                    src="https://applycarloan.hdfcbank.com/DiAL/assets/img/img-perso-loan-offer1.png"
                    alt=""
                  />
                </div>
                <div className="NewCar_Loan_ApplyNow_Page_Box2">
                  <h6>Receive In Principle Loan Approval</h6>
                </div>
              </div>
              <div className="NewCar_Loan_ApplyNow_Page_Box">
                <div className="NewCar_Loan_ApplyNow_Page_Box1">
                  <img
                    src="https://applycarloan.hdfcbank.com/DiAL/assets/img/princi-loanoffer.png"
                    alt=""
                  />
                </div>
                <div className="NewCar_Loan_ApplyNow_Page_Box2">
                  <h6>Add car and dealer details</h6>
                  <p>
                    Let us know about the car and dealer of your choice. Apply
                    for loan as per your choice of car.
                  </p>
                </div>
              </div>
              <div className="NewCar_Loan_ApplyNow_Page_Box">
                <div className="NewCar_Loan_ApplyNow_Page_Box1">
                  <img
                    src="https://applycarloan.hdfcbank.com/DiAL/assets/img/complete-kyc.png"
                    alt=""
                  />
                </div>
                <div className="NewCar_Loan_ApplyNow_Page_Box2">
                  <h6>Complete your KYC online</h6>
                  <p>Complete your KYC from the comfort of your home.</p>
                </div>
              </div>
              <div className="NewCar_Loan_ApplyNow_Page_Box">
                <div className="NewCar_Loan_ApplyNow_Page_Box1">
                  <img
                    src="https://applycarloan.hdfcbank.com/DiAL/assets/img/digi-loan-disburse.png"
                    alt=""
                  />
                </div>
                <div className="NewCar_Loan_ApplyNow_Page_Box2">
                  <h6>
                    Complete your application process for disbursement of loan
                  </h6>
                </div>
              </div>
            </div>
            <NavLink to={"/ApplicationProcess"}>
              <button
                style={{ marginLeft: "30rem", marginBottom: "20px" }}
                className="NewCarLoanEmiBox"
              >
                Start Application
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyNowPage;
