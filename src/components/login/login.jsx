import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../sass/login.css";

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
const Login = ({ setIsLogin }) => {
  const [a, seta] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "1234");
    seta(true);
    setIsLogin(true);
  };

  const animationOut = () => {
    let box = document.querySelector(".box");
    box.classList.add("scale-out-vertical");
  };

  useEffect(() => {
    if (a) {
      let token = localStorage.getItem("token");
      if (token) return navigate("/");
      console.log("hi");
      seta(false);
    }
  }, [a]);
  return (
    <>
      <form
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 18px)" }}
        onSubmit={handleSubmit}
      >
        <motion.div
          className="box scale-in-ver-center"
          variants={animations}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h1>Login</h1>

          <input type="text" name="" placeholder="Username" />
          <input type="password" name="" placeholder="Password" />

          <input type="submit" name="" value="Login" />
          <Link
            className=" text-white underline hover:text-blue-700"
            onClick={animationOut}
            to="/register"
          >
            register
          </Link>
        </motion.div>
      </form>
    </>
  );
};

export default Login;
