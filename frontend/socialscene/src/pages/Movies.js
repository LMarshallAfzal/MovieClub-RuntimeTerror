import React from "react";
import {Grid, Stack, Button} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import avengerImage from "../styling/avengers.jpg";
import djangoImage from "../styling/django.jpeg";
import jackImage from "../styling/jack-giant.jpg";
import "../styling/pages/Movie.css";


function Movies() {
    return (
        <Grid>
            <Grid className="profile-table" style= {{borderSpacing: 0}}>
                <tr>
                    <div className='edit-profile-info-text'>Movies:</div>
                </tr> 
            </Grid>
            <Grid container direction={"row"} spacing={2}>
                <Grid item>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="500"
                            image={avengerImage}
                            alt="avengers"
                        />
                        <CardHeader                    
                            title="Avengers"
                            subheader="2022"
                        />
                        <Button sx={{ height: 38, width: 340 }} className="watched-button" variant="outlined">Watched</Button>
                    </Card>
                </Grid>
                <Grid item>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="500"
                            image={djangoImage}
                            alt="django"
                        />
                        <CardHeader                    
                            title="Django Unchained"
                            subheader="2012"
                        />
                        <Button sx={{ height: 38, width: 340 }} className="watched-button" variant="outlined">Watched</Button>
                    </Card>
                </Grid>
                <Grid item>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="500"
                            image={jackImage}
                            alt="jack"
                        />
                        <CardHeader                    
                            title="Jack the Giant Slayer"
                            subheader="2013"
                        />
                        <Button sx={{ height: 38, width: 340 }} className="watched-button" variant="outlined">Watched</Button>
                    </Card>
                </Grid>
            </Grid>
        </Grid>       
    );
}

export default Movies;
