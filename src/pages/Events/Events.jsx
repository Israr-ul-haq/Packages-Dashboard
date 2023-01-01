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
import { get, getEventById, getEventDate } from "../../services/EventsService";
import { useState, useEffect } from "react";
import moment from "moment";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import PageTitle from "../../components/PageTitle";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import userImage from "../../assets/images/dummy-profile.png";
import Image from "../../components/Image";
import DetailText from "../../components/DetailText";
import ProfileButton from "../../components/ProfileButton";
import Heading from "../../components/Heading";
import Swal from "sweetalert2";
import FooterButtons from "../../components/FooterButtons";
import FooterEventButtons from "../../components/FooterEventsButtons";
import { deleteSomething } from "../../services/EventsService";

function Events() {
  //State

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [singleDataEvent, setSingleEvent] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function renderEventContent(eventInfo) {
    debugger;
    return (
      <>
        <div className="calender_section">
          <p style={{ paddingTop: "7px" }}>{eventInfo.event.title}</p>
          <p>{eventInfo.event.extendedProps.time}</p>
        </div>
      </>
    );
  }
  //UseEffect

  useEffect(() => {
    getData(1);
  }, [loader]); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    debugger;

    const response = await get();
    setLoader(true);
    if (response.data.code === 1) {
      setData(
        response.data.data.events.map((item) => {
          let Time = item.time.substring(0, 5);
          const checkTime = parseInt(item.time.substring(0, 2));
          if (checkTime >= 12) {
            Time += "PM";
          } else {
            Time += "AM";
          }
          return {
            title: item.title,
            date: item.date,
            time: Time,
          };
        })
      );
    } else {
    
    }
  };

  const handleDateClick = async (arg) => {
    debugger;
    const response = await getEventDate(arg.dateStr);
    if (response.data.code === 1) {
      setSingleEvent(response.data.data);
      onOpen();
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
      <PageTitle title={"Events"} location={window.location.href} />
      <DashboardHeading
        text={"Event Management"}
        isSingle={true}
        isButtons={true}
        secondButtonText="Add"
        secondButtonLink={"add"}
      />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            eventContent={renderEventContent}
            events={data}
            dateClick={handleDateClick}
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
                {/* <Skeleton isLoaded={loader}> */}
                <Heading
                  fontSize={HeadingFontSizes.heading_2}
                  color={Colors.black_color}
                  fontFamily={FontFamily.secondary_font}
                  fontWeight="800"
                  margin="0 0 35px 0"
                  text={"Events Details"}
                />
                {singleDataEvent.map((item) => {
                  let Time = item.time.substring(0, 5);
                  const checkTime = parseInt(item.time.substring(0, 2));
                  if (checkTime >= 12) {
                    Time += "PM";
                  } else {
                    Time += "AM";
                  }
                  return (
                    <>
                      <Flex alignItems={"flexStart"} overflow={"auto"}>
                        <Box h={"170px"} w={"170px"} mr={"90px"}>
                          <Image
                            image={item.picture ? item.picture : userImage}
                          />
                        </Box>
                        <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                          <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                            <DetailText
                              data={item.title}
                              headingName={"Title"}
                            />
                          </Box>
                          <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                            <DetailText
                              data={moment(item.date).format("YYYY-MM-DD")}
                              headingName={"Date"}
                            />
                          </Box>
                          <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                            <DetailText data={Time} headingName={"Time"} />
                          </Box>
                          <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                            <DetailText
                              data={item.organizerName}
                              headingName={"Organizer Name"}
                            />
                          </Box>
                          <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                            <DetailText
                              data={item.organizerNumber}
                              headingName={"Poc"}
                            />
                          </Box>
                        </Flex>
                      </Flex>
                      <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                        <Box maxW={"100%"} flex={"100%"} marginLeft={"260px"}>
                          <DetailText
                            data={item.description}
                            headingName={"Description"}
                          />
                        </Box>
                      </Flex>
                      <Box
                        display={"flex"}
                        justifyContent={"end"}
                        paddingBottom={"70px"}
                        p={"35px 0"}
                      >
                        <FooterEventButtons
                          firstButtonText={"Edit"}
                          secondButtonText={"Cancel"}
                          onClose={onClose}
                          ThirdButtonText={"Delete"}
                          link={`edit/${item.eventId}`}
                          id={item.eventId}
                          service={deleteSomething}
                          eventData={singleDataEvent}
                          title={item.title}
                          loader={setLoader}
                          loadingText="Updating"
                        />
                      </Box>
                    </>
                  );
                })}
                {/* </Skeleton> */}
              </Box>
            </ModalContent>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default Events;
