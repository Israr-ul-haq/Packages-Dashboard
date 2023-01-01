import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import DeleteItem from "../helpers/DeleteItem";
import { Colors } from "../constants/Colors";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";
import { useState } from "react";

export const columnNames = [
  {
    fullName: "",
    email: "",
    phoneNumber: "",
    userStatusDescription: "",
  },
];

export const pdfHeaders = ["Full Name", "Email", "Phone Number", "Status"];

export const columns = (data, service, setLoader, onOpen, userId) => {
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
      name: "Full Name",
      cell: (row) => row["fullName"],
      sortable: true,
    },

    {
      name: "Email",
      cell: (row) => row["email"],
      sortable: true,
    },
    {
      name: "Phone Number",
      cell: (row) => row["phoneNumber"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row["userStatusDescription"] === StatusCodes.UnBlocked ? (
          <Box color={Colors.header_success_color}>UnBlocked</Box>
        ) : row["userStatusDescription"] === StatusCodes.Blocked ? (
          <Box color={Colors.header_danger_color}>Blocked</Box>
        ) : (
          ""
        ),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link style={{ marginRight: "10px", marginTop: "5px" }} to={``}>
            <button
              onClick={() => {
                userId(row.id);
              }}
            >
              <Img
                placeholder={loadingImage}
                src={TableIcons.viewImage}
                error={TableIcons.viewImage}
                alt="view-img"
                style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              />
            </button>
          </Link>
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
                  row.id,
                  data,
                  service,
                  row["fullName"],
                  setLoader,
                  "Users"
                )
              }
            />
          </button>
        </Flex>
      ),
    },
  ];
};
