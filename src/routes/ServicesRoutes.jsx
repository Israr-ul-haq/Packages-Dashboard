import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddService from "../pages/services/AddService";
import EditService from "../pages/services/EditService";
import Services from "../pages/services/Services";

function ServicesRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Services />
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="edit/:id"
        element={
          <PrivateRoute>
            <EditService />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default ServicesRoutes;
