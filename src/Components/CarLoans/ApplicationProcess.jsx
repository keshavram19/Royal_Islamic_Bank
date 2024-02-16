import React, { useEffect, useState, useRef } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ApplicationProcess() {
  const steps = ["PAN DETAILS", "ADDRESS DETAILS", "EMOPLOYMENT DETAILS"];

  const [isChecked, setIsChecked] = useState(false);
  const [emiChecked, setEmiChecked] = useState(false);
  const [panDetails, setPanDetails] = useState({
    Pannumber: "",
    Databirth: "",
    Salutation: "",
    Firstname: "",
    Middlename: "",
    Lastname: "",
    MaritalStatus: "",
    PersonalEmailId: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    Landmark: "",
    PinCode: "",
    SelectCity: "",
    SelectState: "",
    ResidenceType: "",
    CurrentAddress: "",
    employmentType: "",
    CompanyDetails: "",
    Designation: "",
    Experienceinnumberofyears: "",
    Profession: "",
    Annualincome: "",
    Monthlyincome: "",
    existingEMIsYes: "",
    politicalInfluencer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is a date picker, directly set the date object
    if (name === "Databirth") {
      setPanDetails({
        ...panDetails,
        [name]: value, // Assuming the value here is already a Date object
      });
    } else {
      // For other inputs, update the state as usual
      setPanDetails({
        ...panDetails,
        [name]: value,
      });
      setPanDetails({
        ...panDetails,
        [name]: name === "Pannumber" ? value.toUpperCase() : value,
      });
    }
  };
//   console.log(panDetails, "data");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/v2/pancard",
        panDetails
      );
    //   console.log(res);
      alert("posted Success");
    } catch (e) {
      console.error({ message: "Error in  Posting Data" });
    }
    setPanDetails("");
  };

  const handleEmiBox = () => {
    setEmiChecked(!emiChecked);
  };
  const handleEmiFalse = () => {
    setEmiChecked(false);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <div className="container-fluid NewCarLoan_Application_Process ">
        <div className="row">
          <div>
            <div className="">
              <div class="card_item1 p-3 ">
                <Container>
                  <Box
                    sx={{ width: "790px", bgcolor: "#fff" }}
                    style={{ padding: "30px 30px 30px 30px" }}
                  >
                    <Stepper activeStep={activeStep}>
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                          labelProps.optional = (
                            <Typography variant="caption"></Typography>
                          );
                        }
                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    {activeStep === steps.length ? (
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button 
                          onClick={handleReset}>Reset</Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <React.Fragment>
                          {activeStep === 0 && (
                            <>
                              <div className="container NewCarLoan_Application_Input">
                                <h5 style={{ marginTop: "30px" }}>
                                  Give us your PAN details to get started!
                                </h5>
                                <p className="NewCarLoan_Application_P">
                                  Please provide your PAN Card number mapped to
                                  the name to help us to quickly and easily
                                  verify your details.
                                </p>
                                <div className="NewCarLoan_Application_Pan">
                                  <TextField
                                    className="PanInput"
                                    name="Pannumber"
                                    id="Pannumber"
                                    label="PAN Number"
                                    variant="standard"
                                    onChange={handleChange}
                                    value={panDetails.Pannumber}
                                  />
                                </div>
                                <div className="NewCarLoan_Application_Date_Time_Salutation">
                                  <div className="NewCarLoan_Application_Date_Time">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        name="Databirth"
                                        onChange={(date) =>
                                          handleChange({
                                            target: {
                                              name: "Databirth",
                                              value: date,
                                            },
                                          })
                                        }
                                        value={panDetails.Databirth}
                                        label="Date-Of-Birth"
                                        // format="dd/MM/yyyy"
                                        // You can add more props as needed
                                      />
                                    </LocalizationProvider>
                                  </div>
                                  <div className="NewCarLoan_Application_Salutation">
                                    <FormControl
                                      variant="standard"
                                      sx={{ m: 0, minWidth: 277 }}
                                    >
                                      <InputLabel id="demo-simple-select-standard-label">
                                        Salutation
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="Salutation"
                                        value={panDetails.Salutation}
                                        onChange={handleChange}
                                        label="Salutation"
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Mr"}>Mr</MenuItem>
                                        <MenuItem value={"Mrs"}>Mrs</MenuItem>
                                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>
                                <div className="NewCarLoan_Application_Date_Time_Salutation">
                                  <div className="NewCarLoan_Application_Date_Time">
                                    <TextField
                                      id="standard-basic"
                                      label="First Name"
                                      name="Firstname"
                                      onChange={handleChange}
                                      value={panDetails.Firstname}
                                      variant="standard"
                                      className="NewCarLoan_Application_FirstName"
                                    />
                                  </div>
                                  <div className="NewCarLoan_Application_Salutation">
                                    <TextField
                                      id="standard-basic"
                                      label="Middle Name"
                                      name="Middlename"
                                      variant="standard"
                                      onChange={handleChange}
                                      value={panDetails.Middlename}
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                </div>
                                <div className="NewCarLoan_Application_Pan">
                                  <TextField
                                    id="standard-basic"
                                    label="Last Name"
                                    name="Lastname"
                                    onChange={handleChange}
                                    value={panDetails.Lastname}
                                    variant="standard"
                                    className="PanInput"
                                  />
                                </div>
                                <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  onChange={handleCheckboxChange}
                                  checked={isChecked}
                                  label="I specifically consent for you to get my PAN verified from NSDL / any other agency and receive my personal details to process the same in accordance with the consent already provided by me.
                                  "
                                />
                              </div>
                            </>
                          )}
                          {activeStep === 1 && (
                            <>
                              <div className="container NewCarLoan_Application_Input">
                                <h5 style={{ marginTop: "30px" }}>
                                  Confirm your address and personal details
                                </h5>
                                <p
                                  style={{
                                    fontWeight: "550",
                                    fontSize: "18px",
                                  }}
                                  className="NewCarLoan_Application_P"
                                >
                                  Personal Details
                                </p>
                                {/* <div className="NewCarLoan_Application_Pan">
                                  <TextField
                                    className="PanInput"
                                    id="standard-basic"
                                    label="PAN Number"
                                    variant="standard"
                                    inputProps={{ onInput: handleInput }}
                                  />
                                </div> */}
                                <div className="NewCarLoan_Application_Date_Time_Salutation">
                                  <div className="NewCarLoan_Application_Date_Time">
                                    <FormControl
                                      variant="standard"
                                      sx={{ m: 0, minWidth: 277 }}
                                    >
                                      <InputLabel id="demo-simple-select-standard-label">
                                        Marital Status*
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="MaritalStatus"
                                        value={panDetails.MaritalStatus}
                                        onChange={handleChange}
                                        label="Age"
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Divorced"}>
                                          Divorced
                                        </MenuItem>
                                        <MenuItem value={"Married"}>
                                          Married
                                        </MenuItem>
                                        <MenuItem value={"Single"}>
                                          Single
                                        </MenuItem>
                                        <MenuItem value={"Widow"}>
                                          Widow
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div className="NewCarLoan_Application_Salutation">
                                    <TextField
                                      id="standard-basic"
                                      name="PersonalEmailId"
                                      onChange={handleChange}
                                      value={panDetails.PersonalEmailId}
                                      label="Primary Email"
                                      variant="standard"
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                </div>
                                {/* <div className="NewCarLoan_Application_Date_Time_Salutation"> */}
                                <div className="NewCarLoan_Application_Date_Time">
                                  <FormControl
                                    variant="standard"
                                    sx={{ m: 0, minWidth: 277 }}
                                  >
                                    <InputLabel id="demo-simple-select-standard-label">
                                      Residence Type *
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      name="ResidenceType"
                                      //   value={age}
                                      onChange={handleChange}
                                      label="Age"
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={"CO-PROVIDED"}>
                                        CO-PROVIDED
                                      </MenuItem>
                                      <MenuItem value={"OWNED"}>OWNED</MenuItem>
                                      <MenuItem value={"RENTED"}>
                                        RENTED
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                {/* </div> */}
                                <hr />
                                <div className="NewCarLoan_Application_Address">
                                  <h6>Current Address</h6>
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "#666666",
                                      letterSpacing: "-0.6px",
                                    }}
                                  >
                                    Please use alphabets (a-z), numbers (0-9)
                                    and special characters (.,-) to fill. No
                                    additional special characters are accepted.
                                  </p>
                                  <div className="NewCarLoan_Application_Date_Time_Salutation">
                                    <div className="NewCarLoan_Application_Date_Time">
                                      <TextField
                                        id="standard-basic"
                                        label="Address Line 1"
                                        name="AddressLine1"
                                        onChange={handleChange}
                                        value={panDetails.AddressLine1}
                                        variant="standard"
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                    <div className="NewCarLoan_Application_Salutation">
                                      <TextField
                                        id="standard-basic"
                                        label="Address Line 2 *"
                                        onChange={handleChange}
                                        name="AddressLine2"
                                        value={panDetails.AddressLine2}
                                        variant="standard"
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="NewCarLoan_Application_Date_Time_Salutation">
                                    <div className="NewCarLoan_Application_Date_Time">
                                      <TextField
                                        id="standard-basic"
                                        label="Address Line 3"
                                        onChange={handleChange}
                                        name="AddressLine3"
                                        value={panDetails.AddressLine3}
                                        variant="standard"
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                    <div className="NewCarLoan_Application_Salutation">
                                      <TextField
                                        id="standard-basic"
                                        label="Landmark"
                                        onChange={handleChange}
                                        name="Landmark"
                                        value={panDetails.Landmark}
                                        variant="standard"
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="NewCarLoan_Application_Date_Time_Salutation">
                                    <div className="NewCarLoan_Application_Date_Time">
                                      <TextField
                                        id="standard-basic"
                                        label="Pin Code *"
                                        onChange={handleChange}
                                        name="PinCode"
                                        value={panDetails.PinCode}
                                        variant="standard"
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                    <div className="NewCarLoan_Application_Salutation">
                                      <TextField
                                        id="standard-basic"
                                        label="Select City *"
                                        variant="standard"
                                        onChange={handleChange}
                                        name="SelectCity"
                                        value={panDetails.SelectCity}
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="NewCarLoan_Application_Date_Time_Salutation">
                                    <div className="NewCarLoan_Application_Date_Time">
                                      <TextField
                                        id="standard-basic"
                                        label="Select State *"
                                        variant="standard"
                                        onChange={handleChange}
                                        name="SelectState"
                                        value={panDetails.SelectState}
                                        className="NewCarLoan_Application_FirstName"
                                      />{" "}
                                    </div>
                                    <div className="NewCarLoan_Application_Salutation">
                                      <FormControl
                                        variant="standard"
                                        sx={{ m: 0, minWidth: 277 }}
                                      >
                                        <InputLabel id="demo-simple-select-standard-label">
                                          Residence Type *
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-standard-label"
                                          id="demo-simple-select-standard"
                                          onChange={handleChange}
                                          name="ResidenceType"
                                          value={panDetails.ResidenceType}
                                          label="Age"
                                        >
                                          <MenuItem value="">
                                            <em>None</em>
                                          </MenuItem>
                                          <MenuItem value={"CO-PROVIDED"}>
                                            CO-PROVIDED
                                          </MenuItem>
                                          <MenuItem value={"OWNED"}>
                                            OWNED
                                          </MenuItem>
                                          <MenuItem value={"RENTED"}>
                                            RENTED
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {activeStep === 2 && (
                            <>
                              <div className="container NewCarLoan_Application_Input">
                                <h5 style={{ marginTop: "30px" }}>
                                  Conform your employment and financial details
                                </h5>

                                <div className="NewCarLoan_Application_Pan">
                                  <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                      Employment Status
                                    </FormLabel>
                                    <FormControl component="fieldset">
                                      <RadioGroup
                                        aria-label="existingEMIs"
                                        name="employmentType"
                                        value={panDetails.employmentType}
                                        onChange={handleChange}
                                      >
                                        <FormControlLabel
                                          value="Salaried"
                                          control={<Radio />}
                                          label="Salaried"
                                        />
                                        <FormControlLabel
                                          value="Self-Employed"
                                          control={<Radio />}
                                          label="Self-Employed"
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </FormControl>
                                </div>
                                <hr />
                                <div className="NewCarLoan_Application_Pan">
                                  <h5>Company Details</h5>
                                  <TextField
                                    id="standard-basic"
                                    label="Company Name"
                                    name="CompanyDetails"
                                    value={panDetails.CompanyDetails}
                                    onChange={handleChange}
                                    variant="standard"
                                    className="NewCarLoan_Application_FirstName"
                                  />{" "}
                                </div>
                                <h6>Experience Details</h6>
                                <div className="NewCarLoan_Application_Date_Time_Salutation">
                                  <div className="NewCarLoan_Application_Date_Time">
                                    <TextField
                                      id="standard-basic"
                                      label="Designation"
                                      variant="standard"
                                      name="Designation"
                                      value={panDetails.Designation}
                                      onChange={handleChange}
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                  <div className="NewCarLoan_Application_Salutation">
                                    <TextField
                                      id="standard-basic"
                                      label="Experience in number of years"
                                      name="Experienceinnumberofyears"
                                      value={
                                        panDetails.Experienceinnumberofyears
                                      }
                                      onChange={handleChange}
                                      variant="standard"
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                </div>
                                <div className="NewCarLoan_Application_Pan">
                                  <TextField
                                    id="standard-basic"
                                    label="Profession"
                                    name="Profession"
                                    value={panDetails.Profession}
                                    onChange={handleChange}
                                    variant="standard"
                                    className="PanInput"
                                  />
                                </div>
                                <h6>Financial Details</h6>
                                <div className="NewCarLoan_Application_Date_Time_Salutation">
                                  <div className="NewCarLoan_Application_Date_Time">
                                    <TextField
                                      id="standard-basic"
                                      label="Annual Income"
                                      name="Annualincome"
                                      value={panDetails.Annualincome}
                                      onChange={handleChange}
                                      variant="standard"
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                  <div className="NewCarLoan_Application_Salutation">
                                    <TextField
                                      id="standard-basic"
                                      label="Monthly Income"
                                      name="Monthlyincome"
                                      value={panDetails.Monthlyincome}
                                      onChange={handleChange}
                                      variant="standard"
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                </div>
                                <div
                                  style={{ margin: "0" }}
                                  className="NewCarLoan_Application_Pan"
                                >
                                  <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                      Do you have an Exsisting EMI?*
                                    </FormLabel>
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                    >
                                      <FormControlLabel
                                        value="Yes"
                                        control={<Radio />}
                                        label="Yes"
                                        onClick={handleEmiBox}
                                      />
                                      <FormControlLabel
                                        value="No"
                                        control={<Radio />}
                                        label="No"
                                        onClick={handleEmiFalse}
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                                {emiChecked && (
                                  <div className="NewCarLoan_Application_Pan">
                                    <TextField
                                      style={{ width: "50%" }}
                                      id="standard-basic"
                                      label="EMI Value"
                                      variant="standard"
                                      name="existingEMIsYes"
                                      value={panDetails.existingEMIsYes}
                                      onChange={handleChange}
                                      className="NewCarLoan_Application_FirstName"
                                    />{" "}
                                  </div>
                                )}
                                <h5>Are you Politically Exposed Person</h5>
                                <p
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "450",
                                    letterSpacing: "-0.6px",
                                    color: "#666666",
                                  }}
                                >
                                  Political Exposed Person is an individual who
                                  is actively involved in politics and has a
                                  high-profile political role.
                                </p>
                                <div
                                  style={{ margin: "0" }}
                                  className="NewCarLoan_Application_Pan"
                                >
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      aria-label="existingEMIs"
                                      name="politicalInfluencer"
                                      value={panDetails.politicalInfluencer}
                                      onChange={handleChange}
                                    >
                                      <FormControlLabel
                                        value="Yes"
                                        control={<Radio />}
                                        label="Yes"
                                      />
                                      <FormControlLabel
                                        value="No"
                                        control={<Radio />}
                                        label="No"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </div>
                              </div>
                            </>
                          )}
                          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                            }}
                          >
                            <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {isStepOptional(activeStep) && (
                              <Button
                                color="inherit"
                                onClick={handleSubmit}
                                sx={{ mr: 1 }}
                              >
                                Submit
                              </Button>
                            )}

                            <Button disabled={!isChecked} onClick={handleNext}>
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </Box>
                        </React.Fragment>
                      </form>
                    )}
                  </Box>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationProcess;
