import React from "react";
import {Box, Grid, Stack, TextField, Button} from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import avengerImage from "../styling/avengers.jpg";
import djangoImage from "../styling/django.jpeg";
import jackImage from "../styling/jack-giant.jpg";


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
                        <Button variant="outlined">Watched</Button>
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
                        <Button variant="outlined">Watched</Button>
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
                        <Button variant="outlined">Watched</Button>
                    </Card>
                </Grid>
            </Grid>
        </Grid>        
    );
}

export default Movies;
