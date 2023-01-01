import { Box, Flex, Skeleton } from "@chakra-ui/react";
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
import { useNavigate, useParams } from "react-router";
import editUploadedImage from "../../assets/images/edit-uploaded-image.svg";
import {
  uploadImage as uploadImageAPI,
  update,
  getById,
  getCategories,
  getShopImages,
  deleteImage,
} from "../../services/ShopService";
import { InputImages } from "../../constants/InputImages";
import useDisplayImage from "../../hooks/useDisplayImage";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import uploadIconImage from "../../assets/images/icon_upload_add_load (2).svg";
import { GetById } from "../../helpers/GetById";
import QrCodeSubmit from "./QrCodeSubmit";
import QrCodeEditSubmit from "./QrCodeEditSubmit";
import Select from "../../components/Select";
import { InputFontSizes } from "../../constants/InputFontSizes";
import cancelImage from "../../assets/images/cancel.svg";
import uploadImageNew from "../../assets/images/icon_upload_add_load (2).svg";
import EditMultipleImages from "../../hooks/EditMultipleImages";
import UseMultipleImages from "../../hooks/useMultipleImages";

function EditShop() {
  //State
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const { id } = useParams();

  const [imgData, setImgData] = useState([]);
  const [uploadImage, setUploadImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecondError: false,
    paswordValidation: false,
  });
  const [result, setResult] = useState([]);
  const [multipleResult, setMultipleResult] = useState([]);

  const multipleImagesPreview = (e) => {
    debugger;
    let files = e.target.files;
    setMultipleResult(files);
    if (e.target.files) {
      let finalImage = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        //Only pics
        if (!file.type.match("image")) continue;
        let picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          let picFile = event.target;

          setImgData((prevalue) => [
            ...prevalue,
            {
              filePath: picFile.result,
              shopImageId: i + 1,
            },
          ]);
        });

        //Read the image
        picReader.readAsDataURL(file);
      }
      console.log(finalImage);
    }
  };
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shopData, setShopData] = useState({});
  const [categoriesData, setCategoriesData] = useState({});

  const [qrdata, setQrData] = useState([]);
  const [btnLock, setBtnLock] = useState(false);
  const deleteItem = (id) => {
    debugger;
    let removedArray = imgData.filter((item) => {
      return item.shopId !== id;
    });
    setImgData(removedArray);
  };

  const navigate = useNavigate();
  // const deleteItem = async (id) => {
  //   debugger;
  //   setLoader(true);
  //   let removeIndex = result
  //     .map((item) => {
  //       return item.shopId;
  //     })
  //     .indexOf(id);
  //   result.splice(removeIndex, 1);
  //   const response = await deleteImage(id);
  //   if (response.data.code === 1) {
  //     setLoader(false);
  //   }
  // };

  //UseEffect
  useEffect(() => {
    (async () => {
      const response = await GetById(getById, id);
      setQrData(response.data.data.qrCodes);
      setShopData(response.data.data);

      const resetObj = {
        ShopId: id,
        Name: "",
        Floor: "",
        Number: "",
        PhoneNumber: "",
        Latitude: "",
        Longitude: "",
        Description: "",
        NearByPlaces: "",
      };
      resetObj.Name = response.data.data.name;
      resetObj.Floor = response.data.data.floor;
      resetObj.Number = response.data.data.number;
      resetObj.PhoneNumber = response.data.data.phoneNumber;
      resetObj.Latitude = response.data.data.latitude;
      resetObj.Longitude = response.data.data.longitude;
      resetObj.Description = response.data.data.description;
      resetObj.NearByPlaces = response.data.data.nearByPlaces;
      reset(resetObj);

      (async () => {
        debugger;
        const response = await getShopImages(id);
        setImgData(response.data.data);
        setLoader(true);
      })();
    })();
    console.log(qrdata);
  }, [loader, uploadImage]); //eslint-disable-line
  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories(response.data.data);
      setLoader(true);
    })();
  }, [loader, uploadImage]); //eslint-disable-line

  const submitForm = async (formData) => {
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
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
      ShopId: id,
    };
    body.Name = formData.Name;
    body.Floor = formData.Floor;
    body.Number = formData.Number;
    body.Latitude = formData.Latitude;
    body.Longitude = formData.Longitude;
    body.NearByPlaces = formData.NearByPlaces;
    body.Description = formData.Description;
    body.PhoneNumber = formData.PhoneNumber;
    if (categories.id === undefined) {
      body.ShopCategoryId = shopData.shopCategoryId;
    } else {
      body.ShopCategoryId = categories.id;
    }
    debugger;
    const formData1 = new FormData();
    const response = await update(body);
    for (var i = 0; i < multipleResult.length; i++) {
      formData1.append("", multipleResult[i]);
    }
    const imageResponse1 = await uploadImageAPI(formData1, id);

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
      <DashboardHeading text={"Edit Shop"} isBack={true} link="/shops" />
      <form onSubmit={handleSubmit(submitForm)}>
        <Skeleton isLoaded={loader}>
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
                  {imgData.length !== 0
                    ? imgData.map((item) => {
                        return (
                          <>
                            <Img
                              placeholder={loadingImage}
                              src={item?.filePath}
                              // error={result ? result : uploadIconImage}
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
                              onClick={() => deleteItem(item.shopImageId)}
                            />
                          </>
                        );
                      })
                    : ""}
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
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
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
              <Box
                maxW={"33.33%"}
                mb={"50px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
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
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
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
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
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
                        if (shopData.shopCategoryId === item.id) {
                          return (
                            <>
                              <option selected value={item.id}>
                                {item.description}
                              </option>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <option value={item.id}>
                                {item.description}
                              </option>
                            </>
                          );
                        }
                      })}
                    </>
                  }
                  padding="10px 30px 10px 45px"
                  category={categoriesData}
                  setCategory={setCategoriesData}
                />
              </Box>
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
                <InputContainer
                  title={"Latitude"}
                  register={register}
                  registerName={"Latitude"}
                  backgroundImage={InputImages.shopImage}
                />
                {errors.Latitude?.type === "required" && (
                  <p className="error_validation">latitude is required</p>
                )}
              </Box>
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
                <InputContainer
                  title={"Longitude"}
                  register={register}
                  registerName={"Longitude"}
                  backgroundImage={InputImages.shopImage}
                />
                {errors.Longitude?.type === "required" && (
                  <p className="error_validation">longitude is required</p>
                )}
              </Box>
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
                <InputContainer
                  title={"NearByPlaces"}
                  register={register}
                  registerName={"NearByPlaces"}
                  backgroundImage={InputImages.shopImage}
                />
                {errors.NearByPlaces?.type === "required" && (
                  <p className="error_validation">NearByPlaces is required</p>
                )}
              </Box>
              <Box
                maxW={"33.33%"}
                mb={"35px"}
                flex={"33.33%"}
                padding={"0 15px"}
              >
                <InputContainer
                  title={"PhoneNumber"}
                  register={register}
                  registerName={"PhoneNumber"}
                  backgroundImage={InputImages.shopImage}
                />
                {errors.PhoneNumber?.type === "required" && (
                  <p className="error_validation">PhoneNumber is required</p>
                )}
              </Box>
            </Flex>
          </Box>
          <QrCodeEditSubmit
            qrdata={qrdata}
            setQrData={setQrData}
            id={id}
            setLoader={setLoader}
          />
          <Box float={"right"} p={"35px 0"}>
            <FooterButtons
              firstButtonText={"Update"}
              secondButtonText={"Cancel"}
              link={"/shops"}
              loadingText="Updating"
              isLoading={btnLock}
            />
          </Box>
        </Skeleton>
      </form>
    </div>
  );
}

export default EditShop;
