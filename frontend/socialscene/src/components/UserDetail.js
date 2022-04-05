import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import "../styling/components/UserDetail.css";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { moviesWithPoster } from "../resources/data/DummyMoviesData";
import moviePoster from "../resources/images/empty_movie_poster.png";
import { DummyClubMemberData } from "../resources/data/DummyClubMemberData";
import HomepageCard from "./helper/HomepageCard";
import MovieCard from "./MovieCard";
import { DummyClubData } from "../resources/data/DummyClubsData";
import TextButton from "./core/TextButton";
import { DummyDashboardClubsData } from "../resources/data/DummyDashboardClubsData";
import ThemeButton from "./core/ThemeButton";
import AuthContext from "../components/helper/AuthContext";

function UserDetail() {
  let { authTokens } = useContext(AuthContext);
  let { userID } = useParams();
  const [otherUser, setOtherUser] = useState([]);
  let getOtherUser = async (e) => {
    let response = await fetch("http://127.0.0.1:8000/user/" + userID + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log(data);
    console.log(data.id);
    setOtherUser(data);
  };

  const navigate = useNavigate();

  const cardHeight = 325;

  const handleChipClick = (type, id) => {
    navigate(`/home/${type}/${id}`, { replace: false });
  };

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    getOtherUser();
  }, []);

  return (
    <Grid container spacing={2} padding={2} direction={"row"}>
      <Grid item xs={6}>
        <Stack spacing={2}>
          <HomepageCard
            title={`${otherUser.first_name} ${otherUser.last_name}`}
            titleItem={
              <TextButton
                text={following ? "following" : "follow"}
                onClick={() => setFollowing(!following)}
                style={{ textAlign: "right" }}
              />
            }
          >
            <Grid item xs={4}>
              <Avatar
                alt={otherUser.first_name + " " + otherUser.last_name}
                src={otherUser.iconImage}
                sx={{ width: 1, height: 1 }}
              />
            </Grid>

            <Grid item xs={8}>
              <Stack direction={"column"} justifyContent={"center"} height={1}>
                <h6 className={"user-detail-heading"}>username</h6>
                <h5 className={"user-detail"}>{otherUser.username}</h5>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <Stack>
                  <h6 className={"user-detail-heading"}>bio</h6>
                  <h5 className={"user-detail"}>{otherUser.bio}</h5>
                </Stack>

                <Stack>
                  <h6 className={"user-detail-heading"}>preferences</h6>
                  <Box maxHeight={cardHeight / 2} sx={{ overflowY: "scroll" }}>
                      
                    {/* <Chip label={"Horror"} sx={{ mr: 1, mt: 1 }} />
                    <Chip label={"Fantasy"} sx={{ mr: 1, mt: 1 }} />
                    <Chip label={"Porn"} sx={{ mr: 1, mt: 1 }} />
                    <Chip label={"Kids"} sx={{ mr: 1, mt: 1 }} />
                    <Chip label={"Action"} sx={{ mr: 1, mt: 1 }} />
                    <Chip label={"Classic"} sx={{ mr: 1, mt: 1 }} /> */}
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </HomepageCard>

          <HomepageCard title={"following"} titleItemText={cardHeight}>
            <Box maxHeight={cardHeight / 2} sx={{ overflowY: "scroll" }}>
              return (
              <Chip
                label={otherUser.first_name + " " + otherUser.last_name}
                avatar={
                  <Avatar
                    src={otherUser.iconImage}
                    alt={otherUser.first_name + " " + otherUser.last_name}
                  />
                }
                onClick={() => handleChipClick("profile", otherUser.id)}
                sx={{ mr: 1, mt: 1 }}
              />
              );
            </Box>
          </HomepageCard>

          <HomepageCard title={"followers"} titleItemText={cardHeight}>
            <Box maxHeight={cardHeight / 2} sx={{ overflowY: "scroll" }}>
              return (
              <Chip
                label={otherUser.first_name + " " + otherUser.last_name}
                avatar={
                  <Avatar
                    src={otherUser.iconImage}
                    alt={otherUser.first_name + " " + otherUser.last_name}
                  />
                }
                onClick={() => handleChipClick("profile", otherUser.id)}
                sx={{ mr: 1, mt: 1 }}
              />
              );
            </Box>
          </HomepageCard>
        </Stack>
      </Grid>

      <Grid item xs={6}>
        <Stack spacing={2}>
          <HomepageCard title={"recently watched"}>
            <Grid item xs={12}>
              <Stack
                direction={"row"}
                spacing={2}
                height={cardHeight}
                sx={{ overflowX: "scroll", overflowY: "hidden" }}
              >
                {moviesWithPoster.slice(0, 5).map((movie, index) => {
                  return (
                    <MovieCard
                      key={index}
                      poster={moviePoster}
                      rateMovie={false}
                      clubMovie={false}
                      movie={movie}
                    />
                  );
                })}
              </Stack>
            </Grid>
          </HomepageCard>

          <HomepageCard title={"favourites"}>
            <Grid item xs={12}>
              <Stack
                direction={"row"}
                spacing={2}
                height={cardHeight}
                sx={{ overflowX: "scroll", overflowY: "hidden" }}
              >
                {moviesWithPoster.slice(0, 5).map((movie, index) => {
                  return (
                    <MovieCard
                      key={index}
                      poster={moviePoster}
                      rateMovie={false}
                      clubMovie={false}
                      movie={movie}
                    />
                  );
                })}
              </Stack>
            </Grid>
          </HomepageCard>

          <HomepageCard title={"clubs"} titleItemText={cardHeight}>
            <Box maxHeight={cardHeight / 2} sx={{ overflowY: "scroll" }}>
              {DummyClubData.map((club, index) => {
                return (
                  <Chip
                    key={"index"}
                    label={club.clubName}
                    avatar={<Avatar src={club.iconImage} alt={club.clubName} />}
                    onClick={() => handleChipClick("clubs", club.id)}
                    sx={{ mr: 1, mt: 1 }}
                  />
                );
              })}
            </Box>
          </HomepageCard>
        </Stack>
      </Grid>
      {/*</Grid>*/}
    </Grid>
  );
}

export default UserDetail;
