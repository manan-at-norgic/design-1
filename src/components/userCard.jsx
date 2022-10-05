import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "../api/userDataApi";
import Users from "../api/Users";
import variables from "../api/variables";

const UserCard = () => {
  const navigate = useNavigate();
  let [users, setUsers] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    if (!token) {
      alert("user not logged in");

      navigate("/login", { replace: true });
    }

    let data = {
      auth_token: `${token}`,
    };

    const getAllUsers = async () => {
      let res = await Users.getAllUsers(data);
      setUsers(res.data.users);
      // console.log(
      //   users.map((elem) => {
      //     return elem.username;
      //   }),
      //   "yoooooooooo"
      // );
    };
    getAllUsers();
  }, []);
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
