import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddEvent from "../pages/Events/AddEvents";
import EditEvent from "../pages/Events/EditEvents";
import AddMallQrCode from "../pages/MallQrCode/AddMallQrCode";
import MallQrCode from "../pages/MallQrCode/MallQrCode";

function MallQrCodeRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <MallQrCode />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddMallQrCode />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default MallQrCodeRoutes;
