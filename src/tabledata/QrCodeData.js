import Img from "react-cool-img";
import { TableIcons } from "../constants/TableIcons";
import { loadingImage } from "../constants/LoadingImage";
import DeleteItem from "../helpers/DeleteItem";
import { Colors } from "../constants/Colors";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StatusCodes } from "../constants/StatusCodes";

export const columnNames = [
  {
    name: "",
    email: "",
    phoneNumber: "",
    status: "",
  },
];

export const pdfHeaders = ["Name", "Email", "Phone Number", "Status"];

export const columns = (
  data,
  service,
  setLoader,
  onOpen,
  qrId,
  Approved,
  Rejected
) => {
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
      cell: (row) => row["userName"],
      sortable: true,
    },
    {
      name: "Offer Name",
      cell: (row) => row["offerName"],
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
        row["qrStatusDescription"] === StatusCodes.Approved ? (
          <Box color={Colors.header_success_color}>
            {row["qrStatusDescription"]}
          </Box>
        ) : row["qrStatusDescription"] === StatusCodes.Rejected ? (
          <Box color={Colors.header_danger_color}>
            {row["qrStatusDescription"]}
          </Box>
        ) : row["qrStatusDescription"] === StatusCodes.Pending ? (
          <Box color={Colors.notfound_secondary_color}>
            {row["qrStatusDescription"]}
          </Box>
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
                qrId(row.userId);
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
          <Box marginTop={"5px"}>
            <Menu>
              <MenuButton>
                <Img
                  placeholder={loadingImage}
                  src={TableIcons.settingImage}
                  error={TableIcons.settingImage}
                  alt="setting-img"
                  style={{ height: "23px", width: "23px", maxWidth: "unset" }}
                />
              </MenuButton>
              <MenuList minWidth={"none"}>
                <MenuItem
                  onClick={() => {
                    Approved(row.winnerQrCodeId);
                  }}
                >
                  Approve
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    Rejected(row.winnerQrCodeId);
                  }}
                >
                  Reject
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Link style={{ marginRight: "10px" }} to={``}></Link>
        </Flex>
      ),
    },
  ];
};
