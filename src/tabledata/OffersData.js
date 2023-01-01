import { Flex, Stack, Switch } from "@chakra-ui/react";

import Swal from "sweetalert2";
import moment from "moment";
import { Offer } from "../services/OffersService";

const active = async (id, isActive, setLoader) => {
  debugger;
  if (isActive === true) {
    setLoader(true);
    const response = await Offer(id, false);
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
    const response = await Offer(id, true);
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
      name: "Name",
      cell: (row) => row["name"],
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
      name: "Message",
      cell: (row) => row["message"],
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
              isChecked={row.isApproved ? true : false}
              onChange={() => active(row.offerId, row.isApproved, setLoader)}
            />
          </Stack>
        </Flex>
      ),
    },
  ];
};
