import UserCard from "./userCard";
import SenderMsgs from "./senderMsgs";
import ReciverMsgs from "./reciverMsgs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Container = ({ setIsLogin }) => {
  const [domainName, setConfig] = useState([]);
  // get name from url
  // let url = window.location.href;
  // let aurl = new URL(url).host;
  // let host = aurl.split(":");
  // host = host[0].toString();

  // let domainName = [];
  // for (let i = 0; i < host.length; i++) {
  //   domainName.push(host[i]);
  // }
  const logout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  useEffect(() => {
    const config = async () => {
      let res = await axios.get("config.json");
      console.log(res.data.name);
      let name = res.data.name;
      let domainName = [];
      for (let i = 0; i < name.length; i++) {
        domainName.push(name[i]);
      }
      setConfig(domainName);
    };
    config();
  }, []);

  return (
    <>
      <motion.div
        className=" w-full h-screen bg-clr theme-height"
        // initial={{ opacity: 0, y: 0 }}
        // animate={{ opacity: 1, y: -100 }}
        // exit={{ opacity: 0, y: 100 }}
      >
        <header className="font-bold font-averia theme-clr">
          <nav className="flex items-center justify-between">
            <div className=" ml-4 m-2 theme-clr h-10 font-semibold grid place-items-center">
              <div className="waviy">
                {domainName.map((elem, idx) => {
                  return (
                    <span key={idx} style={{ "--i": idx + 1 }}>
                      {elem}
                    </span>
                  );
                })}
              </div>
            </div>
            {/* <div
              style={{ background: "#FFFA9E" }}
              className="m-2 h-10 font-semibold grid place-items-center"
            >
            </div> */}
            <div className="mr-4 flex theme-clr">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-camera-video"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
                  />
                </svg>{" "}
              </button>
              <div className=" w-5"></div>
              <button>
                {/* audio button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  <path
                    fillRule="evenodd"
                    d="M12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </button>
              <div className=" w-5"></div>
              <Link to="/login">
                <button onClick={logout}>logout </button>
              </Link>
            </div>
          </nav>
        </header>
        <section className="flex justify-center ">
          {/* 25% and 75% width each aside respectively */}
          {/* left side  */}
          <aside
            className=" w-1/4 -white overflow-scroll scroll-custom"
            style={{ height: "calc(100vh - 56px)" }}
          >
            <div className="flex justify-end items-center shadow-md cursor-pointer">
              <span className=" font-bold p-2">+Create Group</span>
            </div>
            <div className="">
              <UserCard />
            </div>
          </aside>
          <aside className="bg_clr h-full w-full">
            <div className="flex justify-between">
              <div className=" w-1/2 m-2">
                <SenderMsgs />
              </div>
              <div className="m-2 w-1/2 flex flex-col items-end">
                <ReciverMsgs />
              </div>
            </div>
            <div
              className="absolute flex bottom-0"
              style={{ width: "calc(100vw - 25%)" }}
            >
              <div className="ml-4 my-4 py-4">
                <label htmlFor="file" className="img_label cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      transform: "rotate(25deg)",
                    }}
                    fill="currentColor"
                    viewBox="0 0 15 20"
                  >
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                  </svg>
                </label>
                <input
                  id="file"
                  type="file"
                  name="img_label"
                  className="hidden"
                />
              </div>
              <input
                type="text"
                placeholder="Write message..."
                className="w-full  m-4 h-14 p-4 rounded-xl"
                style={{ width: "calc(100vw - 38%)" }}
              />
            </div>
          </aside>
        </section>
      </motion.div>
    </>
  );
};

export default Container;
