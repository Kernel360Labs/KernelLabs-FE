// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WorkationSurveyPage from "./pages/WorkationSurveyPage";
import TourSurveyPage from "./pages/TourSurveyPage";
import TourResultPage from "./pages/TourResultPage"; // <-- Import the new TourResultPage
import RentalPage from "./pages/RentalPage";
import MainLayout from "./components/MainLayout";
import AboutPage from "./pages/AboutPage";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="workation-survey" element={<WorkationSurveyPage />} />
          <Route path="tour-survey" element={<TourSurveyPage />} />
          <Route path="tour-result" element={<TourResultPage />} /> {/* <-- Add this new route */}
          <Route path="rental" element={<RentalPage />} />
          <Route path="rental/:id" element={<RentalPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;