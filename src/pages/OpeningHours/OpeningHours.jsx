import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";

import { useState, useEffect } from "react";

import { columns } from "../../tabledata/HoursData";
import PageTitle from "../../components/PageTitle";

import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Heading from "../../components/Heading";
import SingleButton from "../../components/SingleButtons";
import { deleteSomething, getById } from "../../services/Services";
import Datatable1 from "../../components/DataTable1";
import { get, put } from "../../services/HoursService";
import Swal from "sweetalert2";

function OpeningHours() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [hourData, setHourData] = useState();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //UseEffect
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line

  //Functions

  const Submit = async () => {
    debugger;
    setLoader(false);
    const response = await put(hourData);

    onClose();
    if (response.data.code === 1) {
      setLoader(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
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
  };

  const handleData = async (id) => {
    const response = await get();
    const finalAdmins = [];
    response.data.data.forEach((element) => {
      if (element.openingHourId === id) {
        finalAdmins.push(element);
      }
    });
    setHourData(finalAdmins[0]);
    // reset(finalAdmins[0]);

    onOpen();
  };

  const getData = async () => {
    const response = await get();
    if (response.data.code === 1) {
      setData(response?.data?.data);
      setLoader(true);
    } else {
      setLoader(true);
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
      <PageTitle title={"Hours"} location={window.location.href} />
      <DashboardHeading text={"Hours Management"} />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          {/* <DataTableHeader
            columnNames={columnNames}
            pdfHeaders={pdfHeaders}
            incomingFilteredData={filteredPdfData}
            incomingData={data}
            inComingName={"Hours"}
          /> */}
          <Datatable1
            columns={columns(data, deleteSomething, setLoader, handleData)}
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
              maxWidth={"90%"}
              height={"355px"}
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
                    text={"Hours Detail"}
                  />
                  <form>
                    <Flex alignItems={"flexStart"}>
                      <Flex wrap={"wrap"} width={"calc(100% - 100px)"}>
                        <Box maxW={"33.33%"} flex={"33.33%"} mb={"30px"}>
                          <Heading
                            fontSize={HeadingFontSizes.heading_2}
                            color={Colors.black_color}
                            fontFamily={FontFamily.secondary_font}
                            fontWeight="700"
                            margin="0 0 10px 0"
                            text={hourData?.days}
                          />
                        </Box>
                        <Box
                          maxW={"33.33%"}
                          mb={"35px"}
                          flex={"33.33%"}
                          padding={"0 15px"}
                        >
                          {/* <InputContainer
                            title={"Opening Time"}
                            register={register}
                            registerName={"openingTime"}
                            value="13:30"
                            backgroundImage={InputImages.timeImage}
                            type={"time"}
                          /> */}
                          <input
                            type="time"
                            value={hourData?.openingDate?.slice(0, 5)}
                            className="paymentinput"
                            onChange={(e) => {
                              debugger;
                              let c = { ...hourData };
                              c.openingDate = e.target.value;
                              setHourData(c);
                            }}
                          />
                        </Box>

                        <Box
                          maxW={"33.33%"}
                          mb={"50px"}
                          flex={"33.33%"}
                          padding={"0 15px"}
                        >
                          <input
                            type="time"
                            value={hourData?.closingDate?.slice(0, 5)}
                            onChange={(e) => {
                              let c = { ...hourData };
                              c.closingDate = e.target.value;
                              setHourData(c);
                            }}
                            className="paymentinput"
                          />
                        </Box>
                      </Flex>
                    </Flex>
                  </form>
                </Skeleton>
                <Box
                  float={"right"}
                  m={"80px 0 0 0"}
                  display={"flex"}
                  style={{ gap: "30px" }}
                >
                  <SingleButton firstButtonText="close" onClose={onClose} />
                  <SingleButton
                    firstButtonText="Save"
                    onClose={() => Submit()}
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

export default OpeningHours;
