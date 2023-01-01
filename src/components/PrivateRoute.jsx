import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { compare } from "../helpers/CompareTime";
function PrivateRoute({ children }) {
  //UseState
  const [isExpiredTime, setIsExpiredTime] = useState(false);
  //UseEffect
  useEffect(() => {
    checkExpiryTime();
  }, []);
  //Functions
  const checkExpiryTime = () => {
    if (JSON.parse(localStorage.getItem("packagesuser"))) {
      if (
        compare(
          moment(new Date()).format("HH:mm:ss"),
          moment(
            JSON.parse(localStorage.getItem("packagesuser")).token.expiration
          ).format("HH:mm:ss")
        ) === 1
      ) {
        localStorage.removeItem("packagesuser");
        setIsExpiredTime(true);
      }
    } else {
      setIsExpiredTime(true);
    }
  };
  return !isExpiredTime ? children : <Navigate to="/account/login" />;
}

export default PrivateRoute;
