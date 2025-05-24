// import { useState } from 'react'

// import styles from "./App.module.css";
// import axios from "axios";

import type Movie from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

// export default function App() {
//   let moviesArr: Movie[] = [];
//   async function urlRequest(data: string): Promise<void> {
//     moviesArr = await fetchMovies(data);
//     console.log(moviesArr);
//   }

//   return (
//     <>
//       <SearchBar onSubmit={urlRequest} />
//       {moviesArr.length > 0 && <MovieGrid movies={moviesArr} />}
//       <Toaster />
//     </>
//   );
// }

export default function App() {
  const [movieCards, setMovieCards] = useState<Movie[]>([]);

  async function urlRequest(data: string): Promise<void> {
    const moviesArr = await fetchMovies(data);
    if (moviesArr.length === 0) {
      toast.error("No movies found for your request.");
      return;
    }
    setMovieCards(moviesArr);
    console.log(moviesArr);
  }

  return (
    <>
      <SearchBar onSubmit={urlRequest} />
      {movieCards.length > 0 && <MovieGrid movies={movieCards} />}
      <Toaster />
    </>
  );
}
