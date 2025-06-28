// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WorkationSurveyPage from "./pages/WorkationSurveyPage";
import TourSurveyPage from "./pages/TourSurveyPage";
import TourResultPage from "./pages/TourResultPage";
import TravelPlannerPage from "./pages/TravelPlannerPage";
import RentalPage from "./pages/RentalPage";
import MainLayout from "./components/MainLayout";
import AboutPage from "./pages/AboutPage";
import ReservationCheckPage from "./pages/ReservationCheckPage";
import MetaversePage from "./pages/MetaversePage";
import Chatbot from "./components/Chatbot";
import RentalDetailPage from "./pages/RentalDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="workation-survey" element={<WorkationSurveyPage />} />
          <Route path="tour-survey" element={<TourSurveyPage />} />
          <Route path="tour-result" element={<TourResultPage />} />{" "}
          <Route path="travel-planner" element={<TravelPlannerPage />} />
          <Route path="rental" element={<RentalPage />} />
          <Route path="rental/:id" element={<RentalDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="reservation-check" element={<ReservationCheckPage />} />
        </Route>
        <Route path="/metaverse" element={<MetaversePage />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
