import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";

export default function BasicRating({ pb, post, IdAdmin }) {
  const [utilityRate, setUtilityRate] = useState(post.rate.utilityRate);

  const [understandableRate, setUnderstandableRate] = useState(
    post.rate.understandableRate
  );
  const [realUseRate, setRealUseRate] = useState(post.rate.realUseRate);

  const [finalRating, setFinalRating] = useState(post.rate.finalRate);

  const chiprate = (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <Typography sx={{ fontSize: 13, p: 0.5 }}>Общий рейтинг:</Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: 15, p: 0.5 }}>
        {finalRating}
      </Typography>
      <StarIcon sx={{ height: "15px", width: "15px" }}></StarIcon>
    </Stack>
  );

  useEffect(() => {
    const sum = utilityRate + understandableRate + realUseRate;
    setFinalRating(sum);
    pb.collection("posts")
      .update(post.id, {
        rate: {
          ...post.rate,
          utilityRate: utilityRate,
          understandableRate: understandableRate,
          realUseRate: realUseRate,
          finalRate: sum,
        },
      })
      .then((data) => {
        post.rate = data.rate;
      })
      .catch((error) => {
        console.error("Ошибка при обновлении:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utilityRate, understandableRate, realUseRate]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {localStorage.getItem("role") === IdAdmin ? (
        <Box>
          <Grid sx={{ width: "500px", p: 1 }} container>
            <Grid item xs>
              <List>
                <ListItem>
                  <Typography variant="subtitle2">Полезность</Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={utilityRate}
                    max={4}
                    onChange={(e, newUtilityRate) => {
                      setUtilityRate(newUtilityRate);
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">Развёрнутость</Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={understandableRate}
                    max={3}
                    onChange={(e, newunderstableRate) => {
                      setUnderstandableRate(newunderstableRate);
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">
                    Реальность использования
                  </Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={realUseRate}
                    max={1}
                    onChange={(e, newRealRate) => {
                      setRealUseRate(newRealRate);
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem>
              <Chip
                sx={{ width: "150px" }}
                label={<Typography>{chiprate}</Typography>}
              />
            </Divider>
          </Grid>
        </Box>
      ) : (
        <Rating max={8} value={finalRating} readOnly={true} />
      )}
    </Box>
  );
}
