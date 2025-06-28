// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WorkationSurveyPage from "./pages/WorkationSurveyPage";
import TourSurveyPage from "./pages/TourSurveyPage";
import TourResultPage from "./pages/TourResultPage"; // <-- Import the new TourResultPage
import RentalPage from "./pages/RentalPage";
import RentalDetailPage from "./pages/RentalDetailPage";
import MainLayout from "./components/MainLayout";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="workation-survey" element={<WorkationSurveyPage />} />
        <Route path="tour-survey" element={<TourSurveyPage />} />
        <Route path="tour-result" element={<TourResultPage />} />
        <Route path="rental" element={<RentalPage />} />
        <Route path="rental/:id" element={<RentalDetailPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
