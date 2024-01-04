import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { createContext, useState } from "react";
import Home from "./components/Home";
import data from "./config/data.json";
import Bookmarked from "./components/Bookmarked";
import Movies from "./components/Movies";
import TVseries from "./components/TVseries";
import Recomended from "./components/Recomended";
import Navigation from "./components/Navigation";
import searchIcon from "./assets/icon-search.svg";
import { auth } from "./config/firebase";


interface MarkedContextType {
  isMarked: boolean;
  setIsMarked: React.Dispatch<React.SetStateAction<boolean>>;
}



export const MarkedContext = createContext<MarkedContextType>({
  isMarked: false,
  setIsMarked: () => {},
});



function App() {
  const items = data;
  const [isMarked, setIsMarked] = useState(false);


  const [authenticated, setauthenticated] = useState<boolean | string | null>(
    localStorage.getItem("authenticated") !== null
      ? localStorage.getItem("authenticated")
      : false
  );
  const [search, setSearch] = useState<string>("");

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(setauthenticated);
  };

   const autorisedUser = auth.currentUser?.uid
 
  
  return (
    <MarkedContext.Provider value={{ isMarked, setIsMarked }}>
      
        <div>
          <HashRouter>
            <div className="app">
              <div className="navigation">
                {authenticated === "true" ? (
                  <div className="home">
                    <Navigation />
                  </div>
                ) : null}
              </div>
              <div className="home">
                {authenticated === "true" ? (
                  <div className="home">
                    <form className="search-form-container">
                      <div className="searchForm">
                        <button>
                          <img src={searchIcon} alt="search icon" />
                        </button>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search For Movies"
                          value={search}
                          onChange={handlechange}
                        />
                      </div>
                    </form>
                    <div className="container trending">
                      {search.length === 0 ? <h2>Trending</h2> : null}
                      <div className="main">
                        <Home search={search} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="app-main-part">
                <Routes>
                  <Route
                    path="/"
                    element={
                      authenticated === "true" ? (
                        <div className="container">
                          <div className="recomended-container main">
                            {items.map((item) => (
                              <Recomended {...item} search={search} key={item.title} uID = {autorisedUser}/>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Login />
                      )
                    }
                  />

                  <Route
                    path="/bookmarked"
                    element={
                      <div className="container">
                        <h2>Bookmarked </h2>
                        <div className="bookmark-container main">
                          {items.map((item) => (
                            <Bookmarked
                              {...item}
                              search={search}
                              key={item.title}
                              uID = {autorisedUser}
                            />
                          ))}
                        </div>
                      </div>
                    }
                  />

                  <Route
                    path="/series"
                    element={
                      <div className="container">
                        <h2>TV series</h2>
                        <div className="tvseries-container main">
                          {items.map((item) => (
                            <TVseries {...item} search={search} key={item.title} />
                          ))}
                        </div>
                      </div>
                    }
                  />

                  <Route
                    path="/movies"
                    element={
                      <div className="container">
                        <h2>Movies</h2>
                        <div className="movies-container main">
                          {items.map((item) => (
                            <Movies {...item} search={search} key={item.title} uID = {autorisedUser} />
                          ))}
                        </div>
                      </div>
                    }
                  />

                  <Route
                    path="/signUp"
                    element={<SignUp />}
                  />

                  <Route
                    path="*"
                    element={<h1>404 error</h1>}
                  />
                </Routes>
              </div>
            </div>
          </HashRouter>
        </div>
      
    </MarkedContext.Provider>
  );
}

export default App;