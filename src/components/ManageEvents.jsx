import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DetailText from "./DetailText";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import Heading from "./Heading";
import { useState, useEffect } from "react";
import { get } from "../services/EventsService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function ManageEvents() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getData(1);
  }, [loader]); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    debugger;
    const response = await get();
    setLoader(true);
    if (response.data.code === 1) {
      setData(response.data.data.events);
    } else {
    }
  };
  return (
    <>
      {data.slice(0, 5).map((i, j) => {
        return (
          <>
            <Flex
              className="events_rows"
              gridGap={"20px"}
              bgColor={"#FAFAFA"}
              p={"20px 0px"}
            >
              <Flex borderRight={"1px solid  #DCDCDC"}>
                <Heading
                  fontSize={HeadingFontSizes.heading_3}
                  color={Colors.uploaded_image_border_color}
                  fontFamily={FontFamily.secondary_font}
                  fontWeight="500"
                  margin="0 0 0px 20px"
                  padding="0 20px 0 0"
                  text={++j}
                />
              </Flex>
              <Heading
                fontSize={HeadingFontSizes.heading_3}
                color={Colors.uploaded_image_border_color}
                fontFamily={FontFamily.secondary_font}
                fontWeight="500"
                margin="0 0 0px 0"
                text={i.title}
              />
            </Flex>
          </>
        );
      })}

      <Box
        borderBottom={"1px solid"}
        borderBottomColor={Colors.border_Color}
        margin={"20px 30px"}
      ></Box>
      <Box textAlign={"center"} margin={"10px 0"}>
        <Link to="events">
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.event_Color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="500"
            margin="0 0 0px 0"
            text={"View All Events"}
          />
        </Link>
      </Box>
    </>
  );
}

export default ManageEvents;
