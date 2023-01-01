import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import { uploadImage, getShopImages } from "../services/ShopService";

function EditMultipleImages() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);

  const [imageData, setImageData] = useState([]);
  const [multipleResult, setMultipleResult] = useState([]);
  useEffect(() => {}, [loader, multipleResult]); //eslint-disable-line

  const multipleImagesPreview = async (e) => {
    debugger;

    let files = e.target.files;

    if (e.target.files) {
      debugger;
      let finalImage = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        //Only pics
        if (!file.type.match("image")) continue;
        let picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          let picFile = event.target;
          setImageData((prevalue) => [
            ...prevalue,
            {
              picFile: picFile.result,
            },
          ]);
        });
        //Read the image
        picReader.readAsDataURL(file);
      }
      console.log(finalImage);
    }
    const formData1 = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData1.append("", files[i]);
    }
    const imageResponse1 = await uploadImage(formData1, id);
    const response = await getShopImages(id);
    setMultipleResult(response.data.data);
    setLoader(false);
  };

  return { multipleImagesPreview, multipleResult };
}

export default EditMultipleImages;
