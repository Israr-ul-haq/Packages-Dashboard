import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddCoupon from "../pages/Coupons/AddCoupons";
import Coupons from "../pages/Coupons/Coupons";

function CouponsRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Coupons />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddCoupon />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default CouponsRoutes;
