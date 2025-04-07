import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./presentation/pages/HomePage";
import VacancyPage from "./presentation/pages/VacancyPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vacancies/:id" element={<VacancyPage />} />
    </Routes>
  );
};

export default App;
