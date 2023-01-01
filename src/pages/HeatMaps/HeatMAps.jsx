/*global google*/

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import { HeatmapLayer } from "@react-google-maps/api";
import { get } from "../../services/HeatMapsService";
import Swal from "sweetalert2";
import PageTitle from "../../components/PageTitle";
import DashboardHeading from "../../components/DashboardHeading";
function HeatMaps() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "heatmap-layer-example",
    googleMapsApiKey:
      "AIzaSyCEW7GfV0AkVDKl4OJWLVZQ5gdnEFI4iGQ&libraries=visualization",
  });

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await get();
    debugger;
    if (response.data.code === 1) {
      let data = response.data.data.users.map((item) => {
        return new google.maps.LatLng(item?.latitude, item?.longitude);
      });
      setData(data);
      console.log(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };

  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  const center = {
    lat: 31.5204,
    lng: 74.3587,
  };

  const onLoad = (heatmapLayer) => {
    console.log("HeatmapLayer onLoad heatmapLayer: ", heatmapLayer);
  };

  const onUnmount = (heatmapLayer) => {
    console.log("HeatmapLayer onUnmount heatmapLayer: ", heatmapLayer);
  };

  // const finalData = data?.map((item) => {
  //   let data1 = new google.maps.LatLng(item?.latitude, item?.longitude);
  //   setUserData(data1);
  // });

  return isLoaded ? (
    <div style={{ width: "100%" }}>
      <PageTitle title={"Maps"} location={window.location.href} />
      <DashboardHeading text={"Heat Maps"} />
      <GoogleMap
        // optional
        id="heatmap-layer-example"
        mapContainerStyle={mapContainerStyle}
        // required
        zoom={13}
        // required
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <HeatmapLayer data={data} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default HeatMaps;
