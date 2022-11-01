import { useEffect, useState } from "react";
import Container from "./components/container";
import Login from "./components/login/login";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Register from "./components/login/register";
import { AnimatePresence } from "framer-motion";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loggedIn } from "./redux/actions/setLogin";

const App = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //redux
  const { isLogin } = useSelector(
    (state) => ({ isLogin: state.signIn }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // console.log(isLogin);
  // end redux
  useEffect(() => {
    document.title = "webrtc by Manan";
    const checkLogin = () => {
      let token = localStorage.getItem("user");

      if (!token) return navigate("/login", { replace: true });

      // setIsLogin(true);
      dispatch(loggedIn(true));
      navigate("/", { replace: true });
    };
    checkLogin();
  }, [loggedIn]);
  return (
    <>
      <div>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            {isLogin ? (
              <Route
                exact
                path="/"
                // element={<Container setIsLogin={setIsLogin} />}
                element={<Container />}
              />
            ) : (
              ""
            )}
            <Route
              exact
              path="/login"
              // element={<Login setIsLogin={setIsLogin} />}
              element={<Login />}
            />
            <Route
              exact
              path="/register"
              // element={<Register setIsLogin={setIsLogin} />}
              element={<Register />}
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
