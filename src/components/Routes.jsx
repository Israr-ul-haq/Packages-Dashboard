import {
  Route,
  Routes as Switch,
  HashRouter as Router,
} from "react-router-dom";
import WebLayout from "../layouts/WebLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import Notification from "../pages/notification/Notification";
import NotFound from "../pages/notfound/NotFound";
import Profile from "../pages/profile/Profile";

import Login from "../pages/login/Login";

import PrivateRoute from "./PrivateRoute";
import UserRoutes from "../routes/UserRoutes";
import EditProfile from "../pages/profile/EditProfile";
import ShopRoutes from "../routes/ShopsRoutes";
import ServicesRoutes from "../routes/ServicesRoutes";
import QRCodeRoutes from "../routes/QRCodeRoutes";
import EventRoutes from "../routes/EventRoutes";
import MallQrCodeRoutes from "../routes/MallQrCodeRoutes";
import Coupons from "../pages/Coupons/Coupons";
import CouponsRoutes from "../routes/CouponsRoutes";
import FeedRoutes from "../routes/FeedRoutes";
import SupportRoutes from "../routes/supportRoutes";
import HoursRoutes from "../routes/HoursRoutes";
import SendNotification from "../pages/Notifications/notification";
import HeatMaps from "../pages/HeatMaps/HeatMAps";

function Routes() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/account/login" element={<Login />} />
          <Route
            exact
            path="/account/forgotpassword"
            element={<ForgotPassword />}
          />
          <Route path="/" element={<WebLayout />}>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/EditProfile" element={<EditProfile />} />
            <Route
              exact
              path="/sendNotifications"
              element={<SendNotification />}
            />
            <Route path="users/*" element={<UserRoutes />} />
            <Route path="shops/*" element={<ShopRoutes />} />
            <Route path="services/*" element={<ServicesRoutes />} />
            <Route path="qrcode/*" element={<QRCodeRoutes />} />
            <Route path="events/*" element={<EventRoutes />} />
            <Route path="mallqrcode/*" element={<MallQrCodeRoutes />} />
            <Route exact path="/notifications" element={<Notification />} />
            <Route exact path="coupons/*" element={<CouponsRoutes />} />
            <Route exact path="feeds/*" element={<FeedRoutes />} />
            <Route exact path="support/*" element={<SupportRoutes />} />
            <Route exact path="openinghours/*" element={<HoursRoutes />} />
            <Route exact path="/heatMaps" element={<HeatMaps />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Switch>
      </>
    </Router>
  );
}

export default Routes;
