/** @jsx jsx */
import { jsx, Container, Box } from "theme-ui";
import TextFeature from "components/text-feature";
import Image from "components/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

import ProfitThumb from "assets/images/business-profit.png";
import DrawingArrow from "assets/drawing-arrow.svg";

const data = {
  title: "Why it Matters",
  description:
    "Data brokers create shadow profiles on you that can include your personal work email addresses. These insights can be sold to employee monitoring tools which can generate reports to detect people with multiple jobs and sell this data to your employer. GhostModeCyber proactively removes your data from databases that collect, trade, sell or publish it.",
};

export default function Banner2() {
  return (
    <section id="home" sx={{ variant: "section.profit" }}>
      <Container sx={styles.containerBox}>
        <Box sx={styles.thumbnail}>
          <Image src={ProfitThumb} alt="Thumbnail" width="700" height="565" />
        </Box>
        <Box sx={styles.contentBox}>
          <TextFeature
            title={data.title}
            description={data.description}
          />
        </Box>
      </Container>
      <Box sx={styles.bottomArrow}>
        <Image src={DrawingArrow} alt="Arrow" />
      </Box>
    </section>
  );
}

const styles = {
  containerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: ["flex-Start", null, null, "space-between"],
    flexWrap: ["wrap", null, null, "nowrap"],
    pb: [0, null, null, null, null, null, null, 8],
  },
  thumbnail: {
    pr: [2, null, 7, 4, 7, 8, null, 10],
    pl: [0, null, 7, 0],
    display: "flex",
    order: [2, null, null, 0],
    mx: ["auto", 0],
    img: {
      ml: [0, null, null, -3],
      height: [265, "auto"],
    },
  },
  contentBox: {
    flexShrink: 0,
    textAlign: ["center", null, null, "left"],
    width: ["100%", null, null, 350, 400, "470px"],
    pb: [7, null, null, 0],
    ".btn__link": {
      mt: [4, null, 5],
    },
  },
  bottomArrow: {
    position: "absolute",
    bottom: -185,
    left: "33%",
    display: ["none", null, null, null, null, null, null, "block"],
  },
};
