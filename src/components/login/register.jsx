import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../sass/login.css";

// const animations = {
//   initial: { opacity: 0, x: 100 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -100 },
// };

const Register = ({ setIsLogin }) => {
  const [a, seta] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "1234");
    seta(true);
    setIsLogin(true);
  };

  useEffect(() => {
    if (a) {
      let token = localStorage.getItem("token");
      if (token) return navigate("/");
      console.log("hii");
      seta(false);
    }
  });
  return (
    <>
      <form
        style={{ height: "calc(100vh - 18px)" }}
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <motion.div
          className="box "
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <h1>Login</h1>

          <input type="text" name="" placeholder="Username" />
          <input type="text" name="" placeholder="email" />
          <input type="password" name="" placeholder="Password" />

          <input type="submit" name="" value="register" />
          <Link
            className=" text-white underline hover:text-blue-700"
            to="/login"
          >
            login
          </Link>
        </motion.div>
      </form>
    </>
  );
};

export default Register;
