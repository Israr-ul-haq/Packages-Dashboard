import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Heading from "../../components/Heading";
import Img from "react-cool-img";
import { Box, Flex } from "@chakra-ui/react";
function Stat({ image, data, title, title1, titleRed }) {
  return (
    <Box
      marginRight={"30px"}
      w={"100%"}
      boxShadow={"0 0 18px #00000014"}
      padding={"20px 12px"}
      borderRadius={"8px"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading
          fontSize={HeadingFontSizes.heading_3}
          color={Colors.stats_Primary_Color}
          fontFamily={FontFamily.secondary_font}
          fontWeight="400"
          margin="0 0 10px 0"
          text={title1}
        />
        <Flex
          boxShadow={"0 0 18px #00000014"}
          borderRadius={"6px"}
          padding={"7px 7px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Img placeholder={image} src={image} error={image} alt="user-img" />
        </Flex>
      </Flex>
      <Box marginRight={"10px"}>
        <Box
          borderRadius={"6px"}
          padding={"0 0"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading
            fontSize={HeadingFontSizes.heading_4}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="700"
            margin="0 0 0 0"
            text={data}
          />
          {title ? (
            <Heading
              fontSize={HeadingFontSizes.heading_6}
              color={Colors.stats_Secoundry_Color}
              fontFamily={FontFamily.secondary_font}
              fontWeight="700"
              margin="0 0 0 0"
              text={title}
            />
          ) : (
            // <Heading
            //   fontSize={HeadingFontSizes.heading_6}
            //   color={Colors.header_danger_color}
            //   fontFamily={FontFamily.secondary_font}
            //   fontWeight="700"
            //   margin="0 0 0 0"
            //   text={titleRed}
            // />
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Stat;
