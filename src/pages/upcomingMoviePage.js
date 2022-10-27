import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

    const favourites = movies.filter((m) => m.favourite);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    return(
        <PageTemplate 
        title="Upcoming Movies"
        movies={movies} 
        action={(movie) => {
          return <PlaylistAddIcon />
        }}
        />
    )
}

export default UpcomingMoviesPage;