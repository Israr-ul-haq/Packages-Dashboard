import { Box, Flex, Skeleton, useDisclosure } from "@chakra-ui/react";

import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get, deleteSomething } from "../../services/CouponsService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/CouponsData";
import PageTitle from "../../components/PageTitle";
import moment from "moment";
import Swal from "sweetalert2";

function Coupons() {
  //State
  const [data, setData] = useState([]);

  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  // const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.shopName,
        moment(elt.startDate).format("L"),
        moment(elt.endDate).format("L"),
        elt.offerPercentage + "%",
      ];
    });
    setFilteredPdfData(filteredData);
  };

  // const getData = async (page) => {
  //   const response = await get({ pageSize: perPage, pageNumber: page });
  //   setData(response.data.data.records);
  //   filterPdfData(response.data.data.records);
  //   setTotalRows(response.data.data.total);
  //   setLoader(true);
  // };
  const getData = async (page) => {
    const response = await get();
    debugger;
    if (response.data.code === 1) {
      setData(response.data.data.coupons);
      filterPdfData(response.data.data.coupons);
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
  //   setData(response.data.data.records);
  //   filterPdfData(response.data.data.records);
  //   setPerPage(newPerPage);
  //   setLoading(false);
  // };
  return (
    <div>
      <PageTitle title={"Coupons"} location={window.location.href} />
      <DashboardHeading
        text={"Manage Coupon"}
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
            inComingName={"Coupons"}
          />
          <Datatable
            columns={columns(data, deleteSomething, setLoader)}
            // totalRows={totalRows}
            // handlePerRowsChange={handlePerRowsChange}
            // handlePageChange={handlePageChange}
            incomingData={data}
            loading={loading}
          />
        </Skeleton>
      </Box>
    </div>
  );
}

export default Coupons;
