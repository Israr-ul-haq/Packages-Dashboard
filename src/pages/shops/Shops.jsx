import { Box, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { columns, pdfHeaders, columnNames } from "../../tabledata/ShopData";
import PageTitle from "../../components/PageTitle";
import { useState, useEffect } from "react";
import { get, deleteSomething } from "../../services/ShopService";
import Swal from "sweetalert2";
import Datatable1 from "../../components/DataTable1";
function Shops() {
  //State
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      (item.shopName &&
        item.shopName.toLowerCase().includes(filterText.toLowerCase())) ||
      item.floor.toLowerCase().includes(filterText.toLowerCase()) ||
      item.userFullName.toLowerCase().includes(filterText.toLowerCase())
  );

  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.shopName,
        elt.userFullName,
        elt.shopNumber,
        elt.floor,
        elt.contactNumber,
      ];
    });
    setFilteredPdfData(filteredData);
  };

  const getData = async (page) => {
    debugger;
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });
    if (response.data.code === 1) {
      setData(response.data.data.shops);
      filterPdfData(response.data.data.shops);
      setTotalRows(response.data.data.total);
      setLoader(true);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
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
  // const searchInput = async (search) => {
  //   debugger;
  //   const response = await get({
  //     pageSize: 10,
  //     pageNumber: 1,
  //     search: search,
  //   });
  //   setData(response.data.data.shops);
  //   setTotalRows(response.data.data.total);
  //   setLoader(true);
  // };
  return (
    <div>
      <PageTitle title={"Shops"} location={window.location.href} />
      <DashboardHeading
        text={"Shop Management"}
        // isSingle={true}
        // isButtons={true}
        // secondButtonText="Add"
        // secondButtonLink={"add"}
      />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Shops"}
            search={setFilterText}
          />

          <Datatable1
            columns={columns(data, deleteSomething, setLoader)}
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

export default Shops;
