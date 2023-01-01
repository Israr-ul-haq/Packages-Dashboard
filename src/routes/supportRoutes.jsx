import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import Support from "../pages/Support/ManageSupport";
import ViewSupport from "../pages/Support/ViewSupport";
function SupportRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Support />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="view/:id"
        element={
          <PrivateRoute>
            <ViewSupport />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default SupportRoutes;
