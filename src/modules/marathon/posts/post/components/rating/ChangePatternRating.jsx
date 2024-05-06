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

export default function ChangePatternRating({ pb, post, IdAdmin }) {
  const [transferOfEssenceRate, setTransferOfEssenceRate] = useState(
    post.rate.transferOfEssenceRate
  );
  const [creativeRate, setCreativeRate] = useState(post.rate.creativeRate);

  const [howMuchWasChangedRate, setHowMuchWasChangedRate] = useState(
    post.rate.howMuchWasChangedRate
  );

  const [accuracyRate, setAccuracyRate] = useState(post.rate.accuracyRate);

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
    const sum =
      creativeRate +
      howMuchWasChangedRate +
      transferOfEssenceRate +
      accuracyRate;
    setFinalRating(sum);
    pb.collection("posts")
      .update(post.id, {
        rate: {
          ...post.rate,
          creativeRate: creativeRate,
          howMuchWasChangedRate: howMuchWasChangedRate,
          transferOfEssenceRate: transferOfEssenceRate,
          accuracyRate: accuracyRate,
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
  }, [
    creativeRate,
    howMuchWasChangedRate,
    transferOfEssenceRate,
    accuracyRate,
  ]);

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
                  <Typography variant="subtitle2">Передача сути</Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={transferOfEssenceRate}
                    max={1}
                    onChange={(e, newTransferOfEssenceRate) => {
                      setTransferOfEssenceRate(newTransferOfEssenceRate);
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">Креативность</Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={creativeRate}
                    max={3}
                    onChange={(e, newCreativeRate) => {
                      setCreativeRate(newCreativeRate);
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">Сколько поменяли</Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={howMuchWasChangedRate}
                    max={3}
                    onChange={(e, neHowMuchWasChangedRate) => {
                      setHowMuchWasChangedRate(neHowMuchWasChangedRate);
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">
                    Правильность изложения
                  </Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={accuracyRate}
                    max={2}
                    onChange={(e, newAccuracyRate) => {
                      setAccuracyRate(newAccuracyRate);
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
        <Rating max={9} value={finalRating} readOnly={true} />
      )}
    </Box>
  );
}
