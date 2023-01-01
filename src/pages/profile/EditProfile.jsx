import { Box, Flex, Skeleton } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Img from "react-cool-img";
import userImage from "../../assets/images/dummyprofile-image.png";
import editUploadedImage from "../../assets/images/edit-uploaded-image.png";
import { loadingImage } from "../../constants/LoadingImage";
import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { GetById } from "../../helpers/GetById";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { getById, update, updateProfile } from "../../services/ProfileService";
import { InputImages } from "../../constants/InputImages";
import useDisplayImage from "../../hooks/useDisplayImage";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
function EditProfile() {
  //State
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const { result, uploader, setResult } = useDisplayImage();
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  //UseEffect
  useEffect(() => {
    (async () => {
      debugger;
      const response = await GetById(
        getById,
        JSON.parse(localStorage.getItem("packagesuser")).user.id
      );
      if (response.data.code === 1) {
        setResult(response.data.data.user.profilePicPath);
        reset(response.data.data.user);
        setLoader(true);
      } else {
        setLoader(true);
      }
    })();
  }, []); //eslint-disable-line

  //Functions

  const submitForm = async (formData) => {
    debugger;
    setBtnLock(true);
    const body = {
      Fullname: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      ProfilePicPath: "",
    };
    body.Fullname = formData.fullName;
    body.Email = formData.email;
    debugger;
    // if (formData.newPassword !== "") {
    //   body.Password = formData.newPassword;
    // } else {
    //   body.Password = formData.currentPassword;
    // }
    body.Password = formData.Password;
    body.PhoneNumber = formData.phoneNumber;

    if (uploadImage !== null) {
      debugger;
      const formData = new FormData();
      formData.append("", uploadImage);
      const imageResponse = await updateProfile(formData);
      body.ProfilePicPath = imageResponse.data.data.filePath;
    }
    const response = await update(
      JSON.parse(localStorage.getItem("packagesuser")).user.id,
      body
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
        navigate("/");
      }, 0);
    }

    if (response.data.code === 0) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };
  return (
    <div>
      <PageTitle title={"Profile"} location={window.location.href} />
      <DashboardHeading text={"Edit Admin"} />
      <Skeleton isLoaded={loader}>
        <form onSubmit={handleSubmit(submitForm)}>
          <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
            <Heading
              fontSize={HeadingFontSizes.heading_2}
              color={Colors.black_color}
              fontFamily={FontFamily.secondary_font}
              fontWeight="800"
              margin="0 0 35px 0"
              text={"Admin Details"}
            />
            <Box display={"inline-block"} textAlign={"center"} mb={"40px"}>
              <Heading
                fontSize={HeadingFontSizes.heading_5}
                color={Colors.heading_primary_color}
                fontFamily={FontFamily.primary_font}
                fontWeight="400"
                margin="0 0 15px 0"
                text={"Upload Image"}
              />
              <Box pos={"relative"}>
                <label for="uploadImage">
                  <Img
                    placeholder={loadingImage}
                    src={result ? result : userImage}
                    error={result ? result : userImage}
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
                </label>

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
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
                <InputContainer
                  title={"Full Name"}
                  register={register}
                  registerName={"fullname"}
                  backgroundImage={InputImages.user_image}
                />
                {errors.fullname?.type === "required" && (
                  <p className="error_validation">Name is required</p>
                )}
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
                <InputContainer
                  title={"Email"}
                  // register={register}
                  // registerName={"email"}
                  backgroundImage={InputImages.emailImage}
                  disabled={true}
                />
                {/* {errors.email?.type === "required" && (
                  <p className="error_validation">Email is required</p>
                )} */}
              </Box>
              <Box maxW={"33.33%"} flex={"33.33%"} mb={"0"} padding={"0 15px"}>
                <InputContainer
                  title={"Phone Number"}
                  register={register}
                  registerName={"phoneNumber"}
                  backgroundImage={InputImages.contactImage}
                  type={"number"}
                />
                {errors.phoneNumber?.type === "required" && (
                  <p className="error_validation">Phone Number is required</p>
                )}
              </Box>
              <Box
                maxW={"33.33%"}
                flex={"33.33%"}
                mb={"0"}
                padding={"50px 15px"}
              >
                <InputContainer
                  title={"Password"}
                  register={register}
                  registerName={"Password"}
                  backgroundImage={InputImages.PasslockImage}
                  isPassword={true}
                  isRequired={false}
                />
                {errors.Password?.type === "required" && (
                  <p className="error_validation">Password is required</p>
                )}
              </Box>
            </Flex>
          </Box>

          <Box float={"right"} marginTop={"50px"}>
            <FooterButtons
              firstButtonText={"Update"}
              secondButtonText={"Cancel"}
              link={"/"}
              loadingText="Updating"
              isLoading={btnLock}
            />
          </Box>
        </form>
      </Skeleton>
    </div>
  );
}

export default EditProfile;
