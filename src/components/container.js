import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Users from "../api/Users";
import attachment from "../assets/attachment.svg";
import Modal from "./Modal";
import Snackbar from "./snackbar";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../redux/actions/setLogin";
import getGroups from "../redux/actions/getGroups";
import { getDomaiName } from "../redux/actions/getConfig";
import { allUsers } from "../redux/actions/getAllUsers";
import { getquotes } from "../redux/actions/getQoute";
import { select_current_group } from "../redux/actions/selectCurrentGroup";
import { select_messages } from "../redux/actions/messageAction";
import allMessagesAction from "../redux/actions/allMessagesAction";
import msgAgainstKeyAction from "../redux/actions/msgAgainstKeyAction";
import variables from "../api/variables";

const Container = () => {
  let [err, setErr] = useState(``);
  let [msgs, setMsgs] = useState([]);
  let [sendMsg, setSendMsg] = useState("");
  const [currentGroup, setCurrentGroup] = useState({});
  const [myClient, setMyClient] = useState();
  const [recivedMsg, setRecivedMsg] = useState();
  let localUser = JSON.parse(localStorage.getItem("user"));

  //redux
  const { groups, domainName, quote, groupName, cGroup, groupMsgs, allMsgs } =
    useSelector(
      (state) => ({
        groups: state.groups,
        domainName: state.domainName,
        quote: state.quote,
        groupName: state.messageBox.currentGroup.channel_key,
        cGroup: state.messageBox.currentGroup,
        groupMsgs: state.messageBox.messages,
        allMsgs: state.messageBox.allMsgs,
      }),
      shallowEqual
    );

  const dispatch = useDispatch();

  // const checkDuplication = () => {
  //   if (allMsgs.length !== 0) {
  //     allMsgs.map((elem,idx) => {
  //       console.log(Object.keys(), "elem key");
  //     });
  //   }
  // };
  // checkDuplication();

  const logout = () => {
    localStorage.clear();
    dispatch(loggedIn(false));
  };
  const getGroupName = (elem) => {
    if (elem === undefined) {
      return "";
    }
    let splitedNames = elem.group_title.split("-");

    let res = splitedNames.filter((item) => item !== localUser.username);
    // console.log("name-----", res);
    return res;
  };
  const toggleModal = () => {
    let modal = document.querySelectorAll(".createGroup");
    modal.forEach((elem) => {
      elem.classList.toggle("hidden");
    });
    // get users onclick create group
    if (!modal[0].classList.contains("hidden")) {
      dispatch(allUsers());
    }
  };
  const deleteGroup = async (id) => {
    setErr("");
    let res = await Users.deleteGroup({
      group_id: `${id}`,
      auth_token: `${localUser.auth_token}`,
    });
    console.log("group deleted ====> ", res);
    setErr(res.data.message);
    setTimeout(() => {
      setErr("");
    }, 5000);
    dispatch(getGroups());
    // alert(`delete group ---> ${id}`);
  };
  /*eslint-disable */
  const initializeChatSDK = () => {
    if (localUser) {
      let Client = new MVDOTOK.Client({
        projectID: `${variables.projectID}`,
        secret: `${variables.apiKey}`,
        host: `${localUser.messaging_server_map.complete_address}`,
      });
      setMyClient(Client);
      // console.log("client after initializing==>", Client);
      Client.Register(localUser.ref_id, localUser.authorization_token);
      Client.on("connect", (res) => {
        // you can do something after connecting the socket
        // console.log("**res on connect sdk", res);
      });
      Client.on("subscribed", (response) => {
        console.log("**res on subscribe  ", response);
      });
      Client.on("message", (res) => {
        console.log(res, "------res heres mesaage");
        setRecivedMsg(res);
      });
    }
  }; /*eslint-enable */

  const handleSubmitMsg = () => {
    if (!/\S/.test(sendMsg) !== true) {
      /// firstly setmsgs from input level scope

      let idd = new Date().getTime().toString();
      let payload = {
        status: 1,
        size: 0,
        type: "text",
        from: localUser.ref_id,
        content: sendMsg.trim(),
        id: idd,
        date: new Date().getTime(),
        key: cGroup.channel_key,
        to: cGroup.channel_name,
      };
      myClient.SendMessage(payload);
    } else {
      setErr("plz type msgs to send");
      setTimeout(() => {
        setErr("");
      }, 5000);
    }

    setSendMsg("");
  };

  const displayCurrentMsgs = (elem) => {
    const check = () => {
      for (let i = 0; i < allMsgs.length; i++) {
        // console.log(allMsgs[i]);
        let haskey = allMsgs[i].hasOwnProperty(elem.channel_key);
        // console.warn(haskey);
        if (haskey) return { haskey, idx: i };
      }
    };
    let haskey = check();
    console.warn(haskey);
    if (haskey !== undefined && haskey.haskey === true) {
      let d = Object.values(allMsgs[haskey.idx]);
      let f = d[0];
      // setMsgs(null);
      setMsgs([...f]);
      console.warn("i am d ", f, "msgfs", msgs);
    }
    // else {
    //   setMsgs([]);
    // }
  };

  useEffect(() => {
    dispatch(getquotes());
    dispatch(getGroups());
    dispatch(getDomaiName());
    initializeChatSDK();
  }, [dispatch]);

  // subscribe all channels
  useEffect(() => {
    if (
      groups.groups !== undefined &&
      groups.groups.length !== 0 &&
      myClient !== undefined
    ) {
      let grpsToSubscribe = [];
      groups.groups.map((e) => {
        grpsToSubscribe.push({ key: e.channel_key, channel: e.channel_name });
      });
      grpsToSubscribe.map((e) => {
        myClient.Subscribe(e);
      });
    }
  }, [groups]);

  // msgs action redux
  useEffect(() => {
    dispatch(select_messages([...msgs]));
    console.log(`msgs herweee`, msgs);
  }, [msgs]);
  useEffect(() => {
    if (allMsgs.length !== 0) {
      const check = () => {
        for (let i = 0; i < allMsgs.length; i++) {
          // console.log(allMsgs[i]);
          let haskey = allMsgs[i].hasOwnProperty(groupName);
          // console.warn(haskey);
          if (haskey) return { haskey, idx: i };
        }
      };

      let verifiy = check();
      console.warn("i am verified", verifiy);
      {
        verifiy !== undefined && verifiy.haskey === true
          ? dispatch(msgAgainstKeyAction({ groupName, addMessages: msgs }))
          : dispatch(allMessagesAction({ [groupName]: msgs }));
      }
    } else {
      //  set a check heree to match channel_key for both msgs sender and current group
      // console.warn(currentGroup.channel_key);
      if (
        groupMsgs.length !== 0 &&
        groupName &&
        recivedMsg !== undefined &&
        currentGroup &&
        currentGroup.channel_key === recivedMsg.key
      ) {
        dispatch(allMessagesAction({ [groupName]: groupMsgs }));
        dispatch(select_messages([]));
        setMsgs([]);
      }
    }

    if (recivedMsg !== undefined && recivedMsg.content !== "") {
      setMsgs([...msgs, recivedMsg.content]);
    }
    setRecivedMsg(undefined);
  }, [msgs, groupName, recivedMsg]);

  return (
    <>
      <Modal toggleModal={toggleModal} />
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
                </svg>
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
            className=" w-1/4 -white "
            style={{ height: "calc(100vh - 56px)" }}
          >
            {/* fixed header */}
            <div className="">
              <div
                onClick={toggleModal}
                className="flex justify-end items-center shadow-md cursor-pointer"
              >
                <span className=" font-bold p-2">+ Chat With</span>
              </div>
            </div>
            {/* end fixed header */}
            <div
              className="overflow-scroll scroll-custom"
              style={{ height: "calc(100vh - 120px)" }}
            >
              {groups.groups ? (
                <>
                  {groups.groups.map((elem, index) => {
                    return (
                      <div
                        key={index}
                        className="fade-in item__ capitalize -white rounded-lg shadow-lg flex justify-around pl-4 my-2 py-4"
                      >
                        <span
                          className=" cursor-pointer"
                          onClick={() => {
                            displayCurrentMsgs(elem);
                            setCurrentGroup(elem);
                            dispatch(select_current_group(elem));
                          }}
                        >
                          {getGroupName(elem)}
                        </span>
                        <span
                          className="lowercase alertText cursor-pointer"
                          onClick={() => {
                            deleteGroup(elem.id);
                          }}
                        >
                          x
                        </span>
                      </div>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
          </aside>
          <aside
            className="bg_clr w-full "
            style={{ height: "calc(100vh - 56px)" }}
          >
            {/* fixed header */}
            {currentGroup.group_title ? (
              <div className="w-full text-center zoomIn capitalize shadow-md cursor-auto -white font-bold p-2">
                {getGroupName(currentGroup)}
              </div>
            ) : (
              currentGroup.group_title
            )}

            {/* end fixed header */}
            {/* chat box start */}
            <div
              className="overflow-scroll scroll-custom flex flex-col justify-between"
              style={{ height: "calc(100vh - 11rem)" }}
            >
              <div className="flex justify-between">
                {/* {console.log("msgs----", msgs)} */}
                {allMsgs.length === 0 && !currentGroup.group_title ? (
                  <div
                    className="flex justify-center items-center w-full "
                    style={{ height: "75vh" }}
                  >
                    <div
                      className="w-1/2 text-center text-2xl"
                      style={
                        {
                          // textShadow:
                          //   "2px 2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, -2px -2px 0 #fff, 2px 0px 0 #fff, 0px 2px 0 #fff, -2px 0px 0 #fff, 0px -2px 0 #fff",
                        }
                      }
                    >
                      {quote.text !== null ? quote.text : ""}
                    </div>
                  </div>
                ) : (
                  <div className="Manan w-full">
                    {msgs.map((msg, key) => {
                      return (
                        <div
                          className="bg-white rounded-m w-32 text-ellipsis text-center p-2 m-4 "
                          key={key}
                        >
                          {msg}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {/* chat box end */}

            {currentGroup.group_title ? (
              <div
                className={!currentGroup.group_title ? " flex mt-10" : "flex"}
                style={{ width: "calc(100vw - 30%)" }}
              >
                <div className="ml-4 py-4">
                  <label htmlFor="file" className="img_label cursor-pointer">
                    <img
                      style={{
                        height: "1.5rem",
                        width: "1.5rem",
                      }}
                      src={attachment}
                      alt="attachment"
                    />
                  </label>
                  <input
                    id="file"
                    type="file"
                    name="img_label"
                    className="hidden"
                  />
                </div>
                <label
                  className="w-full h-14 flex justify-around items-center"
                  style={{ width: "calc(100vw - 38%)" }}
                  htmlFor="sendmsgs"
                >
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmitMsg();
                      }
                    }}
                    placeholder="Write message..."
                    className="w-3/4 p-4 rounded-xl"
                    name="sendmsgs"
                    value={sendMsg === "" ? "" : sendMsg}
                    onChange={(e) => {
                      setSendMsg(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      handleSubmitMsg();
                    }}
                    className=" bg-sky-500 text-black h-14 w-20 rounded-md border-none outline-none hover:bg-white hover:text-sky-500"
                  >
                    send
                  </button>
                </label>
              </div>
            ) : (
              ""
            )}
          </aside>
        </section>
      </motion.div>
      <Snackbar err={err} />
    </>
  );
};

export default Container;
