import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import DeleteItem from "../helpers/DeleteItem";
import { Colors } from "../constants/Colors";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";
import { useState } from "react";
import moment from "moment";

export const columnNames = [
  {
    shopName: "",
    startDate: "",
    endDate: "",
    offerPercentage: "",
  },
];

export const pdfHeaders = ["Shop Name", "Start Date", "End Date", "Discount"];

export const columns = (data, service, setLoader) => {
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
      width: "150px",
      maxWidth: "150px",
    },

    {
      name: "Shop Name",
      cell: (row) => row["shopName"],
      sortable: true,
    },

    {
      name: "Start date",
      cell: (row) => moment(row.startDate).format("L"),
      sortable: true,
    },
    {
      name: "End Date",
      cell: (row) => moment(row.endDate).format("L"),
      sortable: true,
    },
    {
      name: "Discount",
      cell: (row) => row["offerPercentage"] + "%",
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <button
            style={{ marginRight: "10px" }}
            type="button"
            data-toggle="modal"
            className="tableactions_action"
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.deleteImage}
              error={TableIcons.deleteImage}
              alt="delete-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              onClick={() =>
                DeleteItem(
                  row.couponId,
                  data,
                  service,
                  row["shopName"] + " " + "Coupon",
                  setLoader,
                  "Coupon"
                )
              }
            />
          </button>
        </Flex>
      ),
    },
  ];
};
