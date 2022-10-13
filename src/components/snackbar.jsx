import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const Snackbar = ({ err }) => {
  const [merr, setErr] = useState(``);

  const removeSnack = () => {
    return setErr("");
  };
  useEffect(() => {
    setErr(err);
  }, [err]);
  return (
    <>
      {merr !== "" ? (
        <div
          onClick={removeSnack}
          className="m-4 absolute cursor-pointer top-0 right-0 p-4 snack-custom rounded-lg fadeInDown"
        >
          <span
            style={{ padding: "1px 5px", fontFamily: "Arial" }}
            className="snack-custom-child rounded-full mx-2 font-bold"
          >
            x
          </span>
          {merr}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Snackbar;
