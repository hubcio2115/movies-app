import { FC } from "react";

interface Props {
  movies?: [
    {
      id?: number;
      title?: string;
      director?: string;
      genre?: string;
      year?: number;
      description?: string;
      image_url?: string;
      rating_count?: number;
      rating?: number;
    }
  ];
}

const MoviesList: FC<Props> = ({ movies }) => {
  return <div></div>;
};

export default MoviesList;
