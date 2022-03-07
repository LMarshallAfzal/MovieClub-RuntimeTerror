import React from "react";
import { Grid, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../styling/pages/Movie.css";
import { moviesWithPoster } from './DummyMoviesData';
import { red } from "@mui/material/colors";



function Movies() {
    return (
        <Grid>
            <Grid className="profile-table" style={{ borderSpacing: 0 }}>
                <tr>
                    <div className='edit-profile-info-text'>Movies</div>
                </tr>
            </Grid>
            <Grid container direction={"row"} spacing={2}>
                {moviesWithPoster.map((movie) => {
                    return <Grid item>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={movie.poster}
                                alt={movie.title}
                            />
                            <CardHeader
                                title={movie.title}
                                subheader={`Rating: ${movie.rating} `}
                            />
                            <Button sx={{ height: 38, width: 340 }} className="watched-button" variant="outlined">Watched</Button>
                        </Card>
                    </Grid>
                })}
            </Grid>
        </Grid>
    );
}

export default Movies;
