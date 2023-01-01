import Img from "react-cool-img";
import logoImage from "../assets/images/packages_mall_logo.png";
import dummyImage from "../assets/images/dummyprofile-image.png";
import bellImage from "../assets/images/Group 20280.svg";
import { Colors } from "../constants/Colors";
import Button from "../components/Button";
import { buttonFontSizes } from "../constants/ButtonFontSizes";
import { FontFamily } from "../constants/FontFamily";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { compare } from "../helpers/CompareTime";
import { GetById } from "../helpers/GetById";
import moment from "moment";
import { useEffect, useState } from "react";
import { loadingImage } from "../constants/LoadingImage";
import { getById } from "../services/ProfileService";
import DashboardHeading from "./DashboardHeading";
import userImage from "../assets/images/dummy-profile.png";
import { HeadingFontSizes } from "../constants/HeadingFontSizes";
import SingleButton from "./SingleButtons";
import DetailText from "./DetailText";
import { BaseUrl } from "../constants/BaseUrl";
import { data } from "../pages/dashboard/Dashboard";
import FooterButtons from "./FooterButtons";
import Image from "./Image";
import ProfileButton from "./ProfileButton";
function Header() {
  //State
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState({
    deviceId: "",
    email: "",
    fullname: "",
    id: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
  });

  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await GetById(
        getById,
        JSON.parse(localStorage.getItem("packagesuser")).user.id
      );
      debugger;
      setUserData(response.data.data.user);
      setLoader(true);
    })();
  }, []);
  //Functions

  const logout = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    localStorage.removeItem("packagesuser");
    // document.querySelector(".userdropdownmenu").remove()
    navigate("/account/login");
  };

  const checkExpiryTime = () => {
    if (JSON.parse(localStorage.getItem("packagesuser"))) {
      if (
        compare(
          moment(new Date()).format("HH:mm:ss"),
          moment(
            JSON.parse(localStorage.getItem("packagesuser")).token.expiration
          ).format("HH:mm:ss")
        ) === 1
      ) {
        localStorage.removeItem("packagesuser");
        navigate("/account/login");
      }
    } else {
      localStorage.removeItem("packagesuser");
      navigate("/account/login");
    }
  };

  setInterval(() => {
    checkExpiryTime();
  }, 300000);
  return (
    <div>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"80px"}
        background={"#ffffff"}
        boxShadow={"0px 0px 18px #00000029"}
        p="0 40px 0 0px"
        position={"fixed"}
        w={"100%"}
        top={"0"}
        left={"0"}
        zIndex={999999}
      >
        <Flex
          width={"249px"}
          p="0 0 0 20px !important"
          bgColor={"#135094"}
          height={"100%"}
          alignItems={"center"}
          borderBottom={"1px solid #DCDCDC"}
        >
          <Box display={"flex"} width={"100%"} gridGap={"10px"}>
            <Link to={"/"}>
              <Img
                placeholder={logoImage}
                src={logoImage}
                error={logoImage}
                alt="logo-img"
                width="35px"
                height="50px"
              />
            </Link>
            <Heading
              fontSize={HeadingFontSizes.heading_2}
              color={Colors.white_color}
              fontFamily={FontFamily.secondary_font}
              fontWeight="600"
              display="flex"
              alignItems="center"
              padding="10px 0"
              text="Packages Mall"
            />
          </Box>
          <Box></Box>
        </Flex>

        <Flex alignItems={"center"}>
          <Link to={"/notifications"}>
            {/* <Img
              placeholder={bellImage}
              src={bellImage}
              error={bellImage}
              alt="bell-img"
              width="25px"
              height="25px"
              style={{ cursor: "pointer" }}
            /> */}
          </Link>

          <Menu>
            <MenuButton className="menubutton" display={"flex"}>
              <Button
                fontSize={buttonFontSizes.button_header_size}
                height="40px"
                width="160px"
                maxWidth="100%"
                text={userData?.fullname ? userData.fullname : "Admin"}
                backgroundColor={Colors.header_admin_color}
                color={Colors.black_color}
                borderColor={Colors.header_admin_color}
                focusBorderColor={Colors.header_admin_color}
                hoverBackgroundColor={Colors.white_color}
                hoverColor={Colors.black_color}
                hoverBorder={Colors.button_header_color}
                margin={"0 20px 0 50px"}
                fontFamily={FontFamily.primary_font}
                fontWeight="500"
                borderRadius="8px"
              />
              <Img
                placeholder={loadingImage}
                src={
                  userData?.profilePicPath
                    ? userData?.profilePicPath
                    : dummyImage
                }
                error={dummyImage}
                alt="profile-img"
                width="50px"
                height="50px"
                style={{ cursor: "pointer" }}
              />
            </MenuButton>
            <MenuList marginLeft={"55px"}>
              <MenuItem
                onClick={onOpen}
                _hover={{
                  color: Colors.white_color,
                  backgroundColor: Colors.button_primary_color,
                }}
                _focus={{
                  color: Colors.white_color,
                  backgroundColor: Colors.button_primary_color,
                }}
              >
                Your Profile
              </MenuItem>

              <MenuItem
                onClick={logout}
                _hover={{
                  color: Colors.white_color,
                  backgroundColor: Colors.button_primary_color,
                }}
                _focus={{
                  color: Colors.white_color,
                  backgroundColor: Colors.button_primary_color,
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
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
                {/* <Skeleton isLoaded={loader}> */}
                <Heading
                  fontSize={HeadingFontSizes.heading_2}
                  color={Colors.black_color}
                  fontFamily={FontFamily.secondary_font}
                  fontWeight="800"
                  margin="0 0 35px 0"
                  text={"Admin Profile"}
                />
                <Flex alignItems={"flexStart"}>
                  <Box h={"170px"} w={"170px"} mr={"90px"}>
                    <Image
                      image={
                        userData?.profilePicPath
                          ? userData?.profilePicPath
                          : userImage
                      }
                    />
                  </Box>
                  <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
                    <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                      <DetailText
                        data={userData?.fullName}
                        headingName={"Full Name"}
                      />
                    </Box>
                    <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                      <DetailText
                        data={userData?.phoneNumber}
                        headingName={"Phone Number"}
                      />
                    </Box>
                    <Box maxW={"33.33%"} flex={"33.33%"} mb={"55px"}>
                      <DetailText
                        data={userData?.email}
                        headingName={"Email"}
                      />
                    </Box>
                  </Flex>
                </Flex>
                {/* </Skeleton> */}
                <Box float={"right"} p={"35px 0"}>
                  <ProfileButton
                    firstButtonText={"Edit"}
                    secondButtonText={"Cancel"}
                    onClose={onClose}
                    link2={"/EditProfile"}
                    loadingText="Updating"
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
export default Header;
