import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import your components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutSessions from "./components/WorkoutSessions";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import BMICalculator from "./components/BMICalculator";
import Footer from "./components/footer";
import FitnessPackageForm from "./components/joinus"; // Import the form component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WorkoutSessions />
              <Gallery />
              <Pricing id="pricing-section" />
              <Contact />
              <BMICalculator />
              <Footer />
            </>
          }
        />
        {/* Join Us Form Route */}
        <Route path="/joinus" element={<FitnessPackageForm />} />
      </Routes>
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
};

export default App;
