import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DeleteItem from "../helpers/DeleteItem";
import { getById } from "../services/Services";
import moment from "moment";

export const columnNames = [
  {
    days: "",
    openingDate: "",
    closingDate: "",
  },
];

export const pdfHeaders = ["Days", "Opening Time", "Closing Time"];

export const columns = (data, service, setLoader, handleData) => {
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
      name: "Days",
      cell: (row) => row["days"],
      sortable: true,
    },

    {
      name: "Opening Time",
      cell: (row) =>
        row?.openingDate >= "12"
          ? row?.openingDate.slice(0, 5) + " PM"
          : row?.openingDate <= "12"
          ? row?.openingDate.slice(0, 5) + " AM"
          : "",
      sortable: true,
    },
    {
      name: "Closing Time",
      cell: (row) =>
        row?.closingDate >= "12"
          ? row?.closingDate.slice(0, 5) + " PM"
          : row?.closingDate <= "12"
          ? row?.closingDate.slice(0, 5) + " AM"
          : "",
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <button onClick={() => handleData(row.openingHourId)}>
            <Img
              placeholder={loadingImage}
              src={TableIcons.editImage}
              error={TableIcons.editImage}
              alt="edit-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
          </button>
        </Flex>
      ),
    },
  ];
};
