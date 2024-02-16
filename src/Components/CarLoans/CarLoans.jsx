import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewcarLoans.css";
import EmiCalculator from "./EmiCalculator";
import { NavLink, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { FaRegClock } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

function CarLoans() {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);
  const [showEligibility, setShowEligibility] = useState(false);
  const [showFee, setShowFee] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [isloginSection, setIsLoginSection] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [email, setEmail] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const [otpVerficationSucess, setOtpVerficationSucess] = useState(false);
  const [otpSentSuccess, setotpSentSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const handleCheckboxChange = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        setIsChecked1(!isChecked1);
        break;
      case 2:
        setIsChecked2(!isChecked2);
        break;
      case 3:
        setIsChecked3(!isChecked3);
        break;
      default:
        break;
    }
  };

  const isAllChecked = isChecked1 && isChecked2 && isChecked3;

  const handleLogin = () => {
    setIsLoginSection(true);
  };
  const handleClose = () => {
    setIsLoginSection(false);
  };

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please Enter ypur Email Address");
    }
    try {
      const res = await axios.post("http://localhost:8000/v1/sendotp", {
        email,
      });
      if (res.status === 200) {
        setotpSentSuccess(true);

        alert("OTP Sent Successfully");
        setIsOtpSent(true);
      }
    } catch (e) {
      console.error("OTP Not Sent");
      alert("Otp not Sent");
    }
  };

  // const handleVerifyOtp = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:8000/v1/verifyotp", {
  //       enteredOtp,
  //     });

  //     // Log the response data received from the backend
  //     console.log(res.data);

  //     // Display a success message to the user
  //     alert("OTP Verified Successfully");

  //     // Update the state to indicate successful OTP verification
  //     setOtpVerficationSucess(true);
  //   } catch (e) {
  //     // Log detailed error information for debugging
  //     console.error("Error verifying OTP:", e);

  //     // Display an error message to the user
  //   }
  // };
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8000/v1/verify-otp", {
        email,
        enteredOtp: enteredOTP,
      });

      if (response.status === 200) {
        setVerificationMessage(response.data.message);
        alert("otp verification success");
        setOtpVerficationSucess(true);
        navigate("/applyNowPage");
        setEmail("");
        setEnteredOTP("");
      } else {
        setVerificationMessage(response.data.error || "Invalid OTP");
        alert("Invalid OTP");
      }
    } catch (error) {
      setVerificationMessage("Error verifying OTP");
      // console.error("Error verifying OTP:", error);
    }
  };

  const toggleFeatures = () => {
    setShowFeatures(true);
    setShowEligibility(false);
    setShowFee(false);
    setShowDocumentation(false);
  };
  const toggleEligibility = () => {
    setShowFeatures(false);
    setShowEligibility(true);
    setShowFee(false);
    setShowDocumentation(false);
  };
  const toggleFee = () => {
    setShowFeatures(false);
    setShowEligibility(false);
    setShowFee(true);
    setShowDocumentation(false);
  };
  const toggleDocumentation = () => {
    setShowFeatures(false);
    setShowEligibility(false);
    setShowFee(false);
    setShowDocumentation(true);
  };
  return (
    <>
      <div className=" newCarLoanMainWrapper">
        <div className=" newCarLoanBgImgSection">
          <div className="newCarLoanMainHeading">
            <h1 className="newCarLoanMainHeading1">Car Loan Online</h1>
            <p className="newCarLoanMainHeading2">
              Get the perfect car, and the perfect loan – the way you want it.
              Now, faster than ever!
            </p>
          </div>
        </div>
        <div className="container newCarLoanHeroSection">
          <div className="newCarLoanHeroDescrip">
            <p>
              Millions of Indians today are upwardly mobile, and on the move.
              Many are looking at having their own car to reach their
              destination on time and with comfort. Now, the years of waiting
              and saving are over. Our Xpress Car Loan will bring that dream of
              owning a vehicle within your reach in just a few minutes
            </p>
          </div>
          <EmiCalculator />
          <div className="NewCarLoanHeroDetailsSection">
            <h2 className="NewCarLoanHeroHeading">
              Islamic Bank Xpress Car Loan
            </h2>
            <div className="NewCarLoanHeroDetails">
              <div className="NewCarLoanHeroDetailsData">
                <img
                  src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/4310d466-02c3-4fbf-a893-7928c636db57/Common/Icons/cashless_feature.png"
                  alt=""
                  srcset=""
                />
                <p>100% Digital</p>
              </div>
              <div className="NewCarLoanHeroDetailsData">
                <img
                  src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/c26abc41-531b-4b98-a990-dc373aebed69/Common/Icons/accessible_feature.png"
                  alt=""
                  srcset=""
                />
                <p>Apply at anytime, from anywhere</p>
              </div>
              <div className="NewCarLoanHeroDetailsData">
                <img
                  src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/69d5f2ac-8f77-48c7-91a9-2070b7456b1c/Footer/Resource/Important%20Notice/Images/forms-center.svg"
                  alt=""
                  srcset=""
                />
                <p>No physical documents or verification required</p>
              </div>
            </div>
          </div>
          <div className="NewCarLoanHeroDetailsSection">
            <div className="NewCarLoanHeroFeaturesSection">
              <h4 className="NewCarLoanHeroHeading">
                All You Need To Know About Car Loan
              </h4>
              <a href="http://">TERMS & CONDITIONS</a>
            </div>
            <div className="NewCarLoanHeroFeaturesBtn">
              <button onClick={toggleFeatures}>FEATURES</button>
              <button onClick={toggleEligibility}>ELIGIBILITY</button>
              <button onClick={toggleFee}>FEES & CHARGES</button>
              <button onClick={toggleDocumentation}>DOCUMENTATION</button>
            </div>

            {showFeatures && (
              <>
                <div className="NewCarLoanHeroFeatures">
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Overview</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        The thrill of bringing your brand-new car home is
                        special. Car Loan has been the driver behind fulfilling
                        the dreams of people to own cars. What if we told you
                        that there was an easy, quick and seamless way to get
                        your car?. Islamic Bank Xpress Car Loan is committed to
                        making your car buying experience smoother than ever. It
                        provides 100% financing on select vehicles,
                        pocket-friendly EMIs, and flexible repayments.
                      </p>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>100% digital loan</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        Islamic Bank Xpress Car Loan is 100% digital and you can
                        apply for it anytime, anywhere. You can instantly apply
                        for the loan and it only takes 30 minutes with our
                        end-to-end digital process. There is no physical
                        verification process and you don’t need to submit any
                        physical documents.
                      </p>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Quick disbursal in just 30 minutes</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        It does not matter where you stay, you can apply for the
                        loan from anywhere in India. Islamic Bank Xpress Car
                        Loan ensures that your Auto Loan is disbursed instantly
                        to your car dealer through Ne;tBanking. You can avail of
                        this facility with the following simple steps: Log into
                        your Islamic Bank NetBanking account — go to the Borrow
                        tab — Click on the New Car Loan.
                      </p>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>High loan amount</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        With Islamic Bank Car Loans, you can get an Auto Loan of
                        up to ₹25 lakhs on a wide range of cars and
                        multi-utility vehicles. You can enjoy up to 100% on-road
                        finance on your New Car Loan. You can apply for Top-Up
                        Loans for extra financing. Islamic Bank's existing Car
                        Loan customers can avail of the Top-Up Loan facility
                        without any extra documentation.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {showEligibility && (
              <div className="NewCarLoanHeroFeatures">
                <div className="NewCarLoanHeroFeatures1">
                  <div className="NewCarLoanHeroFeaturesHeading">
                    <h6>Documentation charges*</h6>
                  </div>
                  <div className="NewCarLoanHeroFeatures1Data">
                    <p>
                      ₹650 (charges NOT to be refunded in case of case
                      cancellation.)
                    </p>
                  </div>
                </div>
                <div className="NewCarLoanHeroFeatures1">
                  <div className="NewCarLoanHeroFeaturesHeading">
                    <h6>Premature closure charges (for full payment)*</h6>
                  </div>
                  <div className="NewCarLoanHeroFeatures1Data">
                    <ul>
                      <li>
                        For pre-closures within one year, the charges will be 6%
                        of the outstanding principal.
                      </li>
                      <li>
                        For pre-closures within 13-24 months from the first EMI,
                        the charges will be 5% of the outstanding principal.
                      </li>
                      <li>
                        For pre-closures post 24 months from the first EMI, the
                        charges will be 3% of the outstanding principal.
                      </li>
                    </ul>
                    <p>
                      If you own a micro or small enterprise and have availed a
                      fixed rate loan facility up to ₹50 lakhs, you will not be
                      charged any premature closure fees if you make a full
                      payment from your own source.
                    </p>
                  </div>
                </div>
                <div className="NewCarLoanHeroFeatures1">
                  <div className="NewCarLoanHeroFeaturesHeading">
                    <h6>Premature closure charges (for part payment)*</h6>
                  </div>
                  <div className="NewCarLoanHeroFeatures1Data">
                    <p>
                      During the loan tenure, part payment will be allowed twice
                      only. In a year, only one part payment is allowed. You can
                      make a part payment at any time, but it cannot exceed 25%
                      of the outstanding principal amount.
                    </p>
                    <p>
                      If the part prepayment is within 24 months from the first
                      EMI, a charge of 5% will be levied on the part payment
                      amount. If the part prepayment is post 24 months from the
                      first EMI, a charge of 3% will be levied on the part
                      payment amount.
                    </p>
                  </div>
                </div>
                <div className="NewCarLoanHeroFeatures1">
                  <div className="NewCarLoanHeroFeaturesHeading">
                    <h6>Processing fees* (non-refundable)</h6>
                  </div>
                  <div className="NewCarLoanHeroFeatures1Data">
                    <p>
                      0.5% of the loan amount subject to a minimum of ₹3,500 and
                      a maximum of ₹8,000.
                      <br /> For loan facilities up to ₹5 lakhs availed by micro
                      and small enterprises subject to URC submission before
                      disbursal, no processing fees will be charged
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showFee && (
              <>
                <div className="NewCarLoanHeroFeatures">
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Documentation charges*</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        ₹650 (charges NOT to be refunded in case of case
                        cancellation.)
                      </p>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Premature closure charges (for full payment)*</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <ul>
                        <li>
                          For pre-closures within one year, the charges will be
                          6% of the outstanding principal.
                        </li>
                        <li>
                          For pre-closures within 13-24 months from the first
                          EMI, the charges will be 5% of the outstanding
                          principal.
                        </li>
                        <li>
                          For pre-closures post 24 months from the first EMI,
                          the charges will be 3% of the outstanding principal.
                        </li>
                      </ul>
                      <p>
                        If you own a micro or small enterprise and have availed
                        a fixed rate loan facility up to ₹50 lakhs, you will not
                        be charged any premature closure fees if you make a full
                        payment from your own source.
                      </p>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Premature closure charges (for part payment)*</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        During the loan tenure, part payment will be allowed
                        twice only. In a year, only one part payment is allowed.
                        You can make a part payment at any time, but it cannot
                        exceed 25% of the outstanding principal amount.
                      </p>
                      <p>
                        If the part prepayment is within 24 months from the
                        first EMI, a charge of 5% will be levied on the part
                        payment amount. If the part prepayment is post 24 months
                        from the first EMI, a charge of 3% will be levied on the
                        part payment amount.
                      </p>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Processing fees* (non-refundable)</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <p>
                        0.5% of the loan amount subject to a minimum of ₹3,500
                        and a maximum of ₹8,000.
                        <br /> For loan facilities up to ₹5 lakhs availed by
                        micro and small enterprises subject to URC submission
                        before disbursal, no processing fees will be charged
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showDocumentation && (
              <>
                <div className="NewCarLoanHeroFeatures">
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Salaried Individuals</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <ul>
                        <li>
                          Any of the following documents as identity & Address
                          Proof
                        </li>
                        <li>Valid Passport</li>
                        <li>
                          Permanent Driving license [recent, legible, laminate]
                        </li>
                        <li>Voters ID Card</li>
                        <li>Job card issued by NREGA</li>
                      </ul>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>Self Employed Individuals (Sole Proprietorship)</h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <ul>
                        <li>
                          Any of the following documents as identity & Address
                          Proof:
                        </li>
                        <li>Valid Passport </li>
                        <li>
                          Permanent Driving license [recent, legible, laminate]
                        </li>
                        <li>Voters ID Card</li>
                        <li>Job card issued by NREGA</li>
                        <li>Latest Income Tax Returns (ITR) as income proof</li>
                      </ul>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>
                        Self Employed Individuals (Partnership Firms)Self
                        Employed Individuals (Partnership Firms)
                      </h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <ul>
                        <li>All the following documents as income proof:</li>
                        <li>Audited Balance Sheet</li>
                        <li>Profit & Loss Account of the previous 2 years</li>
                        <li>Company ITR for the previous 2 years</li>
                        <li>
                          Any of the following documents as address proof:
                        </li>
                        <li>Telephone Bill</li>
                        <li>Electricity Bill</li>
                      </ul>
                    </div>
                  </div>
                  <div className="NewCarLoanHeroFeatures1">
                    <div className="NewCarLoanHeroFeaturesHeading">
                      <h6>
                        Self Employed Individuals (Public Limited Companies)
                      </h6>
                    </div>
                    <div className="NewCarLoanHeroFeatures1Data">
                      <ul>
                        <li>Audited Balance Sheet</li>
                        <li>Profit & Loss Account of the previous 2 years</li>
                        <li>Telephone Bill</li>
                        <li>Electricity Bill</li>
                        <li>Shop & Establishment Act Certificate</li>
                        <li>SSI Registered Certificate</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* <div className="NewCarLoanHeroFeatures">
              <div className="NewCarLoanHeroFeatures1">
                <div className="NewCarLoanHeroFeaturesHeading">
                  <h6>Overview</h6>
                </div>
                <div className="NewCarLoanHeroFeatures1Data">
                  <p>
                    The thrill of bringing your brand-new car home is special.
                    Car Loan has been the driver behind fulfilling the dreams of
                    people to own cars. What if we told you that there was an
                    easy, quick and seamless way to get your car?. Islamic Bank
                    Xpress Car Loan is committed to making your car buying
                    experience smoother than ever. It provides 100% financing on
                    select vehicles, pocket-friendly EMIs, and flexible
                    repayments.
                  </p>
                </div>
              </div>
              <div className="NewCarLoanHeroFeatures1">
                <div className="NewCarLoanHeroFeaturesHeading">
                  <h6>100% digital loan</h6>
                </div>
                <div className="NewCarLoanHeroFeatures1Data">
                  <p>
                    Islamic Bank Xpress Car Loan is 100% digital and you can apply
                    for it anytime, anywhere. You can instantly apply for the
                    loan and it only takes 30 minutes with our end-to-end
                    digital process. There is no physical verification process
                    and you don’t need to submit any physical documents.
                  </p>
                </div>
              </div>
              <div className="NewCarLoanHeroFeatures1">
                <div className="NewCarLoanHeroFeaturesHeading">
                  <h6>Quick disbursal in just 30 minutes</h6>
                </div>
                <div className="NewCarLoanHeroFeatures1Data">
                  <p>
                    It does not matter where you stay, you can apply for the
                    loan from anywhere in India. Islamic Bank Xpress Car Loan
                    ensures that your Auto Loan is disbursed instantly to your
                    car dealer through Ne;tBanking. You can avail of this
                    facility with the following simple steps: Log into your Islamic
                    Bank NetBanking account — go to the Borrow tab — Click on
                    the New Car Loan.
                  </p>
                </div>
              </div>
              <div className="NewCarLoanHeroFeatures1">
                <div className="NewCarLoanHeroFeaturesHeading">
                  <h6>High loan amount</h6>
                </div>
                <div className="NewCarLoanHeroFeatures1Data">
                  <p>
                    With Islamic Bank Car Loans, you can get an Auto Loan of up to
                    ₹25 lakhs on a wide range of cars and multi-utility
                    vehicles. You can enjoy up to 100% on-road finance on your
                    New Car Loan. You can apply for Top-Up Loans for extra
                    financing. Islamic Bank's existing Car Loan customers can avail
                    of the Top-Up Loan facility without any extra documentation.
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          <div className="NewCarLoanHeroDetailsSection">
            <h5 className="NewCarLoanHeroHeading">New Car Loan FAQs</h5>
            <div className="NewCarLoanFaqSection">
              <ul>
                <li>
                  What is the Islamic Bank Xpress Car Loan application process?
                </li>
                <p>
                  Islamic Bank offers a seamless and convenient Auto Loan
                  application process. You can apply for your Car Loan through
                  Islamic Bank NetBanking services. Also, if you are an existing
                  Islamic Bank customer, you may be eligible to get a
                  pre-approved Car Loan in just 10 seconds. For more
                  information, you can log into your Islamic Bank NetBanking
                  account.
                </p>
              </ul>
            </div>
            <div className="NewCarLoanFaqSection">
              <ul>
                <li>How to get your Car Loan approved faster?</li>
                <p>
                  Before you apply for car finance, it is important to determine
                  how much EMI you are comfortable paying. To know about the EMI
                  you might have to pay, you can use the Islamic Bank Car Loan
                  EMI Calculator. <br />
                  You should check your Car Loan eligibility before applying.
                  Both of these steps will allow you to prepare for your Car
                  Loan application process.
                </p>
              </ul>
            </div>
            <div className="NewCarLoanFaqSection">
              <ul>
                <li>
                  What is the minimum credit score I need to get a Car Loan?
                </li>
                <p>
                  What is the minimum credit score I need to get a Car Loan?
                  There’s no specified minimum credit score for getting a Car
                  Loan from Islamic Bank. But a lower credit score can reduce
                  the loan amount you can get. A credit score above 750 is
                  considered excellent for loans. This will allow you to get a
                  higher loan amount at the most affordable Car Loan rates.
                </p>
              </ul>
            </div>
            <div className="NewCarLoanFaqSection">
              <ul>
                <li>How much down payment do I need to make to buy a car?</li>
                <p>
                  Islamic Bank allows you to avail of zero-downpayment Car
                  Loans. For select cars, the bank provides 100% financing of
                  the on-road price of your car. This eliminates the burden of a
                  downpayment.
                </p>
              </ul>
            </div>
            <div className="NewCarLoanFaqSection">
              <ul>
                <li>What are the minimum and maximum tenures for Car Loans?</li>
                <p>
                  Islamic Bank offers flexible tenure for Car Loan products.
                  While the minimum tenure is 12 months, the maximum loan tenure
                  you can avail of is up to 8 years for EVs. View tenures for
                  Custom-Fit and Balloon EMI Car Loans here
                </p>
              </ul>
            </div>
          </div>
        </div>
        {isloginSection && (
          <div className="NewCar_Loan_LoginForm">
            <div className="NewCar_Loan_LoginForm_Inner">
              <div className="close-icon" onClick={handleClose}>
                <MdClose />
              </div>
              {isOtpSent ? (
                <>
                  <h6>Enter OTP</h6>
                  <TextField
                    id="standard-basic"
                    label="Enter OTP"
                    name="enteredOtp"
                    variant="standard"
                    value={enteredOTP}
                    onChange={(e) => setEnteredOTP(e.target.value)}
                    fullWidth
                    className="NewCarLoan_Application_FirstName"
                  />
                  {/* Verify OTP button */}
                  <button
                    style={{ marginTop: "20px" }}
                    className="NewCarLoanEmiBtnBBox1"
                    onClick={handleVerifyOTP}
                  >
                    Verify OTP
                  </button>
                </>
              ) : (
                <>
                  <h6>Sign in with your Email.</h6>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    name="email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    className="NewCarLoan_Application_FirstName"
                  />
                  {/* Checkboxes */}
                  <div className="OtpSpanBox">
                    <span className="NewCarLoan_Application_ErrorMessage">
                      <FaRegClock />
                    </span>
                    <span className="OtpInfo">
                      An OTP will be sent to this Email for verification
                    </span>
                  </div>
                  <div className="Otp_CheckBox">
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        checked={isChecked1}
                        onChange={() => handleCheckboxChange(1)}
                        label="I/we hereby give the consent in relation to Other Products (Please note this tick is voluntary)."
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        checked={isChecked2}
                        onChange={() => handleCheckboxChange(2)}
                        label="I authorize Royal Islamic Bank and its representatives to Call or SMS regarding Other Products. This consent overrides my registration for DNC/NDNC. (Please note this tick is voluntary)."
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        checked={isChecked3}
                        onChange={() => handleCheckboxChange(3)}
                        label="I have read, understood, and hereby accept the Privacy Policy of Royal Islamic Bank Ltd. (available at www.RoyalIslamicBank.com) and give the consent in relation to Requested Products"
                      />
                    </FormGroup>
                  </div>
                  {/* Send OTP button */}
                  <button
                    className="NewCarLoanEmiBox"
                    onClick={handleSendOtp}
                    disabled={!isAllChecked}
                  >
                    Send OTP
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="newCarLoanApplyBox">
        <div className="newCarLoanFooterBtns">
          <NavLink>
            <button className="NewCarLoanEmiBox" onClick={handleLogin}>
              Apply Now
            </button>
          </NavLink>
          <NavLink to={"/CheckEligibility"}>
            <button className="NewCarLoanEmiBtnBBox1">
              Check Your Eligibility
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default CarLoans;
