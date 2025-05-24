import css from "./App.module.css";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import type Movie from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movieCards, setMovieCards] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isErrorMess, setIsErrorMess] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function showLoader() {
    setIsLoader(true);
  }
  function hideLoader() {
    setIsLoader(false);
  }

  function showErrorMess() {
    setIsErrorMess(true);
  }
  function hideErrorMess() {
    setIsErrorMess(false);
  }

  function modalClose() {
    setSelectedMovie(null);
  }

  function handleCard(id: number): void {
    const movie = movieCards.find((item) => id === item.id);
    setSelectedMovie(movie || null);
  }

  async function urlRequest(data: string): Promise<void> {
    try {
      hideErrorMess();
      showLoader();
      setMovieCards([]);

      const moviesArr = await fetchMovies(data);
      if (moviesArr.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovieCards(moviesArr);
    } catch {
      showErrorMess();
    } finally {
      hideLoader();
    }
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={urlRequest} />

      {movieCards.length > 0 && (
        <MovieGrid movies={movieCards} onSelect={handleCard} />
      )}
      {isLoader && <Loader />}
      {isErrorMess && <ErrorMessage />}
      {selectedMovie && (
        <MovieModal onClose={modalClose} movie={selectedMovie} />
      )}

      <Toaster />
    </div>
  );
}
