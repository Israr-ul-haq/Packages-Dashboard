import { Flex, useDisclosure } from "@chakra-ui/react";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { Link } from "react-router-dom";
import Accept from "../helpers/Accept";
import Reject from "../helpers/Reject";
import { useState } from "react";
import BlockUser from "../helpers/BlockUser";
function FooterButtons({
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
  loader,
  acceptService,
  rejectedService,
  title,
  navigate,
  Approve,
}) {
  //State
  const [rejectLoader, setRejectLoader] = useState(false);
  const [acceptLoader, setAcceptLoader] = useState(false);
  return (
    <>
      {isUser ? (
        <Flex alignItems={"center"}>
          <Button
            height="40px"
            width="140px"
            maxWidth="175px"
            text={secondButtonText}
            backgroundColor={Colors.white_color}
            color={Colors.header_danger_color}
            borderColor={Colors.header_danger_color}
            focusBorderColor={Colors.header_danger_color}
            hoverBackgroundColor={Colors.header_danger_color}
            hoverColor={Colors.white_color}
            hoverBorder={Colors.header_danger_color}
            fontWeight="400"
            fontSize={buttonFontSizes.button_datatable_header_size}
            fontFamily={FontFamily.primary_font_medium}
            borderRadius="8px"
            border="2px solid"
            isLoading={rejectLoader}
            loadingText={""}
            onClick={() =>
              BlockUser(id, rejectedService, title, loader, onClose)
            }
          />
          <Button
            margin="0 0 0 15px"
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
            fontFamily={FontFamily.primary_font_medium}
            borderRadius="8px"
            border="1px solid"
            isLoading={acceptLoader}
            loadingText={"Accepting"}
            onClick={onClose}
          />
        </Flex>
      ) : (
        <Flex alignItems={"center"}>
          <Link to={link}>
            <Button
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
          </Link>
          <Button
            margin="0 0 0 15px"
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
            onClick={Approve}
            loadingText={loadingText}
          />
        </Flex>
      )}
    </>
  );
}

export default FooterButtons;
