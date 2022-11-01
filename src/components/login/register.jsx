import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Users from "../../api/Users";
import variables from "../../api/variables";
import Snackbar from "../snackbar";
import "../../sass/login.css";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux/actions/setLogin";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(``);
  const [a, seta] = useState(false);
  const [user, setUser] = useState({
    full_name: "",
    device_type: "web",
    device_model: "web",
    device_os_ver: "Win32",
    email: "",
    password: "",
    project_id: `${variables.projectID}`,
  });

  //redux
  const dispatch = useDispatch();
  //end redux

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // localStorage.setItem("token", "1234");
      // seta(true);
      // setIsLogin(true);

      if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
        setErr("plz fill all field properly");
        return setTimeout(() => {
          setErr("");
        }, 5000);
      }
      const Emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!Emailreg.test(e.target[1].value)) {
        setErr("Plz enter valid email");
        return setTimeout(() => {
          setErr("");
        }, 5000);
      }

      const res = await Users.signUp(user);
      // localStorage.setItem("user", res.data);
      if (res.data.ref_id) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("auth_token", res.data.auth_token);
        navigate("/", { replace: true });
      } else {
        setErr(res.data.message);
        return setTimeout(() => {
          setErr("");
        }, 5000);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  // const removeSnack = () => {
  //   return setErr("");
  // };

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (token) return navigate("/", { replace: true });
    console.log("hii");
    seta(false);
    // setIsLogin(true);
    dispatch(loggedIn(true));

    // let data = {

    // };
    // Users.signUp(data);
  }, []);
  return (
    <>
      <form
        id="register_form"
        className="flex justify-center items-center wrapper theme-height"
        onSubmit={handleSubmit}
      >
        <motion.div
          className="box "
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <h1 className="text-2xl font-bold capitalize">register</h1>
          <input
            onChange={onChangeInputs}
            type="text"
            name="full_name"
            placeholder="Username"
          />
          <input
            onChange={onChangeInputs}
            type="text"
            className=""
            name="email"
            placeholder="email"
          />
          <input
            onChange={onChangeInputs}
            type="password"
            name="password"
            placeholder="Password"
          />

          <input
            type="submit"
            className="capitalize"
            name=""
            id="register_submit"
            value="register"
          />
          <Link className="capitalize font-bold underline" to="/login">
            login
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

export default Register;
