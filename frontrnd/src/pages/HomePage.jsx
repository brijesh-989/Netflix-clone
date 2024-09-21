import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import "./HomePage.css";
import NetflixLogo from "../assets/netflix-logo.png";
import { useStore } from "../store/MovieStore";
function HomePage() {
  const movieStore = useStore();
  const [trendingCard, setTreadingCard] = useState(null);
  const [currValue, setCurrValue] = useState(0);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [isPlaying,setIsPlaying]=useState(false);
  useEffect(() => {
    if (trendingCard === null) {
      movieStore.trendingMovie().then(() => {
        setTreadingCard(
          movieStore.movies.trendingMovies.slice(currValue, currValue + 4)
        );
        setCurrValue(currValue + 4);
      });
    }
  }, [trendingCard, movieStore,currValue]);
  const handleNext = () => {
    const newSet = movieStore.movies.trendingMovies.slice(
      currValue,
      Math.min(currValue + 4, movieStore.movies.trendingMovies.length)
    );
    console.log(newSet);
    setTreadingCard(newSet);
    setCurrValue(
      Math.min(currValue + 4, movieStore.movies.trendingMovies.length)
    );
  };
  const handlePrev = () => {
    const newSet = movieStore.movies.trendingMovies.slice(
      Math.max(currValue - 4, 0),
      currValue
    );
    setTreadingCard(newSet);
    setCurrValue(Math.max(currValue - 4, 0));
  };
  const handlePreview = (id) => {
    
    movieStore.MovieTrailer(id).then(() => {
      setMovieTrailer(
        `https://www.youtube.com/embed/${movieStore.movies.movieTrailerById?.[0].key}`
      );
    }).then(()=>{
      setIsPlaying(true);
    })
  };

  return (
    <>
      <header className="hero-bg">
        <div className="section-logo">
          <img className="netflix-logo" src={NetflixLogo} alt="netflix-logo" />
          <Link to={"/login"}>
            <button className="nav-button">Sign in</button>
          </Link>
        </div>
        <div className="banner-section">
          <div>
            <h1>Unlimited movies, TV shows, and more</h1>
          </div>
          <div>
            <h2>Starts at ₹149. Cancel anytime.</h2>
          </div>
          <div className="start-email">
            <input type="email" id="startEmail" required></input>
            <label htmlFor="startEmail">Email address</label>
            <button>Get Started</button>
          </div>
        </div>
        <div className="header-bottom-design"></div>
      </header>
      <section className="netflix-body">
        <div className="next-card">
          <div>
            <button className="nextBT" onClick={handlePrev}>
              <FontAwesomeIcon icon={faChevronLeft} color="#fff" size="xl" />
            </button>
          </div>
          <div className="movie-wall">
            {trendingCard &&
              trendingCard?.map((movie, index) => (
                <div className="movie-card" key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    onClick={() => {
                      handlePreview(movie?.id);
                    }}
                  ></img>
                </div>
              ))}
          </div>
          <div>
            <button className="nextBT" onClick={handleNext}>
              <FontAwesomeIcon icon={faChevronRight} color="#fff" size="xl" />
            </button>
          </div>
        </div>
        {isPlaying && <div className="black-overlay">
        <div className="movie-container">
            {movieTrailer && (
              <iframe
                width="800"
                height="500"
                src={movieTrailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          </div>}
      </section>
      <div>
      </div>
    </>
  );
}
export default HomePage;
