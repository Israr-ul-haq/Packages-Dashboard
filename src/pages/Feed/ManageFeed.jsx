import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/DatatableHeader";
import { useState, useEffect } from "react";
import { get, getById } from "../../services/FeedsService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/FeedsData";
import PageTitle from "../../components/PageTitle";

import { deleteSomething } from "../../services/FeedsService";
import Datatable1 from "../../components/DataTable1";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import Heading from "../../components/Heading";
import { FontFamily } from "../../constants/FontFamily";
import Image from "../../components/Image";
import DetailText from "../../components/DetailText";
import SingleButton from "../../components/SingleButtons";
import Swal from "sweetalert2";

function ManageFeed() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [feedData, setFeedData] = useState();
  const [perPage, setPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.title];
    });
    setFilteredPdfData(filteredData);
  };

  const getData = async (page) => {
    const response = await get({
      pageSize: perPage,
      pageNumber: page,
    });
    if (response.data.code === 1) {
      setData(response.data.data.newsFeeds);
      filterPdfData(response.data.data.newsFeeds);
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
    setData(response.data.data.newsFeeds);
    filterPdfData(response.data.data.newsFeeds);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const handleData = async (id) => {
    debugger;
    const response = await getById(id);
    setFeedData(response.data.data);
    onOpen();
  };

  return (
    <div>
      <PageTitle title={"Feeds"} location={window.location.href} />
      <DashboardHeading
        text={"Manage Feeds"}
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
            inComingName={"Feeds"}
          />
          <Datatable
            columns={columns(data, deleteSomething, setLoader, handleData)}
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
              height={"470px"}
              marginTop={"185px"}
            >
              <Box padding={"35px 50px"} overflow={"auto"}>
                <Skeleton isLoaded={loader}>
                  <Heading
                    fontSize={HeadingFontSizes.heading_2}
                    color={Colors.black_color}
                    fontFamily={FontFamily.secondary_font}
                    fontWeight="800"
                    margin="0 0 35px 0"
                    text={"Service Detail"}
                  />
                  <Flex alignItems={"flexStart"}>
                    <Box h={"170px"} w={"170px"} mr={"90px"}>
                      <Image image={feedData?.filePath} />
                    </Box>
                    <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"30px"}>
                        <Heading
                          fontSize={HeadingFontSizes.heading_2}
                          color={Colors.black_color}
                          fontFamily={FontFamily.secondary_font}
                          fontWeight="700"
                          margin="0 0 10px 0"
                          text={feedData?.title}
                        />
                      </Box>
                      <DetailText
                        data={feedData?.description}
                        headingName={"Discription"}
                      />
                    </Flex>
                  </Flex>
                </Skeleton>
                <Box float={"right"} m={"80px 0 0 0"}>
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

export default ManageFeed;
