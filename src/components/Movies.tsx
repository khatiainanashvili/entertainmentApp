import Card from "./Card";
import { Props } from "./props";

export default function Movies({
  category,
  title,
  thumbnail,
  year,
  rating,
  search,
  isBookmarked,
  isTrending,
}: Props) {
  const searchTitle = title.toLowerCase();

  if (category == "Movie" && search.length == 0) {
    return (
      <div className="movies">
        <Card
          key={title}
          category={category}
          title={title}
          year={year}
          rating={rating}
          thumbnail={thumbnail}
          isBookmarked={isBookmarked}
          isTrending={isTrending}
          search={search}
        />
      </div>
    );
  }
  if (
    searchTitle.includes(search) &&
    search.length != 0 &&
    category == "Movie"
  ) {
    return (
      <div className="movies-container">
        <Card
          key={title}
          category={category}
          title={title}
          year={year}
          rating={rating}
          thumbnail={thumbnail}
          isBookmarked={isBookmarked}
          isTrending={isTrending}
          search={search}
        />
      </div>
    );
  }
}
