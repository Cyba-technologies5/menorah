import { Routes, Route } from "react-router-dom";
import RootLayouts from "./layouts/RootLayouts.jsx";   // ensure the filename matches!
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import EmploymentPortal from "./pages/EmploymentPortal.jsx";
import PatientPortal from "./pages/PatientPortal.jsx";
import Contact from "./pages/Contact.jsx";
import ReferralIntake from "./pages/ReferralPage.jsx";
import Inquiries from "./pages/Inquiries.jsx";
import CPRRegistration from "./pages/CPRRegistration.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayouts />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/employment-portal" element={<EmploymentPortal />} />
        <Route path="/patient-portal" element={<PatientPortal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/referral" element={<ReferralIntake />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/cpr" element={<CPRRegistration />} />
      </Route>
    </Routes>
  );
}
