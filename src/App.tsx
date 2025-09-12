import { Routes, Route } from "react-router-dom";
import HomePage from "./presentation/pages/HomePage";
import VacancyPage from "./presentation/pages/VacancyPage";
import { EmployerPage } from "./presentation/pages/EmployerPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vacancies/:id" element={<VacancyPage />} />
      <Route path="/employers/:employerId" element={<EmployerPage />} />
    </Routes>
  );
};

export default App;
