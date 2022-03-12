import React from "react";
import {moviesWithPoster} from './DummyMoviesData.js';
import { Grid, Stack, Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../styling/pages/WhatsOn.css";

function whatsOn() {
    return (
        <Grid>
            <Grid className="profile-table" style={{ borderSpacing: 0 }}>
                <tr>
                    <div className='edit-profile-info-text'>What's On</div>
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
                                subheader={`From: ${movie.club} | Due on: ${movie.deadline}`}
                            />
                            <Button sx={{ height: 38, width: 340 }} className="watched-button" variant="outlined">Watched</Button>
                        </Card>
                    </Grid>
                })}
            </Grid>
        </Grid>
    );
}

export default whatsOn;
