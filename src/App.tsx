import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./presentation/pages/HomePage";
import VacancyPage from "./presentation/pages/VacancyPage";
import { EmployerPage } from "./presentation/pages/EmployerPage";
import Layout from "./presentation/Layout";
import { AuthProvider } from "./application/auth/authContext";
import { KeycloakIdentityProvider } from "./infra/auth/idp";
import UserApplicationsPage from "./presentation/pages/UserApplicationsPage";

const keycloakProvider = new KeycloakIdentityProvider();

function App() {
  return (
    <AuthProvider provider={keycloakProvider}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vacancies/:id" element={<VacancyPage />} />
            <Route path="/employers/:employerId" element={<EmployerPage />} />
            <Route path="/applications" element={<UserApplicationsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
