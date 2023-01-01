import { Box, Flex } from "@chakra-ui/react";
import Img from "react-cool-img";
import { NavLink } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import { Colors } from "../constants/Colors";
import { loadingImage } from "../constants/LoadingImage";
import { SidebarItems } from "../constants/SidebarItems";
import Heading from "./Heading";
import { FontFamily } from "../constants/FontFamily";
function Sidebar() {
  return (
    <Box
      width={"250px"}
      h={"100vh"}
      position={"fixed"}
      left={"0"}
      top={"0px"}
      borderRight={"1px solid #D1D1D1"}
      paddingTop={"80px"}
      className="mainsidebar"
      background={
        " transparent linear-gradient(180deg, #135093 0%, #1574C4 50%, #135094 100%) 0% 0% no-repeat padding-box}"
      }
    >
      <SimpleBar forceVisible="y" autoHide={true} style={{ height: "100%" }}>
        {SidebarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.name.toLowerCase()}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Flex
              key={item.name}
              alignItems={"center"}
              justifyContent={"left"}
              p="35px"
              w={"100%"}
              paddingBottom={"20px"}
              paddingTop={"20px"}
              paddingLeft={"32px"}
              className="icon_contain"
              gridGap={"10px"}
            >
              <Img
                className="inactivesidebarimage"
                src={item.image}
                error={item.image}
                alt={item.name.toLowerCase() + "-image"}
                style={{ cursor: "pointer" }}
              />
              <Heading
                fontSize={HeadingFontSizes.heading_5}
                color={Colors.white_color}
                fontFamily={FontFamily.secondary_font}
                fontWeight="600"
                text={item.text}
              />
            </Flex>
          </NavLink>
        ))}
      </SimpleBar>
    </Box>
  );
}

export default Sidebar;
