import React from "react";
import { Grid, Stack, Button, touchRippleClasses } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../styling/pages/Movie.css";
import { moviesWithPoster } from './DummyMoviesData';
import moviePoster from '../styling/empty_movie_poster.png'
import { red } from "@mui/material/colors";



class Movies extends React.Component {

    constructor(){
        super()
        this.state={
            MovieID:'',
            title:'',
            genres:'',
            recommendedMovies: [],
        }
        
    }

    componentDidMount() { 
        this.fetchRecommendedMovies()
    }

    fetchRecommendedMovies() { 
        fetch('http://127.0.0.1:8000/rec/', {})
        .then(data => data.json())
        .then(data => console.log(data))
        .then((data) => this.setState({ recommendedMovies: data }))
        .catch(error => console.error(error))
    }

    render() {
        return (
            <Grid>
                <Grid className="profile-table" style={{ borderSpacing: 0 }}>
                    <tr>
                        <div className='edit-profile-info-text'>Movies</div>
                    </tr>
                </Grid>
                <Grid container direction={"row"} spacing={2}>
                    {this.state.recommendedMovies.map((movie) => {
                        return <Grid item>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={moviePoster}
                                    alt={movie.title}
                                />
                                <CardHeader
                                    title={movie.title}
                                    // subheader={`Rating: ${movie.rating} `}
                                />
                                <Button sx={{ height: 38, width: 340 }} className="watched-button" variant="outlined">Watched</Button>
                            </Card>
                        </Grid>
                    })}
                </Grid>
            </Grid>
        );
    }
}

export default Movies;
