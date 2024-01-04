import Card from "./Card";
import { Props } from "./props";
import "./trandsing.css";
export default function Tranding({
  category,
  title,
  thumbnail,
  year,
  rating,
  search,
  isBookmarked,
  isTrending,
  docID
 
}: Props) {
  if (isTrending)
    return (
      <Card
        docID={docID}
        key={title}
        category={category}
        title={title}
        year={year}
        rating={rating}
        thumbnail={thumbnail}
        isBookmarked={isBookmarked}
        isTrending={isTrending}
        search={search}       />
    );
}
