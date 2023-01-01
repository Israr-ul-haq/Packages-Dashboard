import { Flex, useDisclosure } from "@chakra-ui/react";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { Link } from "react-router-dom";
import Accept from "../helpers/Accept";
import Reject from "../helpers/Reject";
import { useState } from "react";
import DeleteItem from "../helpers/DeleteEvent";
function FooterEventButtons({
  firstButtonText,
  secondButtonText,
  ThirdButtonText,
  link = "/",
  isLoading,
  loadingText,
  isUser = false,
  isEvent = false,
  onClose = null,
  id,
  eventData,
  service,
  title,
  loader,
}) {
  //State
  const [rejectLoader, setRejectLoader] = useState(false);
  const [acceptLoader, setAcceptLoader] = useState(false);
  return (
    <>
      <Flex alignItems={"center"}>
        <Link to={link}>
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
            isLoading={isLoading}
            loadingText={loadingText}
          />
        </Link>

        <Button
          margin="0 0 0 15px"
          height="40px"
          width="145px"
          maxWidth="175px"
          text={secondButtonText}
          backgroundColor={Colors.white_color}
          color={Colors.button_primary_color}
          borderColor={Colors.button_primary_color}
          focusBorderColor={Colors.button_primary_color}
          hoverBackgroundColor={Colors.button_primary_color}
          hoverColor={Colors.white_color}
          hoverBorder={Colors.button_primary_color}
          fontWeight="400"
          fontSize={buttonFontSizes.button_datatable_header_size}
          fontFamily={FontFamily.secondary_font}
          borderRadius="8px"
          border="2px solid"
          onClick={onClose}
        />

        <Button
          margin="0 0 0 15px"
          height="40px"
          width="140px"
          maxWidth="175px"
          text={ThirdButtonText}
          backgroundColor={Colors.button_primary_color}
          color={Colors.white_color}
          borderColor={Colors.button_primary_color}
          focusBorderColor={Colors.button_primary_color}
          hoverBackgroundColor={Colors.white_color}
          hoverColor={Colors.button_primary_color}
          hoverBorder={Colors.button_primary_color}
          fontWeight="400"
          fontSize={buttonFontSizes.button_datatable_header_size}
          fontFamily={FontFamily.primary_font_medium}
          borderRadius="8px"
          border="1px solid"
          isLoading={acceptLoader}
          loadingText={"Accepting"}
          onClick={() =>
            DeleteItem(id, eventData, service, title, loader, "Event", onClose)
          }
        />
      </Flex>
    </>
  );
}

export default FooterEventButtons;
