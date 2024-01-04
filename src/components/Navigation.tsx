import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "firebase/storage";
import Login from "./Login";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import avatar from "../assets/avatar.jpg";
import logo from "../assets/logo.svg";

export default function Navigation() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [authenticated, setauthenticated] = useState<boolean | string | null>(
    localStorage.getItem("authenticated") !== null
      ? localStorage.getItem("authenticated")
      : "false"
  );
  const [showProperties, setShowProperties] = useState(false);
  const [user] = useAuthState(auth);
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState("");
  const logOut = async () => {
    await signOut(auth);
    localStorage.setItem("authenticated", "false");
    setauthenticated(localStorage.getItem("authenticated"));
    location.reload();
    navigate("/");
  };

  const firestore = getFirestore();

  const submitSelectedImage = () => {
    if (user) {
      const userImagesRef = doc(firestore, "user_images", user.uid);
      const imageRef = ref(storage, `images/${user?.uid}/${image.name}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            setDoc(userImagesRef, { imageURL: url }) // Save image URL to Firestore
              .catch((error) => {
                console.log(
                  error.message,
                  "error saving the image URL to Firestore"
                );
              });
            setShowUploadFile(false);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image URL");
          });
      });
      setShowProperties(false);
    }
    setShowUploadFile(false);
  };
  const handlechange = (e: any) => {
    if (e.target.files[0] && user) {
      setImage(e.target.files[0]);
      setShowUploadFile(true);
    }
  };
  useEffect(() => {
    if (user) {
      const userImagesRef = doc(firestore, "user_images", user.uid);
      getDoc(userImagesRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUrl(data.imageURL || "");
          }
        })
        .catch((error) => {
          console.log(
            error.message,
            "error retrieving the image URL from Firestore"
          );
        });
    }
  }, [user]);
  const handleClick = (activeItem: any) => {
    if (active === activeItem) {
      setActive(null);
    } else {
      setActive(activeItem);
    }
  };

  if (authenticated == "false") return <Login />;
  else {
    return (
      <div className="navBar">
        <div className="navigation">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" className="nav-logo" />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleClick("/")}
                  className={`${active === "/" ? "active" : ""}`}
                >
                  <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/movies">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleClick("/movies")}
                  className={`${active === "/movies" ? "active" : ""}`}
                >
                  <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/series">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleClick("/series")}
                  className={`${active === "/series" ? "active" : ""}`}
                >
                  <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/bookmarked">
                <svg
                  width="17"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleClick("/bookmarked")}
                  className={`${active === "/bookmarked" ? "active" : ""}`}
                >
                  <path d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z" />
                </svg>
              </Link>
            </li>
          </ul>

          <div className="user">
            <img
              src={user?.photoURL != null ? user?.photoURL : url || avatar}
              className="avatar"
              onClick={() => setShowProperties(!showProperties)}
            />
            {showProperties ? (
              <div className="profile-settings-container">
                <div className="avatar-container">
                  {showUploadFile ? (
                    <button onClick={submitSelectedImage} className="sbmt-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M382-320 155-547l57-57 170 170 366-366 57 57-423 423ZM200-160v-80h560v80H200Z" />
                      </svg>
                      <span>SUBMIT</span>
                    </button>
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={handlechange}
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="custom-file-upload"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 -960 960 960"
                          width="24"
                        >
                          <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
                        </svg>
                      </label>
                    </>
                  )}
                </div>
                <Link to="/">
                  <button onClick={logOut}>SIGN OUT</button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
