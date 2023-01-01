import { Box, Flex, Skeleton, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import Img from "react-cool-img";
import { TableIcons } from "../../constants/TableIcons";
import { loadingImage } from "../../constants/LoadingImage";
import { Colors } from "../../constants/Colors";
import DeleteItem from "../../helpers/DeleteItem";
import PageTitle from "../../components/PageTitle";
import Image from "../../components/Image";
import Loader from "../../helpers/Loader";
import userImage from "../../assets/images/dummy-profile.png";
import { columns, pdfHeaders, columnNames } from "../../tabledata/QrCodeData";
import { useState } from "react";
import { deleteSomething } from "../../services/ShopService";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { FontFamily } from "../../constants/FontFamily";
import { BaseUrl } from "../../constants/BaseUrl";
import DetailText from "../../components/DetailText";
import FooterButtons from "../../components/FooterButtons";
import SingleButton from "../../components/SingleButtons";
import { approve, get, reject } from "../../services/QrCodeService";
import { useEffect } from "react";
import { getById } from "../../services/UserService";
import Swal from "sweetalert2";

function QrCode() {
  const [data, setData] = useState([]);
  const [qrData, setQrData] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const filterPdfData = (data) => {
    const filteredData = data?.map((elt) => {
      return [
        elt?.fullname,
        elt?.email,
        elt?.phoneNumber,
        elt?.userStatusTitle,
      ];
    });
    setFilteredPdfData(filteredData);
  };
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  // const getData = async (page) => {
  //   debugger;
  //   const response = await get();
  //   setData(response.data.data);
  //   filterPdfData(response.data.data);
  //   setLoader(true);
  // };
  const getData = async (page) => {
    debugger;
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
      search: "",
    });
    if (response?.data?.code === 1) {
      setData(response?.data?.data?.winnerQrCodes);
      filterPdfData(response?.data?.data?.winnerQrCodes);
      setTotalRows(response?.data?.data?.total);
      setLoader(true);
    } else {
      setLoader(true);
    }
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.winnerQrCodes);
    filterPdfData(response.data.data.winnerQrCodes);
    setPerPage(newPerPage);
  };
  const searchInput = async (search) => {
    debugger;
    const response = await get({
      pageSize: 10,
      pageNumber: 1,
      search: search,
    });
    setData(response.data.data.winnerQrCodes);
    setTotalRows(response.data.data.total);
    setLoader(true);
  };
  const qrId = async (id) => {
    debugger;
    const response = await getById(id);
    if (response.data.code === 1) {
      onOpen();
      setQrData(response.data.data);
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
  const Approved = async (id) => {
    setLoader(true);
    const response = await approve(id);
    if (response.data.code === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setLoader(false);
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
  const Rejected = async (id) => {
    setLoader(true);
    const response = await reject(id);
    if (response.data.code === 1) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setLoader(false);
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

  return (
    <div>
      <PageTitle title={"QrCode"} location={window.location.href} />
      <DashboardHeading text={"QR Code Management"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"QrCode"}
            search={searchInput}
          />
          <Datatable
            columns={columns(
              data,
              deleteSomething,
              setLoader,
              onOpen,
              qrId,
              Approved,
              Rejected
            )}
            totalRows={totalRows}
            handlePerRowsChange={handlePerRowsChange}
            handlePageChange={handlePageChange}
            incomingData={data}
            // loading={loading}
          />
        </Skeleton>
      </Box>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalBody>
            <ModalContent
              w={"100%"}
              maxWidth={"70%"}
              height={"420px"}
              marginTop={"185px"}
            >
              <Box padding={"35px 50px"}>
                {/* <Skeleton isLoaded={loader}> */}
                <Heading
                  fontSize={HeadingFontSizes.heading_2}
                  color={Colors.black_color}
                  fontFamily={FontFamily.secondary_font}
                  fontWeight="800"
                  margin="0 0 35px 0"
                  text={"User Details"}
                />
                <Flex alignItems={"flexStart"}>
                  <Box h={"170px"} w={"170px"} mr={"90px"}>
                    <Image
                      image={
                        qrData?.profilePicPath
                          ? qrData?.profilePicPath
                          : userImage
                      }
                    />
                  </Box>
                  <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                    <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                      <DetailText
                        data={qrData?.fullName}
                        headingName={"Full Name"}
                      />
                    </Box>
                    <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                      <DetailText
                        data={qrData?.phoneNumber}
                        headingName={"Phone Number"}
                      />
                    </Box>
                    <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                      <DetailText data={qrData?.email} headingName={"Email"} />
                    </Box>
                    <Box maxW={"33.33%"} flex={"33.33%"}>
                      <DetailText data={"*****"} headingName={"Password"} />
                    </Box>
                    <Box maxW={"33.33%"} flex={"33.33%"}>
                      <DetailText
                        data={qrData.userStatusTitle}
                        headingName={"Status"}
                        status={qrData.userStatusTitle}
                      />
                    </Box>
                  </Flex>
                </Flex>
                {/* </Skeleton> */}
                <Box float={"right"} p={"35px 0"}>
                  <SingleButton firstButtonText="close" onClose={onClose} />
                </Box>
              </Box>
            </ModalContent>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default QrCode;
