import { Colors } from "../constants/Colors";
import { Box, Flex, Stack, Switch } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";
import { loadingImage } from "../constants/LoadingImage";
import { TableIcons } from "../constants/TableIcons";
import Img from "react-cool-img";
import { ActiveQrCode, InActiveQrCode } from "../services/ShopService";
import Swal from "sweetalert2";
import { useState } from "react";

export const columnNames = [
  {
    name: "",
    email: "",
    phoneNumber: "",
    status: "",
  },
];

export const pdfHeaders = ["OfferName", "OfferPercentage"];
const active = async (id, isActive, setLoader) => {
  debugger;
  if (isActive === true) {
    setLoader(true);
    const response = await InActiveQrCode(id);
    if (response.data.code === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Offer is InActive",
        showConfirmButton: true,
        timer: 5000,
      });
    }

    if (response.data.code === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
    setLoader(false);
  } else {
    debugger;
    setLoader(true);
    const response = await ActiveQrCode(id);
    if (response.data.code === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Offer is Active",
        showConfirmButton: true,
        timer: 5000,
      });
    }
    if (response.data.code === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
    setLoader(false);
  }
};

export const columns = (data, setLoader) => {
  return [
    {
      name: "Sr#",
      cell: (row, index) => {
        if (index < 9) {
          return "0" + (index + 1);
        } else {
          return index + 1;
        }
      },
      sortable: true,
    },

    {
      name: "Offer Name",
      cell: (row) => row["OfferName"] || row["offerName"],
      sortable: true,
    },

    {
      name: "Offer Percentage",
      cell: (row) =>
        row["OfferPercentage"] + "%" || row["offerPercentage"] + "%",
      sortable: true,
    },
  ];
};
