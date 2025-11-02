// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Calculator from "./pages/calculatorpages/Calculator";
import Calendar from "./pages/calendarpages/Calendar";
import BnCalendar from "./pages/calendarpages/BnCalendar";
import ArabicCalendar from "./pages/calendarpages/ArabicCalendar";
import CnCalendar from "./pages/calendarpages/CnCalendar";
import Clock from "./pages/clock-pages/Clock";
import Blogs from "./pages/Blogs";
import Community from "./pages/Community";
import Web from "./pages/Web";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import WorldClock from "./pages/clock-pages/WorldClock";
import Alarm from "./pages/clock-pages/Alarm";
import StopWatch from "./pages/clock-pages/StopWatch";
import AdvCalculator from "./pages/calculatorpages/AdvCalculator";
import BmiCalculator from "./pages/calculatorpages/BmiCalculator";
import CurrencyCalculator from "./pages/calculatorpages/CurrencyCalculator";
import Privacy from "./pages/legals/Privacy";
import Terms from "./pages/legals/Terms";
import Security from "./pages/legals/Security";
import Licenses from "./pages/legals/Licenses";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/web" element={<Web />} />
        <Route path="/calendar/bangla" element={<BnCalendar />} />
        <Route path="/calendar/arabic" element={<ArabicCalendar/>}/>
        <Route path="/calendar/chinese" element={<CnCalendar/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/clock/world" element={<WorldClock/>}/>
        <Route path="/clock/alarm" element={<Alarm/>}/>
        <Route path="/clock/stopwatch" element={<StopWatch/>}/>
        <Route path="/calculator/advanced" element={<AdvCalculator/>}/>
        <Route path="/calculator/bmi" element={<BmiCalculator/>}/>
        <Route path="/calculator/currency-converter" element={<CurrencyCalculator/>}/>
        <Route path="/legal/privacy" element={<Privacy/>}/>
        <Route path="/legal/terms" element={<Terms/>}/>
        <Route path="/legal/security" element={<Security/>}/>
        <Route path="/legal/licenses" element={<Licenses/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
