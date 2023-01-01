import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { InputImages } from "../../constants/InputImages";

import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";

import { InputFontSizes } from "../../constants/InputFontSizes";
import { sendNotification } from "../../services/NotificationService";
import SingleButton from "../../components/SingleButtons";
import Select2 from "../../components/Select2";

function SendNotification() {
  //State
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [btnLock, setBtnLock] = useState(false);
  const [categoriesData, setCategoriesData] = useState({});
  //Functions

  const submitForm = async (formData) => {
    debugger;
    setBtnLock(true);

    const body = {
      Title: formData.Title,
      Description: formData.Description,
      Type: categoriesData.Type,
    };
    const response = await sendNotification(body);
    document.querySelector(".input_form").reset();
    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
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
      <PageTitle title={"Notifications"} location={window.location.href} />
      <DashboardHeading text={"Send Notification"} />
      <form onSubmit={handleSubmit(submitForm)} className="input_form">
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_7}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Notifications Details"}
          />

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
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
              <Select2
                hasBackgroundImage={true}
                backgroundImage={InputImages.emailImage}
                margin={"0 0 0 0"}
                fontFamily={FontFamily.primary_font}
                fontSize={InputFontSizes.input_default_size}
                color={Colors.input_primary_color}
                fontWeight="500"
                registerName={"Type"}
                options={
                  <>
                    <option selected>Select</option>
                    <option value={"App"}>All</option>
                    <option value={"User"}>User</option>
                    <option value={"Vendor"}>Vendor</option>
                  </>
                }
                category={categoriesData}
                setCategory={setCategoriesData}
                padding="10px 30px 10px 45px"
              />
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
          <SingleButton
            firstButtonText={"Send"}
            loadingText="Sending"
            isLoading={btnLock}
          />
        </Box>
      </form>
    </div>
  );
}

export default SendNotification;
