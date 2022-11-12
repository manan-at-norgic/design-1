// start get all groups
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Users from "../api/Users";
import getGroups from "../redux/actions/getGroups";
import Snackbar from "./snackbar";

// import Users from "../api/Users";
// import UserCard from "./userCard";

const Modal = ({ toggleModal }) => {
  // let [users, setUsers] = useState([]);
  let [search, setSearch] = useState("");
  let [selectedUsers, setSelectedUsers] = useState([]);
  let [err, setErr] = useState(``);
  let [groupTitle, setGroupTitle] = useState("");

  //redux
  const { users } = useSelector((state) => ({ users: state.allUsers }));
  console.log(useSelector((state) => state));
  const dispatch = useDispatch();

  const findString = (e) => {
    let lowered = e.username.toLowerCase(),
      loweredS = search.toLowerCase();
    // e.username.indexOf(search) > -1
    if (lowered.indexOf(loweredS) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const getUsers = (elem) => {
    let tick = document.querySelector(`.tick-icon.${elem.username}`);
    tick.classList.remove("hidden");
    document.querySelector(".donee").classList.remove("hidden");
    if (
      selectedUsers.find((el) => el.username === elem.username) != undefined
    ) {
      return;
    } else {
      setSelectedUsers([
        ...selectedUsers,
        { username: elem.username, user_id: elem.user_id },
      ]);
    }
  };
  // console.log("selected users =======>", selectedUsers);

  const createGroup = async () => {
    let token = localStorage.getItem("auth_token");
    let localUser = JSON.parse(localStorage.getItem("user"));

    if (selectedUsers.length <= 1) {
      const data = {
        auth_token: `${token}`,
        group_title: `${selectedUsers[0].username}-${localUser.username}`,
        auto_created: "1",
        participants: [selectedUsers[0].user_id],
      };
      const res = await Users.createGroup(data);
      if (res.data.is_already_created) {
        setErr("Chat is already created");
        setTimeout(() => {
          setErr("");
        }, 5000);
        // toggleModal();
        setSearch("");
        setSelectedUsers([]);
        let tick = document.querySelectorAll(".tick-icon");
        tick.forEach((item) => {
          item.classList.add("hidden");
        });
      } else {
        setErr(res.data.message);
      }
      console.log("group created --->", res);
      dispatch(getGroups());
    } else {
      const data = {
        auth_token: `${token}`,
        group_title: `${groupTitle}`,
        auto_created: "0",
        // returning user idz
        participants: selectedUsers.map((elem) => elem.user_id),
      };
      console.log(data);
      const res = await Users.createGroup(data);
      console.log("group created --->", res);
      dispatch(getGroups());

      setErr(res.data.message);
      return setTimeout(() => {
        setErr("");
      }, 5000);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          toggleModal();
          setSearch("");
          setSelectedUsers([]);
          let tick = document.querySelectorAll(".tick-icon");
          tick.forEach((item) => {
            item.classList.add("hidden");
          });
        }}
        className="absolute w-full h-full overflow-hidden createGroup hidden"
        style={{ zindex: "-1" }}
      ></div>
      {/* Modal starts */}
      <div className="fixed left-1/3 top-1/4 w-full max-w-md h-1/2 border hidden createGroup bg-slate-300 rounded-2xl">
        {/* fixed modal header */}
        <div className="relative mt-8">
          <div className="m-4  flex justify-center">
            <div className="flex -mt-4 justify-around items-center border-blue-900 w-3/4 border-b-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="text"
                onChange={(e) => {
                  return setSearch(e.target.value);
                }}
                value={search}
                placeholder="Search Contact"
                className="search_user text-center text-black placeholder:text-black w-full m-2 outline-none border-none  bg-transparent"
              />
            </div>
            <div
              onClick={() => {
                toggleModal();
                setSearch("");
                setSelectedUsers([]);
                let tick = document.querySelectorAll(".tick-icon");
                tick.forEach((item) => {
                  item.classList.add("hidden");
                });
              }}
              className="absolute cursor-pointer text-center font-bold text-xl alertText right-6 -top-6"
            >
              x
            </div>
          </div>
        </div>
        {/* modal Body */}
        <div
          className="-mt-4 overflow-scroll scroll-custom m-4"
          style={{ height: "70%" }}
        >
          {/* 
          users card below
          */}

          {users
            ? users.map((elem, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      getUsers(elem);
                    }}
                  >
                    {findString(elem) === true ? (
                      <div className="fade-in item__ -white rounded-lg shadow-lg flex items-center justify-center  h-auto my-2">
                        {/* img container */}
                        {/* <div className="w-16 h-16 overflow-hidden img-container my-1">
          <img src={elem.pic} alt="Boat" className="rounded-t-lg" />
        </div> */}
                        {/* text container */}
                        <div className=" my-2 mt-3">
                          <h2 className=" font-semibold text-lg text-clr">
                            {elem.username}
                          </h2>
                        </div>
                        {/* user status */}&nbsp;&nbsp;
                        <div
                          className={`text-4xl text-clr tick-icon hidden  ${elem.username}`}
                        >
                          <svg className="animated-check" viewBox="0 0 24 24">
                            <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            : ""}
        </div>
        {/* modal gooter */}
        <div className="donee hidden text-lg text-green-500">
          {selectedUsers.length <= 1 ? (
            <div
              onClick={() => {
                createGroup();
                toggleModal();
                setSearch("");
                setSelectedUsers([]);
                let tick = document.querySelectorAll(".tick-icon");
                setTimeout(() => {
                  setErr("");
                }, 5000);
                tick.forEach((item) => {
                  item.classList.add("hidden");
                });
              }}
              className="cursor-pointer"
            >
              start chat
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="Group Name"
                onChange={(e) => setGroupTitle(e.target.value)}
              />
              <button
                onClick={() => {
                  createGroup();
                  toggleModal();
                  setSearch("");
                  setSelectedUsers([]);
                  setTimeout(() => {
                    setErr("");
                  }, 5000);
                  let tick = document.querySelectorAll(".tick-icon");
                  tick.forEach((item) => {
                    item.classList.add("hidden");
                  });
                }}
              >
                submit
              </button>
            </div>
          )}
        </div>
      </div>
      <Snackbar err={err} />
    </>
  );
};

export default Modal;
