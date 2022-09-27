import msgApiData from "../api/userMsgsApi";

const senderMsgs = () => {
  return (
    <>
      {msgApiData.sender.map((elem, idx) => {
        return (
          <div key={idx}>
            <div
              style={{ background: "transparent" }}
              className="rounded-r-2xl text-ellipsis w-fit"
            >
              <div>
                {elem.name} {elem.time}
              </div>
              <div
                className=" p-2 text-center mt-1 rounded-2xl"
                style={{ background: "white" }}
              >
                <span className="">{elem.msg}</span>
              </div>
            </div>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default senderMsgs;
