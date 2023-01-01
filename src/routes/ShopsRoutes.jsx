import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddShop from "../pages/shops/AddShop";
import EditShop from "../pages/shops/EditShop";
import Shops from "../pages/shops/Shops";
import ViewShop from "../pages/shops/ViewShop";
function ShopRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Shops />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddShop />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="edit/:id"
        element={
          <PrivateRoute>
            <EditShop />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="view/:id"
        element={
          <PrivateRoute>
            <ViewShop />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default ShopRoutes;
