import { Box, Flex, Skeleton, useDisclosure } from "@chakra-ui/react";

import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get } from "../../services/SupportService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/SupportData";
import PageTitle from "../../components/PageTitle";
import moment from "moment";
import Swal from "sweetalert2";

function Support() {
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
      return [elt.userFullName, elt.subject, elt.message, elt.status];
    });
    setFilteredPdfData(filteredData);
  };

  const getData = async (page) => {
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });
    debugger;
    if (response.data.code === 1) {
      setData(response.data.data.queries);
      filterPdfData(response.data.data.queries);
      setTotalRows(response.data.data.total);
      setLoader(true);
    } else {
      setLoader(true);
    }
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.queries);
    filterPdfData(response.data.data.queries);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const searchInput = async (search) => {
    debugger;
    const response = await get({
      pageSize: 10,
      pageNumber: 1,
      search: search,
    });
    setData(response.data.data.queries);
    setTotalRows(response.data.data.total);
    setLoader(true);
  };
  return (
    <div>
      <PageTitle title={"Support"} location={window.location.href} />
      <DashboardHeading text={"Manage Support"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Support"}
            search={searchInput}
          />
          <Datatable
            columns={columns(data, setLoader)}
            totalRows={totalRows}
            handlePerRowsChange={handlePerRowsChange}
            handlePageChange={handlePageChange}
            incomingData={data}
            loading={loading}
          />
        </Skeleton>
      </Box>
    </div>
  );
}

export default Support;
