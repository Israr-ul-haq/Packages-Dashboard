import { Colors } from "../constants/Colors";
import { Box, Flex, Stack, Switch } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";
import { loadingImage } from "../constants/LoadingImage";
import { TableIcons } from "../constants/TableIcons";
import Img from "react-cool-img";
import { ActiveQrCode, InActiveQrCode } from "../services/MallQrCodeService";
import Swal from "sweetalert2";
import { useState } from "react";
import moment from "moment";

export const columnNames = [
  {
    offerName: "",
    startDate: "",
    endDate: "",
  },
];

export const pdfHeaders = ["OfferName", "Start Date", "End Date"];
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
      cell: (row) => row["offerName"],
      sortable: true,
    },

    {
      name: "Start Date",
      cell: (row) => moment(row.startDate).format("L"),
      sortable: true,
    },
    {
      name: "End Date",
      cell: (row) => moment(row.endDate).format("L"),
      sortable: true,
    },
    {
      name: "Toggle",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Stack align="center" direction="row">
            <Switch
              size="lg"
              isChecked={row.isActive ? true : false}
              onChange={() => active(row.mallQrCodeId, row.isActive, setLoader)}
            />
          </Stack>
        </Flex>
      ),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <a
            style={{ marginLeft: "10px" }}
            href={row.mallQrImage}
            target="_blank"
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.viewImage}
              error={TableIcons.viewImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </a>
        </Flex>
      ),
    },
  ];
};
