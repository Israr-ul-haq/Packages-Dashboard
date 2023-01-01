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
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";
import DetailText from "../components/DetailText";
import FooterButtons from "../components/FooterButtons";
import Heading from "../components/Heading";
import Image from "../components/Image";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";

const UsersPopup = async (id, open, isOpen, onClose) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    open();
  });
  return (
    <>
      <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalBody>
            <ModalContent
              w={"100%"}
              maxWidth={"70%"}
              height={"420px"}
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
                    text={"User Details"}
                  />
                  <Flex alignItems={"flexStart"}>
                    <Box h={"170px"} w={"170px"} mr={"90px"}>
                      {/* <Image
                        image={
                          data.profilePicture
                            ? BaseUrl + data.profilePicture
                            : userImage
                        }
                      /> */}
                    </Box>
                    <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <DetailText
                          data={data.fullname}
                          headingName={"Full Name"}
                        />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <DetailText
                          data={data.phoneNumber}
                          headingName={"Phone Number"}
                        />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                        <DetailText data={data.email} headingName={"Email"} />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"}>
                        <DetailText data={"*****"} headingName={"Password"} />
                      </Box>
                      <Box maxW={"33.33%"} flex={"33.33%"}>
                        <DetailText
                          data={data.userStatusTitle}
                          headingName={"Status"}
                          status={data.userStatusId}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Skeleton>
                <Box float={"right"} p={"35px 0"}>
                  <FooterButtons
                    secondButtonText={"Block"}
                    firstButtonText={"Cancel"}
                    onClose={onClose}
                    isUser={"true"}
                    link={"/shops"}
                    loadingText="Updating"
                    // isLoading={btnLock}
                  />
                </Box>
              </Box>
            </ModalContent>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default UsersPopup;
