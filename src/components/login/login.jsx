import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Users from "../../api/Users";
import variables from "../../api/variables";
import Snackbar from "../snackbar";
import "../../sass/login.css";
import { shallowEqual, useDispatch } from "react-redux";
import { loggedIn } from "../../redux/actions/setLogin";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const Login = () => {
  // states
  const [err, setErr] = useState(``);
  const [user, setUser] = useState({
    email: "",
    password: "",
    project_id: `${variables.projectID}`,
  });
  const [a, seta] = useState(false);
  const navigate = useNavigate();

  // redux variables

  // redux methods
  const dispatch = useDispatch();
  // end redux methods

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target[0].value || !e.target[1].value) {
      setErr("Plz fill all fields properly");
      return setTimeout(() => {
        // let snack = document.querySelector(".snack-custom");
        // setTimeout(() => {
        //   snack.classList = "fadeInUp";
        // }, 1000 * 2);
        setErr("");
      }, 5000);
    }

    let res = await Users.loginIn(user);
    console.log(res);
    if (res.data.ref_id) {
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("auth_token", res.data.auth_token);
      dispatch(loggedIn(true));
      seta(true);
      // setIsLogin(true);
      dispatch(loggedIn(true));
      // return navigate("/");
    } else {
      setErr(res.data.message);
      // setIsLogin(false);
      dispatch(loggedIn(false));
      seta(false);
      return setTimeout(() => {
        setErr("");
      }, 5000);
    }

    // localStorage.setItem("token", "1234");
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const animationOut = () => {
    let box = document.querySelector(".box");
    box.classList.add("scale-out-vertical");
  };

  // const removeSnack = () => {
  //   return setErr("");
  // };

  useEffect(() => {
    if (a) {
      let token = localStorage.getItem("auth_token");
      if (token) return navigate("/", { replace: true });
      console.log("hi");
      // seta(false);
    }
  }, [a]);
  return (
    <>
      <form
        className="flex justify-center items-center wrapper theme-height"
        onSubmit={handleSubmit}
      >
        <motion.div
          className="box scale-in-ver-center"
          variants={animations}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h1 className="text-2xl font-bold">Login</h1>

          <input
            onChange={onChangeInputs}
            type="text"
            name="email"
            placeholder="email/username"
          />
          <input
            onChange={onChangeInputs}
            type="password"
            name="password"
            placeholder="Password"
          />

          <input type="submit" name="" value="Login" />
          <Link
            className=" capitalize font-bold underline"
            onClick={animationOut}
            to="/register"
          >
            register
          </Link>
        </motion.div>
        <section className="deco">
          <div className="circle first" aria-hidden="true"></div>
          <div className="circle second" aria-hidden="true"></div>
        </section>
      </form>
      <Snackbar err={err} />
    </>
  );
};

export default Login;
