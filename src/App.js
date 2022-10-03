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
      let token = localStorage.getItem("user");

      if (!token) return navigate("/login", { replace: true });

      setIsLogin(true);
      navigate("/", { replace: true });
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
        <footer className="cc_footer">
          <div>&#169; powered by vdotok</div>
        </footer>
      </div>
    </>
  );
};

export default App;
