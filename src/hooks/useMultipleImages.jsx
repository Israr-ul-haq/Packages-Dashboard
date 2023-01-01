import { useState } from "react";
import React from "react";

function UseMultipleImages() {
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

          setResult((prevalue) => [
            ...prevalue,
            {
              picFile: picFile.result,
              id: i + 1,
            },
          ]);
        });

        //Read the image
        picReader.readAsDataURL(file);
      }
      console.log(finalImage);
    }
  };
  return { result, multipleResult, multipleImagesPreview, setResult };
}

export default UseMultipleImages;
