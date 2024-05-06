import Carousel from "react-material-ui-carousel";
import Image from "./Image";

export default function ImgCarousel({ post }) {
  const indicatorsOff = post.img.length === 1 ? "none" : "block";
  const buttonHeight = post.img.length === 1 ? "100%" : "calc(100% - 40px)";

  if (post.img.length > 1) {
    return (
      <Carousel
        autoPlay={false}
        swipe={false}
        animation="slide"
        indicatorIconButtonProps={{
          sx: { color: "white" },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: " grey",
          },
        }}
        navButtonsProps={{
          sx: {
            height: buttonHeight,
            width: "80px",
            borderRadius: "0",
            position: "relative",
            top: "0 !important",
            margin: "0",
            cursor: "default",

            "&:hover": {
              opacity: "0.1 !important",
            },
          },
        }}
        indicatorContainerProps={{
          sx: { display: indicatorsOff, pb: "12px" },
        }}
      >
        {post.img.map((img, i) => (
          <Image post={post} img={img} i={i} key={img} />
        ))}
      </Carousel>
    );
  } else {
    return post.img.map((img, i) => (
      <Image post={post} img={img} i={i} key={img} />
    ));
  }
}
