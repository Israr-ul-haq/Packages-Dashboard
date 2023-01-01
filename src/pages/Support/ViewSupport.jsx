import { Box, Flex, Textarea } from "@chakra-ui/react";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import FooterButtons from "../../components/FooterButtons";
import { useForm } from "react-hook-form";

import { InputImages } from "../../constants/InputImages";

import { InputFontSizes } from "../../constants/InputFontSizes";
import { useNavigate, useParams } from "react-router";
import { update } from "../../services/SupportService";
import Swal from "sweetalert2";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";
import DashboardHeading from "../../components/DashboardHeading";

function ViewSupport() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    debugger;
    setBtnLock(true);
    const data = {
      supportId: parseInt(id),
      replyMessage: formData.replyMessage,
    };
    const response = await update(data);

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
        navigate("/support");
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
    <>
      <PageTitle title={"Query"} location={window.location.href} />
      <DashboardHeading text={"Reply Query"} isBack={true} link="/support" />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_7}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Reply Query"}
          />

          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
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
                {...register("replyMessage", { required: true })}
                isRequired={""}
                margin={"0 0 0 0"}
                fontWeight="500"
                height={"120px"}
                p={"10px 50px"}
                boxShadow={"0px 12px 32px #00000005"}
              />
              {errors.replyMessage?.type === "required" && (
                <p className="error_validation">Message is required</p>
              )}
            </Box>
          </Flex>
        </Box>

        <Box float={"right"} p={"35px 0"}>
          <FooterButtons
            firstButtonText={"Resolved"}
            secondButtonText={"Cancel"}
            link={"/support"}
            loadingText="Updating"
            isLoading={btnLock}
          />
        </Box>
      </form>
    </>
  );
}

export default ViewSupport;
