import dashboardImage from "../assets/images/icon_dashboard.svg";
import eventImage from "../assets/images/event.svg";
import storeImage from "../assets/images/store.svg";
import customerImage from "../assets/images/customer.svg";
import qrImage from "../assets/images/Layer1.svg";
import userImage from "../assets/images/usersImage.svg";
import scannerimage from "../assets/images/scanner.svg";
import Coupons from "../assets/images/Coupons.svg";
import Feeds from "../assets/images/Feed.svg";
import Support from "../assets/images/support.svg";
import time from "../assets/images/Time.svg";
import bellImage from "../assets/images/Group 20280.svg";
import bell from "../assets/images/Icon ionic-md-notifications.svg";
import clock from "../assets/images/Icon awesome-clock.svg";
import maps from "../assets/images/Icon awesome-map-marked-alt.svg";

export const SidebarItems = [
  {
    name: "/",
    image: dashboardImage,
    text: "Dashboard",
  },
  {
    name: "Users",
    image: userImage,
    text: "Manage Users",
  },
  {
    name: "Shops",
    image: storeImage,
    text: "Manage Shops",
  },
  {
    name: "events",
    image: eventImage,
    text: "Manage Events",
  },
  // {
  //   name: "feeds",
  //   image: Feeds,
  //   text: "Manage Feeds",
  // },
  // {
  //   name: "coupons",
  //   image: Coupons,
  //   text: "Manage Coupon",
  // },
  {
    name: "services",
    image: customerImage,
    text: "Manage Services",
  },
  {
    name: "qrcode",
    image: qrImage,
    text: "Winner QR Code",
  },

  {
    name: "mallqrcode",
    image: scannerimage,
    text: "Mall QR Code",
  },
  {
    name: "support",
    image: Support,
    text: "Manage Support",
  },
  {
    name: "openinghours",
    image: clock,
    text: "Openings Hours",
  },
  {
    name: "sendNotifications",
    image: bell,
    text: "Notifications",
  },
  {
    name: "heatMaps",
    image: maps,
    text: "Heat Maps",
  },
];
