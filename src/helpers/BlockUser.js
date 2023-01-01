import { Navigate } from "react-router";
import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";
const BlockUser = async (id, service, title, setLoader, onClose) => {
  onClose();
  Swal.fire({
    title: "Are you sure, you want to block " + title + "?",
    showCancelButton: true,
    confirmButtonText: `block`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true);
      debugger;
      try {
        const response = await service(id);
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: title + " has been blocked!",
          });
          setLoader(false);
          <Navigate to="/users" />;
        }

        if (response.data.code === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setLoader(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoader(false);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      setLoader(false);
    }
  });
};

export default BlockUser;
