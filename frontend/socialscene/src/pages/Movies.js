import React from "react";
import { Grid, Stack, Button, touchRippleClasses, Typography, Rating } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import "../styling/pages/Movie.css";
import moviePoster from '../styling/empty_movie_poster.png'
import { red } from "@mui/material/colors";



class Movies extends React.Component {
    constructor(){
        super()
        this.state = {
            movieID:'',
            title:'',
            genres:'',
            recommendedMovies: [],
            user: JSON.parse(localStorage.getItem('user')),
            movie: this.movieID,
            score: 0.0,
        }
        this.changeHandler=this.changeHandler.bind(this)
    }

    componentDidMount() { 
        this.fetchRecommendedMovies()
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    fetchRecommendedMovies() {
        const token = JSON.parse(localStorage.getItem('token')) 
        fetch('http://127.0.0.1:8000/rec/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: token
            },
        })
        .then(data => data.json())
        .then((data) => this.setState({ recommendedMovies: data }))
        .catch(error => console.error(error))
    }

    fetchAddRating(movie) {
        const token = JSON.parse(localStorage.getItem('token'))
        fetch('http://127.0.0.1:8000/add_rating/' + movie + '/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: token
            },
        })
        .then(data => data.json())
        .then((data) => this.setState({score : data}))
        .then((score) => console.log(score))
        .then((data) => console.log(data))
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
                    {this.state.recommendedMovies.map((val) => {
                        return <Grid item>
                            <Card sx={{ maxWidth: 330 }}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={moviePoster}
                                    alt={val.title}
                                />
                                <CardHeader
                                    title={val.title}
                                />
                                <Typography component="legend">Rate {val.title}</Typography>
                                    <Rating
                                    name="simple-uncontrolled"
                                    value={this.state.score}
                                    precision={0.5}
                                    max={5}
                                    onChange={() => this.fetchAddRating(val.movieID)}
                                    />
                                <Button sx={{ height: 38, width: 330 }} className="watched-button" variant="outlined">Watched</Button>
                            </Card>
                        </Grid>
                    })}
                </Grid>
            </Grid>
        );
    }
}

export default Movies;
