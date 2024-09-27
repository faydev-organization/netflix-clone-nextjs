import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  genre: string;
}

interface MovieListProps {
  data: Movie[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
        {title}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {data.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
