import { useContext, useEffect, useState } from "react";
import iconempty from "../assets/icon-bookmark-empty.svg";
import iconfull from "../assets/icon-bookmark-full.svg";
import movieicon from "../assets/icon-category-movie.svg";
import tvicon from "../assets/icon-category-tv.svg";
import { MarkedContext } from "../App";
import { Props } from "./props";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function Card({
  thumbnail,
  title,
  year,
  category,
  rating,
  docID,

}: Props) {
  
  const { isMarked, setIsMarked }: any = useContext(MarkedContext);
  const [bookmarkedMovies, setBookmarkedMovies]: any = useState([]);
  const bookmarksCollectionRef = collection(db, "users");
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState<{ title: string; id: string; ismarked: boolean }[]>();
  const getBookmarked = async () => {
    try {
      const data = await getDocs(bookmarksCollectionRef);
      setBookmarkedMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };
   const deleteMarkedMovies = async(id :any) => {
       const userDoc = doc(db, "users", id);
       await deleteDoc(userDoc)
   }
  const handleMark = async (id: string, marked: boolean, docId : string | undefined, userId : string | undefined) => {
    setIsMarked((prevMarkedCards: any) => ({
      ...prevMarkedCards,
      [id]: marked
    }));
    if (marked) {
      await addDoc(bookmarksCollectionRef, { 
        title: id, 
        ismarked: marked, 
        userId: auth.currentUser?.uid });
        userId = auth.currentUser?.uid
    } else {
      try {
        await new Promise((resolve) => setTimeout(resolve, 0));
        deleteMarkedMovies(docId)
        
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
    console.log(userId);
    
  };
  
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const newData : any = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, authID: doc.data().author }));
      setFetchedData([...newData]);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookmarked();
    getData()
    
  }, []);

  const updateIsMarkedState = () => {
    const initialIsMarkedState: any = {};
    if (bookmarkedMovies && bookmarkedMovies.length > 0) {
      bookmarkedMovies.forEach((item: any) => {
        initialIsMarkedState[item.title] = item.ismarked;
      });
    }
    setIsMarked(initialIsMarkedState);
  };

  useEffect(() => {
    updateIsMarkedState();
    console.log(loading, fetchedData);
    
  }, [bookmarkedMovies]);
  
  const image = thumbnail.regular.large;


  return (
    <div className="card">
      <div className="card-image">
        <div className="bookmark-btn-container">
          <input
            type="checkbox"
            onChange={(e) => handleMark(title,  e.target.checked, docID, auth.currentUser?.uid )}
            id={title}
            className="bookmark-button"
            checked={isMarked[title] || false}
          />
          <label htmlFor={title} className="bookmark-icon">
            <img src={isMarked[title] ? iconfull : iconempty} alt="marked" />
          </label>
        </div>
        <img
          src={image}
          alt="zmuki"
          width="40"
          height="40"
          className="poster-image"
        />

        <div className="film-info">
          <span>{year}</span>
          <span className="category-icon">
            <img src={category === "Movie" ? movieicon : tvicon} alt="" />{" "}
            {category}
          </span>
          <span>{rating}</span>
          <h3 className="movie-title">{title}</h3>
        </div>
      </div>
    </div>
  );
}
