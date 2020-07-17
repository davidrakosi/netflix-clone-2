import React, { useState, useEffect } from 'react'
import axios from '../axios'
import requests from '../requests'
import './Banner.css'

const posterBaseUrl = "http://image.tmdb.org/t/p/original"

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(requests.fetchNetflixOriginals)
            setMovie(req.data.results[
                Math.floor(Math.random() * req.data.results.length - 1)
            ])
            return req
        }
        fetchData()
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("${posterBaseUrl}${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
        >
            <div className='banner__contents'>
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button className="banner__btn">Play</button>
                    <button className="banner__btn">My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
