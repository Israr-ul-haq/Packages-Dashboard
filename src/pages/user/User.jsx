import { Box, Flex, Skeleton, useDisclosure } from "@chakra-ui/react";

import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get, deleteSomething, block } from "../../services/UserService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/UsersData";
import PageTitle from "../../components/PageTitle";
import userImage from "../../assets/images/dummy-profile.png";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Image from "../../components/Image";
import { BaseUrl } from "../../constants/BaseUrl";
import DetailText from "../../components/DetailText";
import FooterButtons from "../../components/FooterButtons";
import { getById } from "../../services/UserService";
import Swal from "sweetalert2";
function User() {
  //State
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.fullName,
        elt.email,
        elt.phoneNumber,
        elt.userStatusDescription,
      ];
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
      setData(response.data.data.users);
      filterPdfData(response.data.data.users);
      setTotalRows(response.data.data.total);
      setLoader(true);
    } else {
      setLoader(true);
    }
  };
  // const getData = async (page) => {
  //   const response = await get();
  //   setData(response.data.data);
  //   filterPdfData(response.data.data);
  //   setLoader(true);
  // };
  const userId = async (id) => {
    debugger;
    const response = await getById(id);
    if (response.data.code === 1) {
      onOpen();
      setUserData(response.data.data);
    }
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.users);
    filterPdfData(response.data.data.users);
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
    setData(response.data.data.users);
    setTotalRows(response.data.data.total);
    setLoader(true);
  };
  return (
    <div>
      <PageTitle title={"Users"} location={window.location.href} />
      <DashboardHeading text={"User Management"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Users"}
            search={searchInput}
          />
          <Datatable
            columns={columns(data, deleteSomething, setLoader, onOpen, userId)}
            totalRows={totalRows}
            handlePerRowsChange={handlePerRowsChange}
            handlePageChange={handlePageChange}
            incomingData={data}
            loading={loading}
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
                <Skeleton isLoaded={loader}>
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
                          userData?.profilePicPath
                            ? userData?.profilePicPath
                            : userImage
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = { userImage };
                        }}
                      />
                    </Box>
                    <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <DetailText
                          data={userData?.fullName}
                          headingName={"Full Name"}
                        />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <DetailText
                          data={userData?.phoneNumber}
                          headingName={"Phone Number"}
                        />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <DetailText
                          data={userData?.email}
                          headingName={"Email"}
                        />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"}>
                        <DetailText data={"*****"} headingName={"Password"} />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"}>
                        <DetailText
                          data={userData?.userStatusDescription}
                          headingName={"Status"}
                          // status={userData?.userStatusDescription}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Skeleton>
                <Box float={"right"} p={"35px 0"}>
                  <FooterButtons
                    secondButtonText={"Block"}
                    firstButtonText={"Cancel"}
                    onClose={onClose}
                    id={userData?.id}
                    rejectedService={block}
                    title={userData?.fullName}
                    loader={setLoader}
                    isUser={"true"}
                    navigate={"/users"}
                    link={"/users"}
                    loadingText="Updating"
                    // isLoading={btnLock}
                  />
                </Box>
              </Box>
            </ModalContent>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default User;
