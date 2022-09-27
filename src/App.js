import { useEffect, useState } from "react";
import Container from "./components/container";
import Login from "./components/login/login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./components/login/register";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkLogin = () => {
      let token = localStorage.getItem("token");

      if (token !== "1234") return navigate("/login");

      setIsLogin(true);
      navigate("/");
    };
    checkLogin();
  }, [setIsLogin]);
  return (
    <>
      <div>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            {isLogin ? (
              <Route
                exact
                path="/"
                element={<Container setIsLogin={setIsLogin} />}
              />
            ) : (
              ""
            )}
            <Route
              exact
              path="/login"
              element={<Login setIsLogin={setIsLogin} />}
            />
            <Route
              exact
              path="/register"
              element={<Register setIsLogin={setIsLogin} />}
            />
          </Routes>
        </AnimatePresence>
        {isLogin ? (
          <footer className="cc_footer">
            <div>&#169; powered by vdotok</div>
          </footer>
        ) : (
          <footer
            style={{ background: "rgba(0, 0, 0, 0.158)", color: "white  " }}
            className="cc_footer"
          >
            <div>&#169; powered by vdotok</div>
          </footer>
        )}
      </div>
    </>
  );
};

export default App;
