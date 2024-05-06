import CardMedia from "@mui/material/CardMedia";

const createUrlImg = (a, b, c) => {
  const baseUrl = process.env.REACT_APP_IMAGE_URL;

  return baseUrl + a + "/" + b + "/" + c;
};

export default function Image({ post, img, i }) {
  return (
    <CardMedia
      sx={{
        mr: "4px",
        ml: "4px",
        mb: "4px",
        width: "calc(100% - 8px)",
        borderRadius: "6px",
      }}
      key={i}
      component="img"
      image={createUrlImg(post.collectionId, post.id, img)}
    />
  );
}
