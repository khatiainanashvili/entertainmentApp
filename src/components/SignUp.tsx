import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/Movie.svg";
import Recomended from "./Recomended";
export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authenticated, setauthenticated] = useState<boolean>(false);
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const auth = getAuth();
  const [errors, setErrors] = useState<string | null>("");
  const [passwErrors, setPasswErrors] = useState<string | null>("");
  const [confPassError, setConfPassError] = useState<string | null>('')
  const signUp = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setauthenticated(true);
        localStorage.setItem("authenticated", "true");
        console.log(user, authenticated);
        setSignedUp(true);
        navigate("/");
        location.reload();
      })
    
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrors(errorCode === "auth/invalid-email" ? "* Invalid E-mail" : errorCode== "auth/email-already-in-use" ? "email already in use" : null);
        setPasswErrors(errorCode === "auth/weak-password" || errorCode === "auth/missing-password"? "*Password should be at least 6 characters" : null)   
      });
  };

  const emailInputHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandlerChange = (e: any) => {
    setPassword(e.target.value);
  };
  const confirmPasswordHandlerChange = (e: any) => {
    setConfirmPassword(e.target.value);

  };
  useEffect(() => {
    setConfPassError(password !== confirmPassword ? "passord does not match" : null)
  }, [confirmPasswordHandlerChange])
  const autent = localStorage.getItem("authenticated");
  if (signedUp == true || autent == "true") {
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
  if (autent != "true") {
    return (
      <div className="form-page">
        <img src={image} alt="movie icon" className="movie-icon" />
        <div className="form">
          <form onSubmit={signUp}>
            <h2>Sign Up</h2>
            <input
              type="email"
              name="email"
              value={email}
              onChange={emailInputHandler}
              placeholder="Email address"
              required = {true}
            />
             <p style={{ color: "red" }}>{errors}</p>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={passwordHandlerChange}
              required = {true}
            />
            <p style={{ color: "red" }}>{passwErrors}</p>
            <input
              type="password"
              name="password"
              value={confirmPassword}
              placeholder="Repeat Password"
              onChange={confirmPasswordHandlerChange}
              required = {true}
              pattern= {password.valueOf()}
            
            />
            <p style={{ color: "red" }}>{confPassError}</p>
            <button
              type="submit"
              name="submit"
              value="Sign Up"
              className="form-button"
            >
              Create an account
            </button>

            <div className="have-account">
              <p>Alread have an account?</p>
              <Link to="/">Login</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
