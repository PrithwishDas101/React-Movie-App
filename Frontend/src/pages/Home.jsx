import MovieCard from "../components/MovieCard.jsx";
import React, { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!searchQuery.trim()) {
                const popular = await getPopularMovies();
                setMovies(popular);
                return;
            }

            try {
                setLoading(true);
                const results = await searchMovies(searchQuery);
                setMovies(results);
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to search movies...");
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    return (
        <div className="home">
            {/* SEARCH */}
            <form className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>

                <button
                    type="button"
                    className="search-button">
                    Search
                </button>
            </form>

            {/* ERROR */}
            {error && <div className="error-message">{error}</div>}

            {/* LOADING */}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;