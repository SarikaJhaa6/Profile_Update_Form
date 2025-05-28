import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserFormProvider, UserFormContext } from "./contexts/UserFormContext";
import Step1PersonalInfo from "./components/Step1PersonalInfo";
import Step2Professional from "./components/Step2Professional";
import Step3Preferences from "./components/Step3Preferences";
import Summary from "./components/Summary";
import { useContext } from "react";

const stepToPath = {
  1: "/personal",
  2: "/professional",
  3: "/preferences",
  4: "/summary",
};

const GuardedRoute = ({ stepNumber, Component }) => {
  const { step } = useContext(UserFormContext);

  if (step < stepNumber) {
    return <Navigate to={stepToPath[step]} replace />;
  }

  return <Component />;
};
  

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/personal" />} />
    <Route
      path="/personal"
      element={<GuardedRoute stepNumber={1} Component={Step1PersonalInfo} />}
    />
    <Route
      path="/professional"
      element={<GuardedRoute stepNumber={2} Component={Step2Professional} />}
    />
    <Route
      path="/preferences"
      element={<GuardedRoute stepNumber={3} Component={Step3Preferences} />}
    />
    <Route
      path="/summary"
      element={<GuardedRoute stepNumber={4} Component={Summary} />}
    />
    <Route path="*" element={<Navigate to={stepToPath[1]} />} />
  </Routes>
);

const App = () => {
  return (
    <UserFormProvider>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // stack header and content vertically
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: -20,
            }}
          >
            User Update Form
          </h1>
          <div style={{ maxWidth: 650, width: "100%" }}>
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </UserFormProvider>
  );
};
  
export default App;
