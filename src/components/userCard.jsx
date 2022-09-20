import images from "../api/userDataApi";

const userCard = () => {
  return (
    <>
      {images.map((elem, index) => {
        return (
          <div
            key={index}
            className="fade-in bg-white rounded-lg shadow-lg flex justify-around h-auto my-2"
          >
            {/* img container */}
            <div className="w-16 h-16 overflow-hidden img-container my-1">
              <img src={elem.pic} alt="Boat" className="rounded-t-lg" />
            </div>
            {/* text container */}
            <div className=" my-2 mt-3">
              <h2 className=" font-semibold text-lg">{elem.name}</h2>
              <p className=" text-sm">Say hi..!</p>
            </div>
            {/* user status */}
            <div className=" text-4xl ">•</div>
          </div>
        );
      })}
    </>
  );
};

export default userCard;
