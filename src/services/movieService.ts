import axios from "axios";
import toast from "react-hot-toast";
import type { Movie } from "../types/movie";

interface ResponseData {
  results: Movie[];
}

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbToken}`,
  },
};

const url = `https://api.themoviedb.org/3/search/movie`;

export default async function fetchMovies(
  userRequest: string
): Promise<Movie[] | void> {
  try {
    const response = await axios.get<ResponseData>(
      `${url}?query=${userRequest}`,
      options
    );
    return response.data.results;
  } catch {
    toast.error("Ooops... Something went wrong!");
  }
}
