import { Flex, useDisclosure } from "@chakra-ui/react";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { Link } from "react-router-dom";

function SingleButton({ firstButtonText, link = "/", onClose = null }) {
  return (
    <>
      <Flex alignItems={"center"}>
        <Button
          height="40px"
          width="140px"
          maxWidth="175px"
          text={firstButtonText}
          backgroundColor={Colors.button_primary_color}
          color={Colors.white_color}
          borderColor={Colors.button_primary_color}
          focusBorderColor={Colors.button_primary_color}
          hoverBackgroundColor={Colors.white_color}
          hoverColor={Colors.button_primary_color}
          hoverBorder={Colors.button_primary_color}
          fontWeight="400"
          fontSize={buttonFontSizes.button_datatable_header_size}
          fontFamily={FontFamily.secondary_font}
          borderRadius="8px"
          border="1px solid"
          onClick={onClose}
        />
      </Flex>
    </>
  );
}

export default SingleButton;
