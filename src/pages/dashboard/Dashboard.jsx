import { Box, Flex } from "@chakra-ui/react";
import DashboardHeading from "../../components/DashboardHeading";
import { HeadingFontSizes } from "../../constants/HeadingFontSizes";
import { Colors } from "../../constants/Colors";
import { FontFamily } from "../../constants/FontFamily";
import Heading from "../../components/Heading";
import ManageEvents from "../../components/ManageEvents";
import Stats from "./Stats";
import { Chart as ChartJS, CategoryScale, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import faker from "faker";
import PageTitle from "../../components/PageTitle";
ChartJS.register(
  CategoryScale,

  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      position: "top left",
      text: "",
    },
    layout: {
      borderWidth: "10px",
    },
  },
};

export const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#55D8FE", "#55D8FE", "#55D8FE"],
      hoverOffset: 4,
    },
  ],
};

function Dashboard() {
  return (
    <div>
      <PageTitle title={"Dashboard"} location={window.location.href} />
      <DashboardHeading text={"Dashboard"} />
      <Stats />
      <Flex width={"100%"} gridGap={"20px"}>
        <Box
          marginTop={"30px"}
          boxShadow={"0 0 18px #00000014"}
          borderRadius={"6px"}
          width={"60%"}
        >
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="600"
            padding={"20px 18px"}
            margin="0 0 25px 0"
            text="Total Events"
          />
          <ManageEvents />
        </Box>

        <Box
          marginTop={"30px"}
          boxShadow={"0 0 18px #00000014"}
          borderRadius={"6px"}
          padding={"20px 18px"}
          width={"40%"}
          heigth={"50%"}
        >
          <Heading
            fontSize={HeadingFontSizes.heading_3}
            color={Colors.black_color}
            fontFamily={FontFamily.secondary_font}
            fontWeight="600"
            margin="0 0 60px 0"
            text="Total Downloads"
          />
          <Box width={"60%"} marginLeft={"auto"} marginRight={"auto"}>
            <Doughnut data={data} options={options} />
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Dashboard;
