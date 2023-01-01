import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DeleteItem from "../helpers/DeleteItem";
import { getById } from "../services/Services";

export const columnNames = [
  {
    title: "",
  },
];

export const pdfHeaders = ["Name"];

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
      name: "Name",
      cell: (row) => row["title"],
      sortable: true,
      width: "80%",
      maxWidth: "150px",
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link style={{ marginRight: "10px", marginTop: "5px" }} to={``}>
            <button onClick={() => handleData(row.serviceId)}>
              <Img
                placeholder={loadingImage}
                src={TableIcons.viewImage}
                error={TableIcons.viewImage}
                alt="view-img"
                style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              />
            </button>
          </Link>
          <Link style={{ marginRight: "10px" }} to={`edit/${row.serviceId}`}>
            <Img
              placeholder={loadingImage}
              src={TableIcons.editImage}
              error={TableIcons.editImage}
              alt="edit-img"
              style={{ height: "23px", width: "23px", maxWidth: "unset" }}
            />
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
                  row.serviceId,
                  data,
                  service,
                  row["title"],
                  setLoader,
                  "Service"
                )
              }
            />
          </button>
        </Flex>
      ),
    },
  ];
};
