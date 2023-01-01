import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddNewFeed from "../pages/Feed/AddNewFeed";
import EditFeed from "../pages/Feed/EditFeed";
import ManageFeed from "../pages/Feed/ManageFeed";

function FeedRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <ManageFeed />
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="edit/:id"
        element={
          <PrivateRoute>
            <EditFeed />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="add"
        element={
          <PrivateRoute>
            <AddNewFeed />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default FeedRoutes;
