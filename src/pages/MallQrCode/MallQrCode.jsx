import { Box, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";

import DataTableHeader from "../../components/DatatableHeader";
import { columns, pdfHeaders, columnNames } from "../../tabledata/MallQrData";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import { get } from "../../services/MallQrCodeService";
import moment from "moment";
import Datatable1 from "../../components/DataTable1";
import Swal from "sweetalert2";
function MallQrCode() {
  //State
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.offerName,
        moment(elt.startDate).format("L"),
        moment(elt.endDate).format("L"),
      ];
    });
    setFilteredPdfData(filteredData);
  };

  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      item.offerName &&
      item.offerName.toLowerCase().includes(filterText.toLowerCase())
  );

  const getData = async (page) => {
    debugger;

    const response = await get();
    if (response.data.code === 1) {
      setData(response.data.data);
      filterPdfData(response.data.data);
      setLoader(true);
    } else {
      setLoader(true);
    }
  };

  // const handlePageChange = (page) => {
  //   getData(page);
  // };

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setLoading(true);
  //   const response = await get({ pageSize: newPerPage, pageNumber: page });
  //   setData(response.data.data);
  //   filterPdfData(response.data.data);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };
  return (
    <div>
      <PageTitle title={"Mall"} location={window.location.href} />
      <DashboardHeading
        text={"Mall QR Code"}
        isSingle={true}
        isButtons={true}
        secondButtonText="Add"
        secondButtonLink={"add"}
      />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Mall"}
            search={setFilterText}
          />
          <Datatable1
            columns={columns(data, setLoader)}
            // totalRows={totalRows}
            // handlePerRowsChange={handlePerRowsChange}
            // handlePageChange={handlePageChange}
            incomingData={filteredItems}
            loading={loading}
          />
        </Skeleton>
      </Box>
    </div>
  );
}

export default MallQrCode;
