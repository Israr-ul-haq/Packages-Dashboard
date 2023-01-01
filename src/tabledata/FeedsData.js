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
    description: "",
  },
];

export const pdfHeaders = ["Name", "description"];

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
      name: "Title",
      cell: (row) => row["title"],
      sortable: true,
      width: "15%",
      maxWidth: "30%",
    },
    {
      name: "Description",
      cell: (row) => row["description"],
      sortable: true,
      width: "70%",
      maxWidth: "70%",
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <Flex alignItems={"center"}>
          <Link style={{ marginRight: "10px", marginTop: "5px" }} to={``}>
            <button onClick={() => handleData(row.newsFeedId)}>
              <Img
                placeholder={loadingImage}
                src={TableIcons.viewImage}
                error={TableIcons.viewImage}
                alt="view-img"
                style={{ height: "23px", width: "23px", maxWidth: "unset" }}
              />
            </button>
          </Link>
          <Link
            style={{ marginRight: "10px" }}
            to={`edit/${row["newsFeedId"]}`}
          >
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
                  row.newsFeedId,
                  data,
                  service,
                  row["title"],
                  setLoader,
                  "Feeds"
                )
              }
            />
          </button>
        </Flex>
      ),
    },
  ];
};
