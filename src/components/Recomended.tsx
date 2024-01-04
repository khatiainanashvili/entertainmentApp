import Card from "./Card";
import { Props } from "./props";
export default function Recomended({
  category,
  title,
  thumbnail,
  year,
  rating,
  search,
  isBookmarked,
  isTrending,
}: Props) {
  const searchTitle = title?.toLowerCase();

  if (!search) {
    return (
      <div>
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
  if (searchTitle.includes(search) && search.length != 0) {
    return (
      <div>
        <Card
          key={title}
          category={category}
          title={title}
          year={year}
          rating={rating}
          thumbnail={thumbnail}
          isBookmarked={false}
          isTrending={false}
          search={search}
        />
      </div>
    );
  }
}
