import logo from "./logo.svg";
import React from "react";
import "./App.css";

import { Route, Router, Routes } from "react-router-dom";
import CarLoans from "./Components/CarLoans/CarLoans";
import EmiCalculator from "./Components/CarLoans/EmiCalculator";
import NewCarEligibility from "../src/Components/CarLoans/NewCarEligibility";
import EligibiityCheckForm from "./Components/CarLoans/EligibiityCheckForm";
import ApplyNowPage from "./Components/CarLoans/ApplyNowPage";
import ApplicationProcess from "./Components/CarLoans/ApplicationProcess";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/NewCarLoanHome" element={<CarLoans />} />
        <Route exact path="/emi" element={<EmiCalculator />} />
        <Route eact path="/CheckEligibility" element={<NewCarEligibility />} />
        <Route
          exact
          path="/EligibiityCheckForm"
          element={<EligibiityCheckForm />}
        />

        <Route path="/applyNowPage" element={<ApplyNowPage />} />
        <Route path="/ApplicationProcess" element={<ApplicationProcess />} />
      </Routes>
    </>
  );
}

export default App;
