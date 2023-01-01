import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddEvent from "../pages/Events/AddEvents";
import EditEvent from "../pages/Events/EditEvents";
import Events from "../pages/Events/Events";

function EventRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="edit/:id"
        element={
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default EventRoutes;
