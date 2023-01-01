import { Box, Flex } from "@chakra-ui/react";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Select from "../../components/Select";
import uploadImageNew from "../../assets/images/icon_upload_add_load (2).svg";
import {
  uploadImage as uploadImageAPI,
  save,
  getCategories,
} from "../../services/ShopService";
import { InputImages } from "../../constants/InputImages";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import uploadIconImage from "../../assets/images/icon_upload_add_load (2).svg";
import cancelImage from "../../assets/images/cancel.svg";

import QrCodeSubmit from "./QrCodeSubmit";
import { InputFontSizes } from "../../constants/InputFontSizes";
import UseMultipleImages from "../../hooks/useMultipleImages";

function AddShop() {
  //State
  const {
    handleSubmit,

    register,
    formState: { errors },
  } = useForm();
  const [uploadImage, setUploadImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecondError: false,
    paswordValidation: false,
  });
  const [loader, setLoader] = useState(false);
  const [qrdata, setQrData] = useState([]);
  // const { result, uploader } = useDisplayImage();
  const { result, multipleImagesPreview, setResult, multipleResult } =
    UseMultipleImages();
  const [btnLock, setBtnLock] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState({});
  const deleteItem = (id) => {
    debugger;
    let removedArray = result.filter((item) => {
      return item.id !== id;
    });
    setResult(removedArray);
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories(response.data.data);
    })();
  }, [loader]); //eslint-disable-line
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

    setValidationErrors(validationErrorsCopy);

    if (validCount > 0) {
      return true;
    }

    setBtnLock(true);

    const body = {
      Name: "",
      Floor: "",
      Number: "",
      Latitude: "",
      Longitude: "",
      NearByPlaces: "",
      Description: "",
      PhoneNumber: "",
      ShopCategoryId: "",
      QrCodes: [],
    };
    body.Name = formData.Name;
    body.Floor = formData.Floor;
    body.Number = formData.Number;
    body.Latitude = formData.Latitude;
    body.Longitude = formData.Longitude;
    body.NearByPlaces = formData.NearByPlaces;
    body.Description = formData.Description;
    body.PhoneNumber = formData.PhoneNumber;
    body.ShopCategoryId = Number(categoriesData.id);
    body.QrCodes = qrdata;
    debugger;
    // const formData1 = new FormData();
    // formData1.append("profileImage", uploadImage);
    // const imageResponse1 = await uploadImageAPI(formData1);
    // body.Picture = imageResponse1.data.data.filePath;
    const formData1 = new FormData();
    const response = await save(body);
    for (var i = 0; i < result.length; i++) {
      formData1.append("", multipleResult[i]);
    }
    const imageResponse1 = await uploadImageAPI(
      formData1,
      response.data.data.shop.shopId
    );

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
      <PageTitle title={"shops"} location={window.location.href} />
      <DashboardHeading text={"Add Shops"} isBack={true} link="/shops" />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Shop Details"}
          />
          <Heading
            fontSize={HeadingFontSizes.heading_5}
            color={Colors.heading_primary_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="400"
            margin="0 0 15px 0"
            text={"Upload Image"}
          />
          <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
            <Box pos={"relative"}>
              <div className="Label_image">
                <label for="uploadImage">
                  <Img
                    placeholder={loadingImage}
                    src={uploadImageNew}
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
                </label>
                {result.map((item) => {
                  return (
                    <>
                      <Img
                        placeholder={loadingImage}
                        src={item.picFile}
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
                      <Img
                        src={cancelImage}
                        className="cancel_img"
                        onClick={() => deleteItem(item.id)}
                      />
                    </>
                  );
                })}
              </div>
              <input
                id="uploadImage"
                name="uploadImage"
                type={"file"}
                multiple
                style={{
                  position: "absolute",
                  opacity: "0",
                  visibility: "hidden",
                }}
                onChange={(e) => {
                  // setUploadImages(e.target.files[0]);
                  multipleImagesPreview(e);
                }}
              />
            </Box>
          </Box>
          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Shop Name"}
                register={register}
                registerName={"Name"}
                backgroundImage={InputImages.user_image}
              />
              {errors.Name?.type === "required" && (
                <p className="error_validation">Shop name is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"50px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Shop Number"}
                register={register}
                registerName={"Number"}
                backgroundImage={InputImages.shopImage}
              />
              {errors.Number?.type === "required" && (
                <p className="error_validation">Shop number is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"50px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                type={"number"}
                title={"Phone Number"}
                register={register}
                registerName={"PhoneNumber"}
                backgroundImage={InputImages.shopImage}
              />
              {errors.Number?.type === "required" && (
                <p className="error_validation">Shop number is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Floor"}
                register={register}
                registerName={"Floor"}
                backgroundImage={InputImages.floorImage}
              />
              {errors.Floor?.type === "required" && (
                <p className="error_validation">Phone number is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
              <Select
                hasBackgroundImage={true}
                backgroundImage={InputImages.shopImage}
                margin={"0 0 0 0"}
                fontFamily={FontFamily.primary_font}
                fontSize={InputFontSizes.input_default_size}
                color={Colors.input_primary_color}
                fontWeight="500"
                options={
                  <>
                    <option selected value={""}>
                      Select
                    </option>
                    {categories.map((item) => {
                      return (
                        <>
                          <option value={item.id}>{item.description}</option>
                        </>
                      );
                    })}
                  </>
                }
                padding="10px 30px 10px 45px"
                category={categoriesData}
                setCategory={setCategoriesData}
              />
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Shop Description"}
                register={register}
                registerName={"Description"}
                backgroundImage={InputImages.descriptionImage}
              />
              {errors.Description?.type === "required" && (
                <p className="error_validation">Shop number is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Latitude"}
                register={register}
                registerName={"Latitude"}
                backgroundImage={InputImages.latitude}
              />
              {errors.Latitude?.type === "required" && (
                <p className="error_validation">latitude is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Longitude"}
                register={register}
                registerName={"Longitude"}
                backgroundImage={InputImages.longitude}
              />
              {errors.Longitude?.type === "required" && (
                <p className="error_validation">longitude is required</p>
              )}
            </Box>
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"NearByPlaces"}
                register={register}
                registerName={"NearByPlaces"}
                backgroundImage={InputImages.Nearbyplaces}
              />
              {errors.NearByPlaces?.type === "required" && (
                <p className="error_validation">NearByPlaces is required</p>
              )}
            </Box>
          </Flex>
        </Box>
        <QrCodeSubmit qrdata={qrdata} setQrData={setQrData} />
        <Box float={"right"} p={"35px 0"}>
          <FooterButtons
            firstButtonText={"Save"}
            secondButtonText={"Close"}
            link={"/shops"}
            loadingText="Saving"
            isLoading={btnLock}
          />
        </Box>
      </form>
    </div>
  );
}

export default AddShop;
