import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import OpeningHours from "../pages/OpeningHours/OpeningHours";

function HoursRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <OpeningHours />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default HoursRoutes;
