import { useContext, useEffect, useState } from "react";
import { MarkedContext} from "../App";
import Card from "./Card";
import { Props } from "./props";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function Bookmarked({
  category,
  title,
  thumbnail,
  year,
  rating,
  search,
  isBookmarked,
  isTrending,

}: Props) {
  const { isMarked }: any = useContext(MarkedContext);
  const searchTitle = title.toLowerCase();

  const [fetchedData, setFetchedData] = useState<{
    userId: string | undefined; title: string; id: string; ismarked: boolean 
}[]>();

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const newData: any = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        authID: doc.data().userId,
      }));
  
      // Filter data for the current user
      const currentUserData = newData.filter((item: { userId: string | undefined; }) => item.userId === auth.currentUser?.uid);
      setFetchedData([...currentUserData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getData(); 
    console.log(loading);
  }, []); 


  const matchingItems = fetchedData?.filter((item) => item.title === title );
  const uItems = fetchedData?.find((item) => item.userId ===  auth.currentUser?.uid);
  console.log(uItems?.userId);
  
  if (matchingItems && matchingItems.length  > 0 && uItems?.userId === auth.currentUser?.uid && search.length === 0) {
    return (
      <div className="bookmarked">
      {matchingItems?.map((item) => (
        <Card
          docID={item.id}
          category={category}
          title={title}
          year={year}
          rating={rating}
          thumbnail={thumbnail}
          isBookmarked={isBookmarked}
          isTrending={isTrending}
          search={search} 
          uID = {uItems?.userId}
        />
      ))}
      </div>
    );
  }
  
  if (isMarked[title] && search.length !== 0 && searchTitle.includes(search))
    return (
      <div className="bookmarked">
      {matchingItems?.map((item) => (
        <Card
          docID={item.id}
          category={category}
          title={title}
          year={year}
          rating={rating}
          thumbnail={thumbnail}
          isBookmarked={isBookmarked}
          isTrending={isTrending}
          search={search} 
          uID = {item.userId} 
        />
      ))}
      </div>
    );
}
