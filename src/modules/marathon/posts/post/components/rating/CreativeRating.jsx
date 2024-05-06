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

export default function CreativeRating({ pb, post, IdAdmin }) {
  const [LackOfTemplatesRate, setLackOfTemplatesRate] = useState(
    post.rate.LackOfTemplatesRate
  );
  const [complianceWithTonalityRate, setComplianceWithTonalityRate] = useState(
    post.rate.complianceWithTonalityRate
  );

  const [originality, setOriginality] = useState(post.rate.originality);

  const [correctnessOfPresentation, setСorrectnessOfPresentation] = useState(
    post.rate.correctnessOfPresentation
  );
  const [satisfiedСustomer, setSatisfiedСustomer] = useState(
    post.rate.satisfiedСustomer
  );

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
      complianceWithTonalityRate +
      originality +
      LackOfTemplatesRate +
      correctnessOfPresentation +
      satisfiedСustomer;
    setFinalRating(sum);
    pb.collection("posts")
      .update(post.id, {
        rate: {
          ...post.rate,
          complianceWithTonalityRate: complianceWithTonalityRate,
          originality: originality,
          LackOfTemplatesRate: LackOfTemplatesRate,
          correctnessOfPresentation: correctnessOfPresentation,
          satisfiedСustomer: satisfiedСustomer,
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
    complianceWithTonalityRate,
    originality,
    LackOfTemplatesRate,
    correctnessOfPresentation,
    satisfiedСustomer,
  ]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {localStorage.getItem("role") === IdAdmin ? (
        <Box>
          <Grid sx={{ width: "550px", p: 1 }} container>
            <Grid item xs>
              <List>
                <ListItem>
                  <Typography variant="subtitle2">
                    Отсутствие шаблонов
                  </Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={LackOfTemplatesRate}
                    max={3}
                    onChange={(e, newRealRate) => {
                      setLackOfTemplatesRate(newRealRate);
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">
                    Соблюдение тоналности
                  </Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={complianceWithTonalityRate}
                    max={2}
                    onChange={(e, newcomplianceWithTonalityRate) => {
                      setComplianceWithTonalityRate(
                        newcomplianceWithTonalityRate
                      );
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">
                    Оригинальность ответа
                  </Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={originality}
                    max={3}
                    onChange={(e, newunderstableRate) => {
                      setOriginality(newunderstableRate);
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
                    value={correctnessOfPresentation}
                    max={2}
                    onChange={(e, newcorrectnessOfPresentation) => {
                      setСorrectnessOfPresentation(
                        newcorrectnessOfPresentation
                      );
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography variant="subtitle2">Довольный клиент</Typography>
                  <Rating
                    sx={{ pl: 1 }}
                    value={satisfiedСustomer}
                    max={8}
                    onChange={(e, newsatisfiedСustomer) => {
                      setSatisfiedСustomer(newsatisfiedСustomer);
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
        <Rating max={18} value={finalRating} readOnly={true} />
      )}
    </Box>
  );
}
