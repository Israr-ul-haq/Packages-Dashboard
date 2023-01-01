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
    userFullName: "",
    subject: "",
    message: "",
    status: "",
  },
];

export const pdfHeaders = ["Name", "Subject", "Message", "Status"];

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
      name: "User Name",
      cell: (row) => row["userFullName"],
      sortable: true,
    },

    {
      name: "Subject",
      cell: (row) => row["subject"],
      sortable: true,
    },
    {
      name: "Message",
      cell: (row) => row["message"],
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) =>
        row["status"] ? (
          <div style={{ color: "green" }}>Resolved</div>
        ) : (
          "Pending"
        ),
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link
            style={{ marginRight: "10px", marginTop: "5px" }}
            to={`view/${row.supportId}`}
          >
            <Img
              placeholder={loadingImage}
              src={TableIcons.replyImage}
              error={TableIcons.viewImage}
              alt="view-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </Link>
        </Flex>
      ),
    },
  ];
};
