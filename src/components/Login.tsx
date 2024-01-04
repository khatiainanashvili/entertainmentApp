import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import image from "../assets/Movie.svg";
import Recomended from "./Recomended";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>("");
  const [passwErrors, setPasswErrors] = useState<string | null>("");
  const [authenticated, setauthenticated] = useState<boolean | string | null>(
    ""
  );
  const signIn = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("authenticated", "true");
        setauthenticated(localStorage.getItem("authenticated"));
        console.log(user);
        location.reload();
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        setErrors(errorCode === "auth/invalid-email" ? "* Invalid E-mail" : null);
        setPasswErrors(errorCode === "auth/invalid-credential" ||errorCode === "auth/missing-password"? "* Incorrect Password" : null)
      });
  };
 
   
  const autent = localStorage.getItem("authenticated");

  const emailInputHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandlerChange = (e: any) => {
    setPassword(e.target.value);
  };
  if (authenticated == "true" || autent == "true") {
    return (
      <Recomended
        title={""}
        thumbnail={{
          trending: undefined,
          regular: {
            small: undefined,
            medium: undefined,
            large: undefined,
          },
        }}
        year={0}
        category={""}
        rating={""}
        isBookmarked={false}
        isTrending={false}
        search={""}
      />
    );
  }
  if (authenticated != "true") {
    return (
      <div className="form-page">
        <img src={image} alt="movie icon" className="movie-icon" />
        <div className="form">
          <form onSubmit={signIn}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={emailInputHandler}
            /> 
            <p style={{ color: "red" }}>{errors}</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordHandlerChange}
            />
           <p style={{ color: "red" }}>{passwErrors}</p>

            <button
              type="submit"
              name="submit"
              value="Sign In"
              onClick={signIn}
              className="form-button"
            >
              {auth ? (
                <Link to="/"> Login to your account </Link>
              ) : (
                "Login to your account"
              )}
            </button>

            <div className="have-account">
              <p>Don’t have an account?</p>
              <Link to="/signUp">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
