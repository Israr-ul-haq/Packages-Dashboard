import { Flex, Skeleton } from "@chakra-ui/react";
import downArrowImage from "../../assets/images/DownArrow.svg";
import downArrowRed from "../../assets/images/DownArrowRed.svg";
import { useState, useEffect } from "react";
import { get } from "../../services/DashboardService";
import Stat from "./Stat";
import { Colors } from "../../constants/Colors";
function Stats() {
  //State
  const [data, setData] = useState({
    totalUsers: 0,
    totalRiders: 0,
    totalRestaurants: 0,
    totalOrders: 0,
  });
  const [loader, setLoader] = useState(false);
  // UseEffect
  useEffect(() => {
    (async () => {
      const response = await get();
      setData(response.data.data);
      setLoader(true);
    })();
  }, []); //eslint-disable-line
  return (
    // <Skeleton isLoaded={loader}>
    <Flex justifyContent={"space-between"}>
      <Stat
        title1={"Total Users"}
        data={data.totalUsers}
        image={downArrowImage}
        // title={"Potential growth"}
      />
      <Stat
        title1={"Total Shops"}
        data={data.totalShops}
        image={downArrowRed}
        color={Colors.header_danger_color}
        // titleRed={"Daily Income"}
      />
      <Stat
        title1={"Total Events"}
        data={data.totalEvents}
        image={downArrowImage}
        // title={"Potential growth"}
      />
      <Stat
        title1={"Total Offers"}
        data={data.totalOffers}
        image={downArrowImage}
        // title={"Potential growth"}
      />
    </Flex>
    // </Skeleton>
  );
}

export default Stats;
