import Input from "../components/Input";
import { InputFontSizes } from "../constants/InputFontSizes";
import { Colors } from "../constants/Colors";
import { FontFamily } from "../constants/FontFamily";
function InputContainer({
  title,
  isPassword = false,
  register,
  registerName,
  backgroundImage,
  isRequired,
  disabled,
  type,
  inputId,
  value,
}) {
  return (
    <Input
      placeholder={title}
      hasBackgroundImage={true}
      backgroundImage={backgroundImage}
      margin={"0 0 0 0"}
      fontFamily={FontFamily.primary_font}
      fontSize={InputFontSizes.input_default_size}
      color={Colors.black_color}
      fontWeight="500"
      isPasswordInput={isPassword}
      register={register}
      registerName={registerName}
      isRequired={isRequired}
      disabled={disabled}
      type={type}
      id={inputId}
      value={value}
    />  
  );
}

export default InputContainer;
