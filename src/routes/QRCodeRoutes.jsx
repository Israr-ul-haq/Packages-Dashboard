import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import QrCode from "../pages/QrCode/QrCode";
function QRCodeRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <QrCode />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default QRCodeRoutes;
