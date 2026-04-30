import MovieCard from "../components/MovieCard.jsx"
import React, { useState } from "react"

function Home() {

    const [searchQuery, setSearchQuery] = useState("")

    const movies = [
        { id: 1, title: "HP & Sorcerer's Stone", release_date: "2001" },
        { id: 2, title: "HP & Chamber of Secrets", release_date: "2002" },
        { id: 3, title: "HP & Prisoner of Azkaban", release_date: "2004" },
        { id: 4, title: "HP & Goblet of Fire", release_date: "2005" },
    ]

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    }

    return (
        <>
            <div className="home">

                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        className="search-input" 
                        value={searchQuery}   
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />

                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>

                <div className="movies-grid">
                    {movies.map(movie =>
                        <MovieCard movie={movie} key={movie.id} />)}
                </div>
            </div>
        </>
    )
}

export default Home;