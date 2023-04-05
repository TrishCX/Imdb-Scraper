export interface IShow {
  title?: string;
  imageURL?: string;
  description?: string;
  seasons?: string | number;
  aired?: string;
  end?: string;
  duration?: string;
  episodes?: string | number;
  imdbRating: number;
  popularity?: string;
  genres?: string[];
  reviews?: string;
}
