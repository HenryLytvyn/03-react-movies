import css from "./MovieGrid.module.css";
import type Movie from "../../types/movie";

interface MovieGridProp {
  onSelect: (id: number) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProp) {
  return (
    <ul className={css.grid}>
      {movies.map(({ id, poster_path, title }) => (
        <li key={id} onClick={() => onSelect(id)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={`movie ${title}`}
              loading="lazy"
            />
            <h2 className={css.title}>{title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
