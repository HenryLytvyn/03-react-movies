import css from "./App.module.css";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movieCards, setMovieCards] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function modalClose() {
    setSelectedMovie(null);
  }

  function handleCard(selectedMovie: Movie): void {
    setSelectedMovie(selectedMovie);
  }

  async function urlRequest(data: string): Promise<void> {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovieCards([]);

      const moviesArr = await fetchMovies(data);
      if (!moviesArr) {
        return;
      }
      if (moviesArr.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovieCards(moviesArr);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={urlRequest} />

      {movieCards.length > 0 && (
        <MovieGrid movies={movieCards} onSelect={handleCard} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && (
        <MovieModal onClose={modalClose} movie={selectedMovie} />
      )}

      <Toaster />
    </div>
  );
}
