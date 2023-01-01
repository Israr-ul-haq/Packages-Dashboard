import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import Heading from "../../components/Heading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";

import FooterButtons from "../../components/FooterButtons";
import InputContainer from "../../components/InputContainer";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import "react-datepicker/dist/react-datepicker.css";
import { getShops, save } from "../../services/CouponsService";
import { InputImages } from "../../constants/InputImages";

import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";

import DatePicker from "react-datepicker";

import moment from "moment";
import Select from "../../components/Select";
import { InputFontSizes } from "../../constants/InputFontSizes";
import Select3 from "../../components/Select3";

function AddCoupon() {
  //State
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [startDate, setStartDate] = useState();
  const [shops, setShops] = useState([]);
  const [shopsData, setShopsData] = useState({});
  const [endDate, setEndDate] = useState();
  const [validationErrors, setValidationErrors] = useState({
    startDateEmpty: false,
  });

  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      debugger;
      const response = await getShops();

      if (response.data.code === 1) {
        setShops(response.data.data);
      } else {
      }
      debugger;
    })();
  }, []); //eslint-disable-line
  //Functions

  const submitForm = async (formData) => {
    debugger;
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;

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
      ShopId: shopsData.id,
      StartDate: startDate,
      EndDate: endDate,
      OfferPercentage: formData.OfferPercentage,
    };
    debugger;

    const response = await save(body);

    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Coupon has been saved",
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/coupons");
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
      <PageTitle title={"Coupons"} location={window.location.href} />
      <DashboardHeading text={"Add Coupon"} isBack={true} link="/coupons" />
      <form onSubmit={handleSubmit(submitForm)}>
        <Box padding={"30px 50px"} boxShadow={"0 0 18px #00000014"}>
          <Heading
            fontSize={HeadingFontSizes.heading_2}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="800"
            margin="0 0 35px 0"
            text={"Add Coupon"}
          />

          <Flex wrap={"wrap"} width={"calc(100%)"} margin={"0 -15px"}>
            <Box maxW={"33.33%"} flex={"33.33%"} padding={"0 15px"}>
              <Select
                hasBackgroundImage={true}
                backgroundImage={InputImages.titleImage}
                margin={"0 0 0 0"}
                fontFamily={FontFamily.primary_font}
                fontSize={InputFontSizes.input_default_size}
                color={Colors.input_primary_color}
                fontWeight="500"
                options={
                  <>
                    <option selected value={""}>
                      Shop Name
                    </option>
                    {shops?.map((item) => {
                      return (
                        <>
                          <option value={item.shopId}>{item.name}</option>
                        </>
                      );
                    })}
                  </>
                }
                padding="10px 30px 10px 45px"
                category={shopsData}
                setCategory={setShopsData}
              />
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
            <Box maxW={"33.33%"} mb={"35px"} flex={"33.33%"} padding={"0 15px"}>
              <InputContainer
                title={"Discount Percentage"}
                register={register}
                registerName={"OfferPercentage"}
                backgroundImage={InputImages.discount}
              />
              {errors.OfferPercentage?.type === "required" && (
                <p className="error_validation">Offer percentage is required</p>
              )}
            </Box>
          </Flex>
        </Box>

        <Box float={"right"} p={"35px 0"}>
          <FooterButtons
            firstButtonText={"Save"}
            secondButtonText={"Cancel"}
            link={"/coupons"}
            loadingText="Updating"
            isLoading={btnLock}
          />
        </Box>
      </form>
    </div>
  );
}

export default AddCoupon;
