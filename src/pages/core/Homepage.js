import React,{ useEffect,useState} from "react";
import "../../styling/pages/Homepage.css";
import useFetch from "../../components/helper/useFetch";


window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight');
    let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.60) 200px)';

    window.addEventListener('mousemove', e => updateSpotlight(e));

    function updateSpotlight(e) {
        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${(e.pageY - 90) / (window.innerHeight - 90) * 100}%, ${spotlightSize}`;

    }
});

const Homepage = () => {
    let api = useFetch()

    const [randomMovie, setRandomMovie] = useState()
    
    useEffect(() => {
        getRandomMovie()

    }, [randomMovie]);

    const getRandomMovie = async () => {

        let { response, data } = await api(`/random_movie/`, "GET");
        if (response.status === 200) {
        console.log(`random id: ${data.imdb_id}`)
        setRandomMovie(data.imdb_id)
        }
      
        // return (data.imdb_id)

        // console.log(randomMovie)
    };


    // console.log(`test ${randomMovie}`)


    // const movieIMDB = "0972785";
    // const movieIMDB = getRandomMovie();
    // console.log(movieIMDB);

    // console.log(`movie: ${movieAPIData}`)

    return (
        <>
            <div className={"spotlight"}/>
            <div className={"welcome-text"}>
                <h2>welcome
                    <h2--emphasise>.</h2--emphasise>
                </h2>
            </div>
            <img className={'cover-image'}
                 src={"https://img.omdbapi.com/?i=tt" + randomMovie + "&h=600&apikey=199b93be"}
                 alt="blurred movie poster"
            />
            <div className={"welcome-poster"}/>

        </>
    );
}
export default Homepage;