import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";

import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

import "react-datepicker/dist/react-datepicker.css";
import { save } from "../../services/MallQrCodeService";
import { InputImages } from "../../constants/InputImages";
import useDisplayImage from "../../hooks/useDisplayImage";

import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";

import DatePicker from "react-datepicker";

import moment from "moment";

function AddMallQrCode() {
  //State
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [validationErrors, setValidationErrors] = useState({
    startDateEmpty: false,
  });

  

  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  //Functions

  const submitForm = async (formData) => {
    debugger;
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    // if (uploadImage === null) {
    //   validationErrorsCopy.uploadImageFirstError = true;
    //   validCount++;
    // } else {
    //   validationErrorsCopy.uploadImageFirstError = false;
    // }
    if (endDate.getTime() < startDate.getTime()) {
      validationErrorsCopy.startDateEmpty =
        "End date must be greater than start date";
      validCount++;
    } else {
      validationErrorsCopy.startDateEmpty = "";
    }

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      OfferName: "",
    };
    body.OfferName = formData.OfferName;
    body.StartDate = startDate;
    body.EndDate = endDate;

    debugger;
    // const formData1 = new FormData();
    // formData1.append("", uploadImage);
    // const imageResponse1 = await uploadImageAPI(formData1);
    // body.Picture = imageResponse1.data.data.filePath;
    const response = await save(body);

    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "QR Code Saved",
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/mallqrcode");
      }, 0);
    }

    if (response.data.code === 0) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };
  return (
    <div>
      <PageTitle title={"mall code"} location={window.location.href} />
      <DashboardHeading
        text={"Add Mall QR Code"}
        isBack={true}
        link="/mallqrcode"
      />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"QR Code Detail"}
          />
          {/* <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
            <Heading
              fontSize={HeadingFontSizes.heading_5}
              color={Colors.heading_primary_color}
              fontFamily={FontFamily.secondary_font}
              fontWeight="400"
              margin="0 0 15px 0"
              text={"Upload Image"}
            />
            <Box pos={"relative"}>
              <label for="uploadImage">
                <Img
                  placeholder={loadingImage}
                  src={result ? result : uploadIconImage}
                  error={result ? result : uploadIconImage}
                  alt="upload-img"
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto",
                    "object-fit": "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                />

                {result ? (
                  <Img
                    placeholder={loadingImage}
                    src={editUploadedImage}
                    error={editUploadedImage}
                    alt="upload-img"
                    style={{
                      width: "20px",
                      height: "20px",
                      "object-fit": "contain",
                      cursor: "pointer",
                      position: "absolute",
                      top: -5,
                      right: -5,
                    }}
                  />
                ) : (
                  ""
                )}
              </label>
              {validationErrors.uploadImageFirstError ? (
                <p className="error_validation">Image is Required</p>
              ) : (
                ""
              )}
              <input
                id="uploadImage"
                name="uploadImage"
                type={"file"}
                style={{
                  position: "absolute",
                  opacity: "0",
                  visibility: "hidden",
                }}
                onChange={(e) => {
                  setUploadImage(e.target.files[0]);
                  uploader(e);
                }}
              />
            </Box>
          </Box> */}

          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Offer Name"}
                register={register}
                registerName={"OfferName"}
                backgroundImage={InputImages.titleImage}
              />
              {errors.OfferName?.type === "required" && (
                <p className="error_validation">Offer name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <DatePicker
                selected={startDate}
                minDate={moment().toDate()}
                placeholderText="Strat Date"
                onChange={(date) => setStartDate(date)}
                className="paymentinput"
                backgroundImage={InputImages.titleImage}
              />
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <DatePicker
                selected={endDate}
                minDate={moment().toDate()}
                placeholderText="End Date"
                onChange={(date) => setEndDate(date)}
                className="paymentinput"
                backgroundImage={InputImages.titleImage}
              />
              {validationErrors.startDateEmpty !== 0 ? (
                <p className="error_validation">
                  {validationErrors.startDateEmpty}
                </p>
              ) : (
                ""
              )}
            </Box>
          </Flex>
        </Box>

        <Box float={"right"} p={"35px 0"}>
          <FooterButtons
            firstButtonText={"Save"}
            secondButtonText={"Cancel"}
            link={"/mallqrcode"}
            loadingText="Updating"
            isLoading={btnLock}
          />
        </Box>
      </form>
    </div>
  );
}

export default AddMallQrCode;
