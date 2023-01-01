import { Box, Flex, Textarea } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import { loadingImage } from "../../constants/LoadingImage";
import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import editUploadedImage from "../../assets/images/edit-uploaded-image.svg";
import "react-datepicker/dist/react-datepicker.css";
import {
  uploadImage as uploadImageAPI,
  saveEvent,
} from "../../services/EventsService";
import { InputImages } from "../../constants/InputImages";
import useDisplayImage from "../../hooks/useDisplayImage";
import useDisplayImageSecond from "../../hooks/useDisplayImageSecond";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import uploadIconImage from "../../assets/images/icon_upload_add_load (2).svg";
import { buttonFontSizes } from "../../constants/ButtonFontSizes";
import Button from "../../components/Button";
import { InputFontSizes } from "../../constants/InputFontSizes";
import DatePicker from "react-datepicker";
import Input from "../../components/Input";
import moment from "moment";

function AddEvent() {
  //State
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [uploadImage, setUploadImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecondError: false,
    paswordValidation: false,
  });

  const { result, uploader } = useDisplayImage();

  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  //Functions

  const submitForm = async (formData) => {
    debugger;
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    if (uploadImage === null) {
      validationErrorsCopy.uploadImageFirstError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageFirstError = false;
    }

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      Title: "",
      Date: "",
      Description: "",
      Picture: "",
      OrganizerName: "",
      OrganizerNumber: "",
      Time: "",
    };
    body.Title = formData.Title;
    body.Description = formData.Description;
    body.OrganizerName = formData.OrganizerName;
    body.OrganizerNumber = formData.OrganizerNumber;
    body.Time = formData.Time;
    body.Date = startDate;

    debugger;
    const formData1 = new FormData();
    formData1.append("", uploadImage);
    const imageResponse1 = await uploadImageAPI(formData1);
    body.Picture = imageResponse1.data.data.filePath;
    const response = await saveEvent(body);

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
        navigate("/events");
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
      <PageTitle title={"event"} location={window.location.href} />
      <DashboardHeading text={"Add Event"} isBack={true} link="/events" />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_7}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Event Details"}
          />
          <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
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
          </Box>

          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Title"}
                register={register}
                registerName={"Title"}
                backgroundImage={InputImages.titleImage}
              />
              {errors.Title?.type === "required" && (
                <p className="error_validation">Title is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <DatePicker
                selected={startDate}
                minDate={moment().toDate()}
                onChange={(date) => setStartDate(date)}
                className="paymentinput"
                backgroundImage={InputImages.titleImage}
              />
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Time"}
                register={register}
                registerName={"Time"}
                backgroundImage={InputImages.timeImage}
                type={"time"}
              />
              {errors.Time?.type === "required" && (
                <p className="error_validation">Time is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Organizer Name"}
                register={register}
                registerName={"OrganizerName"}
                backgroundImage={InputImages.Organizer}
              />
              {errors.OrganizerName?.type === "required" && (
                <p className="error_validation">Organizer is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Poc"}
                backgroundImage={InputImages.Poc}
                registerName={"OrganizerNumber"}
                register={register}
              />
              {errors.OrganizerNumber?.type === "required" && (
                <p className="error_validation">Poc is required</p>
              )}
            </Box>
            <Box maxW={"100%"} mb={"35px"} flex={"100%"} padding={"0 15px"}>
              <Textarea
                placeholder="Discription"
                size="lg"
                backgroundImage={InputImages.descriptionImage}
                backgroundRepeat={"no-repeat"}
                fontFamily={FontFamily.primary_font}
                backgroundPosition={"15px 18px"}
                fontSize={InputFontSizes.input_default_size}
                color={Colors.input_primary_color}
                {...register("Description", { required: true })}
                isRequired={""}
                margin={"0 0 0 0"}
                fontWeight="500"
                height={"120px"}
                p={"10px 50px"}
                boxShadow={"0px 12px 32px #00000005"}
              />
              {errors.Description?.type === "required" && (
                <p className="error_validation">Description is required</p>
              )}
            </Box>
          </Flex>
        </Box>

        <Box float={"right"} p={"35px 0"}>
          <FooterButtons
            firstButtonText={"Save"}
            secondButtonText={"Cancel"}
            link={"/events"}
            loadingText="Updating"
            isLoading={btnLock}
          />
        </Box>
      </form>
    </div>
  );
}

export default AddEvent;
