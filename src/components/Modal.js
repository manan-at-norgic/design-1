import { useEffect, useState } from "react";
import Users from "../api/Users";
// import Users from "../api/Users";
// import UserCard from "./userCard";

const Modal = ({ userp, toggleModal }) => {
  let [users, setUsers] = useState([]);
  let [search, setSearch] = useState("");

  const findString = (e) => {
    // console.log(e);
    let lowered = e.username.toLowerCase(),
      loweredS = search.toLowerCase();
    // e.username.indexOf(search) > -1
    if (lowered.indexOf(loweredS) > -1) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setUsers(userp);
  }, [userp]);
  return (
    <>
      <div
        className="absolute w-full h-full overflow-hidden createGroup hidden"
        style={{ zindex: "-1", background: "#eefc0042" }}
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
          style={{ height: "85%" }}
        >
          {/* 
          users card below
          */}

          {users.map((elem, index) => {
            return (
              <div key={index}>
                {findString(elem) === true ? (
                  <div className="fade-in item__ -white rounded-lg shadow-lg flex justify-around h-auto my-2">
                    {/* img container */}
                    {/* <div className="w-16 h-16 overflow-hidden img-container my-1">
          <img src={elem.pic} alt="Boat" className="rounded-t-lg" />
        </div> */}
                    {/* text container */}
                    <div className=" my-2 mt-3">
                      <h2 className=" font-semibold text-lg text-clr">
                        {elem.username}
                      </h2>
                      <p className=" text-sm text-clr">Say hi..!</p>
                    </div>
                    {/* user status */}
                    <div className=" text-4xl text-clr">•</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Modal;
