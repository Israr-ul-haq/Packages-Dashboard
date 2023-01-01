import Swal from "sweetalert2"
import crossImage from "../assets/images/cross-image.png";

const Block = async (id, service, title, setLoader, navigate) => {
  Swal.fire({
    title: "Are you sure, you want to block " + title + "?",
    showCancelButton: true,
    confirmButtonText: `Block`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true)
      try {
        const response = await service(id)
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            text: title + " blocked!",
          })
          setLoader(false)
          navigate("/users")
        }

        if (response.data.code === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          })
          setLoader(false)
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
        setLoader(false)
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info")
      setLoader(false)
    }
  })
}

export default Block
