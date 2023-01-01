import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import userImage from "../../assets/images/dummy-profile.png";
import { useState, useEffect } from "react";
import { GetById } from "../../helpers/GetById";
import { useNavigate, useParams } from "react-router-dom";
import { ApproveShop, getById } from "../../services/ShopService";
import DetailText from "../../components/DetailText";
import Image from "../../components/Image";
import PageTitle from "../../components/PageTitle";

import Datatable from "../../components/Datatable";
import QrCodeEditSubmit from "./QrCodeEditSubmit";
import { columns } from "../../tabledata/OffersData";
import FooterButtons from "../../components/FooterButtons";
import Swal from "sweetalert2";
function ViewShop() {
  //State
  const [btnLock, setBtnLock] = useState(false);

  const [shopData, setShopData] = useState({
    shopId: "",
    name: "",
    number: "",
    floor: "",
    phoneNumber: "",
    latitude: "",
    longitude: "",
    description: "",
    nearByPlaces: "",
    picture: "",
    qrCodes: [],
  });
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [qrdata, setQrData] = useState([]);
  const [offersData, setOfferData] = useState();
  const navigate = useNavigate();
  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await GetById(getById, id);
      setShopData(response.data.data);
      setQrData(response.data.data.qrCodes);
      debugger;
      setOfferData(response.data.data.offers);
      setLoader(true);
    })();
  }, [loader]); //eslint-disable-line

  const approve = async () => {
    const response = await ApproveShop(id, true);
    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/shops");
      }, 0);
    }
  };
  return (
    <div>
      <PageTitle title={"Shop"} location={window.location.href} />
      <DashboardHeading text={"View Shop"} isBack={true} link="/shops" />
      <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Shop Details"}
          />
          <Flex alignItems={"flexStart"}>
            <Box h={"170px"} w={"170px"} mr={"90px"}>
              <Image
                image={shopData.filePath ? shopData.filePath : userImage}
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText
                  data={shopData.shopName}
                  headingName={"Shop Name"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText
                  data={shopData.shopNumber}
                  headingName={"Shop Number"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText
                  data={shopData.contactNumber}
                  headingName={"Phone Number"}
                />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText data={shopData.floor} headingName={"Floor"} />
              </Box>

              <Box maxW={"100%"} flex={"100%"} mb={"55px"}>
                <DetailText
                  data={shopData.shopCategoryDescription}
                  headingName={"Description"}
                />
              </Box>
            </Flex>
          </Flex>
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Vendor Details"}
          />
          <Flex alignItems={"flexStart"}>
            <Box h={"170px"} w={"170px"} mr={"90px"}>
              <Image
                image={shopData.filePath ? shopData.filePath : userImage}
              />
            </Box>
            <Flex wrap={"wrap"} width={"calc(100% - 260px)"}>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText data={shopData.userFullName} headingName={"Name"} />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText data={shopData.userEmail} headingName={"Email"} />
              </Box>
              <Box maxW={"25%"} flex={"25%"} mb={"55px"}>
                <DetailText
                  data={shopData.userPhoneNumber}
                  headingName={"Phone Number"}
                />
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Box>

      <QrCodeEditSubmit
        qrdata={qrdata}
        setQrData={setQrData}
        id={id}
        setLoader={setLoader}
        loader={loader}
      />
      <Heading
        fontSize={HeadingFontSizes.heading_2}
        color={Colors.black_color}
        fontFamily={FontFamily.secondary_font}
        fontWeight="800"
        margin="0 0 35px 0"
        text={"Offers Details"}
      />
      <Box padding={"35px"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <Datatable
            columns={columns(offersData, setLoader)}
            incomingData={offersData}
          />
        </Skeleton>
      </Box>
      <Box float={"right"} p={"35px 0"}>
        <FooterButtons
          firstButtonText={"Approve"}
          secondButtonText={"Cancel"}
          Approve={approve}
          loadingText="Approving"
          isLoading={btnLock}
        />
      </Box>
    </div>
  );
}

export default ViewShop;
