import React, { useState } from "react";
import { buttonFontSizes } from "../../constants/ButtonFontSizes";
import Button from "../../components/Button";
import Datatable from "../../components/Datatable";
import { columns } from "../../tabledata/EditShopData";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import InputContainer from "../../components/InputContainer";
import { GetById } from "../../helpers/GetById";
import { useForm } from "react-hook-form";
import { InputImages } from "../../constants/InputImages";
import { saveQr } from "../../services/ShopService";
import {
  uploadImage as uploadImageAPI,
  update,
  getById,
} from "../../services/ShopService";

export default function QrCodeEditSubmit({
  qrdata,
  setQrData,
  id,
  setLoader,
  loader,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [btnLock, setBtnLock] = useState(false);

  const submitPromoForm = async (formData) => {
    debugger;
    setLoader(false);
    let qrData = {
      ShopDetailId: id,
      OfferName: "",
      OfferPercentage: "",
    };
    qrData.OfferName = formData.OfferName;
    qrData.OfferPercentage = formData.OfferPercentage;
    const response = await saveQr(qrData);
    const response1 = await GetById(getById, id);

    debugger;
    document.querySelector(".input_form").reset();
    setQrData(response1.data.data.qrCodes);
    setLoader(true);
  };
  return (
    <div>
      <form className="input_form" onSubmit={handleSubmit(submitPromoForm)}>
        <Box padding={"25px 50px"} mt={"30px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 0px 0"
            text={"QR Code"}
          />
          <Box display={"inline-block"} textAlign={"center"} mb={"40px"}></Box>
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <div id="OfferName">
                <InputContainer
                  title={"Offer Name"}
                  register={register}
                  registerName={"OfferName"}
                  backgroundImage={InputImages.offerImage}
                  inputId={"OfferName"}
                />
              </div>
              {errors.OfferName?.type === "required" && (
                <p className="error_validation">Offer name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                type={"number"}
                title={"Offer Percentage"}
                register={register}
                registerName={"OfferPercentage"}
                backgroundImage={InputImages.offerImage}
                inputId={"OfferPercentage"}
              />
              {errors.OfferPercentage?.type === "required" && (
                <p className="error_validation">Offer percentage is required</p>
              )}
            </Box>
            <Box flex={"33.33%"} display={"flex"} pt={"5px"}>
              <Button
                marginLeft="auto"
                height="40px"
                maxWidth="100%"
                text="Generate Promo Code"
                backgroundColor={Colors.button_primary_color}
                color={Colors.white_color}
                borderColor={Colors.button_primary_color}
                focusBorderColor={Colors.button_primary_color}
                hoverBackgroundColor={Colors.white_color}
                hoverColor={Colors.button_primary_color}
                hoverBorder={Colors.button_primary_color}
                fontWeight="500"
                fontSize={buttonFontSizes.button_primary_size}
                fontFamily={FontFamily.primary_font_medium}
                borderRadius="5px"
                loadingText="Please Wait"
                isLoading={btnLock}
                type={"submit"}
                onClick={handleSubmit(submitPromoForm)}
              />
            </Box>
          </Flex>
        </Box>
      </form>
      <Box padding={"35px"} margin={"50px 0"} boxShadow={"0 0 18px #00000014"}>
        <Skeleton isLoaded={loader}>
          <Datatable
            columns={columns(qrdata, setLoader)}
            incomingData={qrdata}
          />
        </Skeleton>
      </Box>
    </div>
  );
}
