import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import DeleteItem from "../helpers/DeleteItem";
import { Colors } from "../constants/Colors";
import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";

export const columnNames = [
  {
    shopName: "",
    userFullName: "",
    shopNumber: "",
    floor: "",
    contactNumber: "",
  },
];

export const pdfHeaders = ["Name", "Email", "Floor", "Phone Number"];

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
    },

    {
      name: "Shop Name",
      cell: (row) => row["shopName"],
      sortable: true,
    },
    {
      name: "Vendor Name",
      cell: (row) => row["userFullName"],
      sortable: true,
    },

    {
      name: "Shop Number",
      cell: (row) => row["shopNumber"],
      sortable: true,
    },
    {
      name: "Floor",
      cell: (row) => row["floor"],
      sortable: true,
      width: "100px",
      maxWidth: "100px",
    },
    {
      name: "Phone Number",
      cell: (row) => row["contactNumber"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row["isApproved"] === StatusCodes.IsApproved ? (
          <Box color={Colors.header_success_color}>Approved</Box>
        ) : row["isApproved"] === StatusCodes.IsRejected ? (
          <Box color={Colors.header_danger_color}>Rejected</Box>
        ) : (
          <Box color={Colors.header_warning_color}>{row["status"]}</Box>
        ),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link
            style={{ marginRight: "10px" }}
            to={`view/${row["shopDetailId"]}`}
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.viewImage}
              error={TableIcons.viewImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link>
          {/* <Link style={{ marginRight: "10px" }} to={`edit/${row["shopId"]}`}>
            <Img
              placeholder={loadingImage}
              src={TableIcons.editImage}
              error={TableIcons.editImage}
              alt="edit-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link> */}
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
                DeleteItem(row.shopId, data, service, row["name"], setLoader)
              }
            />
          </button>
        </Flex>
      ),
    },
  ];
};
