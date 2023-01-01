import Swal from "sweetalert2";
import crossImage from "../assets/images/cross-image.png";
const DeleteItem = async (id, data, service, title, setLoader, removItem) => {
  Swal.fire({
    title: "Are you sure, you want to delete " + title + "?",
    showCancelButton: true,
    confirmButtonText: `Delete`,
    showCloseButton: true,
    closeButtonHtml: `<img src=${crossImage} alt="crossicon" className="popupcrossimage"/>`,
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true);
      let removeIndex = data
        .map((item) => {
          if (removItem === "Users") {
            return item.id;
          } else if (removItem === "Service") {
            return item.serviceId;
          } else if (removItem === "Event") {
            return item.eventId;
          } else if (removItem === "Coupon") {
            return item.couponId;
          } else if (removItem === "Feeds") {
            return item.newsFeedId;
          }
        })
        .indexOf(id);
      data.splice(removeIndex, 1);
      debugger;
      try {
        const response = await service(id);
        if (response.data.code === 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: title + " deleted!",
          });
          setLoader(false);
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

export default DeleteItem;
