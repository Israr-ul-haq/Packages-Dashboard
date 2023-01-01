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
import { get } from "../../services/ServicesService";
import { columns, pdfHeaders, columnNames } from "../../tabledata/ServicesData";
import PageTitle from "../../components/PageTitle";
import DetailText from "../../components/DetailText";
import { BaseUrl } from "../../constants/BaseUrl";
import userImage from "../../assets/images/dummy-profile.png";
import Image from "../../components/Image";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Heading from "../../components/Heading";
import SingleButton from "../../components/SingleButtons";
import { deleteSomething, getById } from "../../services/Services";
import Datatable1 from "../../components/DataTable1";
import Swal from "sweetalert2";

function Services() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [serviceData, setServiceData] = useState();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions
  const filterPdfData = (data) => {
    const filteredData = data?.map((elt) => {
      return [elt?.title];
    });
    setFilteredPdfData(filteredData);
  };

  const handleData = async (id) => {
    debugger;
    const response = await getById(id);
    setServiceData(response?.data?.data);
    onOpen();
  };

  const getData = async (page) => {
    debugger;

    const response = await get();
    if (response.data.code === 1) {
      setData(response?.data?.data);
      filterPdfData(response?.data?.data);
      setLoader(true);
    } else {
      setLoader(true);
    }
  };

  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <PageTitle title={"Services"} location={window.location.href} />
      <DashboardHeading
        text={"Services Management"}
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
            inComingName={"Services"}
            search={setFilterText}
          />
          <Datatable1
            columns={columns(data, deleteSomething, setLoader, handleData)}
            incomingData={filteredItems}
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
              height={"375px"}
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
                    text={"Service Detail"}
                  />
                  <Flex alignItems={"flexStart"}>
                    <Box h={"170px"} w={"170px"} mr={"90px"}>
                      <Image image={serviceData?.picture} />
                    </Box>
                    <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <Heading
                          fontSize={HeadingFontSizes.heading_2}
                          color={Colors.black_color}
                          fontFamily={FontFamily.secondary_font}
                          fontWeight="700"
                          margin="0 0 10px 0"
                          text={serviceData?.title}
                        />
                        <DetailText
                          data={serviceData?.description}
                          headingName={"Discription"}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Skeleton>
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

export default Services;
