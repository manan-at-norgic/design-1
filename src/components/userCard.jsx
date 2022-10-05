// import { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import images from "../api/userDataApi";
// import Users from "../api/Users";
// import variables from "../api/variables";

const UserCard = ({ users }) => {
  return (
    <>
      {users.map((elem, index) => {
        return (
          <div
            key={index}
            className="fade-in -white rounded-lg shadow-lg flex justify-around h-auto my-2"
          >
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
        );
      })}
    </>
  );
};

export default UserCard;
